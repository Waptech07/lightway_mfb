import React from "react";

interface DashboardQAProps {
  header: string;
  details: string;
  bgImage?: string;
  svg?: string;
}

const DashboardQA: React.FC<DashboardQAProps> = ({
  header,
  details,
  bgImage,
  svg,
}) => {
  return (
    <div
      className="flex justify-between items-start py-7 px-6 rounded-xl bg-cover bg-center gap-23"
      style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}
    >
      <div className="flex-1 flex-col space-y-2 text-white">
        <h3 className="text-base font-bold">{header}</h3>
        <p className="text-xs font-normal">{details}</p>
      </div>
      <div>
        <img src={svg} alt={header} className="w-12 h-12" />
      </div>
    </div>
  );
};

export default DashboardQA;
