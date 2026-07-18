"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
const RecentForm = ({ player }) => {
  const form = player.recent_form;

  const chartData = form.last_matches_fantasy_points.map((point, index) => ({
    match: `M${index + 1}`,
    points: point,
  }));
  return (
    <div className="bg-gradient-to-br from-[#16103b] to-[#100a2d] rounded-2xl border border-indigo-700 p-6">
      {/* Header */}

      <div className="flex items-center gap-3 mb-6">
        <i className="fa-solid fa-chart-line text-cyan-400 text-2xl"></i>

        <h2 className="text-2xl font-bold text-white">Recent Form</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ================= Graph ================= */}

        <div className="lg:col-span-3">
          <h3 className="text-gray-300 mb-4 font-semibold">
            Fantasy Points (Last 5 Matches)
          </h3>

          <div className="h-[220px] sm:h-[250px] lg:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorFantasy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c026d3" stopOpacity={0.8} />

                    <stop offset="95%" stopColor="#c026d3" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#2b2655" />

                <XAxis
                  dataKey="match"
                  stroke="#b0b0b0"
                  tick={{ fontSize: 12 }}
                />

                <YAxis stroke="#b0b0b0" width={30} tick={{ fontSize: 12 }} />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="points"
                  stroke="#d946ef"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorFantasy)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ================= Right Section ================= */}

        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Average */}

          <div className="rounded-xl border border-indigo-700 bg-[#17103c] p-5">
            <p className="text-gray-400 text-sm">Average Fantasy Points</p>

            <h1 className="text-4xl lg:text-5xl font-bold text-purple-400 mt-3">
              {form.average_fantasy_points}
            </h1>
          </div>

          {/* Runs */}

          <div className="rounded-xl border border-indigo-700 bg-[#17103c] p-5">
            <h3 className="text-white font-semibold mb-4">Recent Runs</h3>

            <div className="flex gap-2">
              {form.recent_runs.map((run, index) => (
                <div
                  key={index}
                  className="flex-1 bg-[#0f1430] border border-indigo-700 rounded-lg h-16 flex justify-center items-center"
                >
                  <span className="text-green-400 font-bold text-base xl:text-md 2xl:text-lg whitespace-nowrap ">
                    {run}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Wickets */}

          <div className="rounded-xl border border-indigo-700 bg-[#17103c] p-5">
            <h3 className="text-white font-semibold mb-4">Recent Wickets</h3>

            <div className="flex justify-between gap-2">
              {form.recent_wickets.map((wk, index) => (
                <div
                  key={index}
                  className="flex-1 min-w-0 bg-[#0f1430] border border-indigo-700 rounded-lg py-3 flex justify-center items-center"
                >
                  <span className="text-pink-400 font-bold text-lg md:text-xl">
                    {wk}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentForm;
