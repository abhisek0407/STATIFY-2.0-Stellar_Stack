"use client";

import React from "react";

const BattingTable = ({ player }) => {
  const batting = player.batting_stats;

  const rows = [
    {
      format: "Test",
      icon: "🏏",
      data: batting.test,
    },
    {
      format: "ODI",
      icon: "🔵",
      data: batting.odi,
    },
    {
      format: "T20I",
      icon: "🟣",
      data: batting.t20,
    },
    {
      format: "IPL",
      icon: "🟠",
      data: batting.ipl,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#16103b] to-[#100a2d] rounded-2xl border border-indigo-700 p-6">
      {/* Header */}

      <div className="flex items-center gap-3 mb-6">
        <i className="fa-solid fa-baseball-bat-ball text-sky-400 text-2xl"></i>

        <h2 className="text-2xl font-bold text-white">
          Career Batting Stats
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
                Runs
              </th>

              <th className="px-4 py-4 text-center text-cyan-400 font-semibold">
                Average
              </th>

              <th className="px-4 py-4 text-center text-cyan-400 font-semibold">
                Strike Rate
              </th>

              <th className="px-4 py-4 text-center text-cyan-400 font-semibold">
                100s
              </th>

              <th className="px-4 py-4 text-center text-cyan-400 font-semibold">
                50s
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-t border-indigo-800 hover:bg-indigo-900/30 transition"
              >
                <td className="px-4 py-4 text-white font-medium">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{row.icon}</span>

                    {row.format}
                  </div>
                </td>

                <td className="px-4 py-4 text-center text-gray-200">
                  {row.data.runs}
                </td>

                <td className="px-4 py-4 text-center text-gray-200">
                  {row.data.average}
                </td>

                <td className="px-4 py-4 text-center text-gray-200">
                  {row.data.strike_rate}
                </td>

                <td className="px-4 py-4 text-center text-gray-200">
                  {row.data.centuries ?? "-"}
                </td>

                <td className="px-4 py-4 text-center text-gray-200">
                  {row.data.fifties ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BattingTable;