import { CadastralPlot } from '../types/gis';

export const mockCadastralPlots: CadastralPlot[] = [
  {
    id: 'plot-mdu-142-7a',
    surveyNumber: '142',
    subdivisionNumber: '7A',
    khasraNumber: '142/7',
    ownerName: 'K. R. Sundaralingam',
    village: 'Navinipatti',
    district: 'Madurai',
    state: 'Tamil Nadu',
    areaAcres: 4.54,
    landType: 'Nanja (Wetland / Irrigated)',
    lat: 10.0245,
    lng: 78.3382,
    polygonCoordinates: [
      [10.0238, 78.3370],
      [10.0255, 78.3372],
      [10.0258, 78.3395],
      [10.0240, 78.3392]
    ],
    status: 'Verified',
    lastSurveyDate: '2025-09-14',
    surveyorId: 'SURV-TN-881'
  },
  {
    id: 'plot-mdu-142-7b',
    surveyNumber: '142',
    subdivisionNumber: '7B',
    khasraNumber: '142/7',
    ownerName: 'M. Muthiah',
    village: 'Navinipatti',
    district: 'Madurai',
    state: 'Tamil Nadu',
    areaAcres: 2.38,
    landType: 'Nanja (Wetland)',
    lat: 10.0232,
    lng: 78.3385,
    polygonCoordinates: [
      [10.0225, 78.3372],
      [10.0238, 78.3370],
      [10.0240, 78.3392],
      [10.0228, 78.3396]
    ],
    status: 'Verified',
    lastSurveyDate: '2025-09-14',
    surveyorId: 'SURV-TN-881'
  },
  {
    id: 'plot-mdu-141-govt',
    surveyNumber: '141',
    subdivisionNumber: '1',
    khasraNumber: '141',
    ownerName: 'Government of Tamil Nadu (Panchayat Channel)',
    village: 'Navinipatti',
    district: 'Madurai',
    state: 'Tamil Nadu',
    areaAcres: 1.15,
    landType: 'Government Poramboke / Waterway',
    lat: 10.0262,
    lng: 78.3380,
    polygonCoordinates: [
      [10.0255, 78.3372],
      [10.0270, 78.3374],
      [10.0272, 78.3398],
      [10.0258, 78.3395]
    ],
    status: 'Government Land',
    lastSurveyDate: '2024-03-20',
    surveyorId: 'SURV-TN-002'
  },
  {
    id: 'plot-up-219-3',
    surveyNumber: '219',
    subdivisionNumber: '3 Ga',
    khasraNumber: '219/3 Ga',
    ownerName: 'Ramprasad Tiwari & Shivram Tiwari',
    village: 'Bhaisamau',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    areaAcres: 5.31,
    landType: 'Agricultural (Chakland)',
    lat: 27.0250,
    lng: 80.9150,
    polygonCoordinates: [
      [27.0240, 80.9140],
      [27.0265, 80.9142],
      [27.0268, 80.9165],
      [27.0242, 80.9162]
    ],
    status: 'Verified',
    lastSurveyDate: '2025-10-10',
    surveyorId: 'SURV-UP-112'
  }
];
