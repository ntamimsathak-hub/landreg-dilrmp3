export interface GrievanceRecord {
  id: string;
  grievanceNumber: string;
  citizenName: string;
  citizenMobile: string;
  recordId?: string;
  surveyNumber: string;
  village: string;
  district: string;
  issueCategory: 'Spelling Error in Name / Father Name' | 'Area Discrepancy' | 'Incorrect Survey Boundary' | 'Missing Mutation Record' | 'Classification Error (Wet/Dry)' | 'Other Discrepancy';
  description: string;
  attachedFileUrl?: string;
  attachedFileName?: string;
  submittedDate: string;
  status: 'Received' | 'Under Investigation' | 'VAO Inspection' | 'Resolved' | 'Rejected';
  assignedOfficer: string;
  resolutionRemarks?: string;
  resolutionDate?: string;
}
