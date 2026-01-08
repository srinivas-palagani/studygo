import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreatePasswordForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const requirements = useMemo(() => ({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    match: password === confirmPassword && password.length > 0,
  }), [password, confirmPassword]);

  const strengthLevel = useMemo(() => {
    const count = Object.values(requirements).filter(Boolean).length;
    return count;
  }, [requirements]);

  const handleSubmit = () => {
    if (Object.values(requirements).every(Boolean)) {
      navigate("/profile-setup");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-card animate-scale-in">
        <h1 className="text-2xl font-bold text-foreground mb-8">
          Create password
        </h1>

        {/* New Password */}
        <div className="mb-4">
          <Label className="text-foreground font-medium">New Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 bg-card border-border focus:border-primary focus:ring-primary"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <Label className="text-foreground font-medium">Confirm Password</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-2 bg-card border-border focus:border-primary focus:ring-primary"
          />
        </div>

        {/* Password Strength */}
        <div className="mb-6">
          <Label className="text-foreground font-medium mb-2 block">
            Password Strength
          </Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  strengthLevel >= level
                    ? "bg-primary"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Requirements List */}
        <ul className="space-y-2 mb-8">
          <RequirementItem met={requirements.length} text="At least 8 characters" />
          <RequirementItem met={requirements.uppercase} text="One uppercase letter" />
          <RequirementItem met={requirements.number} text="One number" />
          <RequirementItem met={requirements.match} text="Passwords match" />
        </ul>

        {/* Submit Button */}
        <Button
          variant="gradient"
          size="lg"
          className="w-full"
          onClick={handleSubmit}
          disabled={!Object.values(requirements).every(Boolean)}
        >
          Set Password
        </Button>
      </div>
    </div>
  );
};

interface RequirementItemProps {
  met: boolean;
  text: string;
}

const RequirementItem = ({ met, text }: RequirementItemProps) => (
  <li className="flex items-center gap-2 text-sm">
    {met ? (
      <Check className="w-4 h-4 text-success" />
    ) : (
      <X className="w-4 h-4 text-muted-foreground" />
    )}
    <span className={met ? "text-foreground" : "text-muted-foreground"}>
      {text}
    </span>
  </li>
);

export default CreatePasswordForm;
