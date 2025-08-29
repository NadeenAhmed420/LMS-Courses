import React from "react";
import { type Course } from "../types";
import { formatDuration } from "../lib/helper";
import { CiCircleCheck, CiLock } from "react-icons/ci";
import { LuMonitorPlay } from "react-icons/lu";

interface CourseSideBarProps {
  courses: Course[];
  activeCourseIndex: number;
  activeLessonIndex: number;
  onSelectCourse: (courseIndex: number, lessonIndex: number) => void;
  variant?: "sidebar" | "drawer"; // <--- new
  onClose?: () => void; // <--- for drawer close
}

const CourseSideBar: React.FC<CourseSideBarProps> = ({
  courses,
  activeCourseIndex,
  activeLessonIndex,
  onSelectCourse,
  variant = "sidebar",
  onClose,
}) => {
  return (
    <aside
      className={` h-full bg-white  overflow-y-auto p-4 transition-transform ${
        variant === "drawer"
          ? "w-full max-w-[100vw]"
          : "w-full overflow-y-auto px-1"
      }`}
    >
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md lg:text-2xl font-bold border-b border-gray-300 text-gray-800 w-full pb-4">
            Course Content
          </h3>
          {variant === "drawer" && (
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={onClose}
            >
              ✕
            </button>
          )}
        </div>

        {courses.map((course, courseIndex) => (
          <details
            key={course.id}
            className="border border-gray-300 rounded-lg text-sm lg:text-md bg-white shadow-md mt-5 mb-2 py-3"
            open={
              courseIndex === activeCourseIndex ||
              courseIndex === 0 ||
              courseIndex === 1
            }
          >
            <summary className="px-5 py-3 cursor-pointer hover:bg-gray-200 font-medium text-gray-800 list-none">
              <div className="flex justify-between items-center">
                <span>{course.title}</span>
                <span className="text-xs text-gray-500">
                  ({course.lessons.length}) Lessons
                </span>
              </div>
            </summary>

            <div className="overflow-y-auto">
              {course.lessons.map((lesson, lessonIndex) => (
                <button
                  key={lesson.id}
                  disabled={lesson.locked}
                  onClick={() => {
                    onSelectCourse(courseIndex, lessonIndex);
                    if (variant === "drawer" && onClose) onClose();
                  }}
                  className={`flex justify-between items-center p-3 w-full text-left border-b border-gray-300 last:border-b-0 hover:bg-gray-50 transition-colors hover:text-[#0b51ff] hover:bg-gray-200 
                ${
                  courseIndex === activeCourseIndex &&
                  lessonIndex === activeLessonIndex
                    ? "bg-blue-100 border-blue-300"
                    : ""
                }
                ${lesson.locked ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex-1 ps-2">
                    <p className="font-medium text-xs lg-text-sm">
                      {lesson.title}
                    </p>
                    <p className="flex gap-2 items-center text-sm text-gray-500 mt-2">
                      <LuMonitorPlay /> {formatDuration(lesson.durationSec)} min
                    </p>
                  </div>
                  <div className="text-lg ml-2">
                    {lesson.completed ? (
                      <CiCircleCheck size={25} color="green" />
                    ) : lesson.locked ? (
                      <CiLock size={25} color="gray" />
                    ) : (
                      ""
                    )}
                  </div>
                </button>
              ))}
            </div>
          </details>
        ))}
      </div>
    </aside>
  );
};

export default CourseSideBar;
