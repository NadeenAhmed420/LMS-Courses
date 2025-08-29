import {type Lesson } from '../types';

// Format time from seconds to MM:SS format
export const formatTime = (time: number): string => {
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

// Format duration from seconds to MM:SS format
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Calculate course progress percentage based on completed lessons
export const calculateProgress = (lessons: Lesson[]): number => {
  if (lessons.length === 0) return 0;
  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  return Math.round((completedLessons / lessons.length) * 100);
};

// Video player helper functions
export const showFeedback = (
  setFeedbackIcon: (icon: "play" | "pause" | "forward" | "backward" | null) => void,
  type: "play" | "pause" | "forward" | "backward"
) => {
  setFeedbackIcon(type);
  setTimeout(() => setFeedbackIcon(null), 700);
};

export const togglePlay = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
  setIsPlaying: (playing: boolean) => void,
  setFeedbackIcon: (icon: "play" | "pause" | "forward" | "backward" | null) => void
) => {
  const v = videoRef.current;
  if (!v) return;
  
  if (v.paused) {
    v.play();
    setIsPlaying(true);
    showFeedback(setFeedbackIcon, "play");
  } else {
    v.pause();
    setIsPlaying(false);
    showFeedback(setFeedbackIcon, "pause");
  }
};

export const handleSeek = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
  value: string,
  setCurrentTime: (time: number) => void
) => {
  const v = videoRef.current;
  if (!v) return;
  const newTime = Number(value);
  v.currentTime = newTime;
  setCurrentTime(newTime);
};

export const toggleMute = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
  setVolume: (volume: number) => void
) => {
  const v = videoRef.current;
  if (!v) return;
  v.muted = !v.muted;
  setVolume(v.muted ? 0 : v.volume);
};

export const handleVolume = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
  value: string,
  setVolume: (volume: number) => void
) => {
  const v = videoRef.current;
  if (!v) return;
  const vol = Number(value);
  v.volume = vol;
  setVolume(vol);
};

export const handleRate = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
  value: string,
  setPlaybackRate: (rate: number) => void
) => {
  const v = videoRef.current;
  if (!v) return;
  const rate = Number(value);
  v.playbackRate = rate;
  setPlaybackRate(rate);
};

export const skip = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
  seconds: number,
  setFeedbackIcon: (icon: "play" | "pause" | "forward" | "backward" | null) => void
) => {
  if (videoRef.current) {
    videoRef.current.currentTime += seconds;
    showFeedback(setFeedbackIcon, seconds > 0 ? "forward" : "backward");
  }
};

export const toggleFullscreen = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
  setFullscreen: (fullscreen: boolean) => void
) => {
  const videoContainer = videoRef.current?.parentElement;
  if (!videoContainer) return;

  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
    setFullscreen(true);
  } else {
    document.exitFullscreen();
    setFullscreen(false);
  }
};


