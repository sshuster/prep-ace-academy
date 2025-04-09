
export interface Course {
  id: number;
  title: string;
  description: string;
  type: 'SAT' | 'ACT' | 'AP' | 'PSAT' | 'GRE';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in hours
  videos: number;
  quizzes: number;
  progress?: number; // percentage completed
  imageSrc: string;
}

export interface ProgressData {
  day: string;
  progress: number;
  hoursStudied: number;
}

export interface Video {
  id: number;
  title: string;
  courseId: number;
  duration: string; // "13:45" format
  watched: boolean;
  thumbnail: string;
}

export const mockCourses: Course[] = [
  {
    id: 1,
    title: "SAT Math Fundamentals",
    description: "Master the core math concepts tested on the SAT, including algebra, problem-solving, and data analysis.",
    type: "SAT",
    level: "Beginner",
    duration: 18,
    videos: 24,
    quizzes: 12,
    progress: 67,
    imageSrc: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2148&q=80"
  },
  {
    id: 2,
    title: "ACT Science Strategies",
    description: "Learn effective strategies for the ACT Science section, focusing on data interpretation and scientific analysis.",
    type: "ACT",
    level: "Intermediate",
    duration: 12,
    videos: 18,
    quizzes: 9,
    progress: 23,
    imageSrc: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2030&q=80"
  },
  {
    id: 3,
    title: "AP Calculus Crash Course",
    description: "Intensive review of AP Calculus AB concepts, with practice problems and exam strategies.",
    type: "AP",
    level: "Advanced",
    duration: 24,
    videos: 32,
    quizzes: 16,
    progress: 8,
    imageSrc: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 4,
    title: "PSAT Verbal Skills",
    description: "Build your vocabulary, reading comprehension, and grammar skills for the PSAT.",
    type: "PSAT",
    level: "Beginner",
    duration: 10,
    videos: 15,
    quizzes: 10,
    progress: 45,
    imageSrc: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80"
  },
  {
    id: 5,
    title: "GRE Verbal Mastery",
    description: "Advanced techniques for GRE verbal reasoning, including text completion and critical reading.",
    type: "GRE",
    level: "Advanced",
    duration: 20,
    videos: 28,
    quizzes: 14,
    progress: 0,
    imageSrc: "https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 6,
    title: "SAT Essay Writing",
    description: "Learn to write compelling, evidence-based essays for the SAT writing section.",
    type: "SAT",
    level: "Intermediate",
    duration: 8,
    videos: 12,
    quizzes: 6,
    progress: 0,
    imageSrc: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80"
  }
];

export const mockVideos: Video[] = [
  {
    id: 1,
    title: "Introduction to SAT Math",
    courseId: 1,
    duration: "15:30",
    watched: true,
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2022&q=80"
  },
  {
    id: 2,
    title: "Algebra Fundamentals",
    courseId: 1,
    duration: "22:15",
    watched: true,
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    title: "Problem Solving Strategies",
    courseId: 1,
    duration: "18:45",
    watched: true,
    thumbnail: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2148&q=80"
  },
  {
    id: 4,
    title: "Data Analysis and Statistics",
    courseId: 1,
    duration: "23:10",
    watched: false,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80"
  },
  {
    id: 5,
    title: "Understanding Scientific Graphs",
    courseId: 2,
    duration: "17:20",
    watched: true,
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2030&q=80"
  },
  {
    id: 6,
    title: "Experimental Design Analysis",
    courseId: 2,
    duration: "19:50",
    watched: false,
    thumbnail: "https://images.unsplash.com/photo-1576319155264-99536e0be1ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  }
];

export const userProgressData: ProgressData[] = [
  { day: "Mon", progress: 15, hoursStudied: 1.5 },
  { day: "Tue", progress: 25, hoursStudied: 2.0 },
  { day: "Wed", progress: 40, hoursStudied: 2.5 },
  { day: "Thu", progress: 60, hoursStudied: 3.2 },
  { day: "Fri", progress: 65, hoursStudied: 1.8 },
  { day: "Sat", progress: 80, hoursStudied: 3.5 },
  { day: "Sun", progress: 95, hoursStudied: 4.0 }
];

export const mockScoreData = [
  { testName: "Practice Test 1", score: 1200, maxScore: 1600 },
  { testName: "Practice Test 2", score: 1280, maxScore: 1600 },
  { testName: "Practice Test 3", score: 1350, maxScore: 1600 },
  { testName: "Practice Test 4", score: 1420, maxScore: 1600 },
  { testName: "Practice Test 5", score: 1480, maxScore: 1600 }
];

export interface PricingPlan {
  id: number;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
  description: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Basic",
    price: 9.99,
    description: "Perfect for occasional study sessions",
    features: [
      "Access to 5 basic courses",
      "Practice quizzes",
      "Limited video lessons",
      "Mobile access",
      "Email support"
    ]
  },
  {
    id: 2,
    name: "Standard",
    price: 19.99,
    description: "Our most popular plan for serious students",
    recommended: true,
    features: [
      "Access to all courses",
      "Unlimited practice tests",
      "All video lessons",
      "Mobile and tablet access",
      "24/7 chat support",
      "Progress tracking",
      "Personalized study plan"
    ]
  },
  {
    id: 3,
    name: "Premium",
    price: 39.99,
    description: "Complete package for advanced test preparation",
    features: [
      "Everything in Standard",
      "1-on-1 tutoring sessions",
      "Advanced analytics",
      "Essay grading",
      "Priority support",
      "Score improvement guarantee",
      "Downloadable resources"
    ]
  }
];
