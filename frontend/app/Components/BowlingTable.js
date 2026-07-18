"use client";

import React from "react";

const BowlingTable = ({ player }) => {
  const bowling = player.bowling_stats;

  const rows = [
    {
      format: "Test",
      icon: "🏏",
      data: bowling.test,
    },
    {
      format: "ODI",
      icon: "🔵",
      data: bowling.odi,
    },
    {
      format: "T20I",
      icon: "🟣",
      data: bowling.t20,
    },
    {
      format: "IPL",
      icon: "🟠",
      data: bowling.ipl,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#16103b] to-[#100a2d] rounded-2xl border border-indigo-700 p-6">
      {/* Header */}

      <div className="flex items-center gap-3 mb-6">
        <i className="fa-solid fa-baseball text-pink-400 text-2xl"></i>

        <h2 className="text-2xl font-bold text-white">
          Career Bowling Stats
        </h2>
      </div>

      {/* Table */}

      <div className="overflow-x-auto rounded-xl border border-indigo-700">
        <table className="min-w-full text-sm">
          <thead className="bg-[#1b1548]">
            <tr>
              <th className="px-4 py-4 text-left text-cyan-400 font-semibold">
                Format
              </th>

              <th className="px-4 py-4 text-center text-cyan-400 font-semibold">
                Wickets
              </th>

              <th className="px-4 py-4 text-center text-cyan-400 font-semibold">
                Economy
              </th>

              <th className="px-4 py-4 text-center text-cyan-400 font-semibold">
                Average
              </th>

              <th className="px-4 py-4 text-center text-cyan-400 font-semibold">
                Strike Rate
              </th>

              <th className="px-4 py-4 text-center text-cyan-400 font-semibold">
                Best
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-t border-indigo-800 hover:bg-indigo-900/30 transition"
              >
                {/* Format */}

                <td className="px-4 py-4 text-white font-medium">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{row.icon}</span>

                    {row.format}
                  </div>
                </td>

                {/* Wickets */}

                <td className="px-4 py-4 text-center text-gray-200">
                  {row.data.wickets}
                </td>

                {/* Economy */}

                <td className="px-4 py-4 text-center text-gray-200">
                  {row.data.economy}
                </td>

                {/* Average */}

                <td className="px-4 py-4 text-center text-gray-200">
                  {row.data.average}
                </td>

                {/* Strike Rate */}

                <td className="px-4 py-4 text-center text-gray-200">
                  {row.data.strike_rate}
                </td>

                {/* Best */}

                <td className="px-4 py-4 text-center text-gray-200">
                  {row.data.best_innings}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BowlingTable;