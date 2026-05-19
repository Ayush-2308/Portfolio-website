export const personalInfo = {
  name: "Ayush Gupta",
  title: "Android Developer",
  location: "Agra, Uttar Pradesh",
  email: "ayush.ag2308@gmail.com",
  phone: "+91-8273126155",
  bio: "Android Developer with MCA from Amity University. Proven ability to build production-ready applications, integrating REST APIs, Firebase Auth, GPS, and Riverpod state management. Proficient in MVVM architecture, Room DB, and Retrofit.",
  profileImage: "https://customer-assets.emergentagent.com/job_ayush-dev-portfolio/artifacts/22f9es78_ChatGPT%20Image%20Mar%2029%2C%202026%2C%2012_01_51%20P%601M.png",
  resumeLink: "https://customer-assets.emergentagent.com/job_ayush-dev-portfolio/artifacts/or6b6agi_Ayush_Gupta_Resume.pdf",
  social: {
    linkedin: "http://www.linkedin.com/in/ayush-gupta-android",
    github: "https://github.com/Ayush-2308",
    whatsapp: "https://wa.me/918273126155",
    email: "mailto:ayush.ag2308@gmail.com"
  }
};

export const skills = [
  {
    id: 1,
    name: "Java",
    proficiency: 85,
    experience: "2+ years",
    description: "Developed enterprise-level applications including Car Rental System and Weather App. Proficient in OOP principles, data structures, and building scalable backend solutions.",
    icon: "coffee"
  },
  {
    id: 2,
    name: "Kotlin",
    proficiency: 60,
    experience: "Learning",
    description: "Currently learning Kotlin for modern Android development. Exploring its concise syntax and powerful features to enhance Android application development.",
    icon: "smartphone"
  },
  {
    id: 3,
    name: "Android Studio",
    proficiency: 85,
    experience: "2+ years",
    description: "Expert in Android development using MVVM architecture, Retrofit, Volley, Room DB, RecyclerView, and FusedLocationProvider. Built production-ready weather and tracking applications.",
    icon: "smartphone"
  },
  {
    id: 4,
    name: "Flutter/Dart",
    proficiency: 80,
    experience: "1.5 years",
    description: "Created cross-platform Time Tracking System with Firebase integration. Experienced in state management (Riverpod), routing (GoRouter), and reactive programming (RxDart).",
    icon: "layers"
  },
  {
    id: 5,
    name: "Firebase",
    proficiency: 80,
    experience: "1.5 years",
    description: "Implemented Firebase Auth and Cloud Firestore for secure authentication, real-time data persistence, and multi-device sync across iOS and Android platforms.",
    icon: "flame"
  },
  {
    id: 6,
    name: "REST APIs",
    proficiency: 80,
    experience: "2+ years",
    description: "Expert in REST API integration using Volley and Retrofit. Experience in API consumption, error handling, and asynchronous data fetching with Postman for API testing.",
    icon: "network"
  },
  {
    id: 7,
    name: "SQL & MySQL",
    proficiency: 75,
    experience: "2+ years",
    description: "Database design and management, query optimization, and data modeling. Experience with relational database systems and DBMS concepts.",
    icon: "database"
  },
  {
    id: 8,
    name: "Jetpack Compose",
    proficiency: 50,
    experience: "Learning",
    description: "Currently learning Jetpack Compose for modern Android UI development. Exploring declarative UI patterns and Material Design 3 implementation.",
    icon: "layout"
  }
];

export const projects = [
  {
    id: 1,
    title: "Weather Forecast Android Application",
    year: "2026",
    description: "Built a production-ready Weather Forecast Android app in Java displaying real-time 5-day forecasts via REST API using Volley library. Implemented FusedLocationProviderClient for automatic GPS-based city detection and Android Speech Recognition API for voice search. Designed interactive forecast UI using RecyclerView and SwipeRefreshLayout with real-time data refresh.",
    tech: ["Java", "Android Studio", "REST API", "Volley", "GPS", "RecyclerView"],
    github: "https://github.com/Ayush-2308/WeatherApp-Android-master",
    thumbnail: "https://customer-assets.emergentagent.com/job_ayush-dev-portfolio/artifacts/9blli7ff_image1.jpg",
    gallery: [
      "https://customer-assets.emergentagent.com/job_ayush-dev-portfolio/artifacts/bizvl0kq_gif1.gif",
      "https://customer-assets.emergentagent.com/job_ayush-dev-portfolio/artifacts/9blli7ff_image1.jpg",
      "https://customer-assets.emergentagent.com/job_ayush-dev-portfolio/artifacts/4uw9ad1y_image2.jpg"
    ],
    isGif: true
  },
  {
    id: 2,
    title: "Time Tracking System",
    year: "2025",
    description: "Architected a cross-platform time tracking app (Flutter + Firebase) with Riverpod state management and repository pattern, reducing manual time logging by ~40%. Implemented Firebase Auth and Cloud Firestore for secure authentication, real-time data persistence, and multi-device sync across iOS and Android. Developed full CRUD functionality with dynamic daily reports, GoRouter navigation, and RxDart streams for reactive UI updates.",
    tech: ["Flutter", "Firebase", "Riverpod", "Cloud Firestore", "GoRouter", "RxDart"],
    github: "https://github.com/Ayush-2308/Time-Tracking-System",
    thumbnail: "https://customer-assets.emergentagent.com/job_ayush-dev-portfolio/artifacts/wr7t4kih_time-tracker-screenshots.png",
    gallery: [
      "https://customer-assets.emergentagent.com/job_ayush-dev-portfolio/artifacts/wr7t4kih_time-tracker-screenshots.png"
    ]
  },
  {
    id: 3,
    title: "Car Rental System",
    year: "2024",
    description: "Engineered a Car Rental System in Java applying core OOP principles (inheritance, polymorphism, encapsulation, abstraction), achieving a 20% reduction in rental processing time. Designed a complete rental workflow (vehicle selection, booking, return) with clean separation between business logic and console UI.",
    tech: ["Java", "OOP", "Console Application"],
    github: "https://github.com/Ayush-2308/Car-Rental-System",
    thumbnail: "https://customer-assets.emergentagent.com/job_ayush-dev-portfolio/artifacts/p2me49u2_car_rental_collage_white_bg.png",
    gallery: [
      "https://customer-assets.emergentagent.com/job_ayush-dev-portfolio/artifacts/p2me49u2_car_rental_collage_white_bg.png",
      "https://customer-assets.emergentagent.com/job_ayush-dev-portfolio/artifacts/zoi3lnq7_Screenshot%202026-03-21%20224347.png",
      "https://customer-assets.emergentagent.com/job_ayush-dev-portfolio/artifacts/0qzndnkn_Screenshot%202026-03-21%20224400.png"
    ]
  }
];

export const experience = [
  {
    id: 1,
    title: "Android Developer",
    type: "Self-Initiated Projects & Learning",
    period: "2024 - Present",
    achievements: [
      "Developed 3 production-ready applications using Java, Kotlin, and Flutter",
      "Implemented Firebase integration with real-time data synchronization and authentication",
      "Reduced rental processing time by 20% through algorithm optimization in Car Rental System",
      "Achieved ~40% reduction in manual time logging through cross-platform Time Tracking app",
      "Built Android app with GPS-based location detection and voice search functionality",
      "Learning Jetpack Compose and Kotlin for modern Android development"
    ]
  }
];

export const education = [
  {
    id: 1,
    degree: "Master of Computer Applications (MCA)",
    institution: "Amity University, Noida",
    period: "2025 - Present",
    cgpa: "8.07",
    status: "Pursuing"
  },
  {
    id: 2,
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "GLA University, Mathura",
    period: "2022 - 2025",
    cgpa: "7.39",
    degreeImage: "https://customer-assets.emergentagent.com/job_ayush-dev-portfolio/artifacts/tutad3o7_IMG20260519232127.jpg.jpeg"
  }
];

export const certifications = [
  {
    id: 1,
    title: "Flutter and Dart: Developing iOS, Android, and Mobile Apps",
    link: "https://drive.google.com/file/d/1O5Ik_x5tAIwHIZzSPjigZX8NkqGWqSKN/view?usp=sharing"
  },
  {
    id: 2,
    title: "Learn Java Programming - Beginner to Master",
    link: "https://drive.google.com/file/d/15X9pb3XBDndF63WZuz0ct8awMr_gykzV/view?usp=sharing"
  },
  {
    id: 3,
    title: "Career Essentials in Generative AI",
    link: "https://drive.google.com/file/d/1z0ymrV5Jah-YKb9aDItERBNMvKKSNZnB/view?usp=sharing"
  },
  {
    id: 4,
    title: "Android Basics with Compose — Google Developers (Badge)",
    link: "#"
  },
  {
    id: 5,
    title: "Data Analysis with Python",
    link: "https://drive.google.com/file/d/1O5Ik_x5tAIwHIZzSPjigZX8NkqGWqSKN/view?usp=sharing"
  },
  {
    id: 6,
    title: "Advanced Excel",
    link: "https://drive.google.com/file/d/1PxGVtY4RX3O6MLqhGTYSbd3I5a1KZ10c/view?usp=sharing"
  }
];