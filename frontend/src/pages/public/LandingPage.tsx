import { AboutSection } from '../../components/landing/AboutSection';
import { CtaSection } from '../../components/landing/CtaSection';
import { FeaturesSection } from '../../components/landing/FeaturesSection';
import { HeroSection } from '../../components/landing/HeroSection';
import { LandingFooter } from '../../components/landing/LandingFooter';
import { PublicNavbar } from '../../components/landing/PublicNavbar';
import { StatsSection } from '../../components/landing/StatsSection';
import { TestimonialsSection } from '../../components/landing/TestimonialsSection';

export default function LandingPage() {
  return (
    <div className="min-h-svh bg-slate-50">
      <PublicNavbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <StatsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
