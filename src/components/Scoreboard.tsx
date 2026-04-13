"use client";

export interface TeamScore {
  name: string;
  abbreviation: string;
  runs: number;
  hits: number;
  errors: number;
}

interface ScoreboardProps {
  away: TeamScore;
  home: TeamScore;
  inning: number;
  isTopInning: boolean;
}

export default function Scoreboard({
  away,
  home,
  inning,
  isTopInning,
}: ScoreboardProps) {
  return (
    <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden shadow-2xl min-w-[320px]">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-800/80 px-3 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        <span>Inning {inning}</span>
        <div className="flex gap-4">
          <span className="w-8 text-center">R</span>
          <span className="w-8 text-center">H</span>
          <span className="w-8 text-center">E</span>
        </div>
      </div>

      {/* Away Team */}
      <TeamRow
        team={away}
        isAtBat={isTopInning}
      />

      {/* Divider */}
      <div className="h-px bg-gray-700/50" />

      {/* Home Team */}
      <TeamRow
        team={home}
        isAtBat={!isTopInning}
      />
    </div>
  );
}

function TeamRow({
  team,
  isAtBat,
}: {
  team: TeamScore;
  isAtBat: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 transition-colors ${
        isAtBat ? "bg-yellow-500/10" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        {isAtBat && (
          <span className="text-yellow-400 text-xs">&#9654;</span>
        )}
        <span
          className={`font-bold text-sm tracking-wide ${
            isAtBat ? "text-white" : "text-gray-300"
          }`}
        >
          {team.abbreviation}
        </span>
      </div>
      <div className="flex gap-4">
        <span className="w-8 text-center font-mono text-lg font-bold text-white">
          {team.runs}
        </span>
        <span className="w-8 text-center font-mono text-lg text-gray-300">
          {team.hits}
        </span>
        <span className="w-8 text-center font-mono text-lg text-gray-400">
          {team.errors}
        </span>
      </div>
    </div>
  );
}
