"use client";

import React from "react";

const workflow = [
  {
    icon: "fa-solid fa-calendar-days",
    title: "1. Select Match",
    description:
      "The user selects an upcoming cricket match to begin the fantasy team generation process.",
  },
  {
    icon: "fa-solid fa-database",
    title: "2. Collect Match Data",
    description:
      "FantasyPilot gathers player statistics, venue information, weather conditions, pitch report and squad details from trusted APIs.",
  },
  {
    icon: "fa-solid fa-brain",
    title: "3. AI Analysis",
    description:
      "The AI engine evaluates recent form, historical records, venue performance, opponent strength, weather impact and playing conditions.",
  },
  {
    icon: "fa-solid fa-users",
    title: "4. Generate Playing XI",
    description:
      "Based on the analysis, FantasyPilot recommends the best fantasy XI along with Captain and Vice-Captain suggestions.",
  },
  {
    icon: "fa-solid fa-chart-column",
    title: "5. Player Insights",
    description:
      "Users can open any player to view career statistics, recent performances, AI reasoning and predicted fantasy score.",
  },
  {
    icon: "fa-solid fa-trophy",
    title: "6. Build Winning Team",
    description:
      "The final AI-powered recommendations help users create stronger fantasy cricket teams with greater confidence.",
  },
];

const technologies = [
  "Next.js",
  "Tailwind CSS",
  "FastAPI",
  "Python",
  "LangGraph",
  "OpenWeather API",
  "Cricket Statistics API",
  "RAG",
];

const factors = [
  "Recent Player Form",
  "Venue Performance",
  "Weather Conditions",
  "Pitch Behaviour",
  "Opponent Analysis",
  "Captaincy Impact",
  "Fantasy Credits",
  "Historical Records",
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-[#09041b] text-white">
      {/* Hero */}

      <section className="py-20 text-center px-6">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          How FantasyPilot Works
        </h1>

        <p className="max-w-4xl mx-auto mt-6 text-lg text-gray-300 leading-8">
          FantasyPilot combines Artificial Intelligence, live cricket
          statistics, weather intelligence and predictive analytics to recommend
          the strongest fantasy cricket team.
        </p>
      </section>

      {/* Workflow */}

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-4xl font-bold text-center mb-14">AI Workflow</h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {workflow.map((step, index) => (
            <div
              key={index}
              className="rounded-2xl border border-indigo-700 bg-gradient-to-b from-[#16103b] to-[#100a2d] p-8 hover:border-cyan-500 transition hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mb-6">
                <i className={`${step.icon} text-cyan-400 text-3xl`}></i>
              </div>

              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>

              <p className="text-gray-300 leading-7">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Decision */}

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-3xl border border-indigo-700 bg-gradient-to-r from-[#16103b] to-[#100a2d] p-10">
          <h2 className="text-4xl font-bold text-center mb-10">
            AI Decision Engine
          </h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {factors.map((factor, index) => (
              <div
                key={index}
                className="rounded-xl border border-indigo-700 bg-[#09041b] p-6 text-center"
              >
                <i className="fa-solid fa-brain text-cyan-400 text-3xl mb-4"></i>

                <h3 className="font-semibold">{factor}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-4xl font-bold text-center mb-12">
          Technology Stack
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="rounded-xl border border-indigo-700 bg-[#16103b] p-6 text-center hover:border-cyan-500 transition"
            >
              <i className="fa-solid fa-code text-cyan-400 text-3xl mb-4"></i>

              <h3 className="font-semibold">{tech}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-3xl border border-cyan-600 bg-cyan-500/10 p-10 text-center">
          <i className="fa-solid fa-lightbulb text-cyan-400 text-5xl mb-6"></i>

          <h2 className="text-3xl font-bold mb-4">
            Intelligent Fantasy Cricket Starts Here
          </h2>

          <p className="text-gray-300 max-w-3xl mx-auto leading-8">
            FantasyPilot doesn't rely on a single statistic. It combines
            multiple data sources and AI-driven analysis to recommend balanced
            fantasy teams with transparent reasoning and confidence scores.
          </p>
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
