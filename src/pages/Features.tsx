import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Users, 
  Rocket, 
  MessageSquare, 
  TrendingUp, 
  Shield,
  Zap,
  Target,
  CheckCircle,
  Star,
  Globe,
  Lock,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Advanced algorithms analyze skills, interests, and project requirements to find perfect matches between students and startups.",
      color: "text-blue-600",
      benefits: [
        "95% match accuracy",
        "Real-time skill analysis",
        "Personalized recommendations",
        "Continuous learning algorithm"
      ]
    },
    {
      icon: Users,
      title: "Student Profiles", 
      description: "Comprehensive profiles with skills, projects, availability, and career aspirations for better matching.",
      color: "text-green-600",
      benefits: [
        "Portfolio showcase",
        "Skill verification",
        "Availability tracking",
        "Career goal alignment"
      ]
    },
    {
      icon: Rocket,
      title: "Startup Opportunities",
      description: "Browse exciting internships and gigs from innovative startups across all industries and technologies.",
      color: "text-purple-600",
      benefits: [
        "Verified opportunities",
        "Diverse project types",
        "Flexible engagement models",
        "Industry connections"
      ]
    },
    {
      icon: MessageSquare,
      title: "Real-time Chat",
      description: "Connect instantly with matches through our integrated messaging system for seamless communication.",
      color: "text-orange-600",
      benefits: [
        "Instant messaging",
        "File sharing",
        "Video calls",
        "Message history"
      ]
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor application status, project milestones, and career growth over time with detailed analytics.",
      color: "text-red-600",
      benefits: [
        "Application tracking",
        "Milestone monitoring",
        "Performance analytics",
        "Career insights"
      ]
    },
    {
      icon: Shield,
      title: "Verified Opportunities",
      description: "All startups and opportunities are vetted to ensure quality and legitimacy for student safety.",
      color: "text-indigo-600",
      benefits: [
        "Startup verification",
        "Background checks",
        "Quality assurance",
        "Student protection"
      ]
    }
  ];

  const advancedFeatures = [
    {
      title: "Smart Notifications",
      description: "Get personalized alerts for new opportunities, application updates, and skill matches.",
      icon: Zap
    },
    {
      title: "Global Reach",
      description: "Connect with opportunities worldwide, breaking geographical barriers for talent and innovation.",
      icon: Globe
    },
    {
      title: "Secure Platform",
      description: "Enterprise-grade security ensures your data and communications are always protected.",
      icon: Lock
    },
    {
      title: "Analytics Dashboard",
      description: "Track your success with detailed insights and performance metrics.",
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen bg-lavender-bg pt-24">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-lavender-bg">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              <Brain className="w-4 h-4 mr-2" />
              Platform Features
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                succeed
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              StartupConnect combines cutting-edge AI with intuitive design to create 
              the perfect ecosystem for talent and opportunity discovery.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-24 bg-lavender-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Core Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed to help students and startups connect, collaborate, and grow together.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-8">
                  <div className={`p-4 rounded-lg bg-gray-50 w-fit mb-6`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
                  
                  <div className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-24 bg-lavender-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Advanced Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Additional features that make StartupConnect the most comprehensive platform for student-startup connections.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {advancedFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start">
                    <div className="p-3 rounded-lg bg-blue-50 mr-6">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-lavender-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Platform Statistics
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how StartupConnect is transforming the student-startup ecosystem.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Verified Startups</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Match Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">2K+</div>
              <div className="text-gray-600">Successful Placements</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">StartupConnect</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Connecting students with innovative startups for meaningful opportunities and real-world experience.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <a href="mailto:hello@startupconnect.com" className="hover:text-white transition-colors">
                    hello@startupconnect.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <a href="tel:+91-97865xxxxx" className="hover:text-white transition-colors">
                    +91 97865xxxxx
                  </a>
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Mumbai, India</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 StartupConnect. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Features; 