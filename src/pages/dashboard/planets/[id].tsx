// pages/planets/[id].tsx

import React from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from 'components/DashboardLayout';
import { usePlanetDetails } from 'hooks/usePlanetDetails';

const PlanetDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const planetName = router.query.planetName;
  const { data: planet, loading } = usePlanetDetails(Number(id));

  let year, month, day, hours, minutes, seconds;

  if (planet) {
    const date = new Date(planet.created);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col flex-1 bg-[#fbefdf] rounded-2xl h-full overflow-hidden mb-10">
        <div className="flex-1 flex items-center justify-center  bg-[#fbefdf] relative">
          {!loading && (
            <div className="flex-1 flex flex-col pl-8 mb-10">
              <span className="text-2xl mb-3 z-20">Planet ID</span>
              <span className="text-[3.5rem] leading-none font-semibold z-20">{planet?.name}</span>
            </div>
          )}
          <div className="flex flex-col items-center justify-center">
            <img alt="logo" src="/logo.jpg" className="w-80 z-20" />
            {loading && <span className="mt-6 text-xl">Loading {planetName}...</span>}
            <img
              alt="terrain"
              src="/left-terain.jpg"
              className="w-[310px] absolute bottom-0 left-0 z-10"
            />
            <img
              alt="terrain"
              src="/left-terain.jpg"
              className="w-[310px] absolute bottom-0 right-0 z-10 transform scale-x-[-1]"
            />
          </div>
          {!loading && (
            <div className="flex-1 flex flex-col items-end pr-8 mb-10">
              <span className="text-2xl z-20">Rotation Period</span>
              {planet?.rotation_period === 'unknown' ? (
                <span className="text-3xl z-20">?? </span>
              ) : (
                <div className="flex items-center gap-3 z-20">
                  <span className="text-[3.5rem] font-semibold">{planet?.rotation_period}</span>
                  <span className="text-2xl font-semibold">HRS</span>
                </div>
              )}
            </div>
          )}
        </div>
        {!loading && (
          <div className="h-[500px] p-6">
            <div className="flex flex-col h-full border-2 border-[#1f141c] rounded-b-2xl">
              <div className="flex-1 flex "></div>
              <div className="flex items-center border-t-2 border-[#1f141c] h-24">
                <span className="flex-1 font-bold text-center">EXISTED</span>
                <div className="flex flex-col items-center justify-center border-l-2 border-[#1f141c] h-full w-40">
                  <div className="text-[8px] font-bold flex gap-2">
                    <span>Y</span>
                    <span>E</span>
                    <span>A</span>
                    <span>R</span>
                  </div>
                  <span className="text-[2rem] font-bold leading-tight">{year}</span>
                </div>
                <div className="flex flex-col items-center justify-center border-x-2 border-[#1f141c] h-full w-32">
                  <div className="text-[8px] font-bold flex gap-2">
                    <span>M</span>
                    <span>O</span>
                    <span>N</span>
                    <span>T</span>
                    <span>H</span>
                  </div>
                  <span className="text-[2rem] font-bold leading-tight">{month}</span>
                </div>
                <div className="flex flex-col items-center justify-center border-r-2 border-[#1f141c] h-full w-32">
                  <div className="text-[8px] font-bold flex gap-2">
                    <span>D</span>
                    <span>A</span>
                    <span>T</span>
                    <span>E</span>
                  </div>
                  <span className="text-[2rem] font-bold leading-tight">{day}</span>
                </div>
                <div className="flex flex-col items-center justify-center border-r-2 border-[#1f141c] h-full w-40">
                  <div className="text-[8px] font-bold flex gap-2">
                    <span>T</span>
                    <span>I</span>
                    <span>M</span>
                    <span>E</span>
                  </div>
                  <span className="text-[2rem] font-bold leading-tight">
                    {hours}:{minutes}
                  </span>
                </div>
                <span className="flex-1 font-bold text-center">SINCE</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PlanetDetail;
