import { Rocket } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ size = "md", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${sizeClasses[size]} rounded-full bg-dark-surface flex items-center justify-center shadow-glow`}>
        <Rocket className="w-1/2 h-1/2 text-primary rotate-45" strokeWidth={2.5} />
      </div>
      {showText && (
        <span className={`font-bold ${textSizeClasses[size]} text-gradient`}>
          Study GO
        </span>
      )}
    </div>
  );
};

export default Logo;
