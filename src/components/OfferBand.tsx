"use client";

import { motion } from "framer-motion";
import { CalendarDays, Phone, ShieldCheck } from "lucide-react";
import { useBooking } from "./BookingProvider";
import { trackCallClick } from "@/lib/gtm";
import { OFFER, PHONE_DISPLAY, PHONE_TEL } from "@/lib/lp.config";

/**
 * Section 3 - the booking call-to-action band.
 *
 * Carries the offer lock in its loudest form: $6,500 struck through, $5,000
 * live, "Save $1,500" as its own emphasis. Every figure reads from OFFER, so
 * the band physically cannot drift from the ad copy - which matters here more
 * than anywhere else on the page, because a price mismatch between an ad and
 * its landing page is a Google Ads disapproval, not just a copy bug.
 *
 * Two actions, not one. At a $5,000 price point a meaningful share of traffic
 * wants to ask a question before filling anything in, and the handoff calls
 * for the alt line explicitly ("Prefer to talk? Call us").
 *
 * Glow is painted with radial gradients rather than blurred circles: a
 * blur-[120px] filter forces a large offscreen rasterisation on every paint
 * and visibly lags this band in while scrolling on mid-range phones.
 */
export default function OfferBand() {
  const { open: openBooking } = useBooking();

  return (
    <section className="w-full overflow-hidden bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative isolate overflow-hidden rounded-3xl bg-navy px-5 py-8 text-center sm:px-8 sm:py-12 lg:px-14 lg:py-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_50%_-10%,rgba(30,96,118,0.30),transparent_70%),radial-gradient(50%_60%_at_100%_110%,rgba(30,96,118,0.45),transparent_72%)]"
          />

          <span className="mx-auto inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/80 sm:text-[10.5px] sm:tracking-[0.2em] sm:backdrop-blur-sm">
            <ShieldCheck className="h-3 w-3 shrink-0" strokeWidth={2.4} aria-hidden />
            {OFFER.product}
          </span>

          <h2
            className="mt-4 font-heading text-white"
            style={{
              fontSize: "clamp(1.55rem, 6vw, 3.25rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
            }}
          >
            Book your free smile assessment
          </h2>

          {/* ── The price card ──
              The price used to sit as bare `urgent-light` type directly on
              this navy panel. That is 2.7:1 against the band - below the 3:1
              WCAG minimum even for large text - so the single most important
              number on the page was the hardest thing on it to read.

              Putting it on a white card inverts the relationship: petrol on
              white is 7.0:1, and the card gives the offer a physical edge that
              reads as a price tag rather than another line of copy. On a dark
              band a light surface is also the strongest available emphasis -
              brighter type would have kept competing with the white heading
              directly above it. */}
          <div className="mx-auto mt-6 inline-flex max-w-full flex-col items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-[0_18px_44px_-18px_rgba(0,0,0,0.6)] sm:flex-row sm:gap-5 sm:px-7 sm:py-5">
            <p className="flex flex-wrap items-baseline justify-center gap-x-2.5 gap-y-1">
              {/* line-through conveys nothing to a screen reader, and read
                  aloud "$6,500 $5,000" is two prices with no stated
                  relationship - hence the sr-only labels on both. */}
              <span className="text-[15px] font-semibold text-navy/40 line-through sm:text-[17px]">
                <span className="sr-only">Regular price </span>
                {OFFER.wasPrice}
              </span>
              <span className="font-heading text-[2.25rem] leading-none text-urgent sm:text-[2.9rem]">
                <span className="sr-only">Now </span>
                {OFFER.price}
              </span>
            </p>

            {/* Solid petrol, white type: 7.0:1, and it reads as a stamp on the
                card rather than a third price. */}
            <span className="inline-flex items-center whitespace-nowrap rounded-full bg-urgent px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-white sm:text-[13px]">
              {OFFER.savings}
            </span>
          </div>

          <p className="mx-auto mt-5 max-w-xl text-[14px] leading-relaxed text-white/75 sm:text-[15.5px]">
            Straighten your smile discreetly with {OFFER.product}. It starts
            with a{" "}
            <strong className="font-semibold text-white">
              {OFFER.firstStep}
            </strong>
            : no cost, no obligation.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openBooking("offer-book")}
              data-cta="offer-book"
              className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-2xl bg-urgent px-4 py-3.5 text-[clamp(12.5px,3.4vw,15px)] font-bold text-white shadow-[0_14px_36px_-8px_rgba(30,96,118,0.8)] transition-all hover:bg-urgent-dark active:scale-[0.99] sm:w-auto sm:px-5 sm:text-[16px]"
            >
              <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
              <span className="whitespace-nowrap">Book My Free Consultation</span>
            </button>

            {/* Outlined rather than filled: the form is the primary
                conversion, and two solid buttons side by side make neither
                one the obvious next step. */}
            <a
              href={PHONE_TEL}
              data-cta="offer-call"
              onClick={() => trackCallClick("offer-band")}
              className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-2xl border border-white/25 px-4 py-3.5 text-[clamp(12.5px,3.4vw,15px)] font-bold text-white transition-colors hover:bg-white/10 sm:w-auto sm:px-5 sm:text-[16px]"
            >
              <Phone className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
              <span className="whitespace-nowrap">Call {PHONE_DISPLAY}</span>
            </a>
          </div>

          <p className="mt-4 text-[11.5px] text-white/45">
            Prefer to talk? Call us - we&apos;ll answer your questions before
            you book anything.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
