import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-collaboration.jpg";
import { ArrowRight, Sparkles, Users, Target } from "lucide-react";

export function Hero() {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDEwIDAgTCAwIDAgMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJoc2woMCAwJSAxMDAlIC8gMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3BhdHRlcm4+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz4KPHN2Zz4=')] opacity-20"></div>
      
      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent border border-card-border rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4 text-primary" />
              AI-Powered Talent Matching
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-yellow-300 via-white to-pink-400 bg-clip-text text-transparent">
                  Connect Students with Startups
                </span>
              </h1>
              
              <p className="text-xl text-white leading-relaxed">
                StartupConnect uses advanced AI to connect talented students with innovative startups. 
                Find the perfect match based on skills, interests, and project requirements.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="group bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-blue-900 hover:from-blue-300 hover:to-pink-300" asChild>
                <a href="/auth">
                  Get Started
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-card-border">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">10K+</div>
                <div className="text-sm text-yellow-100">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-300">500+</div>
                <div className="text-sm text-pink-100">Startups</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-300">95%</div>
                <div className="text-sm text-cyan-100">Match Rate</div>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-large">
              <img 
                src={heroImage} 
                alt="Students and entrepreneurs collaborating" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-card border border-card-border rounded-lg p-4 shadow-medium animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent rounded-lg">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Perfect Match</div>
                  <div className="text-xs text-muted-foreground">AI Score: 95%</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-card border border-card-border rounded-lg p-4 shadow-medium animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Target className="w-4 h-4 text-success" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Skills Matched</div>
                  <div className="text-xs text-muted-foreground">React • AI • Design</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}