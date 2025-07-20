import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";

const Index = () => {
  return (
    <div className="min-h-screen bg-lavender-bg pt-24">
      <Navigation />
      <Hero />
      <Features />
    </div>
  );
};

export default Index;
