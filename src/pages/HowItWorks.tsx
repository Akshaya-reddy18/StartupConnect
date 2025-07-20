import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, 
  Search, 
  MessageSquare, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Target,
  Star,
  Clock,
  Globe,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Sign up and build your comprehensive profile with skills, projects, and career goals.",
      icon: Users,
      details: [
        "Add your skills and expertise",
        "Upload portfolio projects",
        "Set your availability and preferences",
        "Define your career objectives"
      ],
      duration: "2 minutes"
    },
    {
      number: "02",
      title: "Discover Opportunities",
      description: "Browse verified opportunities from innovative startups across all industries.",
      icon: Search,
      details: [
        "Filter by skills and interests",
        "View detailed project descriptions",
        "Check startup profiles and culture",
        "Apply with one click"
      ],
      duration: "5 minutes"
    },
    {
      number: "03",
      title: "Get Matched",
      description: "Our AI algorithm finds the perfect matches based on skills, interests, and project requirements.",
      icon: Target,
      details: [
        "AI-powered matching algorithm",
        "95% accuracy rate",
        "Personalized recommendations",
        "Real-time skill analysis"
      ],
      duration: "Instant"
    },
    {
      number: "04",
      title: "Connect & Collaborate",
      description: "Start conversations, share ideas, and begin your collaboration journey.",
      icon: MessageSquare,
      details: [
        "Built-in messaging system",
        "Video call integration",
        "File sharing capabilities",
        "Project management tools"
      ],
      duration: "Ongoing"
    },
    {
      number: "05",
      title: "Track Progress",
      description: "Monitor your applications, project milestones, and career growth over time.",
      icon: CheckCircle,
      details: [
        "Application status tracking",
        "Milestone monitoring",
        "Performance analytics",
        "Career insights dashboard"
      ],
      duration: "Continuous"
    }
  ];

  const benefits = [
    {
      title: "For Students",
      icon: Users,
      items: [
        "Access to real-world projects",
        "Build your portfolio",
        "Network with industry professionals",
        "Gain practical experience",
        "Earn while learning",
        "Career guidance and mentorship"
      ]
    },
    {
      title: "For Startups",
      icon: Zap,
      items: [
        "Access skilled talent pool",
        "Reduce hiring time by 80%",
        "Cost-effective solutions",
        "Fresh perspectives and innovation",
        "Flexible engagement models",
        "Quality assurance and verification"
      ]
    }
  ];

  const processFeatures = [
    {
      title: "Smart Matching",
      description: "Our AI analyzes thousands of data points to find the perfect student-startup matches.",
      icon: Target
    },
    {
      title: "Verified Opportunities",
      description: "All startups and projects are thoroughly vetted to ensure quality and legitimacy.",
      icon: CheckCircle
    },
    {
      title: "Global Reach",
      description: "Connect with opportunities worldwide, breaking geographical barriers for talent.",
      icon: Globe
    },
    {
      title: "Real-time Updates",
      description: "Get instant notifications about new opportunities, applications, and matches.",
      icon: Clock
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
              <Zap className="w-4 h-4 mr-2" />
              Simple Process
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              How{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StartupConnect
              </span>{" "}
              Works
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Our streamlined process makes it easy for students and startups to connect, 
              collaborate, and create amazing things together.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 bg-lavender-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Follow these simple steps to begin your journey with StartupConnect.
            </p>
          </div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-12 bg-gradient-to-b from-blue-600 to-purple-600 hidden md:block"></div>
                )}
                
                <div className="flex flex-col md:flex-row items-start gap-8">
                  {/* Step Number and Icon */}
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-semibold text-gray-900">{step.title}</h3>
                      <Badge variant="secondary">{step.duration}</Badge>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6">{step.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-lavender-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Benefits for Everyone
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              StartupConnect creates value for both students and startups through our innovative platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-blue-50">
                      <benefit.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl">{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {benefit.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Features */}
      <section className="py-24 bg-lavender-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose StartupConnect?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with human-centered design to deliver exceptional results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="p-4 rounded-lg bg-gray-50 w-fit mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
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

export default HowItWorks; 