import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Brain, 
  Users, 
  Rocket, 
  MessageSquare, 
  TrendingUp, 
  Shield,
  Zap,
  Target
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Advanced algorithms analyze skills, interests, and project requirements to find perfect matches.",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Student Profiles", 
    description: "Comprehensive profiles with skills, projects, availability, and career aspirations.",
    color: "text-secondary"
  },
  {
    icon: Rocket,
    title: "Startup Opportunities",
    description: "Browse exciting internships and gigs from innovative startups across all industries.",
    color: "text-success"
  },
  {
    icon: MessageSquare,
    title: "Real-time Chat",
    description: "Connect instantly with matches through our integrated messaging system.",
    color: "text-primary"
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor application status, project milestones, and career growth over time.",
    color: "text-secondary"
  },
  {
    icon: Shield,
    title: "Verified Opportunities",
    description: "All startups and opportunities are vetted to ensure quality and legitimacy.",
    color: "text-success"
  }
];

const benefits = [
  {
    title: "For Students",
    subtitle: "Launch Your Career",
    items: [
      "Get matched with relevant opportunities",
      "Build real-world experience",
      "Connect with innovative startups",
      "Develop in-demand skills"
    ],
    icon: Target,
    gradient: "bg-gradient-to-br from-primary/10 to-secondary/10"
  },
  {
    title: "For Startups", 
    subtitle: "Find Top Talent",
    items: [
      "Access skilled student developers",
      "Reduce hiring time by 80%",
      "Cost-effective talent acquisition",
      "Fresh perspectives and innovation"
    ],
    icon: Zap,
    gradient: "bg-gradient-to-br from-secondary/10 to-success/10"
  }
];

export function Features() {
  return (
    <div className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Features Grid */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              StartupConnect
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge AI with intuitive design to create 
            the perfect ecosystem for talent and opportunity discovery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="p-6 border-card-border hover:shadow-medium transition-all duration-300 animate-slide-up group hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-4">
                <div className={`p-3 rounded-lg bg-accent w-fit group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="grid lg:grid-cols-2 gap-12">
          {benefits.map((benefit, index) => (
            <Card 
              key={benefit.title}
              className={`p-8 border-card-border ${benefit.gradient} animate-fade-in hover:shadow-medium transition-all duration-300`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-background rounded-lg shadow-soft">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.subtitle}</p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {benefit.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button variant="hero" className="w-full" asChild>
                  <a href="/auth">Get Started</a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}