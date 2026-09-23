"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Phone } from "lucide-react";
import ImageSlot from "./ImageSlot";
import LeadForm from "./LeadForm";
import { trackCallClick } from "@/lib/gtm";
import { OFFER, PHONE_DISPLAY, PHONE_TEL } from "@/lib/lp.config";

/**
 * What the free consultation includes - handoff A4.
 *
 * Note what these describe: the *consultation*, not the treatment. The thing
 * the form beside this list requests is free, and the list has to make that
 * unmistakable or the $5,000 in the headline reads as the cost of the next
 * click. The price appears once, in the third line, framed as something you
 * are told rather than something you owe.
 */
const INCLUDED = [
  "A free smile assessment with your dentist",
  "A digital scan to preview your ClearCorrect result",
  `A clear, upfront quote - ${OFFER.price} (${OFFER.savingsInline})`,
  "No pressure, no obligation",
];

/**
 * Offer-led hero: the product headline, the price, a three-photograph collage,
 * what the free consultation includes, and the request form beside it.
 *
 * Structurally identical to the New Patients hero on purpose - the handoff
 * asks for the same components and spacing so the two landing pages read as
 * one family. What differs is the argument. That page leads with an offer you
 * accept on the spot; this one leads with a product, prices it, and then makes
 * the *next step* free, because nobody commits $5,000 from a hero.
 *
 * Two CTAs here where the sister page has none: at this price point a real
 * share of traffic wants to ask a question first, and burying the phone number
 * behind a scroll loses those people entirely.
 */
export default function Hero() {
  return (
    <section id="hero" className="relative isolate w-full overflow-hidden bg-white">
      {/* ── Background wash ──
          Kept from the previous hero. The full-bleed photograph that used to
          sit behind the whole section is now an inline image in the column,
          as on the reference page, so this is the only backdrop. */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-[linear-gradient(160deg,#F7FAFC_0%,#EEF3F8_45%,#F4F7FA_100%)]"
      />

      {/* Ambient blooms as radial gradients, not blur filters - a large blur is
          one of the most expensive things a phone GPU can rasterise, and this
          is the first thing on the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(40%_45%_at_0%_0%,rgba(30,96,118,0.10),transparent_70%),radial-gradient(35%_40%_at_25%_100%,rgba(30,96,118,0.10),transparent_70%)]"
      />

      <div aria-hidden className="absolute inset-x-0 bottom-0 z-[1] h-px bg-beige/70" />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-4 pb-12 pt-9 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8 lg:pb-20 lg:pt-16">
        {/* items-start at every width - the collage is capped to a modest
            height (see below) rather than stretched to match the form, so
            stretching the row itself would just open a gap under the shorter
            column. */}
        <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Left - the offer. */}
          <div className="min-w-0">
            {/* Font size lives in the class list, not a style object, so the
                narrow-phone step can be a media query - an inline style has no
                breakpoints. This H1 is longer than the sister page's, so it
                steps down twice: below 1024px and again below 375px. */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-[clamp(2.4rem,5.4vw,3.5rem)] text-navy max-[375px]:text-[clamp(1.95rem,5.4vw,3.5rem)]"
              style={{ lineHeight: 1.07, letterSpacing: "-0.032em" }}
            >
              ClearCorrect Clear Aligners in{" "}
              {/* Nowrap so the town never splits across a line break - it is
                  the local-intent half of the headline and the reason this
                  page matches the search at all. */}
              <span className="whitespace-nowrap">Southampton, PA</span>
            </motion.h1>

            {/* The subheadline carries the offer lock. Every figure reads from
                OFFER - see lp.config.ts for why none of them is typed out.

                The struck-through price is given an sr-only label: read aloud,
                "$6,500 $5,000" is two prices with no stated relationship, and
                line-through conveys nothing to a screen reader. */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-navy/75 sm:text-[17.5px]"
            >
              Straighten your smile discreetly - now{" "}
              <strong className="font-bold text-urgent">{OFFER.price}</strong>{" "}
              <span className="whitespace-nowrap text-navy/45 line-through">
                <span className="sr-only">was </span>
                {OFFER.wasPrice}
              </span>
              . <strong className="font-bold text-navy">{OFFER.savings}</strong>{" "}
              and start with a{" "}
              <strong className="font-bold text-navy">{OFFER.firstStep}</strong>.
            </motion.p>

            {/* The differentiator line, in the same white pill the sister page
                uses for its offer detail. This is the single most important
                sentence on the page for a visitor who arrived after seeing a
                mail-order aligner ad, so it gets an edge of its own rather
                than sitting in the paragraph above. */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 inline-flex max-w-full items-center gap-2.5 rounded-full border border-urgent/30 bg-white px-3.5 py-2 text-[13.5px] font-bold leading-snug text-navy shadow-[0_3px_14px_-8px_rgba(20,60,80,0.5)] sm:px-4 sm:text-[15px]"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-urgent sm:h-[22px] sm:w-[22px]">
                <Check className="h-3 w-3 text-white" strokeWidth={3.4} aria-hidden />
              </span>
              <span className="min-w-0">
                Fitted by your Southampton dentist - not a mail-order kit.
              </span>
            </motion.p>

            {/* Both CTAs are anchors, not buttons: the primary one jumps to
                #consult (the form is already on this page, so there is nothing
                to open) and the secondary dials. Anchors give both the right
                semantics, keyboard behaviour and long-press menu for free. */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="#consult"
                data-cta="hero-book"
                className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-urgent px-4 py-3.5 text-[14.5px] font-bold text-white shadow-[0_14px_36px_-8px_rgba(30,96,118,0.55)] transition-all hover:bg-urgent-dark active:scale-[0.99] sm:w-auto sm:px-5 sm:text-[16px]"
              >
                Book My Free Consultation
                <ArrowRight
                  className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2.6}
                  aria-hidden
                />
              </a>

              <a
                href={PHONE_TEL}
                data-cta="hero-call"
                onClick={() => trackCallClick("hero")}
                className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl border border-navy/15 bg-white/70 px-4 py-3.5 text-[14.5px] font-bold text-navy transition-colors hover:border-navy/30 hover:bg-white sm:w-auto sm:px-5 sm:text-[16px]"
              >
                <Phone className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                Call {PHONE_DISPLAY}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 sm:mt-6"
            >
              {/* Three real photographs of the practice rather than one. The
                  welcome shot leads across both columns because it is the only
                  one with people in it; the two rooms sit beneath as a pair, so
                  the collage reads as "here is the place" without any single
                  frame having to carry it alone.

                  Fixed to a set height on lg+ (rather than stretched to fill
                  the column, as it was) so it stays a supporting visual next
                  to the form instead of growing to match it - a taller form
                  no longer inflates the photos beside it.

                  This must be an explicit height, not a max-height: the
                  photos inside are lg:h-full, which resolves against this
                  row's own height. A max-height alone constrains the row but
                  never gives it a height to resolve against, so on lg+ the
                  row - and every photo in it - collapsed to 0. */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:flex lg:h-70 lg:gap-3">
                {/* ── Lead photo ──
                    Existing practice photography, per handoff A2: "reuse
                    existing practice photography for consistency with the
                    model page".

                    [ASSET] The handoff's ideal first frame is an aligner
                    close-up, which the practice has not supplied. Do NOT
                    point `src` at a not-yet-existing file to hold its place:
                    ImageSlot only renders its designed placeholder when `src`
                    is undefined, so a src to a missing file makes next/image
                    request it and return 400. When the aligner photo arrives,
                    drop it in public/images/lp/ and swap `file`/`src`/`alt`
                    here - nothing else changes.

                    `priority` stays: whatever occupies this slot is the LCP
                    element on mobile (handoff B6). */}
                <ImageSlot
                  label="Hero - welcoming the patient"
                  file="lp/hero-new-patients.webp"
                  src="/images/lp/hero-new-patients.webp"
                  dimensions="2400 × 1400"
                  alt="A smiling patient being welcomed at Hampton Family Dental in Southampton, PA"
                  tone="light"
                  priority
                  className="col-span-2 aspect-21/9 w-full rounded-xl ring-1 ring-navy/8 sm:rounded-2xl lg:aspect-auto lg:h-full lg:w-[56%]"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  objectPosition="center 40%"
                />

                <div className="col-span-2 grid grid-cols-2 gap-2 sm:gap-3 lg:flex lg:h-full lg:w-[44%] lg:flex-col lg:gap-3">
                  {/* The families this treats - the second of the three
                      frames the handoff asks for. */}
                  <ImageSlot
                    label="Patients at the practice"
                    file="lp/family-patients.webp"
                    src="/images/lp/family-patients.webp"
                    dimensions="1400 × 1000"
                    alt="Smiling patients at Hampton Family Dental in Southampton, PA"
                    tone="light"
                    className="aspect-4/3 w-full rounded-xl ring-1 ring-navy/8 sm:rounded-2xl lg:aspect-auto lg:h-full lg:flex-1"
                    // Half the column below lg; a slim strip beside the lead
                    // photo from lg up.
                    sizes="(max-width: 1024px) 50vw, 22vw"
                    objectPosition="center"
                  />

                  <ImageSlot
                    label="Treatment room"
                    file="lp/treatment-room.webp"
                    src="/images/lp/treatment-room.webp"
                    dimensions="1400 × 1000"
                    alt="A clean, modern treatment room at Hampton Family Dental in Southampton, PA"
                    tone="light"
                    className="aspect-4/3 w-full rounded-xl ring-1 ring-navy/8 sm:rounded-2xl lg:aspect-auto lg:h-full lg:flex-1"
                    sizes="(max-width: 1024px) 50vw, 22vw"
                    objectPosition="center"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right - the form, with what the consultation includes directly
              beneath it. The list sits in this column rather than under the
              whole grid so it reads as the terms of the thing you are about to
              request, right where the eye lands after the submit button.

              id="consult" is the anchor every CTA on the page targets, and it
              is fixed by the handoff (A4, B6) - the campaign's Final URL may
              be linked with the fragment already attached, so renaming it
              breaks inbound ad clicks, not just in-page ones. */}
          <div id="consult" className="min-w-0 scroll-mt-24">
            <LeadForm />

            <motion.ul
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-3 grid gap-1.5 sm:mt-4 sm:gap-2"
            >
              {INCLUDED.map((item) => (
                // A white card per line. On the pale hero wash a bare list
                // read as low-contrast grey text floating on grey; an opaque
                // surface with its own hairline gives each promise an edge to
                // sit on.
                <li
                  key={item}
                  className="flex min-w-0 items-center gap-2.5 rounded-lg border border-beige-dark/45 bg-white px-2.5 py-1.5 shadow-[0_2px_10px_-6px_rgba(20,60,80,0.25)] sm:gap-3 sm:rounded-xl sm:px-3.5 sm:py-2.5"
                >
                  {/* Solid petrol, not a 10% tint - at this size a tinted disc
                      with a thin glyph is the first thing to disappear on a
                      phone in daylight. White on petrol is ~6.4:1. */}
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-urgent">
                    <Check className="h-3 w-3 text-white" strokeWidth={3.4} aria-hidden />
                  </span>
                  <span className="min-w-0 text-[13px] font-semibold leading-snug text-navy sm:text-[14px]">
                    {item}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
