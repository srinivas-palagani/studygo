import { useEffect, useState } from "react";
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
import { saveUserProfile } from "@/lib/userProfile";
import {
  BOARD_OPTIONS,
  CLASS_OPTIONS,
  INDIA_STATES,
  LANGUAGE_OPTIONS,
  getDefaultLanguageByState,
} from "@/lib/learningContent";
import { getSubjectCatalog, type SubjectOption } from "@/lib/learningContentApi";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("English");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<SubjectOption[]>([]);

  const boards = BOARD_OPTIONS;
  const classes = CLASS_OPTIONS;

  useEffect(() => {
    if (!selectedBoard) {
      setAvailableSubjects([]);
      setSelectedSubjects([]);
      return;
    }

    let isMounted = true;

    getSubjectCatalog({ board: selectedBoard, state: selectedState }).then((subjects) => {
      if (!isMounted) {
        return;
      }

      setAvailableSubjects(subjects);
      setSelectedSubjects((prev) =>
        prev.filter((subject) => subjects.some((item) => item.name === subject))
      );
    });

    return () => {
      isMounted = false;
    };
  }, [selectedBoard, selectedState, selectedClass]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      saveUserProfile({
        name: name.trim(),
        classLevel: selectedClass,
        board: selectedBoard,
        state: selectedState,
        preferredLanguage: selectedState ? preferredLanguage : "English",
        subjects: selectedSubjects,
      });
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
              <div className="grid grid-cols-2 gap-3">
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

            <div>
              <Label className="text-foreground font-medium">State</Label>
              <Select
                value={selectedState}
                onValueChange={(value) => {
                  setSelectedState(value);
                  setPreferredLanguage(getDefaultLanguageByState(value));
                }}
              >
                <SelectTrigger className="mt-2 bg-card border-border">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {INDIA_STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedState ? (
              <div>
                <Label className="text-foreground font-medium">Preferred Language</Label>
                <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                  <SelectTrigger className="mt-2 bg-card border-border">
                    <SelectValue placeholder="Select learning language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGE_OPTIONS.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Language will stay English until a state is selected.
              </p>
            )}
          </div>
        )}

        {/* Step 3: Subjects */}
        {step === 3 && (
          <div className="animate-fade-in">
            <Label className="text-foreground font-medium mb-3 block">Subjects</Label>
            <div className="flex flex-wrap gap-3 mb-4">
              {availableSubjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => toggleSubject(subject.name)}
                  className={cn(
                    "py-2 px-4 rounded-lg font-medium transition-all duration-200 border",
                    selectedSubjects.includes(subject.name)
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card text-foreground hover:bg-secondary"
                  )}
                >
                  {subject.name}
                </button>
              ))}
            </div>
            {availableSubjects.length === 0 && (
              <p className="text-sm text-muted-foreground mb-4">
                Select class and board to load subjects.
              </p>
            )}
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
              (step === 1 && !name.trim()) ||
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
