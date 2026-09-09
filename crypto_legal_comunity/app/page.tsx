import About from "@/components/About";
import Community from "@/components/Community";
import Contact from "@/components/Contact";
import Discussions from "@/components/Discussions";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Insights from "@/components/Insights";
import LegalDigital from "@/components/LegalDigital";
import Market from "@/components/Market";
import Navbar from "@/components/Navbar";
import OfficeLocation from "@/components/OfficeLocation";
import Programs from "@/components/Programs";
import SplashScreen from "@/components/SplashScreen";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <Navbar />
      <main id="top">
        <Hero />
        <About />
        <LegalDigital />
        <Insights />
        <Market />
        <Programs />
        <Community />
        <Discussions />
        <Contact />
        <OfficeLocation />
      </main>
      <Footer />
    </>
  );
}
