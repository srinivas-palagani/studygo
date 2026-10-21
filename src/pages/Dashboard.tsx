import { useEffect, useState } from "react";
import { BookOpen, FileText, RefreshCw, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProgressCard from "@/components/dashboard/ProgressCard";
import QuickActionCard from "@/components/dashboard/QuickActionCard";
import SubjectCard from "@/components/dashboard/SubjectCard";
import NCERTLibraryCard from "@/components/dashboard/NCERTLibraryCard";
import FloatingChatButton from "@/components/dashboard/FloatingChatButton";
import { getUserProfile } from "@/lib/userProfile";
import {
  getAverageMockScore,
  getOverallProgressPercent,
  getStudentProgress,
} from "@/lib/studentProgress";
import { getSubjectCatalog, type SubjectOption } from "@/lib/learningContentApi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [subjectCatalog, setSubjectCatalog] = useState<SubjectOption[]>([]);
  const userProfile = getUserProfile();
  const studentProgress = getStudentProgress();
  const overallProgress = getOverallProgressPercent(studentProgress);
  const avgMockScore = getAverageMockScore(studentProgress);
  const userName = userProfile?.name ?? "Guest";
  const classInfo = userProfile
    ? `${userProfile.classLevel} · ${userProfile.board}${userProfile.state ? ` · ${userProfile.state}` : ""}`
    : "Class not selected";

  useEffect(() => {
    if (!userProfile?.board) {
      setSubjectCatalog([]);
      return;
    }

    let isMounted = true;

    getSubjectCatalog({
      board: userProfile.board,
      state: userProfile.state,
    }).then((catalog) => {
      if (isMounted) {
        setSubjectCatalog(catalog);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [userProfile?.board, userProfile?.state]);

  const quickActions = [
    {
      icon: BookOpen,
      title: "Today's Lesson",
      subtitle: `${userProfile?.preferredLanguage ?? "English"} learning`,
      variant: "default" as const,
      onClick: () => navigate("/todays-lesson"),
    },
    {
      icon: FileText,
      title: "Practice Test",
      subtitle: `${userProfile?.board ?? "Board"} syllabus`,
      variant: "default" as const,
      onClick: () => navigate("/practice-test"),
    },
    {
      icon: RefreshCw,
      title: "Quick Revision",
      subtitle: `${userProfile?.state ?? "State"} focused modules`,
      variant: "default" as const,
      onClick: () => navigate("/quick-revision"),
    },
    {
      icon: MessageSquare,
      title: "AI MITRA",
      subtitle: "Get instant help",
      variant: "primary" as const,
      onClick: () => navigate("/ai-mitra"),
    },
  ];

  const subjects = subjectCatalog.filter((subject) =>
    userProfile?.subjects?.length ? userProfile.subjects.includes(subject.name) : true
  );

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName={userName} classInfo={classInfo} />

      <main className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Weekly Progress */}
        <ProgressCard title="Weekly Progress" progress={overallProgress} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Videos Watched</p>
            <p className="text-2xl font-bold text-foreground">{studentProgress.videosWatched}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Mock Tests Taken</p>
            <p className="text-2xl font-bold text-foreground">{studentProgress.mockTestsTaken}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 shadow-card">
            <p className="text-sm text-muted-foreground">Average Mock Score</p>
            <p className="text-2xl font-bold text-foreground">{avgMockScore}%</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <QuickActionCard
              key={action.title}
              icon={action.icon}
              title={action.title}
              subtitle={action.subtitle}
              variant={action.variant}
              onClick={action.onClick}
            />
          ))}
        </div>

        {/* Your Subjects */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Your Subjects
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.name}
                icon={subject.icon}
                name={subject.name}
                onClick={() => navigate(`/subject/${subject.id}`)}
              />
            ))}
          </div>
        </div>

        {/* NCERT Library */}
        <NCERTLibraryCard 
          classLevel={userProfile?.classLevel ?? "Class 6"} 
          onClick={() => navigate("/library")}
        />
      </main>

      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  );
};

export default Dashboard;
