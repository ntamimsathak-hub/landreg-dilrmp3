import React from 'react';
import { Outlet } from 'react-router-dom';
import { CitizenSidebar } from '../citizen/CitizenSidebar';

export const CitizenLayout: React.FC = () => {
  return (
    <div className="min-h-[calc(100vh-140px)] bg-slate-100/70 flex flex-col md:flex-row">
      <CitizenSidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
};
