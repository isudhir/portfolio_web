import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { CareerTimeline } from "@/components/sections/CareerTimeline";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Education } from "@/components/sections/Education";
import { GithubStats } from "@/components/sections/GithubStats";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { LazyChatButton, LazyTechUniverse } from "@/components/ClientWidgets";
import { personJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />

      {/* One continuous page: sections flow directly with their own vertical
          padding — no divider motif between them. */}
      <main className="relative z-10 flex-1">
        <Hero />
        <About />
        <CareerTimeline />
        <Skills />
        <Experience />
        <Projects />
        <GithubStats />
        <LazyTechUniverse />
        <Certifications />
        <Education />
        <Contact />
      </main>

      <Footer />

      <LazyChatButton />
    </>
  );
}
