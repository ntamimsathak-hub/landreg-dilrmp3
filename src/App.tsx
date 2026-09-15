import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { GovHeader } from './components/common/GovHeader';
import { GovFooter } from './components/common/GovFooter';
import { LandingPage } from './components/home/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterModal } from './components/auth/RegisterModal';

// Citizen Components
import { CitizenLayout } from './components/layout/CitizenLayout';
import { CitizenHome } from './components/citizen/CitizenHome';
import { FindOldRecordsCitizen } from './components/citizen/FindOldRecordsCitizen';
import { MyRecords } from './components/citizen/MyRecords';
import { ManigarRequestView } from './components/citizen/ManigarRequestView';
import { PattaChittaView } from './components/citizen/PattaChittaView';
import { ValidationStatusTracker } from './components/citizen/ValidationStatusTracker';
import { GrievanceForm } from './components/citizen/GrievanceForm';
import { NotificationCenter } from './components/citizen/NotificationCenter';

// Department Officer Components
import { OfficerLayout } from './components/layout/OfficerLayout';
import { OfficerHome } from './components/department/OfficerHome';
import { ValidationWorkspace } from './components/department/ValidationWorkspace';
import { ManigarInspectionView } from './components/department/ManigarInspectionView';
import { DocumentUploadQueue } from './components/department/DocumentUploadQueue';
import { AiOcrScanModule } from './components/department/AiOcrScanModule';
import { AdvancedSearchDept } from './components/department/AdvancedSearchDept';
import { GisMapView } from './components/department/GisMapView';
import { ReportsAnalytics } from './components/department/ReportsAnalytics';
import { DocumentRepository } from './components/department/DocumentRepository';
import { RbacAdminSettings } from './components/department/RbacAdminSettings';
import { ApiIntegrationStatus } from './components/department/ApiIntegrationStatus';

export const App: React.FC = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <GovHeader onOpenRegisterModal={() => setIsRegisterOpen(true)} />
      <div className="flex-1 flex flex-col">
        <Routes>
          <Route
            path="/"
            element={<LandingPage onOpenRegisterModal={() => setIsRegisterOpen(true)} />}
          />
          <Route path="/login" element={<LoginPage />} />

          {/* Citizen Portal Routes */}
          <Route path="/citizen" element={<CitizenLayout />}>
            <Route index element={<CitizenHome />} />
            <Route path="find-old-records" element={<FindOldRecordsCitizen />} />
            <Route path="my-records" element={<MyRecords />} />
            <Route path="manigar" element={<ManigarRequestView />} />
            <Route path="patta-chitta" element={<PattaChittaView />} />
            <Route path="status-tracker" element={<ValidationStatusTracker />} />
            <Route path="grievance" element={<GrievanceForm />} />
            <Route path="notifications" element={<NotificationCenter />} />
          </Route>

          {/* Department Officer Portal Routes */}
          <Route path="/officer" element={<OfficerLayout />}>
            <Route index element={<OfficerHome />} />
            <Route path="validation-workspace" element={<ValidationWorkspace />} />
            <Route path="manigar" element={<ManigarInspectionView />} />
            <Route path="upload" element={<DocumentUploadQueue />} />
            <Route path="ai-ocr" element={<AiOcrScanModule />} />
            <Route path="advanced-search" element={<AdvancedSearchDept />} />
            <Route path="gis-map" element={<GisMapView />} />
            <Route path="reports" element={<ReportsAnalytics />} />
            <Route path="repository" element={<DocumentRepository />} />
            <Route path="rbac" element={<RbacAdminSettings />} />
            <Route path="api-integrations" element={<ApiIntegrationStatus />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <GovFooter />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={() => navigate('/citizen')}
      />
    </div>
  );
};

export default App;
