import { Layout } from "@/components/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBlock } from "@/components/home/TrustBlock";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Benefits } from "@/components/home/Benefits";
import { PlatformCards } from "@/components/home/PlatformCards";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <TrustBlock />
      <HowItWorks />
      <Benefits />
      <PlatformCards />
      <CTASection />
    </Layout>
  );
};

export default Index;
