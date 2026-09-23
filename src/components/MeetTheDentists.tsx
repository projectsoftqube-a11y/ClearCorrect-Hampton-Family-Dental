"use client";

import ImageSlot from "./ImageSlot";
import ReviewNote from "./ReviewNote";
import { Reveal, Section, SectionHeading } from "./Section";
import { DENTISTS } from "@/lib/content";

/**
 * Full dentist profiles - portrait, credentials, bio and clinical focus.
 *
 * This was a pair of compact roster cards: a round avatar beside two lines of
 * text. That is the right shape when the bio is one sentence, but the office
 * supplied real bios, and "trust the person who will be in your mouth" is one
 * of the few arguments on a dental landing page worth spending height on.
 *
 * ── Layout ──
 * One row per dentist, a small capped-width portrait beside the copy on lg+.
 * Tried alternating sides twice and reverted both times: the portrait is a
 * narrow, height-capped square next to a much taller copy block, and the two
 * dentists' bios run to noticeably different lengths - so whichever mirroring
 * rule centred one profile correctly left the other with the portrait
 * stranded far from its copy, next to a wall of empty space. Portrait-left on
 * every row is the layout that holds up regardless of how long either bio
 * runs. Below lg they stack with the portrait on top.
 *
 * The scannable material - facts and focus chips - sits after the prose in the
 * DOM but is styled to catch the eye first, because most visitors will read
 * the credentials and skip the paragraphs.
 */
export default function MeetTheDentists() {
  return (
    <Section id="team" className="bg-beige-light">
      <SectionHeading
        eyebrow="Your dentists"
        title="Meet the team behind your new smile"
        lead="The people you'll actually see - two dentists, one Southampton practice, and a combined focus on keeping the teeth you already have."
      />

      <div className="mt-6 space-y-6 sm:mt-8 sm:space-y-8">
        {DENTISTS.map((dentist) => (
          <Reveal key={dentist.name}>
            <article className="grid gap-3 sm:gap-5 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] lg:items-start lg:gap-8">
              {/* ── Portrait ── */}
              <div className="min-w-0">
                <ImageSlot
                  label="Dentist portrait"
                  file={dentist.file}
                  src={dentist.src}
                  dimensions="900 × 1100"
                  alt={dentist.alt}
                  className="aspect-3/2 w-full rounded-2xl ring-1 ring-beige-dark/60 sm:aspect-4/3 lg:aspect-square lg:max-w-70 lg:rounded-3xl"
                  sizes="(max-width: 1024px) 100vw, 280px"
                  objectPosition={dentist.objectPosition}
                />
              </div>

              {/* ── Copy ── */}
              <div className="min-w-0">
                  <h3 className="font-heading text-[18px] leading-tight text-navy sm:text-[22px] lg:text-[24px]">
                    {dentist.name}
                    <span className="ml-1.5 align-middle text-[10px] font-semibold uppercase tracking-[0.12em] text-navy/40 sm:text-[11px]">
                      {dentist.credential}
                    </span>
                  </h3>

                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-primary sm:text-[12px]">
                    {dentist.role}
                  </p>

                  <p className="mt-2 font-heading text-[15px] leading-snug text-navy sm:text-[16px]">
                    {dentist.headline}
                  </p>

                  <div className="mt-2 space-y-2">
                    {dentist.bio.map((para) => (
                      <p
                        key={para.slice(0, 40)}
                        className="text-[12px] leading-relaxed text-navy/70 sm:text-[13px]"
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Credentials. A white card so the facts read as a record
                      rather than more prose - this is the part that gets
                      scanned instead of the paragraphs above. */}
                  <dl className="mt-3 divide-y divide-beige rounded-xl border border-beige-dark/50 bg-white px-3 py-0.5 sm:px-4">
                    {dentist.facts.map((fact) => (
                      <div
                        key={fact.label}
                        className="flex min-w-0 flex-col gap-0.5 py-1.5 sm:flex-row sm:gap-3 sm:py-2"
                      >
                        <dt className="shrink-0 text-[9px] font-bold uppercase tracking-[0.1em] text-navy/45 sm:w-32 sm:text-[10px]">
                          {fact.label}
                        </dt>
                        <dd className="min-w-0 text-[12px] font-medium leading-snug text-navy sm:text-[13px]">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-2.5 flex flex-wrap gap-1 sm:gap-1.5">
                    {dentist.focus.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-primary/20 bg-primary/[0.07] px-2 py-0.5 text-[10px] font-semibold text-primary sm:px-2.5 sm:py-1 sm:text-[11px]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <ReviewNote>
        [CONFIRM] Bios are condensed from the practice copy supplied by the
        office - please check the shortened wording still reads as intended.
      </ReviewNote>
    </Section>
  );
}
