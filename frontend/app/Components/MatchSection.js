"use client";

// import data from "../../dummyData.json";
// import Image from "next/image";
import { useEffect, useState } from "react";
import { getMatches } from "../services/api";
const MatchSection = () => {
  // const liveMatches = data.matches.filter((match) => match.status === "Live");

  // const upcomingMatches = data.matches.filter(
  //   (match) => match.status === "Upcoming",
  // );

  // const completedMatches = data.matches.filter(
  //   (match) => match.status === "Completed",
  // );
  const [matches, setMatches] = useState({
    live_matches: [],
    upcoming_matches: [],
    recent_matches: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    async function fetchMatches() {
      try {
        const data = await getMatches();
        setMatches(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, []);
  const liveMatches = matches.live_matches;
  const upcomingMatches = matches.upcoming_matches;
  const completedMatches = matches.recent_matches;
  if (error) {
    return (
      <section className="bg-[#09041b] min-h-[400px] flex justify-center items-center">
        <p className="text-red-500 text-xl">{error}</p>
      </section>
    );
  }
  const MatchCard = ({ match, completed }) => (
    <div className="bg-[#121827] rounded-2xl p-6 shadow-lg border border-slate-700 hover:border-cyan-500 transition duration-300">
      {/* Teams */}

      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center">
          <img
            src={match.team1_logo}
            alt={match.team1}
            width={55}
            height={55}
            className="object-contain"
          />

          <p className="text-white font-semibold mt-2">{match.team1}</p>
        </div>

        <div className="text-center">
          <p className="text-gray-300 font-bold">VS</p>

          <span
            className={`text-xs px-3 py-1 rounded-full ${
              match.status === "Live"
                ? "bg-red-600"
                : match.status === "Upcoming"
                  ? "bg-green-600"
                  : "bg-gray-600"
            }`}
          >
            {match.status}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={match.team2_logo}
            alt={match.team2}
            width={55}
            height={55}
            className="object-contain"
          />

          <p className="text-white font-semibold mt-2">{match.team2}</p>
        </div>
      </div>

      {/* Match Info */}

      <div className="mt-6">
        <h3 className="text-lg font-bold text-white">
          {match.team1} vs {match.team2}
        </h3>

        <p className="text-cyan-400">{match.series}</p>

        <p className="text-gray-400">{match.match_type}</p>

        <p className="text-gray-400">{match.venue}</p>

        <p className="text-gray-400">
          {match.match_date} • {match.match_time}
        </p>
      </div>

      {/* Button */}

      <button
        className={`w-full mt-5 py-2 rounded-xl font-semibold transition ${
          completed
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105"
        }`}
      >
        {completed ? "View Summary" : "Analyze Match"}
      </button>
    </div>
  );
  if (loading) {
    return (
      <section className="bg-[#09041b] min-h-[400px] flex justify-center items-center">
        <p className="text-white text-2xl">Loading Matches...</p>
      </section>
    );
  }
  return (
    <section className="bg-[#09041b] px-8 py-12">
      {/* Live */}

      <div className="mb-14">
        <h2 className="text-3xl font-bold text-red-500 mb-6">
          🔴 Live Matches
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {liveMatches.map((match) => (
            <MatchCard key={match.match_id} match={match} />
          ))}
        </div>
      </div>

      {/* Upcoming */}

      <div className="mb-14">
        <h2 className="text-3xl font-bold text-green-400 mb-6">
          📅 Upcoming Matches
        </h2>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {upcomingMatches.map((match) => (
            <MatchCard key={match.match_id} match={match} />
          ))}
        </div>
      </div>

      {/* Completed */}

      <div>
        <h2 className="text-3xl font-bold text-gray-300 mb-6">
          ✅ Completed Matches
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {completedMatches.map((match) => (
            <MatchCard key={match.match_id} match={match} completed={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MatchSection;
