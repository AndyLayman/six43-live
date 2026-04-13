"use client";

interface InningTrackerProps {
  currentInning: number;
  isTopInning: boolean;
  totalInnings?: number;
}

export default function InningTracker({
  currentInning,
  isTopInning,
  totalInnings = 9,
}: InningTrackerProps) {
  return (
    <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-700 px-4 py-2 shadow-2xl">
      <div className="flex items-center gap-3">
        {/* Inning arrow */}
        <div className="flex flex-col items-center gap-0.5 mr-1">
          <span
            className={`text-[10px] leading-none ${
              isTopInning ? "text-white" : "text-gray-600"
            }`}
          >
            &#9650;
          </span>
          <span className="text-lg font-bold text-white leading-none">
            {currentInning}
          </span>
          <span
            className={`text-[10px] leading-none ${
              !isTopInning ? "text-white" : "text-gray-600"
            }`}
          >
            &#9660;
          </span>
        </div>

        {/* Inning dots */}
        <div className="flex gap-1">
          {Array.from({ length: totalInnings }, (_, i) => i + 1).map(
            (inning) => (
              <div
                key={inning}
                className={`w-2 h-2 rounded-full ${
                  inning < currentInning
                    ? "bg-blue-500"
                    : inning === currentInning
                      ? "bg-white"
                      : "bg-gray-600"
                }`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
