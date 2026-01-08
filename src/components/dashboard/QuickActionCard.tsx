import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  variant?: "default" | "primary";
  onClick?: () => void;
}

const QuickActionCard = ({
  icon: Icon,
  title,
  subtitle,
  variant = "default",
  onClick,
}: QuickActionCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left rounded-xl p-5 transition-all duration-200 hover:-translate-y-1",
        variant === "primary"
          ? "gradient-primary text-primary-foreground shadow-glow hover:shadow-glow-lg"
          : "bg-card border border-border hover:shadow-card"
      )}
    >
      <Icon
        className={cn(
          "w-7 h-7 mb-3",
          variant === "primary" ? "text-primary-foreground" : "text-primary"
        )}
      />
      <h3
        className={cn(
          "font-semibold mb-1",
          variant === "primary" ? "text-primary-foreground" : "text-foreground"
        )}
      >
        {title}
      </h3>
      <p
        className={cn(
          "text-sm",
          variant === "primary"
            ? "text-primary-foreground/80"
            : "text-muted-foreground"
        )}
      >
        {subtitle}
      </p>
    </button>
  );
};

export default QuickActionCard;
