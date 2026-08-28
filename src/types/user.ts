export type UserRole = 'citizen' | 'officer' | 'admin';

export interface CitizenProfile {
  id: string;
  name: string;
  mobile: string;
  aadhaarLast4: string;
  address: string;
  state: string;
  district: string;
  tehsil: string;
  village: string;
  pincode: string;
  registeredAt: string;
}

export interface OfficerProfile {
  id: string;
  employeeId: string;
  name: string;
  designation: string; // e.g. "Tahsildar", "Revenue Divisional Officer (RDO)", "Village Administrative Officer (VAO)", "Surveyor"
  department: string; // e.g. "Revenue & Disaster Management", "Survey and Land Records"
  mobile: string;
  state: string;
  district: string;
  tehsilTaluk: string;
  jurisdictionVillages: string[];
  role: UserRole;
  badgeLevel: 'Junior Inspector' | 'Senior Revenue Officer' | 'Tehsildar / Registrar' | 'District Admin';
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'sms' | 'email' | 'system';
  read: boolean;
  linkedRecordId?: string;
}
