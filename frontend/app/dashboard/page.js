"use client";
import React, { useEffect, useState } from "react";
import ChatAssistant from "../Components/ChatAssistant";
import PlayingXI from "../Components/PlayingXI";
import RightPanel from "../Components/RightPanel";
import MatchAnalysis from "../Components/MatchAnalysis";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ match_id: "101" }),
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching analysis:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#09041b] text-white gap-6">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        <h2 className="text-2xl font-semibold animate-pulse">AI is analyzing the match and building your Fantasy Team...</h2>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#09041b] text-white">
        <h2 className="text-2xl font-bold text-red-500">Failed to load data: {error}</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[#09041b] px-5 py-3">
        <div className="flex justify-center mt-4">
          <div className="w-full max-w-[1800px] mx-auto bg-gradient-to-r from-[#17103c] to-[#121827] rounded-2xl border border-indigo-700 shadow-xl p-4 md:p-6">
            {/* Series */}
            <p className="text-center text-gray-300 text-lg font-medium">
              {data.match.series}
            </p>

            {/* Teams */}
            <div className="flex flex-col md:flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 mt-5">
              {/* Team 1 */}
              <div className="flex items-center gap-3 md:gap-4">
                <img
                  src={data.match.team1_logo}
                  alt={data.match.team1}
                  className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl border border-white object-cover"
                />

                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold text-white">
                    {data.match.team1.substring(0, 3).toUpperCase()}
                  </h2>

                  <p className="text-gray-300 text-sm md:text-base lg:text-xl">
                    {data.match.team1}
                  </p>
                </div>
              </div>

              {/* Match Details */}
              <div className="text-center">
                <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-white">
                  {data.match.team1} VS {data.match.team2}
                </h2>

                <div className="flex justify-center items-center gap-3 mt-3">
                  <span className="bg-red-600 text-white px-4 py-1 rounded-full font-semibold animate-pulse">
                    🔴 {data.match.status}
                  </span>
                </div>

                <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4 text-gray-300 text-xs md:text-sm lg:text-base">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-location-dot text-cyan-400"></i>
                    <span>{data.match.venue}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <i className="fa-regular fa-calendar"></i>
                    <span>{data.match.match_date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <i className="fa-regular fa-clock"></i>
                    <span>{data.match.match_time}</span>
                  </div>
                </div>
              </div>

              {/* Team 2 */}
              <div className="flex items-center gap-3 md:gap-4">
                <img
                  src={data.match.team2_logo}
                  alt={data.match.team2}
                  className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl border border-white object-cover"
                />
                <div className="text-left lg:text-right">
                  <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold text-white">
                    {data.match.team2.substring(0, 3).toUpperCase()}
                  </h2>

                  <p className="text-gray-300 text-sm md:text-base lg:text-xl">
                    {data.match.team2}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
            {/* Right Side */}
            <div className="order-1 lg:order-2 lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {/* Playing XI */}
                <div className="md:col-span-5">
                  <PlayingXI data={data} />
                </div>

                {/* Right Panel */}
                <div className="md:col-span-2">
                  <RightPanel data={data} />
                </div>
              </div>
            </div>

            {/* Chat */}
            <div className="order-2 lg:order-1 lg:col-span-3">
              <ChatAssistant sessionId={data.session_id} />
            </div>
          </div>

          {/* AI Match Analysis */}
          <div className="mt-4">
            <MatchAnalysis data={data} />
          </div>
        </div>
      </div>

      <footer className="bg-[#06030c] border-t border-slate-800">
        <div className="max-w-7xl mx-auto py-4 px-6 flex justify-center items-center gap-2 text-gray-300 text-sm">
          <i className="fa-regular fa-copyright"></i>
          <p>
            {new Date().getFullYear()} <span className="font-semibold text-cyan-400">FantasyPilot</span>.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
