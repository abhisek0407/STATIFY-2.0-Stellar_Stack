import React from "react";
import data from "../../dummyAnalyze.json";
const RightPanel = () => {
  return (
    <div className="flex flex-col gap-2 lg:gap-3 h-[720px] xl:h-[760px] 2xl:h-[820px] overflow-hidden">
      {/* Weather Card */}

      <div
        className="flex-1 min-h-0 bg-gradient-to-br from-[#17103c] to-[#121827] rounded-2xl border border-indigo-700 shadow-lg p-2 lg:p-3 2xl:p-5"
      >
        <div className="flex items-center gap-2 lg:gap-3 xl:gap-4">
          <i
            className="fa-solid fa-cloud-sun text-xl md:text-2xl xl:text-3xl 2xl:text-4xl text-yellow-400"
          ></i>

          <div>
            <h3 className="text-gray-300 text-xs lg:text-sm">Weather</h3>

            <h2
              className="text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-white"
            >
              {data.weather.temperature}°C
            </h2>

            <p className="text-cyan-300">{data.weather.condition}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 lg:gap-3 mt-3 lg:mt-4">
          <div>
            <p className="text-gray-400 text-xs lg:text-sm">
              Humidity
            </p>

            <p className="text-white font-bold text-xs xl:text-sm max-lg:text-sm">{data.weather.humidity}%</p>
          </div>

          <div>
            <p
              className="text-gray-400 text-xs lg:text-sm"
            >
              Wind
            </p>

            <p className="text-white font-bold text-xs xl:text-sm max-lg:text-sm">
              {data.weather.wind_speed} km/h
            </p>
          </div>
        </div>
      </div>

      {/* Pitch Report */}

      <div className="flex-[1.25] min-h-0 bg-gradient-to-br from-[#17103c] to-[#121827] rounded-2xl border border-indigo-700 shadow-lg p-2 lg:p-3 2xl:p-5 overflow-hidden">
        <div className="flex items-center gap-3 mb-4">
          <i className="fa-solid fa-baseball-bat-ball text-3xl text-green-400"></i>

          <div>
            <h3 className="text-white text-base xl:text-lg 2xl:text-xl font-bold">
              Pitch Report
            </h3>

            <p className="text-green-400 font-semibold">{data.pitch.type}</p>
          </div>
        </div>

        <p
          className="text-gray-300 text-xs lg:text-sm leading-5 overflow-y-auto pr-1"
          style={{ maxHeight: "110px" }}
        >
          {data.pitch.description}
        </p>
      </div>

      {/* Fantasy Score */}

      <div className="flex-1 bg-gradient-to-br from-[#17103c] to-[#121827] rounded-2xl border border-indigo-700 shadow-lg p-3 lg:p-3 2xl:p-5 flex flex-col sm:flex-row justify-center items-center text-center sm:text-left gap-3">
        <i className="fa-solid fa-trophy text-4xl sm:text-2xl xl:text-3xl 2xl:text-4xl text-yellow-400"></i>

        <div className="text-center sm:text-left">
          <p className="text-sm sm:text-xs lg:text-sm text-gray-400">
            Predicted Fantasy Score
          </p>

          <h2 className="text-4xl sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-white">
            {data.predicted_fantasy_score}
          </h2>
        </div>
      </div>

      {/* AI Confidence */}

      <div className="flex-1 bg-gradient-to-br from-[#17103c] to-[#121827] rounded-2xl border border-indigo-700 shadow-lg p-3 lg:p-3 2xl:p-5 flex flex-col sm:flex-row justify-center items-center text-center sm:text-left gap-3">
        <i className="fa-solid fa-shield-halved text-4xl sm:text-2xl xl:text-3xl 2xl:text-4xl text-green-500"></i>

        <div className="text-center sm:text-left">
          <p className="text-sm sm:text-base lg:text-sm text-gray-400">
            AI Confidence
          </p>

          <h2 className="text-4xl sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-green-400">
            {data.ai_confidence}%
          </h2>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
