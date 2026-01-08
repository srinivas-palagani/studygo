import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, ChevronRight, CheckCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Concept {
  id: number;
  title: string;
  summary: string;
  keyPoints: string[];
  reviewed: boolean;
}

const QuickRevision = () => {
  const navigate = useNavigate();
  const [currentConcept, setCurrentConcept] = useState<number | null>(null);
  const [reviewedConcepts, setReviewedConcepts] = useState<Set<number>>(new Set());

  const concepts: Concept[] = [
    {
      id: 1,
      title: "Fractions Basics",
      summary: "A fraction represents a part of a whole. It consists of a numerator (top) and denominator (bottom).",
      keyPoints: [
        "Numerator tells how many parts we have",
        "Denominator tells total equal parts",
        "Example: 3/4 means 3 out of 4 parts",
      ],
      reviewed: false,
    },
    {
      id: 2,
      title: "Equivalent Fractions",
      summary: "Fractions that represent the same value but have different numerators and denominators.",
      keyPoints: [
        "Multiply or divide both parts by same number",
        "1/2 = 2/4 = 3/6 = 4/8",
        "Used to compare and add fractions",
      ],
      reviewed: false,
    },
    {
      id: 3,
      title: "Comparing Fractions",
      summary: "To compare fractions, make denominators the same or convert to decimals.",
      keyPoints: [
        "Same denominator: compare numerators",
        "Different denominators: find LCM",
        "Cross multiplication method",
      ],
      reviewed: false,
    },
    {
      id: 4,
      title: "Adding Fractions",
      summary: "To add fractions, they must have the same denominator.",
      keyPoints: [
        "Same denominator: add numerators",
        "Different: find common denominator first",
        "Always simplify the result",
      ],
      reviewed: false,
    },
    {
      id: 5,
      title: "Subtracting Fractions",
      summary: "Similar to addition, fractions must have the same denominator to subtract.",
      keyPoints: [
        "Same denominator: subtract numerators",
        "Different: find common denominator",
        "Result can be simplified",
      ],
      reviewed: false,
    },
  ];

  const markAsReviewed = (id: number) => {
    setReviewedConcepts((prev) => new Set([...prev, id]));
    setCurrentConcept(null);
  };

  const resetProgress = () => {
    setReviewedConcepts(new Set());
  };

  const progressPercent = (reviewedConcepts.size / concepts.length) * 100;

  if (currentConcept !== null) {
    const concept = concepts.find((c) => c.id === currentConcept);
    if (!concept) return null;

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-card border-b border-border p-4 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <button
              onClick={() => setCurrentConcept(null)}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div className="flex-1">
              <h1 className="font-semibold text-foreground">Quick Revision</h1>
              <p className="text-sm text-muted-foreground">
                {concepts.findIndex((c) => c.id === currentConcept) + 1} of {concepts.length}
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-6 flex flex-col">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card flex-1">
            <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-6 shadow-glow">
              <BookOpen className="w-7 h-7 text-primary-foreground" />
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-4">{concept.title}</h2>
            <p className="text-muted-foreground mb-6">{concept.summary}</p>

            <div className="bg-secondary rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-foreground mb-3">Key Points</h3>
              <ul className="space-y-2">
                {concept.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-foreground">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <Button
              variant="gradient"
              size="xl"
              className="w-full"
              onClick={() => markAsReviewed(concept.id)}
            >
              <CheckCircle className="w-5 h-5" />
              Mark as Reviewed
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold text-foreground">Quick Revision</h1>
            <p className="text-sm text-muted-foreground">Mathematics · Fractions</p>
          </div>
          <button
            onClick={resetProgress}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        {/* Progress Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Your Progress</h2>
            <span className="text-sm font-medium text-primary">
              {reviewedConcepts.size}/{concepts.length} reviewed
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div
              className="gradient-primary h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Concepts List */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">Key Concepts</h3>
          {concepts.map((concept) => (
            <button
              key={concept.id}
              onClick={() => setCurrentConcept(concept.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200",
                reviewedConcepts.has(concept.id)
                  ? "bg-success/5 border-success/30"
                  : "bg-card border-border hover:border-primary/50"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  reviewedConcepts.has(concept.id)
                    ? "bg-success/20 text-success"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {reviewedConcepts.has(concept.id) ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="font-semibold">{concept.id}</span>
                )}
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-medium text-foreground">{concept.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {concept.summary}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Review All Button */}
        {reviewedConcepts.size < concepts.length && (
          <Button
            variant="gradient"
            size="xl"
            className="w-full"
            onClick={() => {
              const unreviewedConcept = concepts.find(
                (c) => !reviewedConcepts.has(c.id)
              );
              if (unreviewedConcept) {
                setCurrentConcept(unreviewedConcept.id);
              }
            }}
          >
            Continue Revision
          </Button>
        )}

        {reviewedConcepts.size === concepts.length && (
          <div className="bg-success/10 border border-success/30 rounded-2xl p-6 text-center">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-1">
              Revision Complete!
            </h3>
            <p className="text-sm text-muted-foreground">
              You've reviewed all key concepts. Great job!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuickRevision;
