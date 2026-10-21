import {
  CLASS_OPTIONS,
  getSubjectIdFromName,
  getDefaultLanguageByState,
  SUBJECT_ICON_MAP,
} from "@/lib/learningContent";

export interface SubjectOption {
  id: string;
  name: string;
  icon: string;
}

export interface SyllabusTopic {
  id: string;
  title: string;
  summary: string;
}

export interface LessonVideo {
  id: string;
  title: string;
  duration: string;
  provider: "youtube" | "html5";
  url: string;
  fallbackUrl?: string;
  language: string;
}

export interface SubjectLearningContent {
  subject: SubjectOption;
  classLevel: string;
  board: string;
  state: string;
  language: string;
  syllabusName: string;
  modules: string[];
  topics: SyllabusTopic[];
  videos: LessonVideo[];
  videoSource: "backend" | "fallback";
}

const BOARD_DEFAULT_SUBJECTS: Record<string, string[]> = {
  CBSE: ["Mathematics", "Science", "English", "Social Studies", "Computer Science"],
  ICSE: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science"],
  IB: ["Mathematics", "Science", "English", "Social Studies", "Computer Science"],
  Cambridge: ["Mathematics", "Science", "English", "Social Studies", "Computer Science"],
  NIOS: ["Mathematics", "Science", "English", "Social Studies", "Computer Science"],
};

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const getYoutubeVideosFromBackend = async ({
  subjectName,
  classLevel,
  board,
  state,
  language,
}: {
  subjectName: string;
  classLevel: string;
  board: string;
  state: string;
  language: string;
}): Promise<LessonVideo[] | null> => {
  try {
    const params = new URLSearchParams({
      subject: subjectName,
      classLevel,
      board,
      state,
      language,
      limit: "6",
    });
    const response = await fetch(`${BACKEND_BASE_URL}/api/videos/search?${params.toString()}`);

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { videos?: LessonVideo[] };

    if (!Array.isArray(data.videos) || data.videos.length === 0) {
      return null;
    }

    return data.videos;
  } catch {
    return null;
  }
};

const STATE_SUBJECTS: Record<string, string[]> = {
  "Andhra Pradesh": ["Mathematics", "Science", "English", "Social Studies", "Telugu Language"],
  Karnataka: ["Mathematics", "Science", "English", "Social Studies", "Kannada Language"],
  "Tamil Nadu": ["Mathematics", "Science", "English", "Social Studies", "Tamil Language"],
};

const GENERIC_STATE_SUBJECTS = [
  "Mathematics",
  "Science",
  "English",
  "Social Studies",
  "Computer Science",
];

const SUBJECT_TOPIC_SEEDS: Record<string, string[]> = {
  Mathematics: [
    "Numbers and Operations",
    "Fractions and Decimals",
    "Ratio and Proportion",
    "Algebraic Expressions",
    "Linear Equations",
    "Geometry and Mensuration",
    "Data Handling",
    "Probability Basics",
  ],
  Science: [
    "Nutrition and Health",
    "Materials and Matter",
    "Plant and Animal Systems",
    "Motion and Force",
    "Energy Sources",
    "Light and Sound",
    "Environment and Ecosystems",
    "Scientific Experiments",
  ],
  English: [
    "Reading Comprehension",
    "Grammar and Usage",
    "Vocabulary Development",
    "Creative Writing",
    "Letter and Essay Writing",
    "Poetry Appreciation",
    "Speaking and Listening",
    "Literature Analysis",
  ],
  "Social Studies": [
    "History Foundations",
    "Geography and Maps",
    "Civics and Governance",
    "Economics Basics",
    "Indian Constitution",
    "Resources and Development",
    "Global Cultures",
    "Current Affairs Awareness",
  ],
  Physics: [
    "Units and Measurements",
    "Motion in One Dimension",
    "Force and Laws of Motion",
    "Work, Energy and Power",
    "Heat and Thermodynamics",
    "Waves and Sound",
    "Electricity and Magnetism",
    "Modern Physics Introduction",
  ],
  Chemistry: [
    "Atomic Structure",
    "Periodic Classification",
    "Chemical Bonding",
    "States of Matter",
    "Solutions and Mixtures",
    "Acids, Bases and Salts",
    "Metals and Non-Metals",
    "Organic Chemistry Basics",
  ],
  Biology: [
    "Cell Structure and Functions",
    "Plant Physiology",
    "Human Body Systems",
    "Reproduction in Organisms",
    "Genetics and Evolution",
    "Ecology and Environment",
    "Health and Hygiene",
    "Biotechnology Basics",
  ],
  "Computer Science": [
    "Computer Fundamentals",
    "Programming Basics",
    "Data and Information",
    "Algorithms and Flowcharts",
    "Internet and Networks",
    "Cyber Safety",
    "Productivity Tools",
    "Project Development",
  ],
  "Kannada Language": [
    "Reading Skills",
    "Grammar",
    "Vocabulary",
    "Essay Writing",
    "Poetry",
    "Prose",
    "Comprehension",
    "Conversation",
  ],
  "Tamil Language": [
    "Reading Skills",
    "Grammar",
    "Vocabulary",
    "Essay Writing",
    "Poetry",
    "Prose",
    "Comprehension",
    "Conversation",
  ],
  "Telugu Language": [
    "Reading Skills",
    "Grammar",
    "Vocabulary",
    "Essay Writing",
    "Poetry",
    "Prose",
    "Comprehension",
    "Conversation",
  ],
};

const getSubjectsByBoardState = (board: string, state: string) => {
  if (board === "STATE") {
    return STATE_SUBJECTS[state] ?? GENERIC_STATE_SUBJECTS;
  }

  return BOARD_DEFAULT_SUBJECTS[board] ?? BOARD_DEFAULT_SUBJECTS.CBSE;
};

const buildSubjectOption = (subjectName: string): SubjectOption => ({
  id: getSubjectIdFromName(subjectName),
  name: subjectName,
  icon: SUBJECT_ICON_MAP[subjectName] ?? "📘",
});

const getClassNumber = (classLevel: string) => {
  const match = classLevel.match(/\d+/);
  return match ? Number(match[0]) : 6;
};

const createTopics = (subjectName: string, classLevel: string): SyllabusTopic[] => {
  const classNumber = getClassNumber(classLevel);
  const seeds = SUBJECT_TOPIC_SEEDS[subjectName] ?? SUBJECT_TOPIC_SEEDS.Mathematics;

  return seeds.map((seed, index) => ({
    id: `${getSubjectIdFromName(subjectName)}-topic-${index + 1}`,
    title: `Class ${classNumber}: ${seed}`,
    summary: `${seed} aligned to ${classLevel} outcomes with guided practice and revision checkpoints.`,
  }));
};

const createVideos = (subjectName: string, classLevel: string, language: string): LessonVideo[] => {
  const subjectId = getSubjectIdFromName(subjectName);
  const classNumber = getClassNumber(classLevel);

  return [
    {
      id: `${subjectId}-video-1`,
      title: `${subjectName} ${classLevel} Concept Overview (${language})`,
      duration: "18 mins",
      provider: "youtube",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      fallbackUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      language,
    },
    {
      id: `${subjectId}-video-2`,
      title: `${subjectName} ${classLevel} Practice Session (${language})`,
      duration: "22 mins",
      provider: "html5",
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      fallbackUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      language,
    },
    {
      id: `${subjectId}-video-3`,
      title: `${subjectName} Exam Prep Class ${classNumber} (${language})`,
      duration: "25 mins",
      provider: "youtube",
      url: "https://www.youtube.com/embed/ysz5S6PUM-U",
      fallbackUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      language,
    },
  ];
};

const createModules = (subjectName: string, classLevel: string) => {
  const classNumber = getClassNumber(classLevel);
  return [
    `${subjectName} Foundation Module - ${classLevel}`,
    `${subjectName} Problem Solving Module - ${classLevel}`,
    `${subjectName} Mock Test Module - Class ${classNumber}`,
    `${subjectName} Revision Module - Class ${classNumber}`,
  ];
};

const withApiDelay = <T>(data: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), 80));

export const getAvailableClasses = async () => withApiDelay(CLASS_OPTIONS);

export const getSubjectCatalog = async ({
  board,
  state,
}: {
  board: string;
  state: string;
}) => {
  const subjects = getSubjectsByBoardState(board, state).map(buildSubjectOption);
  return withApiDelay(subjects);
};

export const getLearningLanguage = async ({
  state,
  selectedLanguage,
}: {
  state: string;
  selectedLanguage: string;
}) => {
  if (!state) {
    return withApiDelay("English");
  }

  return withApiDelay(selectedLanguage || getDefaultLanguageByState(state));
};

export const getSubjectLearningContent = async ({
  classLevel,
  board,
  state,
  subjectId,
  selectedLanguage,
}: {
  classLevel: string;
  board: string;
  state: string;
  subjectId: string;
  selectedLanguage: string;
}): Promise<SubjectLearningContent> => {
  const subjects = getSubjectsByBoardState(board, state).map(buildSubjectOption);
  const selectedSubject =
    subjects.find((subject) => subject.id === subjectId) ??
    subjects[0] ??
    buildSubjectOption("Mathematics");
  const language = state
    ? selectedLanguage || getDefaultLanguageByState(state)
    : "English";

  const backendVideos = await getYoutubeVideosFromBackend({
    subjectName: selectedSubject.name,
    classLevel,
    board,
    state,
    language,
  });
  const videos = backendVideos ?? createVideos(selectedSubject.name, classLevel, language);

  return withApiDelay({
    subject: selectedSubject,
    classLevel,
    board,
    state,
    language,
    syllabusName: board === "STATE" ? `${state} State Board Syllabus` : `${board} Syllabus`,
    modules: createModules(selectedSubject.name, classLevel),
    topics: createTopics(selectedSubject.name, classLevel),
    videos,
    videoSource: backendVideos ? "backend" : "fallback",
  });
};
