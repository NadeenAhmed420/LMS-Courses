export type Lesson = {
  id: string;
  title: string;
  description: string;
  instructor: string;
  durationSec: number;
  url: string;
  transcript?: TranscriptCue[];
  locked?: boolean;
  completed?: boolean;
};

export type Chapter = {
  label: string;
  atSec: number;
};

export type Resource = {
  id: string;
  name: string;
  type: string;
  url: string;
  size?: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  instructor: string;
  lessons: Lesson[];
  chaptersByLessonId: Record<string, Chapter[]>;
  resources: Resource[];
  breadcrumb?: string[];
};

export type TranscriptCue = {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
};

export type Note = {
  id: string;
  timestamp: number;
  text: string;
  createdAt: Date;
  lessonId: string; // 👈 add this
  courseId: string; // 👈 add this
};
