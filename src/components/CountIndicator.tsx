"use client";

interface CountIndicatorProps {
  balls: number;
  strikes: number;
  outs: number;
}

export default function CountIndicator({
  balls,
  strikes,
  outs,
}: CountIndicatorProps) {
  return (
    <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-700 px-4 py-2 shadow-2xl">
      <div className="flex gap-5 text-xs font-semibold">
        {/* Balls */}
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 uppercase tracking-wider">B</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full border ${
                  i < balls
                    ? "bg-green-500 border-green-400"
                    : "bg-gray-700 border-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Strikes */}
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 uppercase tracking-wider">S</span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full border ${
                  i < strikes
                    ? "bg-red-500 border-red-400"
                    : "bg-gray-700 border-gray-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Outs */}
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 uppercase tracking-wider">O</span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full border ${
                  i < outs
                    ? "bg-yellow-500 border-yellow-400"
                    : "bg-gray-700 border-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
