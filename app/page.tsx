import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { CareerTimeline } from "@/components/sections/CareerTimeline";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { SectionDivider } from "@/components/animations/SectionDivider";
import { LazyChatButton, LazyTechUniverse } from "@/components/ClientWidgets";
import { personJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />

      <main className="relative z-10 flex-1">
        <Hero />

        <SectionDivider />
        <About />

        <SectionDivider />
        <CareerTimeline />

        <SectionDivider />
        <Skills />

        <SectionDivider />
        <Experience />

        <SectionDivider />
        <Projects />

        <SectionDivider />
        <LazyTechUniverse />

        <SectionDivider />
        <Certifications />

        <SectionDivider />
        <Contact />
      </main>

      <Footer />

      <LazyChatButton />
    </>
  );
}
