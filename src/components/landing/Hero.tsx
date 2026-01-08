import { Button } from "@/components/ui/button";
import Logo from "@/components/layout/Logo";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background">
      <div className="max-w-4xl mx-auto text-center animate-fade-up">
        {/* Logo */}
        <div className="mb-8">
          <Logo size="lg" showText={false} />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
          Ready to{" "}
          <span className="text-gradient">Turbocharge</span> Your Learning?
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          AI-powered learning platform for Classes 6-12 with NCERT Library, interactive tools, and personalized guidance
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            variant="hero" 
            size="xl"
            onClick={() => navigate("/register")}
          >
            Create Account
          </Button>
          <Button 
            variant="hero-outline" 
            size="xl"
            onClick={() => navigate("/dashboard")}
          >
            Explore as Guest
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <FeatureCard
            icon="📚"
            title="NCERT Library"
            description="Complete NCERT books with offline access"
          />
          <FeatureCard
            icon="🤖"
            title="AI MITRA"
            description="Step-by-step problem solving assistant"
          />
          <FeatureCard
            icon="🌐"
            title="Multi-Language"
            description="English, Hindi, and Kannada support"
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="bg-card border border-border rounded-xl p-6 hover:shadow-card transition-all duration-300 hover:-translate-y-1">
    <div className="text-3xl mb-3">{icon}</div>
    <h3 className="font-semibold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default Hero;
