export interface ProjectStory {
  problem: string;
  goal: string;
  planning: string;
  architecture: string;
  challenges: string;
  solutions: string;
  results: string;
  future: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "Data Science" | "Full Stack" | "Android" | "Pentesting" | "Security";
  technologies: string[];
  features: string[];
  image: string;
  liveUrl?: string;
  githubUrl: string;
  status: "Completed" | "In Progress" | "Alpha";
  visualTheme: "business" | "knowledge" | "intelligence" | "media" | "food" | "bakery" | "premium" | "commerce" | "automotive" | "fashion" | "finance" | "cyber";
  story: ProjectStory;
}

const DEFAULT_STORY: ProjectStory = {
  problem: "Complex data fragmentation and inefficient workflows.",
  goal: "Streamline operations with a unified digital solution.",
  planning: "Architected using modular principles and scalable cloud infrastructure.",
  architecture: "Microservices-based backend with a high-performance reactive frontend.",
  challenges: "Managing real-time state across distributed nodes.",
  solutions: "Implemented optimized WebSocket clusters and edge caching.",
  results: "40% increase in operational efficiency and 99.9% uptime.",
  future: "Integrating AI-driven predictive maintenance and global scaling."
};

export const projects: Project[] = [
  {
    id: "sales-inventory",
    title: "Sales & Inventory System",
    description: "Futuristic business control center for managing real-time stock and transaction analytics.",
    category: "Full Stack",
    technologies: ["React", "Node.js", "MySQL", "Chart.js"],
    features: ["Live Stock Tracking", "Sales Analytics", "Automated Invoicing"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    githubUrl: "#",
    status: "Completed",
    visualTheme: "business",
    story: {
      ...DEFAULT_STORY,
      problem: "Traditional inventory management was slow and prone to manual errors.",
      goal: "Create a real-time 'Control Center' for business operations.",
      results: "Zero discrepancy in stock audits after implementation."
    }
  },
  {
    id: "qa-forum",
    title: "Q&A Knowledge Forum",
    description: "Digital knowledge network for interactive community engagement and information sharing.",
    category: "Full Stack",
    technologies: ["Next.js", "Firebase", "TailwindCSS"],
    features: ["Real-time Discussions", "User Reputation System", "Markdown Support"],
    image: "https://images.unsplash.com/photo-1454165833762-02ad4d407818?auto=format&fit=crop&q=80&w=800",
    githubUrl: "#",
    status: "Completed",
    visualTheme: "knowledge",
    story: {
      ...DEFAULT_STORY,
      problem: "Static FAQ pages were insufficient for community growth.",
      goal: "Build a self-sustaining knowledge ecosystem.",
    }
  },
  {
    id: "osint-toolkit",
    title: "OSINT Intelligence Lab",
    description: "Cyber intelligence platform for gathering and analyzing public data signals.",
    category: "Security",
    technologies: ["Python", "Nmap", "Wireshark", "Elasticsearch"],
    features: ["Signal Network Tracing", "Intelligence Maps", "Automated Scanning"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    githubUrl: "#",
    status: "Completed",
    visualTheme: "intelligence",
    story: {
      ...DEFAULT_STORY,
      problem: "Manually correlating public intelligence was time-consuming.",
      goal: "Automate the data gathering pipeline for threat actors.",
    }
  },
  {
    id: "android-telebirr",
    title: "Financial Ecosystem App",
    description: "Digital financial mobile experience inspired by high-traffic payment systems.",
    category: "Android",
    technologies: ["Kotlin", "Jetpack Compose", "Firebase"],
    features: ["Secure Transactions", "Live Notifications", "Biometric Auth"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    githubUrl: "#",
    status: "Completed",
    visualTheme: "finance",
    story: {
      ...DEFAULT_STORY,
      problem: "Mobile payments needed to be both secure and highly intuitive for a diverse user base.",
      goal: "Deliver a premium financial experience with zero latency.",
    }
  }
];
