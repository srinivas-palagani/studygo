import express from "express";
import cors from "cors";
import ytSearch from "yt-search";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "studygo-backend" });
});

app.get("/api/videos/search", async (req, res) => {
  const {
    subject = "Mathematics",
    classLevel = "Class 6",
    board = "CBSE",
    state = "",
    language = "English",
    limit = "6",
  } = req.query;

  const maxResults = Math.min(Math.max(Number(limit) || 6, 1), 12);
  const normalizedState = String(state || "").trim();
  const query = [
    String(subject),
    String(classLevel),
    String(board),
    normalizedState,
    `${String(language)} medium`,
    "full lesson",
  ]
    .filter(Boolean)
    .join(" ");

  try {
    const searchResult = await ytSearch(query);

    const videos = searchResult.videos
      .slice(0, maxResults)
      .map((video, index) => ({
        id: `yt-${video.videoId}-${index}`,
        title: video.title,
        duration: video.timestamp || "N/A",
        provider: "youtube",
        url: `https://www.youtube.com/embed/${video.videoId}`,
        fallbackUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        language: String(language),
      }));

    res.json({
      query,
      count: videos.length,
      videos,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch videos from YouTube source",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

const port = Number(process.env.PORT || 4000);

app.listen(port, () => {
  console.log(`StudyGO backend listening on http://localhost:${port}`);
});
