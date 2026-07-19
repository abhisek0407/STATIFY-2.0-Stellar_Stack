"use client";

import React, { useEffect, useState } from "react";
// import dummyStats from "../../dummyStats.json";
import { getPlayer } from "../services/api";
import PlayerHeader from "./PlayerHeader";
import RecentForm from "./RecentForm";
import AIReason from "./AIReason";
import BattingTable from "./BattingTable";
import BowlingTable from "./BowlingTable";

const StatsPage = ({ isOpen, onClose, playerId,matchId }) => {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!isOpen || !playerId) return;

    async function fetchPlayer() {
      try {
        setLoading(true);

        const data = await getPlayer(playerId,matchId);

        setPlayer(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayer();
  }, [isOpen, playerId]);
  if (!isOpen) return null;
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[9999]">
        <p className="text-white text-2xl">Loading Player...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[9999]">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }
  if (!player) return null;
  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="relative w-full max-w-7xl max-h-[95vh] overflow-y-auto rounded-3xl border border-indigo-700 bg-gradient-to-b from-[#120d33] to-[#09041b] shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white text-2xl z-50"
        >
          ✕
        </button>

        <div className="p-8 space-y-8">
          <PlayerHeader player={player} />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <RecentForm player={player} />
            <AIReason player={player} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <BattingTable player={player} />
            <BowlingTable player={player} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
