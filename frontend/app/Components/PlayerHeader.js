"use client";
import React from "react";

const PlayerHeader = ({ player }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      {/* ================= LEFT SECTION ================= */}

      <div className="xl:col-span-7">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Player Image */}

          <div className="flex justify-center lg:block">
            <div className="w-52 h-72 rounded-2xl overflow-hidden border border-indigo-600 bg-gradient-to-b from-cyan-900 to-indigo-900">
              <img
                src={player.image}
                alt={player.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Player Details */}

          <div className="flex-1 flex flex-col justify-between">
            {/* Name */}

            <div>
              <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                {player.name}

                <i className="fa-solid fa-circle-check text-sky-400 text-2xl"></i>
              </h1>

              <div className="flex items-center gap-3 mt-4">
                <span className="text-2xl">🇮🇳</span>

                <span className="text-2xl text-gray-200">{player.team}</span>
              </div>

              {/* Role */}

              <div className="flex items-center gap-4 mt-6">
                <span className="bg-blue-700 text-white px-5 py-2 rounded-full font-semibold">
                  {player.role}
                </span>

                <span className="text-xl text-gray-300">Top Order Batsman</span>
              </div>
            </div>

            {/* Bottom Information */}

            <div className="grid grid-cols-3 gap-8 mt-10">
              {/* Credits */}

              <div>
                <div className="flex items-center gap-2 text-yellow-400">
                  <i className="fa-solid fa-star"></i>

                  <span className="text-gray-400">Credits</span>
                </div>

                <p className="text-3xl font-bold text-white mt-2">
                  {player.credits}
                </p>
              </div>

              {/* Batting */}

              <div>
                <div className="flex items-center gap-2 text-sky-400">
                  <i className="fa-solid fa-baseball-bat-ball"></i>

                  <span className="text-gray-400">Batting Style</span>
                </div>

                <p className="text-white text-lg font-semibold mt-2">
                  {player.batting_style}
                </p>
              </div>

              {/* Bowling */}

              <div>
                <div className="flex items-center gap-2 text-pink-400">
                  <i className="fa-solid fa-baseball"></i>

                  <span className="text-gray-400">Bowling Style</span>
                </div>

                <p className="text-white text-lg font-semibold mt-2">
                  {player.bowling_style}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SECTION ================= */}

      <div className="xl:col-span-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {/* Fantasy Score */}

          <div className="rounded-2xl border border-purple-500 bg-gradient-to-br from-[#31115f] to-[#1b143b] p-6 flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-trophy text-yellow-400 text-4xl"></i>

              <div>
                <p className="text-gray-300">Predicted Fantasy Score</p>
              </div>
            </div>

            <div className="mt-8">
              <h1 className="text-6xl font-bold text-white">
                {player.ai_analysis.predicted_fantasy_score}
              </h1>

              <p className="text-gray-400 text-xl mt-2">/100</p>
            </div>
          </div>

          {/* AI Confidence */}

          <div className="rounded-2xl border border-green-500 bg-gradient-to-br from-[#0c2d2b] to-[#102021] p-6 flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-shield-halved text-green-400 text-4xl"></i>

              <div>
                <p className="text-gray-300">AI Confidence</p>
              </div>
            </div>

            <div className="mt-8">
              <h1 className="text-6xl font-bold text-white">
                {player.ai_analysis.ai_confidence}%
              </h1>

              <p className="text-green-400 text-2xl font-semibold mt-2">
                Very High
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerHeader;
