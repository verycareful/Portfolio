"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import ResearchCard from "@/components/ui/ResearchCard";
import { researchEntries } from "@/lib/data";

export default function Research() {
  return (
    <section
      id="research"
      className="section-dots relative px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading title="RESEARCH" number="[03]" />

        <div className="flex flex-col gap-6">
          {researchEntries.map((entry, i) => (
            <ResearchCard key={entry.title} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
