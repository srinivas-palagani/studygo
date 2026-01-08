import { Progress } from "@/components/ui/progress";

interface ProgressCardProps {
  title: string;
  progress: number;
}

const ProgressCard = ({ title, progress }: ProgressCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card">
      <h2 className="text-lg font-semibold text-foreground mb-4">{title}</h2>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">Progress</span>
        <span className="text-sm font-semibold text-primary">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default ProgressCard;
