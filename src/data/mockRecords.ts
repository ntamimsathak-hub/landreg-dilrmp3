import { LandRecord } from '../types/landRecord';

export const mockLandRecords: LandRecord[] = [
  {
    id: 'rec-tn-2026-001',
    documentNumber: 'TN/MDU/MLR/2026/88421',
    documentTitle: 'Revenue Settlement Deed & Chitta Extract (Form 10)',
    documentType: 'Patta Deed',
    scannedDocumentUrl: '/scanned_docs/sample_patta_tamil_nadu.svg',
    uploadDate: '2026-08-20',
    uploadedBy: 'V. Meenakshi Sundaram (Tahsildar)',
    status: 'Needs Human Review',
    overallConfidence: 76.4,
    unresolvedUncertaintiesCount: 3,
    extractedData: {
      landownerName: 'K. R. Sundaralingam',
      fatherHusbandName: 'Ramasamy Thevar',
      surveyNumber: '142/7A',
      khasraNumber: '142/7',
      khataNumber: '8842',
      pattaNumber: 'TN-88421',
      plotAreaHectares: 1.84,
      plotAreaCents: 454.6,
      state: 'Tamil Nadu',
      district: 'Madurai',
      tehsilTaluk: 'Melur',
      village: 'Navinipatti',
      landClassification: 'Nanja (Wetland)',
      ownershipType: 'Single Owner',
      mutationRecordId: 'MUT-2026-9012',
      registrationNumber: 'DOC-8821/2025',
      registrationYear: 2025,
      boundaryNorth: 'Survey No 141 (Panchayat Channel Road)',
      boundarySouth: 'Survey No 143/2 (M. Muthiah Land)',
      boundaryEast: 'Irrigation Canal (Periyar Branch)',
      boundaryWest: 'Survey No 142/6 (Govt Poramboke)'
    },
    boundingBoxes: [
      {
        id: 'box-1',
        fieldKey: 'landownerName',
        label: 'Landowner Name',
        x: 18,
        y: 22,
        width: 32,
        height: 5,
        confidence: 94,
        level: 'high',
        primaryReading: 'K. R. Sundaralingam',
        alternativeReadings: [
          { text: 'K. R. Sundaralingam', confidence: 94 },
          { text: 'K. R. Sundararajan', confidence: 5 }
        ],
        isUncertain: false,
        status: 'ai_predicted'
      },
      {
        id: 'box-2',
        fieldKey: 'fatherHusbandName',
        label: 'Father / Husband Name',
        x: 18,
        y: 28,
        width: 28,
        height: 4.8,
        confidence: 91,
        level: 'high',
        primaryReading: 'Ramasamy Thevar',
        alternativeReadings: [
          { text: 'Ramasamy Thevar', confidence: 91 },
          { text: 'Ramasamy Servai', confidence: 8 }
        ],
        isUncertain: false,
        status: 'ai_predicted'
      },
      {
        id: 'box-3',
        fieldKey: 'surveyNumber',
        label: 'Survey Number & Subdivision',
        x: 62,
        y: 22,
        width: 22,
        height: 5.5,
        confidence: 62,
        level: 'low',
        primaryReading: '142/7A',
        alternativeReadings: [
          { text: '142/7A', confidence: 62 },
          { text: '142/1A', confidence: 26 },
          { text: '142/9A', confidence: 11 }
        ],
        isUncertain: true,
        status: 'ai_uncertain',
        notes: "Handwriting stroke over '7' resembles '1' or '9'. Sub-Registrar index shows 142/7A."
      },
      {
        id: 'box-4',
        fieldKey: 'plotAreaHectares',
        label: 'Plot Area (Hectares)',
        x: 62,
        y: 35,
        width: 20,
        height: 4.8,
        confidence: 68,
        level: 'low',
        primaryReading: '1.84',
        alternativeReadings: [
          { text: '1.84', confidence: 68 },
          { text: '1.34', confidence: 21 },
          { text: '1.89', confidence: 9 }
        ],
        isUncertain: true,
        status: 'ai_uncertain',
        notes: "Slight ink blot on decimal digit '8'."
      },
      {
        id: 'box-5',
        fieldKey: 'landClassification',
        label: 'Land Classification',
        x: 18,
        y: 42,
        width: 26,
        height: 4.5,
        confidence: 96,
        level: 'high',
        primaryReading: 'Nanja (Wetland)',
        alternativeReadings: [
          { text: 'Nanja (Wetland)', confidence: 96 },
          { text: 'Punja (Dryland)', confidence: 3 }
        ],
        isUncertain: false,
        status: 'ai_predicted'
      },
      {
        id: 'box-6',
        fieldKey: 'pattaNumber',
        label: 'Patta Number',
        x: 62,
        y: 15,
        width: 22,
        height: 4.8,
        confidence: 72,
        level: 'medium',
        primaryReading: 'TN-88421',
        alternativeReadings: [
          { text: 'TN-88421', confidence: 72 },
          { text: 'TN-83421', confidence: 20 },
          { text: 'TN-88427', confidence: 7 }
        ],
        isUncertain: true,
        status: 'ai_uncertain',
        notes: "Third digit '8' smudged in seal margin."
      },
      {
        id: 'box-7',
        fieldKey: 'mutationRecordId',
        label: 'Mutation Sanction Order ID',
        x: 18,
        y: 56,
        width: 28,
        height: 4.5,
        confidence: 92,
        level: 'high',
        primaryReading: 'MUT-2026-9012',
        alternativeReadings: [
          { text: 'MUT-2026-9012', confidence: 92 }
        ],
        isUncertain: false,
        status: 'ai_predicted'
      }
    ],
    crossChecks: [
      {
        id: 'chk-1',
        title: 'Duplicate Parcel Detection',
        description: 'Checked against 1,280,000 digitized records in Madurai district.',
        status: 'passed',
        category: 'Duplicate Detection'
      },
      {
        id: 'chk-2',
        title: 'Cadastral Area Mathematical Balance',
        description: 'Sum of sub-divisions (142/7A: 1.84 Ha + 142/7B: 0.96 Ha) equals parent survey parcel 142/7 (2.80 Ha).',
        status: 'passed',
        category: 'Area Mathematical Rule'
      },
      {
        id: 'chk-3',
        title: 'LRMS & Sub-Registrar Database Cross-Check',
        description: 'Survey 142/7A matches Registration Department Deed No 8821/2025. Registered owner name matches Aadhaar linkage.',
        status: 'passed',
        category: 'LRMS Database Match'
      },
      {
        id: 'chk-4',
        title: 'Field OCR Confidence Warning',
        description: "Survey Number '142/7A' and Plot Area '1.84' require manual verification prior to state ledger committing.",
        status: 'warning',
        suggestedCorrection: "Verify visual highlight box 3 and 4 with optical zoom.",
        category: 'Format Compliance'
      }
    ],
    auditLogs: [
      {
        id: 'log-1',
        timestamp: '2026-08-20 10:14:22',
        officerId: 'SYS-AI-CORE',
        officerName: 'LandReg Sovereign AI OCR v3.4',
        action: 'Ingested document scanned at 600 DPI, executed De-skew, Binarization, and Multilingual Devanagari/Tamil OCR extraction.'
      },
      {
        id: 'log-2',
        timestamp: '2026-08-20 10:14:25',
        officerId: 'SYS-AI-RULES',
        officerName: 'DILRMP Cross-Check Validator Engine',
        action: 'Flagged 3 low-confidence bounding boxes for Officer Review. Generated validation report.'
      }
    ],
    qrVerificationCode: 'DILRMP-TN-MDU-88421-V3-VERIFIED-2026',
    gisPlotId: 'plot-mdu-142-7a',
    citizenAadhaarLast4: '8842',
    citizenMobile: '9876543210'
  },
  {
    id: 'rec-up-2026-002',
    documentNumber: 'UP/LKO/BKT/2026/10492',
    documentTitle: 'Khatauni / Khasra Shajra Extract (Form 4)',
    documentType: 'Khasra / Khatauni',
    scannedDocumentUrl: '/scanned_docs/sample_khasra_uttar_pradesh.svg',
    uploadDate: '2026-08-18',
    uploadedBy: 'Rajeshwar Nath Pandey (Tehsildar)',
    status: 'Verified',
    overallConfidence: 97.2,
    unresolvedUncertaintiesCount: 0,
    extractedData: {
      landownerName: 'Ramprasad Tiwari & Shivram Tiwari (Joint)',
      fatherHusbandName: 'Late Pt. Harishankar Tiwari',
      surveyNumber: '219/3',
      khasraNumber: '219/3 Ga',
      khataNumber: '00412',
      pattaNumber: 'UP-LKO-4129',
      plotAreaHectares: 2.15,
      plotAreaCents: 531.2,
      state: 'Uttar Pradesh',
      district: 'Lucknow',
      tehsilTaluk: 'Bakshi Ka Talab',
      village: 'Bhaisamau',
      landClassification: 'Agricultural',
      ownershipType: 'Joint / Pattadar',
      mutationRecordId: 'MUT-UP-2025-4410',
      registrationNumber: 'REG-UP-9931/2024',
      registrationYear: 2024,
      boundaryNorth: 'Rasta Khadanja (Panchayat Road)',
      boundarySouth: 'Khasra 220 (Kishore Kumar Land)',
      boundaryEast: 'Khasra 219/4 (Pramod Shukla)',
      boundaryWest: 'Chak Road & Canal'
    },
    boundingBoxes: [
      {
        id: 'box-up-1',
        fieldKey: 'landownerName',
        label: 'Khatedar / Landowner Name',
        x: 20,
        y: 20,
        width: 35,
        height: 5,
        confidence: 98,
        level: 'high',
        primaryReading: 'Ramprasad Tiwari & Shivram Tiwari',
        alternativeReadings: [{ text: 'Ramprasad Tiwari & Shivram Tiwari', confidence: 98 }],
        isUncertain: false,
        status: 'manually_verified'
      },
      {
        id: 'box-up-2',
        fieldKey: 'khasraNumber',
        label: 'Khasra / Gata Number',
        x: 60,
        y: 20,
        width: 25,
        height: 5,
        confidence: 96,
        level: 'high',
        primaryReading: '219/3 Ga',
        alternativeReadings: [{ text: '219/3 Ga', confidence: 96 }],
        isUncertain: false,
        status: 'manually_verified'
      }
    ],
    crossChecks: [
      {
        id: 'chk-up-1',
        title: 'Bhulekh UP Sync Check',
        description: 'Matched 100% with UP Bhulekh Central Database record Khatauni 00412.',
        status: 'passed',
        category: 'LRMS Database Match'
      },
      {
        id: 'chk-up-2',
        title: 'No Land Ceiling Encroachment',
        description: 'Parcel area is compliant with UP Zamindari Abolition & Land Reforms Act.',
        status: 'passed',
        category: 'Format Compliance'
      }
    ],
    auditLogs: [
      {
        id: 'log-up-1',
        timestamp: '2026-08-18 14:10:00',
        officerId: 'OFF-UP-4401',
        officerName: 'Rajeshwar Nath Pandey',
        action: 'Reviewed all AI fields, verified Khatauni seal, approved and stamped for DILRMP 3.0 digital ledger.'
      }
    ],
    qrVerificationCode: 'DILRMP-UP-LKO-10492-V3-VERIFIED-2026',
    gisPlotId: 'plot-up-219-3',
    citizenAadhaarLast4: '4129',
    citizenMobile: '9450011223'
  },
  {
    id: 'rec-mh-2026-003',
    documentNumber: 'MH/PUN/HAV/2026/33910',
    documentTitle: '7/12 Extract (Satbara) & Ferfar Register',
    documentType: 'Settlement Register (A-Register)',
    scannedDocumentUrl: '/scanned_docs/sample_712_maharashtra.svg',
    uploadDate: '2026-08-25',
    uploadedBy: 'Anjali Deshmukh (Circle Officer)',
    status: 'Under AI Review',
    overallConfidence: 81.0,
    unresolvedUncertaintiesCount: 1,
    extractedData: {
      landownerName: 'Dattatray Yashwant Patil',
      fatherHusbandName: 'Yashwant Tukaram Patil',
      surveyNumber: '88/2B',
      khasraNumber: 'Gat No 88/2',
      khataNumber: '3391',
      pattaNumber: 'MH-PUN-882B',
      plotAreaHectares: 3.12,
      plotAreaCents: 770.9,
      state: 'Maharashtra',
      district: 'Pune',
      tehsilTaluk: 'Haveli',
      village: 'Wagholi',
      landClassification: 'Commercial',
      ownershipType: 'Single Owner',
      mutationRecordId: 'FERFAR-2026-118',
      registrationNumber: 'PUN-HAV-2025/1109',
      registrationYear: 2025,
      boundaryNorth: 'Pune-Nagar Highway Buffer',
      boundarySouth: 'Gat No 89 (S. K. Kadam)',
      boundaryEast: 'Internal Access Road 12m',
      boundaryWest: 'Gat No 88/1 (K. Patil)'
    },
    boundingBoxes: [
      {
        id: 'box-mh-1',
        fieldKey: 'landownerName',
        label: 'Bhogwatdar / Landowner',
        x: 20,
        y: 24,
        width: 30,
        height: 5,
        confidence: 89,
        level: 'medium',
        primaryReading: 'Dattatray Yashwant Patil',
        alternativeReadings: [
          { text: 'Dattatray Yashwant Patil', confidence: 89 },
          { text: 'Dattatray Vasant Patil', confidence: 9 }
        ],
        isUncertain: false,
        status: 'ai_predicted'
      },
      {
        id: 'box-mh-2',
        fieldKey: 'surveyNumber',
        label: 'Gat / Survey Number',
        x: 62,
        y: 24,
        width: 22,
        height: 5,
        confidence: 65,
        level: 'low',
        primaryReading: '88/2B',
        alternativeReadings: [
          { text: '88/2B', confidence: 65 },
          { text: '88/2D', confidence: 24 },
          { text: '88/28', confidence: 10 }
        ],
        isUncertain: true,
        status: 'ai_uncertain',
        notes: "Suffix 'B' written in Modi-script influenced Marathi calligraphy."
      }
    ],
    crossChecks: [
      {
        id: 'chk-mh-1',
        title: 'MahaBhulekh Ferfar Cross Check',
        description: 'Mutation entry No 118 pending final approval stamp from Tahsildar Haveli.',
        status: 'warning',
        suggestedCorrection: 'Verify Ferfar entry date with sub-registrar ledger.',
        category: 'Sub-Registrar Cross-Check'
      }
    ],
    auditLogs: [
      {
        id: 'log-mh-1',
        timestamp: '2026-08-25 09:30:10',
        officerId: 'SYS-AI-CORE',
        officerName: 'LandReg AI OCR Engine',
        action: 'Processed scanned 7/12 document, detected Marathi script + English numeric tables.'
      }
    ],
    qrVerificationCode: 'DILRMP-MH-PUN-33910-V3-PENDING-2026',
    gisPlotId: 'plot-mh-88-2b',
    citizenAadhaarLast4: '3391',
    citizenMobile: '9822098220'
  }
];
