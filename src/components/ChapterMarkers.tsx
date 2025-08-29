import React from "react";
import { type Chapter } from "../types";
import { formatTime } from "../lib/helper";

interface ChapterMarkersProps {
  chapters: Chapter[];
  currentTime: number;
  duration: number;
  onSeekToChapter: (time: number) => void;
}

const ChapterMarkers: React.FC<ChapterMarkersProps> = ({
  chapters,
  currentTime,
  duration,
  onSeekToChapter,
}) => {
  // Find the active chapter based on current time
  const getActiveChapterIndex = () => {
    if (chapters.length === 0) return -1;

    // Sort chapters by time to ensure proper order
    const sortedChapters = [...chapters].sort((a, b) => a.atSec - b.atSec);

    for (let i = sortedChapters.length - 1; i >= 0; i--) {
      if (currentTime >= sortedChapters[i].atSec) {
        return chapters.findIndex((chapter) => chapter === sortedChapters[i]);
      }
    }
    return -1;
  };

  const activeChapterIndex = getActiveChapterIndex();

  if (chapters.length === 0) {
    return null;
  }

  return (
    <div className="px-4 py-5 bg-gray-50 border-t border-gray-200 mb-5 ">
      <h4 className="text-xl font-bold text-gray-700 mb-4">Chapters</h4>

      <div className="flex flex-wrap gap-4">
        {chapters.map((chapter, index) => (
          <button
            key={`${chapter.label}-${chapter.atSec}`}
            onClick={() => onSeekToChapter(chapter.atSec)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium
              transition-all duration-200 hover:scale-105
              ${
                index === activeChapterIndex
                  ? "bg-[#0b51ff] text-white shadow-2xl"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:border-gray-400"
              }
            `}
          >
            <span className="truncate max-w-[120px] sm:max-w-[200px]">
              {chapter.label}
            </span>
            <span className="text-xs opacity-80">
             ({formatTime(chapter.atSec)})
            </span>
          </button>
        ))}
      </div>

      {/* Progress indicator for chapters */}
      <div className="relative mt-6 ">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0b51ff] transition-all duration-300"
            style={{
              width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
            }}
          />
        </div>

        {/* Chapter markers on progress bar */}
        <div className="absolute top-0 w-full h-2">
          {chapters.map((chapter, index) => (
            <div
              key={`marker-${chapter.label}-${chapter.atSec}`}
              className={`
                absolute top-[-1px] w-2 h-2 rounded-full transform -translate-x-1/2
                ${
                  index === activeChapterIndex
                    ? "bg-blue-600 scale-130"
                    : "bg-gray-300"
                }
              `}
              style={{
                left: `${duration > 0 ? (chapter.atSec / duration) * 100 : 0}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChapterMarkers;
