import { GrievanceRecord } from '../types/grievance';
import { UserNotification } from '../types/user';

export const mockGrievances: GrievanceRecord[] = [
  {
    id: 'grv-2026-101',
    grievanceNumber: 'GRV-TN-MDU-2026-081',
    citizenName: 'K. R. Sundaralingam',
    citizenMobile: '9876543210',
    recordId: 'rec-tn-2026-001',
    surveyNumber: '142/7A',
    village: 'Navinipatti',
    district: 'Madurai',
    issueCategory: 'Spelling Error in Name / Father Name',
    description: 'Father name listed as Ramasamy Thevar; should reflect latest family partition deed mutation.',
    submittedDate: '2026-08-22',
    status: 'VAO Inspection',
    assignedOfficer: 'S. Shanmugam (VAO Navinipatti)',
    resolutionRemarks: 'Field inquiry scheduled with VAO for physical patta book verification.'
  },
  {
    id: 'grv-2026-102',
    grievanceNumber: 'GRV-TN-MDU-2026-044',
    citizenName: 'A. Thangavel',
    citizenMobile: '9876543210',
    surveyNumber: '140/3',
    village: 'Navinipatti',
    district: 'Madurai',
    issueCategory: 'Missing Mutation Record',
    description: 'Inheritance mutation completed in 2024 not reflecting on digital portal.',
    submittedDate: '2026-08-10',
    status: 'Resolved',
    assignedOfficer: 'V. Meenakshi Sundaram (Tahsildar)',
    resolutionRemarks: 'Mutation entry MUT-2024-811 merged with digital ledger. Patta certificate regenerated.',
    resolutionDate: '2026-08-15'
  }
];

export const mockNotifications: UserNotification[] = [
  {
    id: 'notif-1',
    title: 'AI Verification Status Update',
    message: 'Your land record for Survey 142/7A (Navinipatti) is currently under AI OCR validation with Department Officer.',
    timestamp: '2026-08-27 15:30',
    type: 'sms',
    read: false,
    linkedRecordId: 'rec-tn-2026-001'
  },
  {
    id: 'notif-2',
    title: 'Grievance Assigned to VAO',
    message: 'Grievance GRV-TN-MDU-2026-081 has been forwarded to Village Administrative Officer for field verification.',
    timestamp: '2026-08-25 11:20',
    type: 'system',
    read: true
  },
  {
    id: 'notif-3',
    title: 'Digital Patta Ready for Download',
    message: 'Official QR-certified digital Patta deed TN-88421 is now available for download and printing.',
    timestamp: '2026-08-20 09:00',
    type: 'email',
    read: true,
    linkedRecordId: 'rec-tn-2026-001'
  }
];

export const mockAnalyticsData = {
  totalRecordsProcessed: 148920,
  averageAccuracyRate: 98.4,
  pendingHumanReviewCases: 42,
  digitizationCompletionPercent: 94.6,
  stateProgress: [
    { state: 'Tamil Nadu', totalVillages: 16500, digitizedVillages: 15980, percentage: 96.8 },
    { state: 'Uttar Pradesh', totalVillages: 107000, digitizedVillages: 101200, percentage: 94.5 },
    { state: 'Maharashtra', totalVillages: 44000, digitizedVillages: 41800, percentage: 95.0 },
    { state: 'Karnataka', totalVillages: 29000, digitizedVillages: 27900, percentage: 96.2 },
    { state: 'Madhya Pradesh', totalVillages: 55000, digitizedVillages: 49500, percentage: 90.0 }
  ],
  accuracyTrendMonthly: [
    { month: 'Apr 2026', rawOcrAccuracy: 88.2, postValidationAccuracy: 96.1, officerCorrections: 1420 },
    { month: 'May 2026', rawOcrAccuracy: 90.5, postValidationAccuracy: 97.4, officerCorrections: 1150 },
    { month: 'Jun 2026', rawOcrAccuracy: 92.8, postValidationAccuracy: 98.2, officerCorrections: 890 },
    { month: 'Jul 2026', rawOcrAccuracy: 94.6, postValidationAccuracy: 98.8, officerCorrections: 620 },
    { month: 'Aug 2026', rawOcrAccuracy: 96.2, postValidationAccuracy: 99.4, officerCorrections: 340 }
  ],
  errorCategoryBreakdown: [
    { category: 'Handwritten Digit Ambiguity (e.g. 7 vs 1)', count: 48, percentage: 38 },
    { category: 'Faded Ink / Archival Degradation', count: 32, percentage: 25 },
    { category: 'Modi / Archaic Script Translation', count: 24, percentage: 19 },
    { category: 'Seal / Stamp Overlap', count: 15, percentage: 12 },
    { category: 'Boundary Text Multi-column Confusion', count: 8, percentage: 6 }
  ]
};
