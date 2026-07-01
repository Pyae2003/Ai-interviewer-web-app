import { Difficulty } from "@/generated/prisma/enums";

export const categories = [
  {
    name: "React",
    description: "React Interview Questions",
    sortOrder: 1,

    questions: [
      // EASY (10)
      {
        question: "What is React?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is JSX?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is a component?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What are props?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is state?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is useState?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is event handling?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is conditional rendering?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is list rendering?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is Fragment?",
        difficulty: Difficulty.EASY,
      },

      // MEDIUM (10)
      {
        question: "What is useEffect?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is useMemo?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is useCallback?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is Context API?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is Virtual DOM?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "Difference between state and props?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is lifting state up?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is a controlled component?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is an uncontrolled component?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is a custom hook?",
        difficulty: Difficulty.MEDIUM,
      },

      //Hard
      {
        question: "What happens internally when setState is called?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "Explain React reconciliation algorithm in detail.",
        difficulty: Difficulty.HARD,
      },
      {
        question: "How does React Fiber work?",
        difficulty: Difficulty.HARD,
      },
      {
        question:
          "What causes unnecessary re-renders and how do you prevent them?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "Difference between useMemo and useCallback internally?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "How does React batching work?",

        difficulty: Difficulty.HARD,
      },
      {
        question: "What are concurrent features in React?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "How does Suspense work under the hood?",

        difficulty: Difficulty.HARD,
      },
      {
        question: "What is hydration and hydration mismatch?",

        difficulty: Difficulty.HARD,
      },
      {
        question: "How would you build your own simplified React hook system?",
        difficulty: Difficulty.HARD,
      },
    ],
  },

  {
    name: "Next.js",
    description: "Next.js Interview Questions",
    sortOrder: 2,

    questions: [
      {
        question: "What is Next.js?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is App Router?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is page.tsx?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is layout.tsx?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is Link component?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is Image component?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is a Server Component?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is a Client Component?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is Middleware?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is file-based routing?",
        difficulty: Difficulty.EASY,
      },

      {
        question: "What is SSR?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is SSG?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is ISR?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is a Route Handler?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is a Server Action?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "Explain Next.js caching.",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is revalidate?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is dynamic routing?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is Metadata API?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is streaming in Next.js?",
        difficulty: Difficulty.MEDIUM,
      },
      // HARD (10)
      {
        question:
          "Explain Next.js rendering pipeline from request to response.",
        difficulty: Difficulty.HARD,
      },
      {
        question: "How does Next.js caching work internally?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "What is Partial Prerendering (PPR)?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "How does React Server Component communication work?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "How would you optimize a slow Next.js application?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "Difference between Edge Runtime and Node Runtime?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "How does streaming SSR work?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "What causes hydration errors in Next.js?",
        difficulty: Difficulty.HARD,
      },
      {
        question:
          "How would you implement multi-tenant architecture in Next.js?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "Explain revalidation and cache invalidation strategies.",
        difficulty: Difficulty.HARD,
      },
    ],
  },

  {
    name: "JavaScript",
    description: "JavaScript Interview Questions",
    sortOrder: 3,

    questions: [
      {
        question: "What is JavaScript?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is a variable?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "Difference between let and const?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is an array?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is an object?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is a function?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is JSON?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is a loop?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is a boolean?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is null?",
        difficulty: Difficulty.EASY,
      },

      {
        question: "What is closure?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is hoisting?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is event bubbling?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is event delegation?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is a Promise?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is async/await?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is callback hell?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is the Event Loop?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is destructuring?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is the spread operator?",
        difficulty: Difficulty.MEDIUM,
      },
      // HARD (10)
      {
        question: "Explain the JavaScript Event Loop in detail.",
        difficulty: Difficulty.HARD,
      },
      {
        question: "How does V8 optimize JavaScript execution?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "What is the difference between microtasks and macrotasks?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "Explain prototypal inheritance with examples.",
        difficulty: Difficulty.HARD,
      },
      {
        question: "How does garbage collection work in JavaScript?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "What is a memory leak and how do you detect it?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "How does lexical scope work internally?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "Explain execution context creation phase.",
        difficulty: Difficulty.HARD,
      },
      {
        question: "What is the difference between shallow copy and deep copy?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "Implement Promise.all from scratch.",
        difficulty: Difficulty.HARD,
      },
    ],
  },
  {
    name: "TypeScript",
    description: "TypeScript Interview Questions",
    sortOrder: 4,

    questions: [
      // EASY
      {
        question: "What is TypeScript?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "Why use TypeScript?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is a type annotation?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is an interface?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is a type alias?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is enum?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is union type?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is optional property?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is readonly?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is type inference?",
        difficulty: Difficulty.EASY,
      },

      // MEDIUM
      {
        question: "What are Generics?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is keyof?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is Partial<>?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is Pick<>?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is Omit<>?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is Record<>?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is unknown type?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is never type?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "Difference between interface and type?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "Explain type narrowing.",
        difficulty: Difficulty.MEDIUM,
      },

      // HARD
      {
        question: "Explain conditional types.",
        difficulty: Difficulty.HARD,
      },
      {
        question: "What are mapped types?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "What is distributive conditional type?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "Explain infer keyword.",
        difficulty: Difficulty.HARD,
      },
      {
        question: "How would you build a utility type?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "Explain covariance and contravariance.",
        difficulty: Difficulty.HARD,
      },
      {
        question: "How do TypeScript Generics work internally?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "What is declaration merging?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "How does TypeScript compile to JavaScript?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "How would you type a complex API response?",
        difficulty: Difficulty.HARD,
      },
    ],
  },
  {
    name: "Node.js",
    description: "Node.js Interview Questions",
    sortOrder: 5,

    questions: [
      // EASY
      {
        question: "What is Node.js?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is npm?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is package.json?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is a module?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is CommonJS?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is ES Module?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is fs module?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is path module?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is process object?",
        difficulty: Difficulty.EASY,
      },
      {
        question: "What is EventEmitter?",
        difficulty: Difficulty.EASY,
      },

      // MEDIUM
      {
        question: "Explain Event Loop.",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is a stream?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is a buffer?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is middleware?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is REST API?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is JWT?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is CORS?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is rate limiting?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "What is asynchronous programming?",
        difficulty: Difficulty.MEDIUM,
      },
      {
        question: "How does Node handle I/O?",
        difficulty: Difficulty.MEDIUM,
      },

      // HARD
      {
        question: "Explain Node.js Event Loop phases.",
        difficulty: Difficulty.HARD,
      },
      {
        question: "How does libuv work internally?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "What are Worker Threads?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "Difference between Cluster and Worker Threads?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "How does stream backpressure work?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "How would you handle 1 million concurrent requests?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "What causes memory leaks in Node.js?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "How does Node.js handle asynchronous I/O internally?",
        difficulty: Difficulty.HARD,
      },
      {
        question: "Explain TCP connection lifecycle.",
        difficulty: Difficulty.HARD,
      },
      {
        question: "How would you build a rate limiter from scratch?",
        difficulty: Difficulty.HARD,
      },
    ],
  },
];
