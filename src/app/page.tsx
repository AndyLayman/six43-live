"use client";

import { useState } from "react";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import Scoreboard from "@/components/Scoreboard";
import CountIndicator from "@/components/CountIndicator";
import InningTracker from "@/components/InningTracker";
import BasesIndicator from "@/components/BasesIndicator";

export default function Home() {
  const [videoId, setVideoId] = useState("");
  const [videoInput, setVideoInput] = useState("");
  const [showControls, setShowControls] = useState(true);

  // Game state
  const [awayTeam, setAwayTeam] = useState({ name: "New York Yankees", abbreviation: "NYY", runs: 0, hits: 0, errors: 0 });
  const [homeTeam, setHomeTeam] = useState({ name: "Boston Red Sox", abbreviation: "BOS", runs: 0, hits: 0, errors: 0 });
  const [inning, setInning] = useState(1);
  const [isTopInning, setIsTopInning] = useState(true);
  const [balls, setBalls] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [outs, setOuts] = useState(0);
  const [bases, setBases] = useState({ first: false, second: false, third: false });

  const handleLoadVideo = () => {
    // Extract video ID from URL or use raw ID
    const match = videoInput.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|live\/))([\w-]+)/
    );
    setVideoId(match ? match[1] : videoInput.trim());
  };

  const resetCount = () => {
    setBalls(0);
    setStrikes(0);
  };

  const advanceInning = () => {
    if (isTopInning) {
      setIsTopInning(false);
    } else {
      setIsTopInning(true);
      setInning((prev) => prev + 1);
    }
    setOuts(0);
    resetCount();
    setBases({ first: false, second: false, third: false });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Layer 1: YouTube Live Stream */}
      {videoId ? (
        <YouTubeEmbed videoId={videoId} />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-gray-400">
          <svg className="w-20 h-20 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="text-lg font-medium">No stream loaded</p>
          <p className="text-sm text-gray-500 mt-1">
            Enter a YouTube video/live URL below
          </p>
        </div>
      )}

      {/* Layer 2: Baseball Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left: Scoreboard + Count */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-auto">
          <Scoreboard
            away={awayTeam}
            home={homeTeam}
            inning={inning}
            isTopInning={isTopInning}
          />
          <div className="flex gap-2">
            <CountIndicator balls={balls} strikes={strikes} outs={outs} />
            <BasesIndicator
              first={bases.first}
              second={bases.second}
              third={bases.third}
            />
          </div>
        </div>

        {/* Top-right: Inning tracker */}
        <div className="absolute top-4 right-4 pointer-events-auto">
          <InningTracker
            currentInning={inning}
            isTopInning={isTopInning}
          />
        </div>
      </div>

      {/* Controls Toggle */}
      <button
        onClick={() => setShowControls(!showControls)}
        className="absolute bottom-4 right-4 z-50 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold backdrop-blur-sm border border-gray-600 transition-colors"
        title={showControls ? "Hide Controls" : "Show Controls"}
      >
        {showControls ? "X" : "C"}
      </button>

      {/* Layer 3: Control Panel (for testing) */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 p-4 z-40">
          <div className="max-w-6xl mx-auto space-y-4">
            {/* Video URL Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={videoInput}
                onChange={(e) => setVideoInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLoadVideo()}
                placeholder="Paste YouTube URL or video ID..."
                className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleLoadVideo}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Load Stream
              </button>
            </div>

            {/* Game Controls */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {/* Team Controls */}
              <div className="space-y-2">
                <h3 className="text-gray-400 font-semibold text-xs uppercase tracking-wider">Away Team</h3>
                <div className="flex gap-1">
                  <input
                    value={awayTeam.abbreviation}
                    onChange={(e) => setAwayTeam({ ...awayTeam, abbreviation: e.target.value.toUpperCase() })}
                    className="w-16 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-xs"
                    maxLength={4}
                  />
                  <button onClick={() => setAwayTeam({ ...awayTeam, runs: awayTeam.runs + 1 })} className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs transition-colors">R+</button>
                  <button onClick={() => setAwayTeam({ ...awayTeam, hits: awayTeam.hits + 1 })} className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs transition-colors">H+</button>
                  <button onClick={() => setAwayTeam({ ...awayTeam, errors: awayTeam.errors + 1 })} className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs transition-colors">E+</button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-gray-400 font-semibold text-xs uppercase tracking-wider">Home Team</h3>
                <div className="flex gap-1">
                  <input
                    value={homeTeam.abbreviation}
                    onChange={(e) => setHomeTeam({ ...homeTeam, abbreviation: e.target.value.toUpperCase() })}
                    className="w-16 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-xs"
                    maxLength={4}
                  />
                  <button onClick={() => setHomeTeam({ ...homeTeam, runs: homeTeam.runs + 1 })} className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs transition-colors">R+</button>
                  <button onClick={() => setHomeTeam({ ...homeTeam, hits: homeTeam.hits + 1 })} className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs transition-colors">H+</button>
                  <button onClick={() => setHomeTeam({ ...homeTeam, errors: homeTeam.errors + 1 })} className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs transition-colors">E+</button>
                </div>
              </div>

              {/* Count / Outs */}
              <div className="space-y-2">
                <h3 className="text-gray-400 font-semibold text-xs uppercase tracking-wider">Count</h3>
                <div className="flex gap-1">
                  <button onClick={() => setBalls(Math.min(balls + 1, 3))} className="bg-green-700 hover:bg-green-600 text-white px-2 py-1 rounded text-xs transition-colors">Ball</button>
                  <button onClick={() => setStrikes(Math.min(strikes + 1, 2))} className="bg-red-700 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors">Strike</button>
                  <button onClick={() => setOuts(Math.min(outs + 1, 2))} className="bg-yellow-700 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs transition-colors">Out</button>
                  <button onClick={resetCount} className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs transition-colors">Reset</button>
                </div>
              </div>

              {/* Inning / Bases */}
              <div className="space-y-2">
                <h3 className="text-gray-400 font-semibold text-xs uppercase tracking-wider">Game</h3>
                <div className="flex gap-1 flex-wrap">
                  <button onClick={advanceInning} className="bg-blue-700 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors">Next Half</button>
                  <button onClick={() => setBases({ ...bases, first: !bases.first })} className={`px-2 py-1 rounded text-xs transition-colors ${bases.first ? "bg-yellow-600 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"}`}>1B</button>
                  <button onClick={() => setBases({ ...bases, second: !bases.second })} className={`px-2 py-1 rounded text-xs transition-colors ${bases.second ? "bg-yellow-600 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"}`}>2B</button>
                  <button onClick={() => setBases({ ...bases, third: !bases.third })} className={`px-2 py-1 rounded text-xs transition-colors ${bases.third ? "bg-yellow-600 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"}`}>3B</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
