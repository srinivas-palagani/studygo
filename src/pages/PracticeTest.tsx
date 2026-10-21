import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { recordMockTestResult } from "@/lib/studentProgress";
import { getUserProfile } from "@/lib/userProfile";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const PracticeTest = () => {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes
  const hasRecordedResult = useRef(false);
  const userProfile = getUserProfile();

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the equivalent fraction of 1/2?",
      options: ["2/3", "2/4", "3/4", "1/3"],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "Simplify the fraction 6/8 to its lowest terms.",
      options: ["2/4", "3/4", "1/2", "4/6"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "Which fraction is greater: 3/4 or 2/3?",
      options: ["3/4", "2/3", "They are equal", "Cannot determine"],
      correctAnswer: 0,
    },
    {
      id: 4,
      question: "What is 1/4 + 1/4?",
      options: ["1/8", "2/8", "1/2", "2/4"],
      correctAnswer: 2,
    },
    {
      id: 5,
      question: "Convert 0.75 to a fraction.",
      options: ["1/2", "3/4", "2/3", "7/5"],
      correctAnswer: 1,
    },
  ];

  const handleSelectAnswer = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!showResults || hasRecordedResult.current) {
      return;
    }

    const score = calculateScore();
    recordMockTestResult(score, questions.length);
    hasRecordedResult.current = true;
  }, [showResults]);

  if (!started) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-card border-b border-border p-4">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="font-semibold text-foreground">Practice Test</h1>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center shadow-card">
            <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
              <HelpCircle className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Mathematics Quiz
            </h2>
            <p className="text-muted-foreground mb-6">
              {userProfile?.board ?? "Board"} · {userProfile?.state ?? "State"} · {userProfile?.preferredLanguage ?? "English"}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8 text-left">
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-sm text-muted-foreground">Questions</p>
                <p className="text-xl font-bold text-foreground">{questions.length}</p>
              </div>
              <div className="bg-secondary rounded-xl p-4">
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="text-xl font-bold text-foreground">10 mins</p>
              </div>
            </div>

            <Button
              variant="gradient"
              size="xl"
              className="w-full"
              onClick={() => setStarted(true)}
            >
              Start Test
            </Button>
          </div>
        </main>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-card border-b border-border p-4">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="font-semibold text-foreground">Test Results</h1>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center shadow-card">
            <div
              className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6",
                percentage >= 70
                  ? "bg-success/20 text-success"
                  : percentage >= 40
                  ? "bg-warning/20 text-warning"
                  : "bg-destructive/20 text-destructive"
              )}
            >
              <span className="text-3xl font-bold">{Math.round(percentage)}%</span>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-2">
              {percentage >= 70 ? "Excellent!" : percentage >= 40 ? "Good Try!" : "Keep Practicing!"}
            </h2>
            <p className="text-muted-foreground mb-6">
              You scored {score} out of {questions.length} questions correctly.
            </p>

            <div className="space-y-3 mb-8">
              {questions.map((q, index) => (
                <div
                  key={q.id}
                  className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                >
                  <span className="text-sm text-foreground">Question {index + 1}</span>
                  {selectedAnswers[index] === q.correctAnswer ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                variant="dark"
                size="lg"
                className="flex-1"
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </Button>
              <Button
                variant="gradient"
                size="lg"
                className="flex-1"
                onClick={() => {
                  setStarted(false);
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setSelectedAnswers({});
                }}
              >
                Retry Test
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="flex items-center gap-1 text-sm font-medium text-primary">
              <Clock className="w-4 h-4" />
              {formatTime(timeRemaining)}
            </span>
          </div>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
        </div>
      </header>

      {/* Question */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-6">
        <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-card">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(currentQuestion, index)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all duration-200",
                  selectedAnswers[currentQuestion] === index
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 hover:bg-secondary"
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                      selectedAnswers[currentQuestion] === index
                        ? "gradient-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-foreground">{option}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button
            variant="dark"
            size="lg"
            className="flex-1"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            variant="gradient"
            size="lg"
            className="flex-1"
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
          >
            {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PracticeTest;
