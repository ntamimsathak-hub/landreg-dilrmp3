export interface CadastralPlot {
  id: string;
  surveyNumber: string;
  subdivisionNumber: string;
  khasraNumber: string;
  ownerName: string;
  village: string;
  district: string;
  state: string;
  areaAcres: number;
  landType: string;
  lat: number;
  lng: number;
  polygonCoordinates: [number, number][]; // Lat, Lng pairs
  status: 'Verified' | 'Pending Dispute' | 'Government Land' | 'Under Mutation';
  lastSurveyDate: string;
  surveyorId: string;
}

export interface GisFilterOptions {
  state: string;
  district: string;
  tehsil: string;
  village: string;
  surveyNumber?: string;
  layerType: 'cadastral_2d' | 'satellite' | 'hybrid' | 'topographic';
}
