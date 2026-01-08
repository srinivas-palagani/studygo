import { Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthMethodToggleProps {
  method: "email" | "phone";
  onMethodChange: (method: "email" | "phone") => void;
}

const AuthMethodToggle = ({ method, onMethodChange }: AuthMethodToggleProps) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => onMethodChange("email")}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200",
          method === "email"
            ? "gradient-primary text-primary-foreground shadow-glow"
            : "bg-card border border-border text-foreground hover:bg-secondary"
        )}
      >
        <Mail className="w-4 h-4" />
        Email
      </button>
      <button
        onClick={() => onMethodChange("phone")}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-200",
          method === "phone"
            ? "gradient-primary text-primary-foreground shadow-glow"
            : "bg-card border border-border text-foreground hover:bg-secondary"
        )}
      >
        <Phone className="w-4 h-4" />
        Mobile Number
      </button>
    </div>
  );
};

export default AuthMethodToggle;
