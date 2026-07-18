"use client";

import React from "react";

const features = [
  {
    icon: "fa-solid fa-users",
    title: "AI Playing XI",
    description:
      "Generate the strongest fantasy XI using AI by analyzing player form, venue, weather, and opponent statistics.",
  },
  {
    icon: "fa-solid fa-bolt",
    title: "Fantasy Score Prediction",
    description:
      "Predict expected fantasy points for every player before the match starts.",
  },
  {
    icon: "fa-solid fa-crown",
    title: "Captain Recommendation",
    description:
      "Receive AI-generated Captain and Vice-Captain recommendations with confidence scores.",
  },
  {
    icon: "fa-solid fa-chart-column",
    title: "Player Statistics",
    description:
      "Explore complete batting, bowling, and recent performance statistics for every player.",
  },
  {
    icon: "fa-solid fa-brain",
    title: "AI Selection Reason",
    description:
      "Understand why each player is recommended through transparent AI reasoning.",
  },
  {
    icon: "fa-solid fa-fire",
    title: "Recent Form Analysis",
    description:
      "Analyze player consistency through recent runs, wickets, and fantasy performances.",
  },
  {
    icon: "fa-solid fa-cloud-sun",
    title: "Weather Analysis",
    description:
      "View live temperature, humidity, rainfall, and wind conditions before every match.",
  },
  {
    icon: "fa-solid fa-mountain",
    title: "Pitch Report",
    description:
      "Know whether the pitch favors batting, pace bowling, or spin bowling.",
  },
  {
    icon: "fa-solid fa-chart-line",
    title: "Match Analysis",
    description:
      "Comprehensive AI-powered match insights including venue trends and winning probability.",
  },
];

const highlights = [
  "AI Powered Predictions",
  "Real-Time Weather Insights",
  "Data-Driven Team Selection",
  "Beautiful Interactive Dashboard",
];

const upcoming = [
  "Live Match Tracking",
  "Fantasy League Comparison",
  "Push Notifications",
  "Multiple Language Support",
];

export default function Features() {
  return (
    <div className="min-h-screen bg-[#09041b] text-white">
      {/* Hero */}

      <section className="py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          FantasyPilot Features
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-300 leading-8">
          FantasyPilot combines Artificial Intelligence, player statistics,
          weather intelligence, pitch analysis and predictive analytics to help
          fantasy cricket players make smarter decisions.
        </p>
      </section>

      {/* Why */}

      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="rounded-3xl border border-indigo-700 bg-gradient-to-r from-[#16103b] to-[#100a2d] p-10">
          <h2 className="text-3xl font-bold text-center mb-6">
            Why FantasyPilot?
          </h2>

          <p className="text-center text-gray-300 leading-8 max-w-4xl mx-auto">
            FantasyPilot transforms complex cricket data into easy-to-understand
            AI recommendations, helping users build competitive fantasy teams
            with confidence.
          </p>
        </div>
      </section>

      {/* Feature Cards */}

      <section className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="text-4xl font-bold text-center mb-14">Core Features</h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-[#16103b] to-[#100a2d] border border-indigo-700 rounded-2xl p-8 hover:border-cyan-500 transition duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mb-6">
                <i className={`${feature.icon} text-3xl text-cyan-400`}></i>
              </div>

              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>

              <p className="text-gray-300 leading-7">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}

      <section className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="text-4xl font-bold text-center mb-14">
          Why FantasyPilot Stands Out
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-xl border border-indigo-700 bg-[#16103b] p-6"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <i className="fa-solid fa-check text-green-400 text-xl"></i>
              </div>

              <h3 className="text-lg font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming */}

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-3xl border border-indigo-700 bg-gradient-to-r from-[#16103b] to-[#100a2d] p-10">
          <h2 className="text-3xl font-bold text-center mb-10">Coming Soon</h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {upcoming.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl bg-[#09041b] border border-indigo-700 p-6 text-center"
              >
                <i className="fa-solid fa-rocket text-cyan-400 text-3xl mb-4"></i>

                <h3 className="font-semibold">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className=" bg-[#06030c] border-t border-slate-800">
        <div className="max-w-7xl mx-auto py-4 px-6 flex justify-center items-center gap-2 text-gray-300 text-sm">
          <i className="fa-regular fa-copyright"></i>
          <p>
            {new Date().getFullYear()}{" "}
            <span className="font-semibold text-cyan-400">FantasyPilot</span>.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
