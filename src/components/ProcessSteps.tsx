"use client";

import { Clock } from "lucide-react";
import ImageSlot from "./ImageSlot";
import { Reveal, Section, SectionHeading } from "./Section";
import { STEPS } from "@/lib/content";

/**
 * Section 6 - "How ClearCorrect works". NEW versus the model page.
 *
 * Nobody commits $5,000 to a process they cannot picture, and the competitor
 * here is a mail-order brand whose whole pitch is that the process is simple.
 * Four concrete stages answer that directly: what happens, in what order, and
 * where the money is discussed (step two, before anything is committed).
 *
 * ── Layout ──
 * Unchanged from the model page. The `duration` slot now carries a stage label
 * ("Step 1") rather than a number of minutes - aligner treatment runs over
 * months, so a minutes figure would be meaningless here - but it still gives
 * the column the height it needs to sit level with the photographs beside it.
 *
 * The steps render as a connected sequence rather than four boxed cards, which
 * read as unrelated tiles when they are in fact one process.
 */
/**
 * One copy, rendered at every width.
 *
 * This used to take a `variant` prop and ship two copies - an abbreviated
 * "mobile" one under the hero and this "desktop" one in place - each gated to
 * a single breakpoint. Only the desktop copy was ever mounted in
 * src/app/page.tsx, and its `hidden lg:block` meant the whole section
 * disappeared below 1024px. The gating is gone: the section now renders in its
 * place in the page order on phones as well, with the full step bodies.
 */
export default function ProcessSteps() {
  return (
    <Section id="first-visit" className="bg-white">
      <div className="grid gap-9 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:gap-14">
        {/* ── Left: the sequence ── */}
        <div className="min-w-0">
          <SectionHeading
            eyebrow="How it works"
            title="How ClearCorrect works"
            lead="From your first scan to your final smile - here is exactly how treatment goes, and where the cost is agreed."
          />

          {/* One card per step, nothing outside them.
              The previous pass kept an external numbered rail AND wrapped each
              step in a card - two structures doing the same job. The numbers
              collided with the card edges and the rail ran through the gaps
              between them, which is what made it read as cluttered. The cards
              already separate the steps, so the rail is gone and the number
              lives inside the card as part of its header row. */}
          {/* <ol> would be the semantic choice, but Reveal wraps each child in
              a motion <div> - and a <div> is not a valid child of <ol>. An
              ordered list whose items are not <li> is worse for a screen reader
              than a plain group, so this is a list of role="listitem" cards
              under an explicit role="list" instead. */}
          {/*
            A connected timeline rather than four separate cards.

            These steps are one sequence, and boxing each of them made the
            section read as a list of unrelated tiles - four surfaces, four
            borders, four hover states, for what is really a single line from
            "you walk in" to "you leave". The rail draws that line: numbered
            nodes threaded on a continuous stroke, with only a hairline
            separating one row from the next.
          */}
          <div role="list" className="relative mt-8">
            {/* The rail. Inset to the node's centre (17.5px = half of the 36px
                node) and stopped short at both ends so it emerges from the
                first node and dies into the last rather than overshooting. */}
            <span
              aria-hidden
              className="absolute bottom-6 left-[17.5px] top-6 w-px bg-gradient-to-b from-urgent/40 via-urgent/25 to-transparent"
            />

            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.07}>
                <div
                  role="listitem"
                  className="group relative flex min-w-0 gap-4 py-4 first:pt-1 last:pb-1"
                >
                  {/* Node. bg-white (not transparent) so the rail passes
                      behind the ring rather than through the numeral. */}
                  <span className="relative z-10 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[15px] font-bold tabular-nums text-urgent-dark ring-2 ring-urgent/30 transition-all duration-300 group-hover:bg-urgent group-hover:text-white group-hover:ring-urgent">
                    {i + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="min-w-0 font-heading text-[18px] leading-snug text-navy sm:text-[20px]">
                        {step.title}
                      </h3>

                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-beige-light px-2.5 py-1 text-[12px] font-semibold tabular-nums text-navy/55 transition-colors duration-300 group-hover:bg-urgent/10 group-hover:text-urgent-dark">
                        <Clock className="h-3 w-3 shrink-0" strokeWidth={2.6} aria-hidden />
                        {step.duration}
                      </span>
                    </div>

                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-navy/60">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Closes the sequence on the promise the whole section is making. */}
          <Reveal delay={0.3}>
            <p className="mt-5 text-[13px] leading-relaxed text-navy/55">
              <strong className="font-semibold text-navy/80">
                That&apos;s the whole visit.
              </strong>{" "}
              No upsell, no lecture, no surprise bill at the desk.
            </p>
          </Reveal>
        </div>

        {/* ── Right: the rooms it happens in ──
            Sticky on desktop so the photos stay in view while the steps are
            read; on smaller screens it simply follows the list. */}
        <Reveal delay={0.1} className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <ImageSlot
            label="Wearing the aligner"
            file="lp/clearcorrect-tray-insert.webp"
            src="/images/lp/clearcorrect-tray-insert.webp"
            dimensions="878 × 1024"
            alt="A patient placing a clear ClearCorrect aligner tray onto her upper teeth"
            // Half the height it used to be below lg (was 5/4, then 4/3): on a
            // phone this portrait ate most of a screen for one supporting
            // photo. The lg sticky column keeps the taller 7/6 crop, where the
            // height is doing real work beside the step list.
            className="aspect-[5/2] w-full rounded-3xl ring-1 ring-beige-dark/50 sm:aspect-[8/3] lg:aspect-[7/6]"
            // Capped at the real rendered width. The default sizes string made
            // the browser pick the 3840w candidate for a slot that is never
            // wider than ~620px, so it downloaded roughly six times the bytes
            // it needed and left the box empty for that much longer.
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 620px"
            // The letterbox crop below lg is a much narrower slice of the same
            // portrait, so this is set to the mouth and the hand holding the
            // tray - the only part of the frame worth keeping at 5:2.
            objectPosition="center 32%"
          />

          {/* What the steps above actually produce - the set of trays your
              scan is turned into, and one of them held up in the room you were
              scanned in. The captions carry the argument the whole section is
              making: these are made for your teeth and handed to you here,
              not chosen off a shelf and posted out. */}
          <div className="mt-3.5 grid grid-cols-2 gap-3.5">
            <figure className="min-w-0">
              <ImageSlot
                label="A set of clear aligner trays"
                file="lp/clearcorrect-aligner-trays.webp"
                src="/images/lp/clearcorrect-aligner-trays.webp"
                dimensions="1434 × 1024"
                alt="A pair of clear ClearCorrect aligner trays, moulded to the upper and lower teeth"
                className="aspect-[7/5] w-full rounded-2xl ring-1 ring-beige-dark/50"
                sizes="(max-width: 1024px) 50vw, 23vw"
              />
              <figcaption className="mt-2 text-[11.5px] font-medium text-navy/50">
                Made for your teeth
              </figcaption>
            </figure>

            <figure className="min-w-0">
              <ImageSlot
                label="Aligner in the treatment room"
                file="lp/clearcorrect-aligner-practice.webp"
                src="/images/lp/clearcorrect-aligner-practice.webp"
                dimensions="1434 × 1024"
                alt="A clear aligner tray held up in a treatment room at Hampton Family Dental in Southampton, PA"
                className="aspect-[7/5] w-full rounded-2xl ring-1 ring-beige-dark/50"
                sizes="(max-width: 1024px) 50vw, 23vw"
              />
              <figcaption className="mt-2 text-[11.5px] font-medium text-navy/50">
                Fitted here, in person
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
