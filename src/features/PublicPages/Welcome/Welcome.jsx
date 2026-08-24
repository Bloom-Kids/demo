import Navbar from '../../../components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import HowItWorksSection from './components/HowItWorksSection/HowItWorksSection';
import './Welcome.css';
import WhyBloomSection from './components/WhyBloomSection/WhyBloomSection';
import ContactBannerSection from './components/ContactBannerSection/ContactBannerSection';
import AboutBloomSection from './components/AboutBloomSection/AboutBloomSection';
import Footer from '../../../components/Footer/Footer';
import useScrollReveal from '../../../hooks/useScrollReveal';

function Welcome() {
  useScrollReveal();
  return (
    <>
      <Navbar />

      <main className="welcome-page">
        <HeroSection />
        <HowItWorksSection />
        <WhyBloomSection />
        <ContactBannerSection />
        <AboutBloomSection />
      </main>
      <Footer />
    </>
  );
}

export default Welcome;
