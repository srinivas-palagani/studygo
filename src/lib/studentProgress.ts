export interface StudentProgress {
  videosWatched: number;
  modulesCompleted: number;
  totalModules: number;
  mockTestsTaken: number;
  totalMockScorePercent: number;
  lastMockScorePercent: number;
}

const STUDENT_PROGRESS_STORAGE_KEY = "studygo.studentProgress";

const defaultProgress: StudentProgress = {
  videosWatched: 0,
  modulesCompleted: 0,
  totalModules: 0,
  mockTestsTaken: 0,
  totalMockScorePercent: 0,
  lastMockScorePercent: 0,
};

const saveStudentProgress = (progress: StudentProgress) => {
  localStorage.setItem(STUDENT_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
};

export const getStudentProgress = (): StudentProgress => {
  const rawProgress = localStorage.getItem(STUDENT_PROGRESS_STORAGE_KEY);

  if (!rawProgress) {
    return defaultProgress;
  }

  try {
    const parsed = JSON.parse(rawProgress) as Partial<StudentProgress>;

    return {
      videosWatched: Number(parsed.videosWatched ?? 0),
      modulesCompleted: Number(parsed.modulesCompleted ?? 0),
      totalModules: Number(parsed.totalModules ?? 0),
      mockTestsTaken: Number(parsed.mockTestsTaken ?? 0),
      totalMockScorePercent: Number(parsed.totalMockScorePercent ?? 0),
      lastMockScorePercent: Number(parsed.lastMockScorePercent ?? 0),
    };
  } catch {
    return defaultProgress;
  }
};

export const updateModuleProgress = (modulesCompleted: number, totalModules: number) => {
  const current = getStudentProgress();

  saveStudentProgress({
    ...current,
    modulesCompleted: Math.max(0, modulesCompleted),
    totalModules: Math.max(0, totalModules),
  });
};

export const recordVideoWatch = () => {
  const current = getStudentProgress();

  saveStudentProgress({
    ...current,
    videosWatched: current.videosWatched + 1,
  });
};

export const recordMockTestResult = (score: number, totalQuestions: number) => {
  const current = getStudentProgress();
  const scorePercent = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  saveStudentProgress({
    ...current,
    mockTestsTaken: current.mockTestsTaken + 1,
    totalMockScorePercent: current.totalMockScorePercent + scorePercent,
    lastMockScorePercent: scorePercent,
  });
};

export const getAverageMockScore = (progress: StudentProgress) => {
  if (progress.mockTestsTaken === 0) {
    return 0;
  }

  return Math.round(progress.totalMockScorePercent / progress.mockTestsTaken);
};

export const getOverallProgressPercent = (progress: StudentProgress) => {
  const modulePercent =
    progress.totalModules > 0
      ? Math.round((progress.modulesCompleted / progress.totalModules) * 100)
      : 0;
  const videoPercent = Math.min(progress.videosWatched * 10, 100);
  const mockPercent = progress.mockTestsTaken > 0 ? getAverageMockScore(progress) : 0;

  return Math.round((modulePercent + videoPercent + mockPercent) / 3);
};
