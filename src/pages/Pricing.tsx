import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle, 
  Star,
  Zap,
  Crown,
  Users,
  MessageSquare,
  Shield,
  Globe,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingTiers = [
    {
      name: "Free",
      price: 0,
      period: "forever",
      description: "Perfect for students getting started",
      icon: Users,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      features: [
        "Basic profile creation",
        "Browse up to 10 gigs per month",
        "Apply to 3 opportunities",
        "Community support",
        "Basic skill matching",
        "Email notifications"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Student Pro",
      price: isAnnual ? 8 : 12,
      period: "month",
      description: "Ideal for active students",
      icon: Zap,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      features: [
        "Everything in Free",
        "Unlimited gig browsing",
        "Unlimited applications",
        "Priority application status",
        "Advanced skill matching",
        "Portfolio showcase",
        "Direct messaging",
        "Career insights dashboard"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Startup",
      price: isAnnual ? 29 : 39,
      period: "month",
      description: "For startups posting opportunities",
      icon: Crown,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      features: [
        "Post unlimited gigs",
        "Advanced applicant filtering",
        "AI-powered matching",
        "Analytics dashboard",
        "Team collaboration tools",
        "Priority support",
        "Custom branding",
        "API access"
      ],
      cta: "Start Free Trial",
      popular: false
    }
  ];

  const additionalFeatures = [
    {
      title: "Enterprise Solutions",
      description: "Custom pricing for large organizations and universities",
      icon: Globe
    },
    {
      title: "Premium Support",
      description: "24/7 dedicated support for enterprise customers",
      icon: MessageSquare
    },
    {
      title: "Advanced Security",
      description: "Enterprise-grade security and compliance features",
      icon: Shield
    }
  ];

  const faqs = [
    {
      question: "Can I switch plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, all paid plans come with a 14-day free trial. No credit card required to start."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise plans."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely. You can cancel your subscription at any time with no questions asked."
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
              <Star className="w-4 h-4 mr-2" />
              Simple Pricing
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Choose the plan that's{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                right for you
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Start free and scale as you grow. All plans include our core features 
              with no hidden fees or surprises.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Label htmlFor="billing-toggle" className="text-sm font-medium text-gray-700">
                Monthly
              </Label>
              <Switch
                id="billing-toggle"
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
              />
              <Label htmlFor="billing-toggle" className="text-sm font-medium text-gray-700">
                Annual
              </Label>
              {isAnnual && (
                <Badge variant="secondary" className="ml-2">
                  Save 30%
                </Badge>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-lavender-bg">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`relative border-2 transition-all duration-300 hover:shadow-xl ${
                  tier.popular 
                    ? 'border-blue-600 shadow-lg scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`p-4 rounded-lg ${tier.bgColor} w-fit mx-auto mb-4`}>
                    <tier.icon className={`w-8 h-8 ${tier.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{tier.name}</CardTitle>
                  <CardDescription className="text-gray-600">{tier.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${tier.price}
                    </span>
                    {tier.price > 0 && (
                      <span className="text-gray-600">/{tier.period}</span>
                    )}
                    {tier.price === 0 && (
                      <span className="text-gray-600">/{tier.period}</span>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-6 ${
                      tier.popular 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : tier.name === "Free"
                        ? 'bg-gray-900 hover:bg-gray-800'
                        : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-24 bg-lavender-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Enterprise Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Custom solutions for universities, large organizations, and enterprise clients.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="p-4 rounded-lg bg-blue-50 w-fit mx-auto mb-4">
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

      {/* FAQ Section */}
      <section className="py-24 bg-lavender-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our pricing and plans.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
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

export default Pricing; 