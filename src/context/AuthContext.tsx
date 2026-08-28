import React, { createContext, useContext, useState, useEffect } from 'react';
import { CitizenProfile, OfficerProfile, UserRole } from '../types/user';

interface AuthContextType {
  role: UserRole | null;
  citizen: CitizenProfile | null;
  officer: OfficerProfile | null;
  isAuthenticated: boolean;
  loginCitizen: (mobile: string, otp: string) => Promise<boolean>;
  loginOfficer: (employeeId: string, mobile: string, otp: string, jurisdiction: { state: string; district: string; tehsil: string }) => Promise<boolean>;
  registerCitizen: (data: Omit<CitizenProfile, 'id' | 'registeredAt'>) => Promise<boolean>;
  logout: () => void;
  quickLoginCitizen: () => void;
  quickLoginOfficer: () => void;
}

const defaultCitizen: CitizenProfile = {
  id: 'cit-9842',
  name: 'K. R. Sundaralingam / கே. ஆர். சுந்தரலிங்கம்',
  mobile: '9876543210',
  aadhaarLast4: '8842',
  address: 'No. 14, North Car Street, Melur Village',
  state: 'Tamil Nadu',
  district: 'Madurai',
  tehsil: 'Melur',
  village: 'Navinipatti',
  pincode: '625106',
  registeredAt: '2025-11-12'
};

const defaultOfficer: OfficerProfile = {
  id: 'off-771',
  employeeId: 'TN-REV-8402',
  name: 'V. Meenakshi Sundaram',
  designation: 'Tahsildar & Sub-Registrar',
  department: 'Department of Revenue and Land Administration',
  mobile: '9443322110',
  state: 'Tamil Nadu',
  district: 'Madurai',
  tehsilTaluk: 'Melur',
  jurisdictionVillages: ['Navinipatti', 'Melur Town', 'Kottampatti', 'Attapatti'],
  role: 'officer',
  badgeLevel: 'Tehsildar / Registrar'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole | null>(() => {
    return (localStorage.getItem('landreg_role') as UserRole) || null;
  });

  const [citizen, setCitizen] = useState<CitizenProfile | null>(() => {
    const saved = localStorage.getItem('landreg_citizen');
    return saved ? JSON.parse(saved) : null;
  });

  const [officer, setOfficer] = useState<OfficerProfile | null>(() => {
    const saved = localStorage.getItem('landreg_officer');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (role) {
      localStorage.setItem('landreg_role', role);
    } else {
      localStorage.removeItem('landreg_role');
    }
  }, [role]);

  const loginCitizen = async (mobile: string, otp: string): Promise<boolean> => {
    // Simulated OTP verification
    if (otp === '123456' || otp.length === 6) {
      const activeCitizen: CitizenProfile = {
        ...defaultCitizen,
        mobile: mobile || defaultCitizen.mobile
      };
      setCitizen(activeCitizen);
      setRole('citizen');
      localStorage.setItem('landreg_citizen', JSON.stringify(activeCitizen));
      return true;
    }
    return false;
  };

  const loginOfficer = async (
    employeeId: string,
    mobile: string,
    otp: string,
    jurisdiction: { state: string; district: string; tehsil: string }
  ): Promise<boolean> => {
    if (otp === '123456' || otp.length === 6) {
      const activeOfficer: OfficerProfile = {
        ...defaultOfficer,
        employeeId: employeeId || defaultOfficer.employeeId,
        mobile: mobile || defaultOfficer.mobile,
        state: jurisdiction.state || defaultOfficer.state,
        district: jurisdiction.district || defaultOfficer.district,
        tehsilTaluk: jurisdiction.tehsil || defaultOfficer.tehsilTaluk
      };
      setOfficer(activeOfficer);
      setRole('officer');
      localStorage.setItem('landreg_officer', JSON.stringify(activeOfficer));
      return true;
    }
    return false;
  };

  const registerCitizen = async (data: Omit<CitizenProfile, 'id' | 'registeredAt'>): Promise<boolean> => {
    const newCit: CitizenProfile = {
      ...data,
      id: `cit-${Math.floor(1000 + Math.random() * 9000)}`,
      registeredAt: new Date().toISOString().split('T')[0]
    };
    setCitizen(newCit);
    setRole('citizen');
    localStorage.setItem('landreg_citizen', JSON.stringify(newCit));
    return true;
  };

  const logout = () => {
    setRole(null);
    setCitizen(null);
    setOfficer(null);
    localStorage.removeItem('landreg_role');
    localStorage.removeItem('landreg_citizen');
    localStorage.removeItem('landreg_officer');
  };

  const quickLoginCitizen = () => {
    setCitizen(defaultCitizen);
    setRole('citizen');
    localStorage.setItem('landreg_citizen', JSON.stringify(defaultCitizen));
  };

  const quickLoginOfficer = () => {
    setOfficer(defaultOfficer);
    setRole('officer');
    localStorage.setItem('landreg_officer', JSON.stringify(defaultOfficer));
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        citizen,
        officer,
        isAuthenticated: !!role,
        loginCitizen,
        loginOfficer,
        registerCitizen,
        logout,
        quickLoginCitizen,
        quickLoginOfficer
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
