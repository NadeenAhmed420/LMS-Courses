import React, { useState, useRef, useEffect } from "react";
import {
  FaPlus,
  FaTrash,
  FaFilePdf,
  FaFileArchive,
  FaFileWord,
  FaFile,
  FaClock,
  FaUser,
} from "react-icons/fa";
import {
  type TranscriptCue,
  type Note,
  type Course,
  type Lesson,
  type Resource,
} from "../types";
import { formatTime } from "../lib/helper";
import { FiDownload } from "react-icons/fi";

interface BottomDrawerProps {
  transcript: TranscriptCue[];
  notes: Note[];
  currentTime: number;
  currentCourse: Course;
  currentLesson: Lesson;
  onSeekToTime: (time: number) => void;
  onAddNote: (timestamp: number, text: string) => void;
  onDeleteNote: (noteId: string) => void;
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  transcript,
  notes,
  currentTime,
  currentCourse,
  currentLesson,
  onSeekToTime,
  onAddNote,
  onDeleteNote,
}) => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "transcript" | "notes" | "resources"
  >("overview");
  const [newNoteText, setNewNoteText] = useState("");
  const [showAddNote, setShowAddNote] = useState(false);

  const transcriptRef = useRef<HTMLDivElement>(null);
  const activeTranscriptRef = useRef<HTMLDivElement>(null);

  const currentCue = transcript.find(
    (cue) => currentTime >= cue.startTime && currentTime <= cue.endTime
  );

  useEffect(() => {
    if (activeTranscriptRef.current && activeTab === "transcript") {
      activeTranscriptRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentCue?.id, activeTab]);

  const handleAddNote = () => {
    if (newNoteText.trim()) {
      onAddNote(currentTime, newNoteText.trim());
      setNewNoteText("");
      setShowAddNote(false);
    }
  };

  const handleSeekClick = (time: number) => {
    onSeekToTime(time);
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return (
          <div className="p-2 bg-red-100 rounded-md">
            <FaFilePdf className="text-red-500 size-4" />
          </div>
        );
      case "zip":
      case "rar":
        return (
          <div className="p-2 bg-yellow-100 rounded-md">
            <FaFileArchive className="text-yellow-500 size-4" />
          </div>
        );
      case "doc":
      case "docx":
        return (
          <div className="p-2 bg-blue-100 rounded-md">
            <FaFileWord className="text-blue-500 size-4" />
          </div>
        );
      default:
        return (
          <div className="p-2 bg-gray-100 rounded-md">
            <FaFile className="text-gray-500 size-4" />
          </div>
        );
    }
  };

  const handleDownload = (resource: Resource) => {
    const link = document.createElement("a");
    link.href = resource.url;
    link.download = resource.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <h4 className="text-xl font-bold text-gray-700 my-5 ps-3 ">
        Transcript & Notes
      </h4>
      <div className="bg-white border-t-4 rounded-lg border-[#0b51ff] shadow-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-gray-50">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-5 py-2 rounded-md font-medium transition-colors ${
                activeTab === "overview"
                  ? "bg-[#0b51ff] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={`px-5 py-2 rounded-md font-medium transition-colors ${
                activeTab === "resources"
                  ? "bg-[#0b51ff] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Resources
            </button>
            <button
              onClick={() => setActiveTab("transcript")}
              className={`px-5 py-2 rounded-md font-medium transition-colors ${
                activeTab === "transcript"
                  ? "bg-[#0b51ff] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Transcript
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === "notes"
                  ? "bg-[#0b51ff] text-white"
                  : "bg-gray-200 text-gray-500 hover:bg-gray-300"
              }`}
            >
              Notes ({notes.length})
            </button>
          </div>
        </div>

        <div className="h-80 overflow-y-auto mt-8">
          {activeTab === "overview" && (
            <div className="px-3 lg:p-5 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-300">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {currentLesson.title}
                  </h3>
                </div>

                <p className="w-fit md:w-3xl text-gray-500 mb-4 leading-relaxed">
                  {currentLesson.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                      <FaClock color="#0b51ff" size={14} />
                    </span>
                    <span className="text-gray-600">
                      {formatTime(currentLesson.durationSec)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                      <FaUser color="#0b51ff" size={13} />
                    </span>
                    <span className="text-gray-600">
                      {currentLesson.instructor}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "resources" && (
            <div className="p-4 space-y-3">
              {currentCourse.resources.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No resources available for this course.
                </p>
              ) : (
                currentCourse.resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-xl">
                          {getFileIcon(resource.type)}
                        </div>
                        <div>
                          <h4 className="text-md font-semibold text-gray-800 mb-1">
                            {resource.name}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="uppercase">{resource.type}</span>
                            {resource.size && (
                              <>
                                <span>•</span>
                                <span>{resource.size}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownload(resource)}
                        className="p-2 bg-[#0b51ff] text-white rounded-sm"
                      >
                        <FiDownload size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "transcript" && (
            <div ref={transcriptRef} className="p-4 space-y-2">
              {transcript.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No transcript available for this video.
                </p>
              ) : (
                transcript.map((cue) => (
                  <div
                    key={cue.id}
                    ref={currentCue?.id === cue.id ? activeTranscriptRef : null}
                    className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-100 ${
                      currentCue?.id === cue.id
                        ? "bg-blue-100 border-l-4 border-[#0b51ff]"
                        : "bg-gray-50"
                    }`}
                    onClick={() => handleSeekClick(cue.startTime)}
                  >
                    <div className="flex flex-col lg:flex-row items-start gap-3">
                      <span className="text-sm font-medium text-gray-500 min-w-[60px]">
                        {formatTime(cue.startTime)}
                      </span>
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {cue.text}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "notes" && (
            <div className=" p-4 ">
              <div className="mb-4">
                {!showAddNote ? (
                  <button
                    onClick={() => setShowAddNote(true)}
                    className="flex items-center gap-2 mt-4 px-5 py-2 bg-[#0b51ff] text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <FaPlus size={14} />
                    Add Note at {formatTime(currentTime)}
                  </button>
                ) : (
                  <div className="bg-gray-50 lg:p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <span className="text-sm text-gray-700 font-medium ">
                        Time :
                      </span>{" "}
                      {formatTime(currentTime)}
                    </div>
                    <textarea
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleAddNote();
                          e.currentTarget.blur();
                        }
                      }}
                      placeholder="Add your note here..."
                      aria-label="Add note textarea"
                      className="w-full p-2 border-2 border-gray-200 rounded-md resize-none h-20 indent-2 focus:outline-none focus:ring-0"
                    />

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handleAddNote}
                        className="px-5 py-2 bg-[#0b51ff] text-white rounded-md text-sm font-medium hover:bg-[#0b51ff]"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setShowAddNote(false);
                          setNewNoteText("");
                        }}
                        className="px-5 py-2 bg-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {notes.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No notes yet. Add your first note.
                  </p>
                ) : (
                  notes
                    .sort((a, b) => a.timestamp - b.timestamp)
                    .map((note) => (
                      <div
                        key={note.id}
                        className="bg-blue-50 border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex flex-col gap-3">
                            <span className="text-sm text-gray-500">
                              <span className="text-md text-gray-700 font-medium ">
                                Lesson :
                              </span>{" "}
                              {currentLesson.title}
                            </span>
                            <span className="text-sm text-gray-500">
                              <span className="text-md text-gray-700 font-medium ">
                                Time :
                              </span>{" "}
                              {formatTime(note.timestamp)}
                            </span>
                            <span className="text-sm text-gray-500">
                              <span className="text-md text-gray-700 font-medium ">
                                Date :
                              </span>{" "}
                              {note.createdAt.toLocaleDateString()}
                            </span>
                            <p className="text-sm text-gray-500 leading-10 mt-4">
                              <span className="block text-md text-gray-700 font-medium mr-1">
                                Content :
                              </span>
                              {note.text}
                            </p>
                          </div>
                          <button
                            onClick={() => onDeleteNote(note.id)}
                            className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BottomDrawer;
