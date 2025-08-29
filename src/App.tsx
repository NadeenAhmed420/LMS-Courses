import { useState, useMemo, useEffect } from "react";
import { mockCourses } from "./mockCourse";
import { type Course, type Note } from "./types";
import Header from "./components/Header";
import VideoPlayer from "./components/VideoPlayer";
import CourseSideBar from "./components/CourseSideBar";
import ChapterMarkers from "./components/ChapterMarkers";
import { calculateProgress } from "./lib/helper";
import BottomDrawer from "./components/BottomDrawar";

export default function App() {
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const [courses, setCourses] = useState<Course[]>(() => {
    const stored = localStorage.getItem("courses");
    if (stored) {
      return JSON.parse(stored);
    }
    return mockCourses.map((course) => ({
      ...course,
      lessons: course.lessons.map((lesson) => ({
        ...lesson,
        completed: false,
      })),
    }));
  });

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const [notes, setNotes] = useState<Note[]>(() => {
    const stored = localStorage.getItem("notes");
    if (stored) {
      const parsed: Note[] = JSON.parse(stored);
      // Convert createdAt back to Date
      return parsed.map((note) => ({
        ...note,
        createdAt: new Date(note.createdAt),
      }));
    }
    return [];
  });

  const currentCourse = courses[currentCourseIndex];
  const currentLesson = currentCourse.lessons[currentLessonIndex];
  const currentChapters =
    currentCourse.chaptersByLessonId[currentLesson.id] || [];
  const progress = useMemo(
    () => calculateProgress(currentCourse.lessons),
    [currentCourse.lessons]
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleCourseAndLessonSelect = (
    courseIndex: number,
    lessonIndex: number
  ) => {
    const selectedLesson = courses[courseIndex].lessons[lessonIndex];
    if (!selectedLesson.locked) {
      setCurrentCourseIndex(courseIndex);
      setCurrentLessonIndex(lessonIndex);
      setCurrentTime(0);
    }
  };

  const handleSeekToTime = (time: number) => setCurrentTime(time);
  const handleSeekToChapter = (time: number) => setCurrentTime(time);

  const handleAddNote = (timestamp: number, text: string) => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      timestamp,
      text,
      createdAt: new Date(),
      lessonId: currentLesson.id,
      courseId: currentCourse.id,
    };
    setNotes((prev) => [...prev, newNote]);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  const handleLessonCompleted = () => {
    setCourses((prevCourses) =>
      prevCourses.map((course, courseIdx) =>
        courseIdx === currentCourseIndex
          ? {
              ...course,
              lessons: course.lessons.map((lesson, lessonIdx) =>
                lessonIdx === currentLessonIndex
                  ? { ...lesson, completed: true }
                  : lesson
              ),
            }
          : course
      )
    );
  };
  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setCurrentTime(0);
    } else if (currentCourseIndex > 0) {
      const prevCourseIndex = currentCourseIndex - 1;
      const prevCourse = courses[prevCourseIndex];
      setCurrentCourseIndex(prevCourseIndex);
      setCurrentLessonIndex(prevCourse.lessons.length - 1);
      setCurrentTime(0);
    }
  };

  const handleNextLesson = () => {
    const nextLessonIndex = currentLessonIndex + 1;
    const currentCourseData = courses[currentCourseIndex];

    if (nextLessonIndex < currentCourseData.lessons.length) {
      const nextLesson = currentCourseData.lessons[nextLessonIndex];
      if (!nextLesson.locked) {
        setCurrentLessonIndex(nextLessonIndex);
        setCurrentTime(0);
      }
    } else if (currentCourseIndex < courses.length - 1) {
      const nextCourseIndex = currentCourseIndex + 1;
      const nextCourse = courses[nextCourseIndex];
      if (nextCourse.lessons.length > 0 && !nextCourse.lessons[0].locked) {
        setCurrentCourseIndex(nextCourseIndex);
        setCurrentLessonIndex(0);
        setCurrentTime(0);
      }
    }
  };

  const hasPrev = currentLessonIndex > 0 || currentCourseIndex > 0;
  const hasNext = (() => {
    const nextLessonIndex = currentLessonIndex + 1;
    const currentCourseData = courses[currentCourseIndex];
    if (nextLessonIndex < currentCourseData.lessons.length) {
      return !currentCourseData.lessons[nextLessonIndex].locked;
    } else if (currentCourseIndex < courses.length - 1) {
      const nextCourse = courses[currentCourseIndex + 1];
      return nextCourse.lessons.length > 0 && !nextCourse.lessons[0].locked;
    }
    return false;
  })();

  return (
    <div className="my-5 px-2">
      <div className="flex justify-end mb-2 md:hidden">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="px-3 py-2 bg-blue-600 text-white rounded-md shadow-md"
        >
          Course Content
        </button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-9">
          <Header
            title={currentCourse.title}
            breadcrumb={currentCourse.breadcrumb || []}
            progress={progress}
            currentCourse={currentCourse}
          />
          <VideoPlayer
            key={currentLesson.id}
            src={currentLesson.url}
            transcript={currentLesson.transcript || []}
            onCompleted={handleLessonCompleted}
            onPrevChapter={handlePrevLesson}
            onNextChapter={handleNextLesson}
            onTimeUpdate={setCurrentTime}
            seekToTime={currentTime}
            hasPrev={hasPrev}
            hasNext={hasNext}
          />

          {currentChapters.length > 0 && (
            <ChapterMarkers
              chapters={currentChapters}
              currentTime={currentTime}
              duration={currentLesson.durationSec}
              onSeekToChapter={handleSeekToChapter}
            />
          )}

          <BottomDrawer
            currentLesson={currentLesson}
            currentCourse={currentCourse}
            transcript={currentLesson.transcript || []}
            notes={notes.filter((note) => note.lessonId === currentLesson.id)} // optional filter
            currentTime={currentTime}
            onSeekToTime={handleSeekToTime}
            onAddNote={handleAddNote}
            onDeleteNote={handleDeleteNote}
          />
        </div>

        <div className="hidden lg:block col-span-12 lg:col-span-3">
          <CourseSideBar
            courses={courses}
            activeCourseIndex={currentCourseIndex}
            activeLessonIndex={currentLessonIndex}
            onSelectCourse={handleCourseAndLessonSelect}
            variant="sidebar"
          />
        </div>
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black opacity-60"
            onClick={() => setIsDrawerOpen(false)}
          />
          <CourseSideBar
            courses={courses}
            activeCourseIndex={currentCourseIndex}
            activeLessonIndex={currentLessonIndex}
            onSelectCourse={handleCourseAndLessonSelect}
            variant="drawer"
            onClose={() => setIsDrawerOpen(false)}
          />
        </div>
      )}
    </div>
  );
}
