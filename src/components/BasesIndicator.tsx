"use client";

interface BasesIndicatorProps {
  first: boolean;
  second: boolean;
  third: boolean;
}

export default function BasesIndicator({
  first,
  second,
  third,
}: BasesIndicatorProps) {
  return (
    <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg border border-gray-700 p-3 shadow-2xl">
      <div className="flex flex-col items-center gap-0.5">
        {/* Second base */}
        <div
          className={`w-5 h-5 rotate-45 border-2 ${
            second
              ? "bg-yellow-400 border-yellow-300"
              : "bg-gray-700 border-gray-600"
          }`}
        />
        {/* First and Third */}
        <div className="flex gap-4">
          <div
            className={`w-5 h-5 rotate-45 border-2 ${
              third
                ? "bg-yellow-400 border-yellow-300"
                : "bg-gray-700 border-gray-600"
            }`}
          />
          <div
            className={`w-5 h-5 rotate-45 border-2 ${
              first
                ? "bg-yellow-400 border-yellow-300"
                : "bg-gray-700 border-gray-600"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
