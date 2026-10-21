import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle, Clock, Loader2, Play, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getUserProfile } from "@/lib/userProfile";
import {
  getSubjectLearningContent,
  type LessonVideo,
  type SubjectLearningContent,
} from "@/lib/learningContentApi";
import { recordVideoWatch, updateModuleProgress } from "@/lib/studentProgress";
import { cn } from "@/lib/utils";

const SubjectDetails = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const userProfile = getUserProfile();

  const classLevel = userProfile?.classLevel ?? "Class 6";
  const board = userProfile?.board ?? "CBSE";
  const state = userProfile?.state ?? "";
  const selectedLanguage = userProfile?.preferredLanguage ?? "English";

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<SubjectLearningContent | null>(null);
  const [activeVideo, setActiveVideo] = useState<LessonVideo | null>(null);
  const [useFallbackPlayer, setUseFallbackPlayer] = useState(false);
  const [reviewedTopicIds, setReviewedTopicIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    getSubjectLearningContent({
      classLevel,
      board,
      state,
      subjectId: subjectId || "mathematics",
      selectedLanguage,
    }).then((data) => {
      if (!isMounted) {
        return;
      }

      setContent(data);
      setActiveVideo(data.videos[0] ?? null);
      setUseFallbackPlayer(false);
      setReviewedTopicIds(new Set());
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [classLevel, board, state, subjectId, selectedLanguage]);

  useEffect(() => {
    if (!content) {
      return;
    }

    updateModuleProgress(reviewedTopicIds.size, content.topics.length);
  }, [content, reviewedTopicIds]);

  const progressPercent = useMemo(() => {
    if (!content || content.topics.length === 0) {
      return 0;
    }

    return Math.round((reviewedTopicIds.size / content.topics.length) * 100);
  }, [content, reviewedTopicIds]);

  const toggleReviewedTopic = (topicId: string) => {
    setReviewedTopicIds((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      return next;
    });
  };

  const handleSelectVideo = (video: LessonVideo) => {
    setActiveVideo(video);
    setUseFallbackPlayer(false);
    recordVideoWatch();
  };

  const activeVideoUrl = useFallbackPlayer
    ? activeVideo?.fallbackUrl || activeVideo?.url
    : activeVideo?.url;

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading personalized subject data...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border p-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="font-semibold text-foreground">{content.subject.name}</h1>
            <p className="text-xs text-muted-foreground">
              {content.classLevel} · {content.syllabusName}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center text-2xl">
              {content.subject.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{content.subject.name}</h2>
              <p className="text-sm text-muted-foreground">
                Board: {content.board} {content.state ? `· State: ${content.state}` : ""} · Language: {content.language}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-5 text-sm">
            <div className="bg-secondary rounded-lg p-3">
              <p className="text-muted-foreground">Class</p>
              <p className="font-semibold text-foreground">{content.classLevel}</p>
            </div>
            <div className="bg-secondary rounded-lg p-3">
              <p className="text-muted-foreground">Topics</p>
              <p className="font-semibold text-foreground">{content.topics.length}</p>
            </div>
            <div className="bg-secondary rounded-lg p-3">
              <p className="text-muted-foreground">Videos</p>
              <p className="font-semibold text-foreground">{content.videos.length}</p>
            </div>
            <div className="bg-secondary rounded-lg p-3">
              <p className="text-muted-foreground">Modules</p>
              <p className="font-semibold text-foreground">{content.modules.length}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Syllabus Progress</span>
              <span className="font-semibold text-primary">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <h3 className="font-semibold text-foreground mb-3">Class-wise Syllabus Topics</h3>
          <div className="space-y-2">
            {content.topics.map((topic, index) => (
              <button
                key={topic.id}
                onClick={() => toggleReviewedTopic(topic.id)}
                className={cn(
                  "w-full text-left rounded-lg border p-3 transition-colors",
                  reviewedTopicIds.has(topic.id)
                    ? "border-success/40 bg-success/10"
                    : "border-border hover:border-primary/40"
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-foreground">
                      Topic {index + 1}: {topic.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{topic.summary}</p>
                  </div>
                  {reviewedTopicIds.has(topic.id) ? (
                    <CheckCircle className="w-4 h-4 text-success" />
                  ) : (
                    <BookOpen className="w-4 h-4 text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Recorded Videos (Play in Website)</h3>
            <div className="text-right">
              <span className="text-xs text-muted-foreground block">YouTube + HTML5 fallback</span>
              <span
                className={cn(
                  "text-[11px] font-medium",
                  content.videoSource === "backend" ? "text-success" : "text-warning"
                )}
              >
                {content.videoSource === "backend"
                  ? "Backend Connected"
                  : "Fallback Content"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="space-y-2 lg:col-span-1">
              {content.videos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => handleSelectVideo(video)}
                  className={cn(
                    "w-full border rounded-lg p-3 text-left transition-colors",
                    activeVideo?.id === video.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <p className="font-medium text-foreground">{video.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3" />
                    {video.duration} · {video.provider === "youtube" ? "YouTube" : "Direct Video"}
                  </p>
                </button>
              ))}
            </div>

            <div className="lg:col-span-2">
              <div className="aspect-video bg-black rounded-lg overflow-hidden border border-border">
                {activeVideo ? (
                  activeVideo.provider === "youtube" && !useFallbackPlayer ? (
                    <iframe
                      src={activeVideoUrl}
                      title={activeVideo.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      key={activeVideo.id + String(useFallbackPlayer)}
                      src={activeVideoUrl}
                      controls
                      className="w-full h-full"
                      onError={() => {
                        if (!useFallbackPlayer && activeVideo.fallbackUrl) {
                          setUseFallbackPlayer(true);
                        }
                      }}
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No video available
                  </div>
                )}
              </div>

              {activeVideo && activeVideo.fallbackUrl && (
                <div className="mt-3 flex gap-2">
                  <Button
                    variant="dark"
                    size="sm"
                    onClick={() => setUseFallbackPlayer((prev) => !prev)}
                  >
                    <Video className="w-4 h-4" />
                    {useFallbackPlayer ? "Use Primary Player" : "Use Fallback Player"}
                  </Button>
                  <Button
                    variant="gradient"
                    size="sm"
                    onClick={() => recordVideoWatch()}
                  >
                    <Play className="w-4 h-4" />
                    Mark as Watched
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubjectDetails;
