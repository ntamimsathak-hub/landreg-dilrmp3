import React from 'react';

export const TricolorBar: React.FC = () => {
  return (
    <div className="w-full flex h-1.5 shadow-sm">
      <div className="w-1/3 bg-[#FF9933]"></div>
      <div className="w-1/3 bg-white"></div>
      <div className="w-1/3 bg-[#138808]"></div>
    </div>
  );
};
