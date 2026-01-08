import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const boards = ["CBSE", "ICSE", "STATE"];
  const classes = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];
  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "Social Studies",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
  ];

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-card border border-border rounded-2xl p-8 shadow-card animate-scale-in">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Profile Setup
        </h1>
        <p className="text-muted-foreground mb-6">
          {step} of 3 steps completed
        </p>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors duration-300",
                s <= step ? "bg-primary" : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Step 1: Name */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
            </div>
            <Label className="text-foreground font-medium">Full Name</Label>
            <Input
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 bg-card border-primary focus:border-primary focus:ring-primary"
            />
          </div>
        )}

        {/* Step 2: Class & Board */}
        {step === 2 && (
          <div className="animate-fade-in space-y-6">
            <div>
              <Label className="text-foreground font-medium">Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="mt-2 bg-card border-border">
                  <SelectValue placeholder="Select your class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-foreground font-medium mb-3 block">Board</Label>
              <div className="flex gap-3">
                {boards.map((board) => (
                  <button
                    key={board}
                    onClick={() => setSelectedBoard(board)}
                    className={cn(
                      "flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200",
                      selectedBoard === board
                        ? "gradient-primary text-primary-foreground shadow-glow"
                        : "bg-dark-surface text-card-dark-foreground border border-border hover:bg-dark-surface-hover"
                    )}
                  >
                    {board}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Subjects */}
        {step === 3 && (
          <div className="animate-fade-in">
            <Label className="text-foreground font-medium mb-3 block">Subjects</Label>
            <div className="flex flex-wrap gap-3 mb-4">
              {subjects.map((subject) => (
                <button
                  key={subject}
                  onClick={() => toggleSubject(subject)}
                  className={cn(
                    "py-2 px-4 rounded-lg font-medium transition-all duration-200 border",
                    selectedSubjects.includes(subject)
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card text-foreground hover:bg-secondary"
                  )}
                >
                  {subject}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Select at least one subject
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <Button variant="dark" size="lg" className="flex-1" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button
            variant="gradient"
            size="lg"
            className="flex-1"
            onClick={handleNext}
            disabled={
              (step === 1 && !name) ||
              (step === 2 && (!selectedClass || !selectedBoard)) ||
              (step === 3 && selectedSubjects.length === 0)
            }
          >
            {step === 3 ? "Complete" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
