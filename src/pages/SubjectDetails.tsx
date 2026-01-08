import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Clock, Users, Star, Play, CheckCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Chapter {
  id: number;
  title: string;
  lessons: number;
  duration: string;
  completed: boolean;
  locked: boolean;
}

interface SubjectData {
  name: string;
  icon: string;
  description: string;
  chapters: number;
  lessons: number;
  duration: string;
  rating: number;
  students: number;
  progress: number;
  chaptersList: Chapter[];
}

const subjects: Record<string, SubjectData> = {
  "social-studies": {
    name: "Social Studies",
    icon: "🌍",
    description: "Explore the world around you through history, geography, civics, and economics. Understand how societies work and develop critical thinking skills.",
    chapters: 12,
    lessons: 48,
    duration: "24 hours",
    rating: 4.8,
    students: 15420,
    progress: 25,
    chaptersList: [
      { id: 1, title: "Understanding Diversity", lessons: 4, duration: "2h", completed: true, locked: false },
      { id: 2, title: "Government and Democracy", lessons: 5, duration: "2.5h", completed: true, locked: false },
      { id: 3, title: "Local Self Government", lessons: 4, duration: "2h", completed: false, locked: false },
      { id: 4, title: "Making a Living", lessons: 3, duration: "1.5h", completed: false, locked: false },
      { id: 5, title: "The Earth in the Solar System", lessons: 4, duration: "2h", completed: false, locked: true },
    ],
  },
  science: {
    name: "Science",
    icon: "🔬",
    description: "Discover the wonders of science through experiments, observations, and understanding of natural phenomena around us.",
    chapters: 15,
    lessons: 60,
    duration: "30 hours",
    rating: 4.9,
    students: 18750,
    progress: 40,
    chaptersList: [
      { id: 1, title: "Food: Where Does It Come From?", lessons: 3, duration: "1.5h", completed: true, locked: false },
      { id: 2, title: "Components of Food", lessons: 4, duration: "2h", completed: true, locked: false },
      { id: 3, title: "Fibre to Fabric", lessons: 3, duration: "1.5h", completed: true, locked: false },
      { id: 4, title: "Sorting Materials", lessons: 4, duration: "2h", completed: false, locked: false },
      { id: 5, title: "Separation of Substances", lessons: 4, duration: "2h", completed: false, locked: true },
    ],
  },
  mathematics: {
    name: "Mathematics",
    icon: "📐",
    description: "Build strong mathematical foundations with numbers, geometry, algebra, and problem-solving techniques.",
    chapters: 14,
    lessons: 56,
    duration: "28 hours",
    rating: 4.7,
    students: 21340,
    progress: 15,
    chaptersList: [
      { id: 1, title: "Knowing Our Numbers", lessons: 5, duration: "2.5h", completed: true, locked: false },
      { id: 2, title: "Whole Numbers", lessons: 4, duration: "2h", completed: false, locked: false },
      { id: 3, title: "Playing with Numbers", lessons: 5, duration: "2.5h", completed: false, locked: false },
      { id: 4, title: "Basic Geometrical Ideas", lessons: 4, duration: "2h", completed: false, locked: true },
      { id: 5, title: "Understanding Elementary Shapes", lessons: 5, duration: "2.5h", completed: false, locked: true },
    ],
  },
  english: {
    name: "English",
    icon: "📚",
    description: "Master the English language through reading, writing, grammar, and communication skills development.",
    chapters: 10,
    lessons: 40,
    duration: "20 hours",
    rating: 4.6,
    students: 16890,
    progress: 50,
    chaptersList: [
      { id: 1, title: "A Tale of Two Birds", lessons: 4, duration: "2h", completed: true, locked: false },
      { id: 2, title: "The Friendly Mongoose", lessons: 4, duration: "2h", completed: true, locked: false },
      { id: 3, title: "The Shepherd's Treasure", lessons: 4, duration: "2h", completed: true, locked: false },
      { id: 4, title: "Tansen", lessons: 4, duration: "2h", completed: false, locked: false },
      { id: 5, title: "The Monkey and the Crocodile", lessons: 4, duration: "2h", completed: false, locked: true },
    ],
  },
};

const SubjectDetails = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();

  const subject = subjects[subjectId || ""] || subjects["mathematics"];

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
          <h1 className="font-semibold text-foreground">{subject.name}</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        {/* Hero Card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card">
          <div className="gradient-primary p-6 text-center">
            <span className="text-6xl mb-4 block">{subject.icon}</span>
            <h2 className="text-2xl font-bold text-primary-foreground mb-2">
              {subject.name}
            </h2>
            <p className="text-primary-foreground/80 text-sm">Class 6 · CBSE</p>
          </div>

          <div className="p-6">
            <p className="text-muted-foreground mb-6">{subject.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">{subject.chapters}</p>
                <p className="text-xs text-muted-foreground">Chapters</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">{subject.lessons}</p>
                <p className="text-xs text-muted-foreground">Lessons</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">{subject.duration}</p>
                <p className="text-xs text-muted-foreground">Duration</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-foreground flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  {subject.rating}
                </p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Your Progress</span>
                <span className="font-medium text-primary">{subject.progress}%</span>
              </div>
              <Progress value={subject.progress} className="h-2" />
            </div>

            <Button variant="gradient" size="lg" className="w-full">
              <Play className="w-5 h-5" />
              Continue Learning
            </Button>
          </div>
        </div>

        {/* Chapters List */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Course Content</h3>
          {subject.chaptersList.map((chapter) => (
            <button
              key={chapter.id}
              disabled={chapter.locked}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                chapter.locked
                  ? "bg-muted/50 border-border opacity-60 cursor-not-allowed"
                  : chapter.completed
                  ? "bg-success/5 border-success/30 hover:bg-success/10"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  chapter.locked
                    ? "bg-muted text-muted-foreground"
                    : chapter.completed
                    ? "bg-success/20 text-success"
                    : "gradient-primary text-primary-foreground"
                }`}
              >
                {chapter.locked ? (
                  <Lock className="w-5 h-5" />
                ) : chapter.completed ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <BookOpen className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-medium text-foreground">
                  Chapter {chapter.id}: {chapter.title}
                </h4>
                <p className="text-sm text-muted-foreground flex items-center gap-3">
                  <span>{chapter.lessons} lessons</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {chapter.duration}
                  </span>
                </p>
              </div>
              {!chapter.locked && !chapter.completed && (
                <Play className="w-5 h-5 text-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Join Course CTA */}
        <div className="bg-card border border-border rounded-2xl p-6 text-center shadow-card">
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
            <Users className="w-5 h-5" />
            <span>{subject.students.toLocaleString()} students enrolled</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Ready to master {subject.name}?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get full access to all chapters, practice tests, and AI-powered assistance.
          </p>
          <Button variant="gradient" size="lg" className="w-full">
            Join Course for Free
          </Button>
        </div>
      </main>
    </div>
  );
};

export default SubjectDetails;
