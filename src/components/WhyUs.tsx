"use client";

import ImageSlot from "./ImageSlot";
import { Reveal, Section, SectionHeading } from "./Section";
import { WHY_US } from "@/lib/content";

/**
 * Section 7 - "The difference: why choose us for ClearCorrect".
 *
 * Was a checkmark list of manner claims - gentle, honest, on time. Every
 * dental practice's marketing says those things, and a visitor has no way to
 * verify any of them before a first visit, so the section carried no
 * information a skeptical reader would actually weigh.
 *
 * Rebuilt around facts instead: a stat-led grid (years practicing, dentists
 * on staff, imaging technology, insurance) rather than another adjective
 * list. A founding date and a named specialist are things a competitor's copy
 * can't also claim, which a "we're gentle and honest" line never was.
 *
 * Each item is two headings, not a stat plus a sentence: an h3 for the number
 * and its claim, an h4 underneath for a short qualifier. Kept to a few words
 * each on purpose - this is a scan, not a paragraph.
 */
export default function WhyUs() {
  return (
    <Section id="why" className="bg-white">
      <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal className="min-w-0 lg:order-2">
          <ImageSlot
            label="Family of patients in the practice"
            file="lp/family-patients.webp"
            src="/images/lp/family-patients.webp"
            dimensions="1400 × 1100"
            alt="A family of three generations smiling together at Hampton Family Dental in Southampton, PA"
            // Flatter on a phone (16:9) than on lg+ (5:4) - the square-ish
            // crop was costing a lot of height above the stats before a word
            // of copy had been read.
            className="aspect-video w-full rounded-2xl ring-1 ring-beige-dark/50 sm:rounded-3xl lg:aspect-5/4"
            sizes="(max-width: 1024px) 100vw, 50vw"
            objectPosition="center 35%"
          />
        </Reveal>

        <div className="min-w-0 lg:order-1">
          <SectionHeading
            eyebrow="The difference"
            title="Why choose us for ClearCorrect"
          />

          {/* Two headings per stat, not a stat plus a sentence of prose - h3
              carries the number and the claim, h4 a short qualifier under it.
              Nothing here runs longer than a few words. */}
          <div className="mt-7 grid grid-cols-2 gap-4 sm:gap-5">
            {WHY_US.map((item, i) => (
              <Reveal key={item.lead} delay={i * 0.05}>
                <div className="min-w-0 border-l-2 border-primary/25 pl-3.5">
                  <h3 className="flex min-w-0 flex-wrap items-baseline gap-x-1.5 gap-y-0">
                    <span className="font-heading text-[22px] leading-none text-primary sm:text-[26px]">
                      {item.stat}
                    </span>
                    <span className="text-[13px] font-bold leading-snug text-navy sm:text-[14px]">
                      {item.lead}
                    </span>
                  </h3>
                  <h4 className="mt-1 text-[12.5px] font-medium leading-relaxed text-navy/70 sm:text-[13.5px]">
                    {item.body}
                  </h4>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
