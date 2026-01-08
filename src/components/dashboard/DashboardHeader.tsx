import { Settings, FileEdit } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
  classInfo: string;
}

const DashboardHeader = ({ userName, classInfo }: DashboardHeaderProps) => {
  return (
    <header className="flex items-center justify-between p-4 md:p-6 bg-card border-b border-border">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
          Hi, {userName} <span className="text-2xl">👋</span>
        </h1>
        <p className="text-sm text-muted-foreground">{classInfo}</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <FileEdit className="w-5 h-5 text-muted-foreground" />
        </button>
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
