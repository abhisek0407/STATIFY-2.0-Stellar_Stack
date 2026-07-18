import React from "react";
import data from "../../dummyAnalyze.json";
import Image from "next/image";
import { useState } from "react";
import StatsPage from "./StatsPage";
const PlayingXI = () => {
  const fantasyTeam = data.fantasy_team;
  const [openModal, setOpenModal] = useState(false);
  const firstRow = fantasyTeam.slice(0, 4);
  const secondRow = fantasyTeam.slice(4, 8);
  const thirdRow = fantasyTeam.slice(8, 11);
  return (
    <>
    <div className="bg-gradient-to-b from-[#17103c] to-[#121827] rounded-2xl border border-indigo-700 shadow-xl p-5 flex flex-col h-[720px] xl:h-[760px] 2xl:h-[820px] overflow-hidden">
      {/* Header */}

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <i className="fa-solid fa-users text-cyan-400"></i>
          Playing XI
        </h2>

        <span className="bg-green-600/20 border border-green-500 text-green-400 px-3 py-1 rounded-full text-sm">
          AI Generated
        </span>
      </div>

      {/* Cricket Ground */}

      <div
        className="flex-1 overflow-y-auto rounded-2xl  bg-cover bg-center p-2 sm:p-3 lg:p-6"
        style={{
          backgroundImage: "url('/PlayGround1.png')",
        }}
      >
        {/* Row 1 */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-5 md:gap-3 mb-6">
          {firstRow.map((player) => (
            <div
              key={player.player_id}
              onClick={() => setOpenModal(true)}
              className="relative cursor-pointer group flex flex-col items-center"
            >
              {player.captain && (
                <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-red-600 flex justify-center items-center text-white text-xs font-bold z-20">
                  C
                </div>
              )}

              {player.vice_captain && (
                <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-orange-500 flex justify-center items-center text-white text-[10px] font-bold z-20">
                  VC
                </div>
              )}

              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28 rounded-full overflow-hidden border-4 border-cyan-500 group-hover:scale-105 transition">
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-center text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold mt-2 break-words">
                {player.name}
              </p>

              <span className="mt-2 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs bg-cyan-600 text-white">
                {player.role}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2 */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 lg:gap-5 mb-6">
          {secondRow.map((player) => (
            <div
              key={player.player_id}
              onClick={() => setOpenModal(true)}
              className="relative cursor-pointer group flex flex-col items-center"
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28 rounded-full overflow-hidden border-4 border-cyan-500 group-hover:scale-105 transition">
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-center text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold mt-3">
                {player.name}
              </p>

              <span className="mt-2 px-3 py-1 rounded-full text-xs bg-purple-600 text-white">
                {player.role}
              </span>
            </div>
          ))}
        </div>

        {/* Row 3 */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 lg:gap-5 justify-items-center">
          {thirdRow.map((player) => (
            <div
              key={player.player_id}
              onClick={() => setOpenModal(true)}
              className="relative cursor-pointer group flex flex-col items-center"
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28 rounded-full overflow-hidden border-4 border-cyan-500 group-hover:scale-105 transition">
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-center text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold mt-3">
                {player.name}
              </p>

              <span className="mt-2 px-3 py-1 rounded-full text-xs bg-blue-600 text-white">
                {player.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}

      <div className="mt-5 flex justify-center">
        <p className="text-sm text-gray-300 flex items-center gap-2">
          <i className="fa-solid fa-circle-info text-cyan-400"></i>
          Click any player to view detailed statistics and AI reasoning.
        </p>
      </div>
    </div>
    <StatsPage
    isOpen={openModal}
    onClose={() => setOpenModal(false)}
/>
    </>
  );
};

export default PlayingXI;
