import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FloatingChatButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/ai-mitra")}
      className="fixed bottom-6 right-6 w-14 h-14 gradient-primary rounded-full flex items-center justify-center shadow-glow hover:shadow-glow-lg transition-all duration-200 animate-pulse-glow z-50"
      aria-label="Open AI MITRA Chat"
    >
      <MessageCircle className="w-6 h-6 text-primary-foreground" />
    </button>
  );
};

export default FloatingChatButton;
