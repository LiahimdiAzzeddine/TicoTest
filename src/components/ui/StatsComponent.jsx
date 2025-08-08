import React from 'react';

const StatsComponent = () => {
  const statsData = [
    {
      icon: "images/picto personne.png",
      number: "30",
      label: "enfants"
    },
    {
      icon: "images/20.png",
      number: "3",
      label: "activités"
    },
    {
      icon: "images/dégustation.png",
      number: "3",
      label: "dégustations"
    },
    {
      icon: "images/24.png",
      number: "1",
      label: "poster"
    }
  ];

  return (
    <div className="bg-[#ffeca7] rounded-lg p-3 sm:p-4 md:p-2 shadow-sm w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto md:mx-0">
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
              <span className="font-bold text-[#ff8300] text-xl">
                {stat.number}
              </span>
              <span className="text-[#ff8300] text-sm font-medium">
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
              <span className="font-bold text-[#ff8300] text-lg">
                {stat.number}
              </span>
              <span className="text-[#ff8300] text-sm font-medium">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Version desktop : ligne horizontale compacte */}
      <div className="hidden md:flex items-center justify-between gap-4">
        {statsData.map((stat, index) => (
          <div key={index} className="flex items-center gap-2">
            <img 
              src={stat.icon} 
              alt={stat.label}
              className="w-6 h-6 opacity-80"
            />
            <span className="font-bold text-[#ff8300] text-lg">
              {stat.number}
            </span>
            <span className="text-[#ff8300] text-sm font-medium">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsComponent;