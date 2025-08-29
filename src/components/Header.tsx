import React from "react";
import { type Course } from "../types";

interface HeaderProps {
  title: string;
  breadcrumb: string[];
  progress: number; // 0–100
  currentCourse: Course;
}

const Header: React.FC<HeaderProps> = ({
  title,
  breadcrumb,
  progress,
  currentCourse,
}) => {
  const completedLessons = currentCourse.lessons.filter(
    (lesson) => lesson.completed
  ).length;
  const totalLessons = currentCourse.lessons.length;

  return (
    <header className="bg-gray-100 p-5 shadow-sm rounded-xl">
      <nav className="text-xs lg:text-md text-gray-400 mb-3">
        {breadcrumb.length > 0 ? (
          breadcrumb.map((item, i) => (
            <span
              key={i}
              className={
                i === breadcrumb.length - 1
                  ? "text-gray-700 font-semibold underline"
                  : ""
              }
            >
              {item}
              {i < breadcrumb.length - 1 && " > "}
            </span>
          ))
        ) : (
          <span className="text-gray-700 font-semibold">Online Course</span>
        )}
      </nav>

      <h1 className="flex flex-col lg:flex-row gap-2 text-lg lg:text-xl font-semibold text-gray-400">
        Course: <p className="text-[#0b51ff]">{title}</p>
      </h1>

      <div className="mt-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs lg:text-md font-medium text-gray-600">
            Course Progress
          </span>
          <span className="text-xs lg:text-md font-medium text-[#0b51ff]">
            {progress}% Completed
          </span>
        </div>
        <div className="h-2 w-full rounded bg-gray-200">
          <div
            className="h-2 rounded bg-[#0b51ff] transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-xs lg:text-md font-medium text-gray-400 mt-2">
          {completedLessons} of {totalLessons} lessons completed
        </p>
      </div>
    </header>
  );
};

export default Header;
