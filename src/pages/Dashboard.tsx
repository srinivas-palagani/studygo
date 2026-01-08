import { BookOpen, FileText, RefreshCw, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProgressCard from "@/components/dashboard/ProgressCard";
import QuickActionCard from "@/components/dashboard/QuickActionCard";
import SubjectCard from "@/components/dashboard/SubjectCard";
import NCERTLibraryCard from "@/components/dashboard/NCERTLibraryCard";
import FloatingChatButton from "@/components/dashboard/FloatingChatButton";

const Dashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      icon: BookOpen,
      title: "Today's Lesson",
      subtitle: "Mathematics · Chapter 5",
      variant: "default" as const,
      onClick: () => navigate("/todays-lesson"),
    },
    {
      icon: FileText,
      title: "Practice Test",
      subtitle: "5 questions · 10 mins",
      variant: "default" as const,
      onClick: () => navigate("/practice-test"),
    },
    {
      icon: RefreshCw,
      title: "Quick Revision",
      subtitle: "Review key concepts",
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

  const subjects = [
    { icon: "🌍", name: "Social Studies", id: "social-studies" },
    { icon: "🔬", name: "Science", id: "science" },
    { icon: "📐", name: "Mathematics", id: "mathematics" },
    { icon: "📚", name: "English", id: "english" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader userName="Yuvraj" classInfo="Class 6 · CBSE" />

      <main className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Weekly Progress */}
        <ProgressCard title="Weekly Progress" progress={0} />

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
          classLevel="Class 6" 
          onClick={() => navigate("/library")}
        />
      </main>

      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  );
};

export default Dashboard;
