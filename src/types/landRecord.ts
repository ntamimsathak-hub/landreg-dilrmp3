export type RecordStatus = 'Verified' | 'Pending' | 'Rejected' | 'Under AI Review' | 'Needs Human Review';
export type FieldConfidenceLevel = 'high' | 'medium' | 'low';
export type FieldValidationStatus = 'ai_predicted' | 'ai_uncertain' | 'manually_verified' | 'rejected';

export interface BoundingBox {
  id: string;
  fieldKey: string;
  label: string;
  x: number; // percentage from left
  y: number; // percentage from top
  width: number; // percentage
  height: number; // percentage
  confidence: number; // 0 to 100
  level: FieldConfidenceLevel;
  primaryReading: string;
  alternativeReadings: { text: string; confidence: number }[];
  isUncertain: boolean;
  status: FieldValidationStatus;
  userCorrection?: string;
  notes?: string;
}

export interface ExtractedLandData {
  landownerName: string;
  fatherHusbandName: string;
  surveyNumber: string;
  khasraNumber: string;
  khataNumber: string;
  pattaNumber: string;
  plotAreaHectares: number;
  plotAreaCents: number;
  state: string;
  district: string;
  tehsilTaluk: string;
  village: string;
  landClassification: 'Punja (Dryland)' | 'Nanja (Wetland)' | 'Agricultural' | 'Commercial' | 'Residential' | 'Government Poramboke';
  ownershipType: 'Single Owner' | 'Joint / Pattadar' | 'Ancestral Coparcenary' | 'Trust / Institutional';
  mutationRecordId: string;
  registrationNumber: string;
  registrationYear: number;
  boundaryNorth: string;
  boundarySouth: string;
  boundaryEast: string;
  boundaryWest: string;
}

export interface AutomatedCrossCheck {
  id: string;
  title: string;
  description: string;
  status: 'passed' | 'warning' | 'failed';
  suggestedCorrection?: string;
  category: 'Duplicate Detection' | 'Area Mathematical Rule' | 'Format Compliance' | 'LRMS Database Match' | 'Sub-Registrar Cross-Check';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  officerId: string;
  officerName: string;
  action: string;
  fieldChanged?: string;
  oldValue?: string;
  newValue?: string;
  ipAddress?: string;
}

export interface LandRecord {
  id: string;
  documentNumber: string;
  documentTitle: string;
  documentType: 'Khasra / Khatauni' | 'Patta Deed' | 'Sale Deed' | 'Settlement Register (A-Register)' | 'Mutation Sanction Order';
  scannedDocumentUrl: string; // High res mock scanned document or SVG template
  uploadDate: string;
  uploadedBy: string;
  status: RecordStatus;
  overallConfidence: number;
  unresolvedUncertaintiesCount: number;
  extractedData: ExtractedLandData;
  boundingBoxes: BoundingBox[];
  crossChecks: AutomatedCrossCheck[];
  auditLogs: AuditLogEntry[];
  qrVerificationCode: string;
  gisPlotId?: string;
  citizenAadhaarLast4?: string;
  citizenMobile?: string;
}

export interface ValidationTimelineStep {
  step: number;
  title: string;
  description: string;
  timestamp?: string;
  status: 'completed' | 'current' | 'upcoming' | 'rejected';
  officerName?: string;
  estimatedTime?: string;
}
