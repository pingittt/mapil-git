import About from "@/components/About";
import Community from "@/components/Community";
import Contact from "@/components/Contact";
import Discussions from "@/components/Discussions";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Insights from "@/components/Insights";
import LegalDigital from "@/components/LegalDigital";
import Navbar from "@/components/Navbar";
import Programs from "@/components/Programs";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <About />
        <LegalDigital />
        <Insights />
        <Programs />
        <Community />
        <Discussions />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
