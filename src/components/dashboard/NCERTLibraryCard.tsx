import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface NCERTLibraryCardProps {
  classLevel: string;
  onClick?: () => void;
}

const NCERTLibraryCard = ({ classLevel, onClick }: NCERTLibraryCardProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">NCERT Library</h2>
        <button className="text-sm text-primary hover:underline font-medium">
          View All
        </button>
      </div>

      <div className="bg-dark-surface rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            <div className="w-2 h-10 bg-primary rounded-full" />
            <div className="w-2 h-10 bg-primary/70 rounded-full" />
            <div className="w-2 h-10 bg-primary/40 rounded-full" />
          </div>
          <div>
            <h3 className="font-semibold text-card-dark-foreground">
              NCERT Books - {classLevel}
            </h3>
            <p className="text-sm text-muted-foreground">
              Access complete NCERT books with offline support
            </p>
          </div>
        </div>
        <Button variant="gradient" size="default" onClick={onClick}>
          Open Library
        </Button>
      </div>
    </div>
  );
};

export default NCERTLibraryCard;
