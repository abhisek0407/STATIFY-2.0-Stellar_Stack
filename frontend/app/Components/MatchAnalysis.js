import React from "react";
import data from "../../dummyAnalyze.json";

const MatchAnalysis = () => {
  return (
    <div className="bg-gradient-to-r from-[#17103c] to-[#121827] rounded-2xl border border-indigo-700 shadow-xl overflow-hidden h-full">
      <div className=" items-center">
        {/* Left Content */}

        <div className="p-4 lg:p-5 xl:p-6 2xl:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex justify-center items-center">
              <i className="fa-solid fa-robot text-cyan-400 text-text-xl lg:text-2xl"></i>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                AI Match Analysis
              </h2>

              <p className="text-gray-400 text-sm">
                AI generated reasoning behind the selected Fantasy XI
              </p>
            </div>
          </div>

          <p className="text-gray-300 leading-6 lg:leading-8 text-justify">{data.summary}</p>
        </div>

        {/* Right Illustration */}

        
      </div>
    </div>
  );
};

export default MatchAnalysis;
