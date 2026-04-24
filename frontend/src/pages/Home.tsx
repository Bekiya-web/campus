import { 
  HeroSection, 
  FeaturesSection, 
  HowItWorksSection, 
  UniversitiesSection, 
  ProjectsSection, 
  Footer 
} from "@/components/home";

const Home = () => {
  return (
    <div className="flex-1 overflow-hidden bg-background">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <UniversitiesSection />
      <ProjectsSection />
      <Footer />
    </div>
  );
};

export default Home;
