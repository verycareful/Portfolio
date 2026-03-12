import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Research from "@/components/sections/Research";
import Projects from "@/components/sections/Projects";
import LabNotebook from "@/components/sections/LabNotebook";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Research />
        <Projects />
        <LabNotebook />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
