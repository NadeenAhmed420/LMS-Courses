import { useRef, useState, useEffect, useCallback } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaClosedCaptioning,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import { FaArrowRotateLeft, FaArrowRotateRight } from "react-icons/fa6";
import {
  formatTime,
  togglePlay,
  handleSeek,
  toggleMute,
  handleVolume,
  handleRate,
  skip,
  toggleFullscreen,
} from "../lib/helper";

interface Transcript {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
}

export default function VideoPlayer({
  src,
  transcript,
  onCompleted,
  onPrevChapter,
  onNextChapter,
  onTimeUpdate,
  seekToTime,
  hasPrev = false,
  hasNext = false,
}: {
  src: string;
  transcript: Transcript[];
  onCompleted: () => void;
  onPrevChapter: () => void;
  onNextChapter: () => void;
  onTimeUpdate?: (time: number) => void;
  seekToTime?: number;
  hasPrev?: boolean;
  hasNext?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [captionsText, setCaptionsText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [feedbackIcon, setFeedbackIcon] = useState<
    null | "play" | "pause" | "forward" | "backward"
  >(null);

  const [completedReported, setCompletedReported] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Only process keys if the video player is focused
      if (!isFocused) return;

      const video = videoRef.current;
      if (!video) return;

      // Don't interfere with inputs or textareas
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay(videoRef, setIsPlaying, setFeedbackIcon);
          break;
        case "ArrowLeft":
          e.preventDefault();
          skip(videoRef, -10, setFeedbackIcon);
          break;
        case "ArrowRight":
          e.preventDefault();
          skip(videoRef, 10, setFeedbackIcon);
          break;
        case "ArrowUp":
          e.preventDefault();
          handleVolume(videoRef, String(Math.min(1, volume + 0.1)), setVolume);
          break;
        case "ArrowDown":
          e.preventDefault();
          handleVolume(videoRef, String(Math.max(0, volume - 0.1)), setVolume);
          break;
        case "m":
          e.preventDefault();
          toggleMute(videoRef, setVolume);
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen(videoRef, setFullscreen);
          break;
        case "c":
          e.preventDefault();
          setCaptionsOn((prev) => !prev);
          break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          e.preventDefault();
          // // Calculate percentage based on numeric key (0-9)
          // const percent = e.key === "0" ? 0 : parseInt(e.key, 10) / 10;
          // // Calculate new time position
          // const newTime = Math.min(duration * percent, duration);
          // // Seek to new position
          // handleSeek(videoRef, String(newTime), setCurrentTime);
          break;
        case ">":
        case ".":
          e.preventDefault();
          if (isPlaying) {
            handleRate(
              videoRef,
              String(Math.min(2, playbackRate + 0.25)),
              setPlaybackRate
            );
          }
          break;
        case "<":
        case ",":
          e.preventDefault();
          if (isPlaying) {
            handleRate(
              videoRef,
              String(Math.max(0.5, playbackRate - 0.25)),
              setPlaybackRate
            );
          }
          break;
        default:
          break;
      }
    },
    [isFocused, volume, duration, isPlaying, playbackRate]
  );

  // Add keyboard event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const focusIn = () => setIsFocused(true);
    const focusOut = () => setIsFocused(false);

    container.addEventListener("focusin", focusIn);
    container.addEventListener("focusout", focusOut);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("focusin", focusIn);
      container.removeEventListener("focusout", focusOut);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const timeUpdate = () => {
      const currentTime = video.currentTime;
      setCurrentTime(currentTime);

      // Update captions text based on current time
      const currentCaption = transcript.find(
        (t) => currentTime >= t.startTime && currentTime <= t.endTime
      );

      setCaptionsText(currentCaption ? currentCaption.text : "");

      if (onTimeUpdate) {
        onTimeUpdate(currentTime);
      }
    };

    const loaded = () => setDuration(video.duration);

    video.addEventListener("timeupdate", timeUpdate);
    video.addEventListener("loadedmetadata", loaded);

    return () => {
      video.removeEventListener("timeupdate", timeUpdate);
      video.removeEventListener("loadedmetadata", loaded);
    };
  }, [onTimeUpdate, transcript]);

  useEffect(() => {
    if (
      seekToTime !== undefined &&
      videoRef.current &&
      Math.abs(videoRef.current.currentTime - seekToTime) > 1
    ) {
      videoRef.current.currentTime = seekToTime;
      setCurrentTime(seekToTime);
    }
  }, [seekToTime]);

useEffect(() => {
  if (!completedReported && duration > 0 && currentTime / duration >= 0.9) {
    onCompleted(); // ✅ Only mark complete at 90%
    setCompletedReported(true);
  }
}, [currentTime, duration, completedReported, onCompleted]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black rounded-xl overflow-hidden shadow-md my-8"
      tabIndex={0}
    >
  <video
  ref={videoRef}
  className="w-full"
  src={src}
  onClick={() => togglePlay(videoRef, setIsPlaying, setFeedbackIcon)}
  onEnded={onNextChapter} // ✅ Only navigate when video fully ends
/>
      {captionsOn && captionsText && (
        <div className="absolute bottom-24 left-0 right-0 flex justify-center">
          <div className="bg-black/70 text-white px-4 py-2 rounded-lg max-w-3xl text-center">
            {captionsText}
          </div>
        </div>
      )}

      {feedbackIcon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-3 text-white text-6xl opacity-90">
            {feedbackIcon === "play" && (
              <div className="flex items-center animate-slide-fade">
                <FaPlay size={50} />
              </div>
            )}
            {feedbackIcon === "pause" && (
              <div className="flex items-center animate-slide-fade">
                <FaPause size={50} />
              </div>
            )}
            {feedbackIcon === "forward" && (
              <div className="flex items-center gap-3 animate-slide-fade">
                <FaArrowRotateRight size={35} />
                <span className="text-4xl font-semibold">10s</span>
              </div>
            )}
            {feedbackIcon === "backward" && (
              <div className="flex items-center gap-3 animate-slide-fade">
                <FaArrowRotateLeft size={35} />
                <span className="text-4xl font-semibold">10s</span>
              </div>
            )}
          </div>
        </div>
      )}

      {hasPrev && (
        <button
          onClick={onPrevChapter}
          className="absolute left-5 top-1/2 -translate-y-1/2 bg-gray-800/70 p-3 rounded-full text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Previous chapter"
        >
          <FaChevronLeft size={20} />
        </button>
      )}

      {hasNext && (
        <button
          onClick={onNextChapter}
          className="absolute right-5 top-1/2 -translate-y-1/2 bg-gray-800/70 p-3 rounded-full text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Next chapter"
        >
          <FaChevronRight size={20} />
        </button>
      )}

      <div className="px-3">
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={currentTime}
          onChange={(e) => handleSeek(videoRef, e.target.value, setCurrentTime)}
          className="w-full accent-blue-500"
          aria-label="Video progress"
        />
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between justify-start items-start gap-3 p-3 bg-gray-900 text-white text-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => togglePlay(videoRef, setIsPlaying, setFeedbackIcon)}
            className="p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <button
            onClick={() => skip(videoRef, -10, setFeedbackIcon)}
            className="p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Rewind 10 seconds"
          >
            <FaArrowRotateLeft />
          </button>

          <button
            onClick={() => skip(videoRef, 10, setFeedbackIcon)}
            className="p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Forward 10 seconds"
          >
            <FaArrowRotateRight />
          </button>

          <span className="text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Volume Control */}
          <div className="flex items-center gap-2 w-40">
            <button
              onClick={() => toggleMute(videoRef, setVolume)}
              className="p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-white"
              aria-label={volume === 0 ? "Unmute" : "Mute"}
            >
              {volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>

            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) =>
                handleVolume(videoRef, e.target.value, setVolume)
              }
              className="w-full accent-blue-500"
              aria-label="Volume control"
            />
          </div>

          <select
            value={playbackRate}
            onChange={(e) =>
              handleRate(videoRef, e.target.value, setPlaybackRate)
            }
            className="bg-gray-700 rounded px-2 h-8 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Playback speed"
          >
            <option value="0.5">0.5×</option>
            <option value="1">1×</option>
            <option value="1.5">1.5×</option>
            <option value="2">2×</option>
          </select>

          <button
            onClick={() => setCaptionsOn(!captionsOn)}
            className="p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={captionsOn ? "Turn off captions" : "Turn on captions"}
          >
            <FaClosedCaptioning className={captionsOn ? "text-blue-400" : ""} />
          </button>

          <button
            onClick={() => toggleFullscreen(videoRef, setFullscreen)}
            className="p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {fullscreen ? <FaCompress /> : <FaExpand />}
          </button>
        </div>
      </div>

      {isFocused && (
        <div className="absolute top-0 left-0 right-0 bg-black/100 text-white text-xs p-2 text-center ">
          <span className="mr-5">
            <span className="px-2 py-0.5 bg-gray-600 rounded">Space</span>{" "}
            Play/Pause
          </span>
          <span className="mr-5">
            <span className="px-2 py-0.5 bg-gray-600 rounded mx-1">←</span>{" "}
            Rewind 10s
          </span>
          <span className="mr-5">
            <span className="px-2 py-0.5 bg-gray-600 rounded mx-1">→</span>{" "}
            Forward 10s
          </span>
          <span className="mr-5">
            <span className="px-2 py-0.5 bg-gray-600 rounded mx-1">↑</span>{" "}
            Volume Up
          </span>
          <span className="mr-5">
            <span className="px-2 py-0.5 bg-gray-600 rounded mx-1">↓</span>{" "}
            Volume Down
          </span>
          <span className="mr-5">
            <span className="px-2 py-0.5 bg-gray-600 rounded mx-1">M</span> Mute
          </span>
          <span className="mr-5">
            <span className="px-2 py-0.5 bg-gray-600 rounded mx-1">F</span>{" "}
            Fullscreen
          </span>
          <span>
            <span className="px-2 py-0.5 bg-gray-600 rounded mx-1">C</span>{" "}
            Captions
          </span>
        </div>
      )}

      {/* Tailwind animation */}
      <style>{`
        @keyframes slide-fade {
          0% { opacity: 0; transform: translateY(10px) scale(1); }
          50% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-10px) scale(0.9); }
        }
        .animate-slide-fade {
          animation: slide-fade 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
}
