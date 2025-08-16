import React from 'react';

interface DashboardQAProps {
  header: string;
  details: string;
  bgImage?: string;
}

const DashboardQA: React.FC<DashboardQAProps> = ({ header, details, bgImage }) => {
  return (
    <div
      className='border-2 border-primary/30 rounded-xl py-7 px-6 flex flex-col gap-1 text-white bg-cover bg-center'
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
    >
      <h3 className='text-base font-bold'>{header}</h3>
      <p className='text-xs font-normal'>{details}</p>
    </div>
  );
};

export default DashboardQA;
