"use client";

import React from "react";

const AIReason = ({ player }) => {
  const reasons = player.ai_analysis.selection_reason;

  return (
    <div className="bg-gradient-to-br from-[#16103b] to-[#100a2d] rounded-2xl border border-indigo-700 p-6 h-full">
     

      <div className="flex items-center gap-3 mb-6">
        <i className="fa-solid fa-brain text-violet-400 text-2xl"></i>

        <h2 className="text-2xl font-bold text-white">
          AI Selection Reason
        </h2>
      </div>

    

      <div className="flex flex-col gap-4">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-xl border border-indigo-700 bg-[#17103c] p-4 hover:border-cyan-500 hover:shadow-lg transition-all duration-300"
          >
            

            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <i className="fa-solid fa-check text-white text-sm"></i>
            </div>

           

            <p className="text-gray-200 text-base leading-7">
              {reason}
            </p>
          </div>
        ))}
      </div>

     

      <div className="mt-8 rounded-xl border border-cyan-700 bg-cyan-500/10 p-4">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-lightbulb text-cyan-400 text-xl"></i>

          <p className="text-gray-300 text-sm leading-6">
            These recommendations are generated using the player's recent
            performance, historical statistics, venue conditions, weather,
            opposition analysis and AI prediction models.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIReason;