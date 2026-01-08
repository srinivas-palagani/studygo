import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RoleSelector from "./RoleSelector";
import AuthMethodToggle from "./AuthMethodToggle";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("Student");
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");

  const handleContinue = () => {
    navigate("/create-password");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 self-start max-w-md w-full mx-auto"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      {/* Form Card */}
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-card animate-scale-in">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Welcome to Study GO
        </h1>
        <p className="text-muted-foreground mb-6">
          Choose your role to get started
        </p>

        {/* Role Selector */}
        <div className="mb-6">
          <RoleSelector selectedRole={role} onRoleChange={setRole} />
        </div>

        {/* Auth Method Toggle */}
        <div className="mb-6">
          <AuthMethodToggle method={method} onMethodChange={setMethod} />
        </div>

        {/* Email/Phone Input */}
        <div className="mb-4">
          <Label className="text-foreground font-medium">
            {method === "email" ? "Email" : "Mobile Number"}
          </Label>
          <Input
            type={method === "email" ? "email" : "tel"}
            placeholder={method === "email" ? "Enter your email" : "Enter your mobile number"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 bg-card border-border focus:border-primary focus:ring-primary"
          />
        </div>

        {/* Create Password Link */}
        <button
          onClick={() => navigate("/create-password")}
          className="text-primary font-medium text-sm hover:underline mb-6 block"
        >
          Create password
        </button>

        {/* Continue Button */}
        <Button
          variant="gradient"
          size="lg"
          className="w-full"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
