import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock, CheckCircle, Play, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getUserProfile } from "@/lib/userProfile";
import { getDefaultLanguageByState, getPersonalizedSubjectContent } from "@/lib/learningContent";
import { recordVideoWatch, updateModuleProgress } from "@/lib/studentProgress";

const TodaysLesson = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const userProfile = getUserProfile();
  const learningState = userProfile?.state ?? "Karnataka";
  const learningLanguage =
    userProfile?.preferredLanguage ?? getDefaultLanguageByState(learningState);
  const personalizedContent = getPersonalizedSubjectContent({
    subjectId: "mathematics",
    board: userProfile?.board ?? "CBSE",
    state: learningState,
    language: learningLanguage,
  });

  const lesson = {
    subject: "Mathematics",
    chapter: "Chapter 5: Fractions",
    topic: "Understanding Equivalent Fractions",
    duration: "45 mins",
    sections: [
      {
        id: 1,
        title: "Introduction to Fractions",
        duration: "10 mins",
        completed: true,
        type: "video",
      },
      {
        id: 2,
        title: "What are Equivalent Fractions?",
        duration: "12 mins",
        completed: true,
        type: "video",
      },
      {
        id: 3,
        title: "Finding Equivalent Fractions",
        duration: "15 mins",
        completed: false,
        type: "interactive",
      },
      {
        id: 4,
        title: "Practice Problems",
        duration: "8 mins",
        completed: false,
        type: "exercise",
      },
    ],
  };

  const completedSections = lesson.sections.filter((s) => s.completed).length;
  const progressPercent = (completedSections / lesson.sections.length) * 100;

  useEffect(() => {
    updateModuleProgress(completedSections, lesson.sections.length);
  }, [completedSections, lesson.sections.length]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold text-foreground">Today's Lesson</h1>
            <p className="text-sm text-muted-foreground">
              {lesson.subject} · {personalizedContent.syllabusName}
            </p>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium text-primary">
              {completedSections}/{lesson.sections.length} completed
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        {/* Lesson Info Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <BookOpen className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground mb-1">
                {lesson.topic}
              </h2>
              <p className="text-muted-foreground">{lesson.chapter}</p>
              <p className="text-xs text-muted-foreground mt-1">
                State: {learningState} · Language: {learningLanguage}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {lesson.duration}
            </span>
            <span className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              {lesson.sections.length} sections
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-primary">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>

        {/* Lesson Sections */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Lesson Content</h3>
          {lesson.sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => setCurrentSection(index)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                currentSection === index
                  ? "bg-primary/10 border-primary"
                  : section.completed
                  ? "bg-card border-border hover:bg-secondary"
                  : "bg-card border-border hover:bg-secondary"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  section.completed
                    ? "bg-success/20 text-success"
                    : currentSection === index
                    ? "gradient-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {section.completed ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="font-semibold">{index + 1}</span>
                )}
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-medium text-foreground">{section.title}</h4>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  {section.duration}
                  <span className="px-2 py-0.5 bg-muted rounded text-xs capitalize">
                    {section.type}
                  </span>
                </p>
              </div>
              {!section.completed && (
                <Play className="w-5 h-5 text-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Start/Continue Button */}
        <div className="sticky bottom-4">
          <Button
            variant="gradient"
            size="xl"
            className="w-full"
            onClick={() => recordVideoWatch()}
          >
            <Play className="w-5 h-5" />
            {completedSections > 0 ? "Continue Lesson" : "Start Lesson"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TodaysLesson;
