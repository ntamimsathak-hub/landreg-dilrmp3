import React, { createContext, useContext, useState } from 'react';
import { LandRecord, BoundingBox, ExtractedLandData, RecordStatus, FieldValidationStatus } from '../types/landRecord';
import { mockLandRecords } from '../data/mockRecords';
import { mockGrievances, mockNotifications } from '../data/mockAnalytics';
import { GrievanceRecord } from '../types/grievance';
import { UserNotification } from '../types/user';
import { ManigarRequest, ManigarStatus } from '../types/manigar';
import { mockManigarRequests } from '../data/mockManigar';

interface UploadQueueItem {
  id: string;
  file: { name: string; size: number; type: string };
  uploadedAt: string;
  status: 'queued' | 'scanning' | 'processed' | 'error';
  progress: number;
  previewUrl?: string;
}

interface RecordsContextType {
  records: LandRecord[];
  selectedRecord: LandRecord | null;
  setSelectedRecord: (record: LandRecord | null) => void;
  activeBoundingBoxId: string | null;
  setActiveBoundingBoxId: (id: string | null) => void;
  updateFieldCorrection: (recordId: string, boxId: string, newValue: string, notes?: string) => void;
  acceptBoundingBox: (recordId: string, boxId: string) => void;
  rejectBoundingBox: (recordId: string, boxId: string) => void;
  approveRecord: (recordId: string, officerId: string, officerName: string) => void;
  rejectRecordForRescan: (recordId: string, officerId: string, reason: string) => void;
  
  // Upload and OCR queue
  uploadQueue: UploadQueueItem[];
  addFilesToUploadQueue: (files: File[]) => void;
  runAiOcrScan: (queueItemId: string) => Promise<LandRecord>;
  isOcrProcessing: boolean;
  
  // Grievances & Notifications
  grievances: GrievanceRecord[];
  addGrievance: (grievance: Omit<GrievanceRecord, 'id' | 'grievanceNumber' | 'submittedDate' | 'status' | 'assignedOfficer'>) => void;
  notifications: UserNotification[];
  markNotificationRead: (id: string) => void;

  // Manigar Land Survey & Size Accuracy Verification
  manigarRequests: ManigarRequest[];
  addManigarRequest: (request: Omit<ManigarRequest, 'id' | 'requestNumber' | 'requestedDate' | 'status'>) => void;
  allocateManigarToRequest: (requestId: string, manigarName: string, manigarContact: string, scheduledDate: string) => void;
  verifyLandSizeByManigar: (requestId: string, measuredArea: number, accuracyPercent: number, notes: string, officerName: string) => void;
}

const RecordsContext = createContext<RecordsContextType | undefined>(undefined);

export const RecordsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [records, setRecords] = useState<LandRecord[]>(mockLandRecords);
  const [selectedRecord, setSelectedRecord] = useState<LandRecord | null>(mockLandRecords[0]);
  const [activeBoundingBoxId, setActiveBoundingBoxId] = useState<string | null>('box-3'); // Default active on the uncertain survey number box
  const [uploadQueue, setUploadQueue] = useState<UploadQueueItem[]>([]);
  const [isOcrProcessing, setIsOcrProcessing] = useState<boolean>(false);
  const [grievances, setGrievances] = useState<GrievanceRecord[]>(mockGrievances);
  const [notifications, setNotifications] = useState<UserNotification[]>(mockNotifications);
  const [manigarRequests, setManigarRequests] = useState<ManigarRequest[]>(mockManigarRequests);

  const updateFieldCorrection = (recordId: string, boxId: string, newValue: string, notes?: string) => {
    setRecords((prevRecords) =>
      prevRecords.map((rec) => {
        if (rec.id !== recordId) return rec;

        const targetBox = rec.boundingBoxes.find((b) => b.id === boxId);
        if (!targetBox) return rec;

        const fieldKey = targetBox.fieldKey as keyof ExtractedLandData;
        const updatedData = {
          ...rec.extractedData,
          [fieldKey]: newValue
        };

        const updatedBoxes: BoundingBox[] = rec.boundingBoxes.map((b) => {
          if (b.id === boxId) {
            return {
              ...b,
              userCorrection: newValue,
              status: 'manually_verified' as FieldValidationStatus,
              isUncertain: false,
              confidence: 100,
              notes: notes || b.notes
            };
          }
          return b;
        });

        const unresolvedCount = updatedBoxes.filter((b) => b.isUncertain && b.status === 'ai_uncertain').length;

        const newLog = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          officerId: 'OFF-CURRENT',
          officerName: 'V. Meenakshi Sundaram (Tahsildar)',
          action: `Manually corrected '${targetBox.label}' from '${targetBox.primaryReading}' to '${newValue}'`,
          fieldChanged: targetBox.label,
          oldValue: targetBox.primaryReading,
          newValue: newValue
        };

        const updatedRec = {
          ...rec,
          extractedData: updatedData,
          boundingBoxes: updatedBoxes,
          unresolvedUncertaintiesCount: unresolvedCount,
          auditLogs: [newLog, ...rec.auditLogs]
        };

        if (selectedRecord?.id === recordId) {
          setSelectedRecord(updatedRec);
        }

        return updatedRec;
      })
    );
  };

  const acceptBoundingBox = (recordId: string, boxId: string) => {
    setRecords((prevRecords) =>
      prevRecords.map((rec) => {
        if (rec.id !== recordId) return rec;

        const targetBox = rec.boundingBoxes.find((b) => b.id === boxId);
        if (!targetBox) return rec;

        const updatedBoxes: BoundingBox[] = rec.boundingBoxes.map((b) => {
          if (b.id === boxId) {
            return {
              ...b,
              status: 'manually_verified' as FieldValidationStatus,
              isUncertain: false
            };
          }
          return b;
        });

        const unresolvedCount = updatedBoxes.filter((b) => b.isUncertain && b.status === 'ai_uncertain').length;

        const newLog = {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          officerId: 'OFF-CURRENT',
          officerName: 'V. Meenakshi Sundaram (Tahsildar)',
          action: `Accepted AI interpretation for '${targetBox.label}' as '${targetBox.primaryReading}'`
        };

        const updatedRec = {
          ...rec,
          boundingBoxes: updatedBoxes,
          unresolvedUncertaintiesCount: unresolvedCount,
          auditLogs: [newLog, ...rec.auditLogs]
        };

        if (selectedRecord?.id === recordId) {
          setSelectedRecord(updatedRec);
        }

        return updatedRec;
      })
    );
  };

  const rejectBoundingBox = (recordId: string, boxId: string) => {
    setRecords((prevRecords) =>
      prevRecords.map((rec) => {
        if (rec.id !== recordId) return rec;

        const updatedBoxes: BoundingBox[] = rec.boundingBoxes.map((b) => {
          if (b.id === boxId) {
            return {
              ...b,
              status: 'rejected' as FieldValidationStatus,
              isUncertain: true
            };
          }
          return b;
        });

        const updatedRec = {
          ...rec,
          boundingBoxes: updatedBoxes
        };

        if (selectedRecord?.id === recordId) {
          setSelectedRecord(updatedRec);
        }

        return updatedRec;
      })
    );
  };

  const approveRecord = (recordId: string, officerId: string, officerName: string) => {
    setRecords((prev) =>
      prev.map((rec) => {
        if (rec.id !== recordId) return rec;

        const auditEntry = {
          id: `log-app-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          officerId,
          officerName,
          action: 'Final Verification Approved. Digitized into Sovereign DILRMP 3.0 Central Ledger with cryptographic seal.'
        };

        const updated: LandRecord = {
          ...rec,
          status: 'Verified',
          unresolvedUncertaintiesCount: 0,
          auditLogs: [auditEntry, ...rec.auditLogs]
        };

        if (selectedRecord?.id === recordId) {
          setSelectedRecord(updated);
        }
        return updated;
      })
    );
  };

  const rejectRecordForRescan = (recordId: string, officerId: string, reason: string) => {
    setRecords((prev) =>
      prev.map((rec) => {
        if (rec.id !== recordId) return rec;

        const auditEntry = {
          id: `log-rej-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          officerId,
          officerName: 'Department Officer',
          action: `Record Rejected for Physical Rescan. Reason: ${reason}`
        };

        const updated: LandRecord = {
          ...rec,
          status: 'Rejected',
          auditLogs: [auditEntry, ...rec.auditLogs]
        };

        if (selectedRecord?.id === recordId) {
          setSelectedRecord(updated);
        }
        return updated;
      })
    );
  };

  const addFilesToUploadQueue = (files: File[]) => {
    const newItems: UploadQueueItem[] = files.map((f) => ({
      id: `up-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      file: { name: f.name, size: f.size, type: f.type },
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'queued',
      progress: 0,
      previewUrl: URL.createObjectURL(f)
    }));
    setUploadQueue((prev) => [...newItems, ...prev]);
  };

  const runAiOcrScan = async (queueItemId: string): Promise<LandRecord> => {
    setIsOcrProcessing(true);
    setUploadQueue((prev) =>
      prev.map((item) => (item.id === queueItemId ? { ...item, status: 'scanning', progress: 35 } : item))
    );

    // Simulated multi-stage OCR & NLP pipeline
    await new Promise((res) => setTimeout(res, 1200));
    setUploadQueue((prev) =>
      prev.map((item) => (item.id === queueItemId ? { ...item, progress: 75 } : item))
    );

    await new Promise((res) => setTimeout(res, 1000));

    const item = uploadQueue.find((i) => i.id === queueItemId);
    const newRecord: LandRecord = {
      id: `rec-scan-${Date.now()}`,
      documentNumber: `TN/MDU/MLR/2026/${Math.floor(10000 + Math.random() * 90000)}`,
      documentTitle: item?.file.name || 'Scanned Land Deed Extract',
      documentType: 'Patta Deed',
      scannedDocumentUrl: '/scanned_docs/sample_patta_tamil_nadu.svg',
      uploadDate: new Date().toISOString().split('T')[0],
      uploadedBy: 'Officer Ingest Pipeline',
      status: 'Needs Human Review',
      overallConfidence: 78.5,
      unresolvedUncertaintiesCount: 2,
      extractedData: {
        landownerName: 'V. S. Murugesan & Brothers',
        fatherHusbandName: 'Late Shanmugavel Nadar',
        surveyNumber: '194/3B',
        khasraNumber: '194/3',
        khataNumber: '6610',
        pattaNumber: 'TN-66102',
        plotAreaHectares: 2.45,
        plotAreaCents: 605.4,
        state: 'Tamil Nadu',
        district: 'Madurai',
        tehsilTaluk: 'Melur',
        village: 'Navinipatti',
        landClassification: 'Punja (Dryland)',
        ownershipType: 'Joint / Pattadar',
        mutationRecordId: `MUT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        registrationNumber: 'REG-2025/4418',
        registrationYear: 2025,
        boundaryNorth: 'Survey No 193 (Panchayat Pathway)',
        boundarySouth: 'Survey No 195/1 (Perumal Temple Trust)',
        boundaryEast: 'Karthik Raja Coconut Grove',
        boundaryWest: 'Drainage Channel'
      },
      boundingBoxes: [
        {
          id: `box-scan-1`,
          fieldKey: 'landownerName',
          label: 'Landowner Name',
          x: 18,
          y: 22,
          width: 32,
          height: 5,
          confidence: 91,
          level: 'high',
          primaryReading: 'V. S. Murugesan & Brothers',
          alternativeReadings: [{ text: 'V. S. Murugesan & Brothers', confidence: 91 }],
          isUncertain: false,
          status: 'ai_predicted'
        },
        {
          id: `box-scan-2`,
          fieldKey: 'surveyNumber',
          label: 'Survey Number',
          x: 62,
          y: 22,
          width: 22,
          height: 5.5,
          confidence: 64,
          level: 'low',
          primaryReading: '194/3B',
          alternativeReadings: [
            { text: '194/3B', confidence: 64 },
            { text: '194/38', confidence: 25 },
            { text: '194/8B', confidence: 11 }
          ],
          isUncertain: true,
          status: 'ai_uncertain',
          notes: "Digit '3' has broken loop stroke, potential '8'."
        }
      ],
      crossChecks: [
        {
          id: 'chk-new-1',
          title: 'Duplicate Parcel Validation',
          description: 'No duplicate deed found in Madurai registry.',
          status: 'passed',
          category: 'Duplicate Detection'
        },
        {
          id: 'chk-new-2',
          title: 'Uncertainty Flag',
          description: 'Survey Number 194/3B confidence is 64%. Needs visual confirmation.',
          status: 'warning',
          category: 'Format Compliance'
        }
      ],
      auditLogs: [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          officerId: 'SYS-AI',
          officerName: 'Sovereign Multilingual OCR',
          action: 'Extracted 12 structured land attributes with 2 flagged uncertainties.'
        }
      ],
      qrVerificationCode: `DILRMP-TN-MDU-${Date.now()}-V3`,
      gisPlotId: 'plot-mdu-142-7b',
      citizenAadhaarLast4: '6610',
      citizenMobile: '9876543210'
    };

    setUploadQueue((prev) =>
      prev.map((item) => (item.id === queueItemId ? { ...item, status: 'processed', progress: 100 } : item))
    );
    setRecords((prev) => [newRecord, ...prev]);
    setSelectedRecord(newRecord);
    setActiveBoundingBoxId('box-scan-2');
    setIsOcrProcessing(false);
    return newRecord;
  };

  const addGrievance = (grievanceData: Omit<GrievanceRecord, 'id' | 'grievanceNumber' | 'submittedDate' | 'status' | 'assignedOfficer'>) => {
    const newGrievance: GrievanceRecord = {
      ...grievanceData,
      id: `grv-${Date.now()}`,
      grievanceNumber: `GRV-TN-MDU-2026-${Math.floor(100 + Math.random() * 900)}`,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'Received',
      assignedOfficer: 'Revenue Inspector (Melur Circle)'
    };
    setGrievances((prev) => [newGrievance, ...prev]);

    // Push instant SMS notification
    const newNotif: UserNotification = {
      id: `notif-${Date.now()}`,
      title: 'Grievance Registered Successfully',
      message: `Your grievance ${newGrievance.grievanceNumber} regarding Survey ${newGrievance.surveyNumber} has been acknowledged.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sms',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addManigarRequest = (requestData: Omit<ManigarRequest, 'id' | 'requestNumber' | 'requestedDate' | 'status'>) => {
    const newRequest: ManigarRequest = {
      ...requestData,
      id: `mng-${Date.now()}`,
      requestNumber: `MNG-TN-MDU-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      requestedDate: new Date().toISOString().split('T')[0],
      status: 'Requested'
    };
    setManigarRequests((prev) => [newRequest, ...prev]);

    // Send SMS alert
    const newNotif: UserNotification = {
      id: `notif-${Date.now()}`,
      title: 'Manigar Allocation Request Submitted',
      message: `Your request ${newRequest.requestNumber} for physical land scaling and survey on Survey ${newRequest.surveyNumber} has been received.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sms',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const allocateManigarToRequest = (requestId: string, manigarName: string, manigarContact: string, scheduledDate: string) => {
    setManigarRequests((prev) =>
      prev.map((req) => {
        if (req.id !== requestId) return req;
        return {
          ...req,
          allocatedManigarName: manigarName,
          allocatedManigarContact: manigarContact,
          scheduledInspectionDate: scheduledDate,
          status: 'Inspection Scheduled' as ManigarStatus
        };
      })
    );

    const targetReq = manigarRequests.find((r) => r.id === requestId);
    if (targetReq) {
      const newNotif: UserNotification = {
        id: `notif-${Date.now()}`,
        title: 'Manigar Allocated & Inspection Scheduled',
        message: `Manigar ${manigarName} has been assigned to scale Survey ${targetReq.surveyNumber} on ${scheduledDate}. Contact: ${manigarContact}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'sms',
        read: false
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
  };

  const verifyLandSizeByManigar = (
    requestId: string,
    measuredArea: number,
    accuracyPercent: number,
    notes: string,
    officerName: string
  ) => {
    setManigarRequests((prev) =>
      prev.map((req) => {
        if (req.id !== requestId) return req;
        return {
          ...req,
          measuredAreaHectares: measuredArea,
          areaAccuracyPercentage: accuracyPercent,
          inspectionNotes: notes,
          verifiedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          verifiedByOfficer: officerName,
          status: 'Size Accuracy Verified' as ManigarStatus,
          accuracyToleranceStatus: 'Within Legal Tolerance (±0.5%)'
        };
      })
    );
  };

  return (
    <RecordsContext.Provider
      value={{
        records,
        selectedRecord,
        setSelectedRecord,
        activeBoundingBoxId,
        setActiveBoundingBoxId,
        updateFieldCorrection,
        acceptBoundingBox,
        rejectBoundingBox,
        approveRecord,
        rejectRecordForRescan,
        uploadQueue,
        addFilesToUploadQueue,
        runAiOcrScan,
        isOcrProcessing,
        grievances,
        addGrievance,
        notifications,
        markNotificationRead,
        manigarRequests,
        addManigarRequest,
        allocateManigarToRequest,
        verifyLandSizeByManigar
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
};

export const useRecords = () => {
  const context = useContext(RecordsContext);
  if (!context) {
    throw new Error('useRecords must be used within a RecordsProvider');
  }
  return context;
};
