import React from 'react';

const StatComponent = () => {
  const statsData = [
    {
      icon: "images/244.png",
      number: "1",
      label: "enquête"
    },
    {
      icon: "images/20.png",
      number: "4",
      label: "activités"
    },
    {
      icon: "images/dégustation.png",
      number: "2",
      label: "dégustations"
    },
   
  ];

  return (
    <div className="bg-[#FFECA7] rounded-lg p-3 sm:p-4 md:p-3 shadow-sm w-full mx-auto md:mx-0">
      {/* Version mobile : 2x2 grid */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {statsData.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center bg-white/20 rounded-lg p-3 min-h-[80px] justify-center">
            <img 
              src={stat.icon} 
              alt={stat.label}
              className="w-8 h-8 opacity-80 mb-2"
            />
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-[#ff8200] text-xl">
                {stat.number}
              </span>
              <span className="text-[#ff8200] text-sm font-medium">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Version tablette : ligne horizontale */}
      <div className="hidden sm:flex md:hidden items-center justify-between gap-3">
        {statsData.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center bg-white/20 rounded-lg p-3 flex-1 min-h-[90px] justify-center">
            <img 
              src={stat.icon} 
              alt={stat.label}
              className="w-8 h-8 opacity-80 mb-2"
            />
            <div className="flex items-baseline gap-1">
              <span className="font-bold text-[#ff8200] text-lg">
                {stat.number}
              </span>
              <span className="text-[#ff8200] text-sm font-medium">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Version desktop : ligne horizontale compacte */}
      <div className="hidden md:flex items-center justify-between gap-4 w-full">
        {statsData.map((stat, index) => (
          <div key={index} className="flex items-center gap-x-3">
            <img 
              src={stat.icon} 
              alt={stat.label}
              className="h-11 opacity-80"
            />
            <span className="font-bold text-[#ff8200] text-lg">
              {stat.number}
            </span>
            <span className="text-[#ff8200] text-sm font-medium">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatComponent;