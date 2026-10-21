export const BOARD_OPTIONS = [
  "CBSE",
  "ICSE",
  "STATE",
  "IB",
  "Cambridge",
  "NIOS",
];

export const CLASS_OPTIONS = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];

export const SUBJECT_ICON_MAP: Record<string, string> = {
  Mathematics: "📐",
  Science: "🔬",
  English: "📚",
  "Social Studies": "🌍",
  Physics: "⚛️",
  Chemistry: "🧪",
  Biology: "🧬",
  "Computer Science": "💻",
  "Kannada Language": "📝",
  "Tamil Language": "📝",
  "Telugu Language": "📝",
};

export const INDIA_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh",
  "Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
];

export const LANGUAGE_OPTIONS = [
  "English",
  "Hindi",
  "Telugu",
  "Kannada",
  "Tamil",
  "Malayalam",
  "Marathi",
  "Bengali",
  "Gujarati",
  "Punjabi",
  "Odia",
  "Urdu",
];

const STATE_LANGUAGE_DEFAULTS: Record<string, string> = {
  "Andhra Pradesh": "Telugu",
  Karnataka: "Kannada",
  "Tamil Nadu": "Tamil",
  Kerala: "Malayalam",
  Maharashtra: "Marathi",
  Gujarat: "Gujarati",
  Punjab: "Punjabi",
  Odisha: "Odia",
  "West Bengal": "Bengali",
  Telangana: "Telugu",
  "Uttar Pradesh": "Hindi",
  Bihar: "Hindi",
  Rajasthan: "Hindi",
  Delhi: "Hindi",
};

export const getDefaultLanguageByState = (state: string) =>
  STATE_LANGUAGE_DEFAULTS[state] ?? "English";

export const getSubjectIdFromName = (subjectName: string) =>
  subjectName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

interface ModuleTemplate {
  title: string;
  duration: string;
  type: "Module" | "Recorded Video";
}

interface SubjectTemplate {
  description: string;
  modules: ModuleTemplate[];
}

const SUBJECT_TEMPLATES: Record<string, SubjectTemplate> = {
  mathematics: {
    description:
      "Build strong fundamentals with guided concepts, examples, and board-aligned practice.",
    modules: [
      { title: "Numbers and Operations", duration: "18 mins", type: "Module" },
      { title: "Fractions in Daily Life", duration: "22 mins", type: "Recorded Video" },
      { title: "Algebra Basics", duration: "16 mins", type: "Module" },
      { title: "Geometry Practice Set", duration: "20 mins", type: "Recorded Video" },
    ],
  },
  science: {
    description:
      "Understand concepts through experiments, visuals, and chapter-wise revision tasks.",
    modules: [
      { title: "Components of Food", duration: "15 mins", type: "Module" },
      { title: "Plant Life Processes", duration: "21 mins", type: "Recorded Video" },
      { title: "Light and Shadows", duration: "17 mins", type: "Module" },
      { title: "Air Around Us", duration: "14 mins", type: "Recorded Video" },
    ],
  },
  "social-studies": {
    description:
      "Learn history, geography, civics, and economics with local examples and maps.",
    modules: [
      { title: "Understanding Diversity", duration: "13 mins", type: "Module" },
      { title: "State Governance", duration: "19 mins", type: "Recorded Video" },
      { title: "Resources and Economy", duration: "17 mins", type: "Module" },
      { title: "Map Skills Practice", duration: "16 mins", type: "Recorded Video" },
    ],
  },
  english: {
    description:
      "Improve comprehension, grammar, writing, and speaking with guided learning paths.",
    modules: [
      { title: "Reading Comprehension", duration: "12 mins", type: "Module" },
      { title: "Grammar Essentials", duration: "18 mins", type: "Recorded Video" },
      { title: "Vocabulary Builder", duration: "10 mins", type: "Module" },
      { title: "Writing Practice", duration: "20 mins", type: "Recorded Video" },
    ],
  },
};

export interface PersonalizedSubjectContent {
  syllabusName: string;
  board: string;
  state: string;
  language: string;
  description: string;
  modules: Array<ModuleTemplate & { id: number }>;
  mockTestsLabel: string;
}

export const getPersonalizedSubjectContent = ({
  subjectId,
  board,
  state,
  language,
}: {
  subjectId: string;
  board: string;
  state: string;
  language: string;
}): PersonalizedSubjectContent => {
  const template = SUBJECT_TEMPLATES[subjectId] ?? SUBJECT_TEMPLATES.mathematics;

  return {
    syllabusName:
      board === "STATE" ? `${state} State Board Syllabus` : `${board} Syllabus`,
    board,
    state,
    language,
    description: template.description,
    modules: template.modules.map((module, index) => ({
      id: index + 1,
      ...module,
    })),
    mockTestsLabel: `${board}${board === "STATE" ? ` (${state})` : ""} Mock Test Series`,
  };
};
