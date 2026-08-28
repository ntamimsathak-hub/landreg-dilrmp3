export type ManigarStatus = 
  | 'Requested' 
  | 'Manigar Allocated' 
  | 'Inspection Scheduled' 
  | 'Field Measurement Completed' 
  | 'Size Accuracy Verified' 
  | 'Discrepancy Flagged' 
  | 'Rejected';

export interface ManigarRequest {
  id: string;
  requestNumber: string;
  citizenId: string;
  citizenName: string;
  citizenMobile: string;
  surveyNumber: string;
  khasraNumber: string;
  village: string;
  district: string;
  state: string;
  deedAreaHectares: number;
  measuredAreaHectares?: number;
  areaAccuracyPercentage?: number;
  requestedDate: string;
  scheduledInspectionDate?: string;
  allocatedManigarName?: string;
  allocatedManigarId?: string;
  allocatedManigarContact?: string;
  status: ManigarStatus;
  inspectionNotes?: string;
  verifiedAt?: string;
  verifiedByOfficer?: string;
  gpsCoordinates?: {
    northWest: string;
    northEast: string;
    southEast: string;
    southWest: string;
  };
  surveyToolUsed?: 'DGPS (Differential GPS)' | 'Electronic Total Station (ETS)' | 'Drone LiDAR' | 'Traditional Chain & Compass';
  accuracyToleranceStatus?: 'Within Legal Tolerance (±0.5%)' | 'Discrepancy Exceeds Tolerance' | 'Pending Measurement';
}
