import { type Course } from "./types";

export const mockCourses: Course[] = [
  {
    id: "course-1",
    title: "React Fundamentals",
    description:
      "Master the fundamentals of React development and build dynamic user interfaces with confidence.",
    instructor: "Sarah Johnson",
    breadcrumb: ["Web Development", "Frontend", "React"],
    resources: [
      {
        id: "res-1-1",
        name: "React Official Documentation",
        type: "pdf",
        url: "/resources/react-docs.pdf",
        size: "3.2 MB",
      },
      {
        id: "res-1-2",
        name: "Component Examples & Code Samples",
        type: "zip",
        url: "/resources/react-examples.zip",
        size: "1.8 MB",
      },
      {
        id: "res-1-3",
        name: "React Cheat Sheet",
        type: "doc",
        url: "/resources/react-cheatsheet.pdf",
        size: "850 KB",
      },
    ],
    lessons: [
      {
        id: "lesson-1-1",
        title: "Introduction to React",
        description:
          "Learn the fundamentals of React, understand its core concepts, and discover why it's one of the most popular JavaScript libraries for building user interfaces.",
        instructor: "Sarah Johnson",
        durationSec: 480,
        url: "/video.mp4",
        completed: false,
        transcript: [
          {
            id: "t1-1",
            startTime: 0,
            endTime: 15,
            text: "Welcome to this comprehensive React tutorial...",
          },
          {
            id: "t1-2",
            startTime: 15,
            endTime: 35,
            text: "React is a JavaScript library for building user interfaces...",
          },
          {
            id: "t1-3",
            startTime: 35,
            endTime: 55,
            text: "One of the key concepts in React is the component-based architecture...",
          },
        ],
      },
      {
        id: "lesson-1-2",
        title: "Components and JSX",
        description: "Dive deep into React components and JSX syntax...",
        instructor: "Sarah Johnson",
        durationSec: 720,
        url: "/video.mp4",
        completed: false,
        transcript: [
          {
            id: "t2-1",
            startTime: 0,
            endTime: 20,
            text: "In this lesson, we'll explore React components and JSX syntax in detail...",
          },
          {
            id: "t2-2",
            startTime: 20,
            endTime: 40,
            text: "JSX is a syntax extension for JavaScript...",
          },
        ],
      },
      {
        id: "lesson-1-3",
        title: "Props and State",
        description:
          "Master data management in React by learning about props and state...",
        instructor: "Mike Chen",
        durationSec: 600,
        url: "/video.mp4",
        completed: false,
        transcript: [
          {
            id: "t3-1",
            startTime: 0,
            endTime: 25,
            text: "Props and state are fundamental concepts in React...",
          },
          {
            id: "t3-2",
            startTime: 25,
            endTime: 45,
            text: "Understanding when to use props versus state is crucial...",
          },
        ],
      },
      {
        id: "lesson-1-4",
        title: "Event Handling",
        description:
          "Learn how to handle user interactions in React applications...",
        instructor: "Sarah Johnson",
        durationSec: 540,
        url: "/video.mp4",
        completed: false,
        transcript: [
          {
            id: "t4-1",
            startTime: 0,
            endTime: 20,
            text: "Event handling in React is similar to handling events in vanilla JS...",
          },
          {
            id: "t4-2",
            startTime: 20,
            endTime: 40,
            text: "React uses SyntheticEvents to ensure consistent behavior...",
          },
        ],
      },
    ],
    chaptersByLessonId: {
      "lesson-1-1": [
        { label: "What is React?", atSec: 0 },
        { label: "React vs Other Frameworks", atSec: 120 },
        { label: "Setting up React", atSec: 300 },
      ],
      "lesson-1-2": [
        { label: "Components Overview", atSec: 0 },
        { label: "JSX Syntax", atSec: 180 },
      ],
      "lesson-1-3": [
        { label: "Understanding Props", atSec: 0 },
        { label: "Understanding State", atSec: 200 },
      ],
      "lesson-1-4": [
        { label: "Event Handling Basics", atSec: 0 },
        { label: "SyntheticEvents", atSec: 150 },
      ],
    },
  },

  {
    id: "course-2",
    title: "Advanced JavaScript",
    description:
      "Master advanced JavaScript concepts and modern ES6+ features.",
    instructor: "Alex Rodriguez",
    breadcrumb: ["Web Development", "JavaScript"],
    resources: [
      {
        id: "res-2-1",
        name: "ES6+ Features Guide",
        type: "pdf",
        url: "/resources/es6-guide.pdf",
        size: "2.1 MB",
      },
      {
        id: "res-2-2",
        name: "JavaScript Best Practices",
        type: "doc",
        url: "/resources/js-best-practices.docx",
        size: "1.5 MB",
      },
    ],
    lessons: [
      {
        id: "lesson-2-1",
        title: "Closures and Scope",
        description: "Deep dive into JavaScript closures...",
        instructor: "Alex Rodriguez",
        durationSec: 900,
        url: "/video.mp4",
        completed: false,
        transcript: [
          {
            id: "t5-1",
            startTime: 0,
            endTime: 30,
            text: "Closures are one of the most powerful features in JavaScript...",
          },
          {
            id: "t5-2",
            startTime: 30,
            endTime: 60,
            text: "Understanding scope and how it relates to closures...",
          },
        ],
      },
      {
        id: "lesson-2-2",
        title: "Promises and Async/Await",
        description: "Master asynchronous JavaScript programming...",
        instructor: "Emily Davis",
        durationSec: 1080,
        url: "/video.mp4",
        completed: false,
        transcript: [
          {
            id: "t6-1",
            startTime: 0,
            endTime: 25,
            text: "Asynchronous programming is crucial in JavaScript...",
          },
          {
            id: "t6-2",
            startTime: 25,
            endTime: 50,
            text: "Then we'll explore the async/await syntax...",
          },
        ],
      },
      {
        id: "lesson-2-3",
        title: "ES6+ Features",
        description: "Explore modern JavaScript features...",
        instructor: "Alex Rodriguez",
        durationSec: 960,
        url: "/video.mp4",
        locked: true,
        completed: false,
        transcript: [
          {
            id: "t7-1",
            startTime: 0,
            endTime: 30,
            text: "ES6 and later versions have introduced many powerful features...",
          },
          {
            id: "t7-2",
            startTime: 30,
            endTime: 60,
            text: "These modern features make JavaScript code more concise...",
          },
        ],
      },
    ],
    chaptersByLessonId: {
      "lesson-2-1": [
        { label: "Understanding Closures", atSec: 0 },
        { label: "Lexical Scoping", atSec: 240 },
        { label: "Practical Examples", atSec: 540 },
      ],
      "lesson-2-2": [
        { label: "Promises Overview", atSec: 0 },
        { label: "Async/Await Syntax", atSec: 300 },
      ],
      "lesson-2-3": [
        { label: "Arrow Functions", atSec: 0 },
        { label: "Destructuring & Template Literals", atSec: 300 },
      ],
    },
  },

  {
    id: "course-3",
    title: "Node.js Backend Development",
    description:
      "Learn to build scalable backend applications with Node.js and Express.",
    instructor: "David Kim",
    breadcrumb: ["Web Development", "Backend", "Node.js"],
    resources: [
      {
        id: "res-3-1",
        name: "Node.js API Reference",
        type: "pdf",
        url: "/resources/nodejs-api.pdf",
        size: "4.7 MB",
      },
      {
        id: "res-3-2",
        name: "Express.js Starter Template",
        type: "zip",
        url: "/resources/express-template.zip",
        size: "2.3 MB",
      },
      {
        id: "res-3-3",
        name: "Database Connection Examples",
        type: "zip",
        url: "/resources/db-examples.zip",
        size: "1.9 MB",
      },
    ],
    lessons: [
      {
        id: "lesson-3-1",
        title: "Introduction to Node.js",
        description: "Get started with Node.js runtime environment...",
        instructor: "David Kim",
        durationSec: 660,
        url: "/video.mp4",
        completed: false,
        transcript: [
          {
            id: "t8-1",
            startTime: 0,
            endTime: 30,
            text: "Node.js is a runtime environment...",
          },
          {
            id: "t8-2",
            startTime: 30,
            endTime: 60,
            text: "The event loop and non-blocking I/O are fundamental...",
          },
        ],
      },
      {
        id: "lesson-3-2",
        title: "Express.js Fundamentals",
        description:
          "Build web applications and APIs with Express.js framework...",
        instructor: "David Kim",
        durationSec: 840,
        url: "/video.mp4",
        completed: false,
        transcript: [
          {
            id: "t9-1",
            startTime: 0,
            endTime: 25,
            text: "Express.js is a minimal and flexible Node.js web application framework...",
          },
          {
            id: "t9-2",
            startTime: 25,
            endTime: 50,
            text: "Middleware functions are crucial in Express.js applications...",
          },
        ],
      },
      {
        id: "lesson-3-3",
        title: "Working with Databases",
        description: "Integrate databases with Node.js applications...",
        instructor: "Maria Lopez",
        durationSec: 1200,
        url: "/video.mp4",
        locked: true,
        completed: false,
        transcript: [
          {
            id: "t10-1",
            startTime: 0,
            endTime: 30,
            text: "Database integration is essential for most web applications...",
          },
          {
            id: "t10-2",
            startTime: 30,
            endTime: 60,
            text: "ORMs simplify database operations...",
          },
        ],
      },
      {
        id: "lesson-3-4",
        title: "Authentication & Security",
        description:
          "Implement secure authentication and authorization in Node.js applications...",
        instructor: "David Kim",
        durationSec: 1020,
        url: "/video.mp4",
        locked: true,
        completed: false,
        transcript: [
          {
            id: "t11-1",
            startTime: 0,
            endTime: 30,
            text: "Security is crucial in web applications...",
          },
          {
            id: "t11-2",
            startTime: 30,
            endTime: 60,
            text: "JSON Web Tokens (JWT) provide a secure way...",
          },
        ],
      },
    ],
    chaptersByLessonId: {
      "lesson-3-1": [
        { label: "What is Node.js?", atSec: 0 },
        { label: "Installing Node.js", atSec: 180 },
        { label: "First Node.js App", atSec: 420 },
      ],
      "lesson-3-2": [
        { label: "Routing Basics", atSec: 0 },
        { label: "Middleware Functions", atSec: 300 },
      ],
      "lesson-3-3": [
        { label: "SQL & NoSQL Databases", atSec: 0 },
        { label: "ORMs & Connection Pooling", atSec: 600 },
      ],
      "lesson-3-4": [
        { label: "Authentication Overview", atSec: 0 },
        { label: "Security Best Practices", atSec: 510 },
      ],
    },
  },

  {
    id: "course-4",
    title: "Python for Data Science",
    description:
      "Master Python programming for data analysis and machine learning.",
    instructor: "Dr. Lisa Wang",
    breadcrumb: ["Programming", "Python", "Data Science"],
    resources: [
      {
        id: "res-4-1",
        name: "Python Data Science Handbook",
        type: "pdf",
        url: "/resources/python-ds-handbook.pdf",
        size: "5.8 MB",
      },
      {
        id: "res-4-2",
        name: "Sample Datasets",
        type: "zip",
        url: "/resources/sample-datasets.zip",
        size: "12.3 MB",
      },
      {
        id: "res-4-3",
        name: "Jupyter Notebook Templates",
        type: "zip",
        url: "/resources/jupyter-templates.zip",
        size: "3.4 MB",
      },
    ],
    lessons: [
      {
        id: "lesson-4-1",
        title: "Python Basics for Data Science",
        description: "...",
        instructor: "Dr. Lisa Wang",
        durationSec: 780,
        url: "/video.mp4",
        completed: false,
        transcript: [],
      },
      {
        id: "lesson-4-2",
        title: "NumPy and Pandas",
        description: "...",
        instructor: "Dr. Lisa Wang",
        durationSec: 960,
        url: "/video.mp4",
        completed: false,
        transcript: [],
      },
      {
        id: "lesson-4-3",
        title: "Data Visualization with Matplotlib",
        description: "...",
        instructor: "Tom Wilson",
        durationSec: 720,
        url: "/video.mp4",
        completed: false,
        transcript: [],
      },
      {
        id: "lesson-4-4",
        title: "Introduction to Machine Learning",
        description: "...",
        instructor: "Dr. Lisa Wang",
        durationSec: 1080,
        url: "/video.mp4",
        locked: true,
        completed: false,
        transcript: [],
      },
      {
        id: "lesson-4-5",
        title: "Building Your First ML Model",
        description: "...",
        instructor: "Tom Wilson",
        durationSec: 900,
        url: "/video.mp4",
        locked: true,
        completed: false,
        transcript: [],
      },
    ],
    chaptersByLessonId: {
      "lesson-4-1": [
        { label: "Why Python for Data Science?", atSec: 0 },
        { label: "Essential Libraries Overview", atSec: 180 },
        { label: "Setting up Environment", atSec: 420 },
      ],
      "lesson-4-2": [
        { label: "NumPy Arrays", atSec: 0 },
        { label: "Pandas DataFrames", atSec: 240 },
        { label: "Data Cleaning", atSec: 480 },
      ],
      "lesson-4-3": [
        { label: "Matplotlib Basics", atSec: 0 },
        { label: "Plot Types", atSec: 200 },
      ],
      "lesson-4-4": [
        { label: "Supervised vs Unsupervised", atSec: 0 },
        { label: "Model Training", atSec: 300 },
      ],
      "lesson-4-5": [
        { label: "Data Preparation", atSec: 0 },
        { label: "Model Deployment", atSec: 450 },
      ],
    },
  },
];
