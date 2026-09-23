import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

import LpHeader from "@/components/LpHeader";
import Hero from "@/components/Hero";
import OfferBand from "@/components/OfferBand";
import MeetTheDentists from "@/components/MeetTheDentists";
import ProcessSteps from "@/components/ProcessSteps";
import InsuranceAndFinancing from "@/components/InsuranceAndFinancing";
import WhyUs from "@/components/WhyUs";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import LocationBlock from "@/components/LocationBlock";
import BookingProvider from "@/components/BookingProvider";
import LpFooter from "@/components/LpFooter";
import SmoothScroll from "@/components/SmoothScroll";
import StickyCallBar from "@/components/StickyCallBar";
import GoogleReviewBadge from "@/components/GoogleReviewBadge";

import { getCarriers } from "@/lib/insurance";
import { FAQS } from "@/lib/content";
import {
  AREA_SERVED,
  OFFER,
  PRACTICE,
  PRACTICE_EMAIL,
  REVIEW_COUNT,
  REVIEW_RATING,
} from "@/lib/lp.config";

/**
 * Meta, per handoff B2.
 *
 * The title carries the price because the ad does, and a searcher comparing
 * the SERP snippet to the ad they clicked should see the same number.
 */
export const metadata: Metadata = {
  title: `ClearCorrect Clear Aligners in ${PRACTICE.city}, ${PRACTICE.state} | ${OFFER.price} (${OFFER.savings})`,
  description: `ClearCorrect clear aligners in ${PRACTICE.city}, ${PRACTICE.state} - now ${OFFER.price} (${OFFER.savingsInline}). Nearly invisible, removable, fitted by your dentist. Book a free consultation.`,
  alternates: { canonical: absoluteUrl("/") },
  // A paid-traffic landing page should not compete in organic search with the
  // main site's own orthodontics page. It stays crawlable so quality signals
  // and conversion tracking work, but out of the index so the two never
  // cannibalise each other. Handoff B2: "noindex, follow".
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    title: `ClearCorrect Clear Aligners - ${PRACTICE.city}, ${PRACTICE.state}`,
    description: `Straighten your smile discreetly. Now ${OFFER.price} (${OFFER.savingsInline}). Free consultation with your ${PRACTICE.city} dentist.`,
    images: [
      {
        // [DEV - ASSET NEEDED] Reusing the New Patients OG image until a
        // ClearCorrect one exists. It is on-brand and correct for the
        // practice, just not aligner-specific - which is strictly better than
        // pointing at a file that 404s in every share preview.
        url: absoluteUrl("/images/lp/og-newpatients.jpg"),
        width: 1200,
        height: 630,
        alt: `ClearCorrect clear aligners at ${PRACTICE.name} in ${PRACTICE.city}, ${PRACTICE.state}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `ClearCorrect Clear Aligners - ${PRACTICE.city}, ${PRACTICE.state}`,
    description: `Straighten your smile discreetly. Now ${OFFER.price} (${OFFER.savingsInline}). Free consultation with your ${PRACTICE.city} dentist.`,
    images: [absoluteUrl("/images/lp/og-newpatients.jpg")],
  },
};

/** "$5,000" -> "5000", the numeric form schema.org/Offer requires. */
const priceNumeric = OFFER.price.replace(/[^0-9.]/g, "");

/**
 * Block 1 of 3 - the practice itself.
 *
 * aggregateRating is included ONLY when the office has supplied a real review
 * count (REVIEW_COUNT in lp.config). The handoff ships that value as
 * "REPLACE_WITH_REAL_COUNT"; emitting a guessed count is a manual-action risk,
 * so while it is null the property is dropped rather than faked. The visible
 * 4.9-star line stays either way - it is a claim the office stands behind, it
 * just is not machine-readable until the count is real.
 */
const dentistSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": absoluteUrl("/") + "#practice",
  name: PRACTICE.name,
  alternateName: "Formerly Brenner Dental Group",
  image: absoluteUrl("/images/lp/og-newpatients.jpg"),
  url: absoluteUrl("/"),
  telephone: "+1-215-357-2224",
  email: PRACTICE_EMAIL,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: PRACTICE.street,
    addressLocality: PRACTICE.city,
    addressRegion: PRACTICE.state,
    postalCode: PRACTICE.zip,
    addressCountry: "US",
  },
  areaServed: AREA_SERVED,
  availableService: {
    "@type": "MedicalProcedure",
    name: "ClearCorrect clear aligner treatment",
    description:
      "Nearly invisible, removable clear aligners planned, fitted and monitored in person by a Southampton, PA dentist.",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Monday",
      opens: "09:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Tuesday",
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Wednesday",
      opens: "08:00",
      closes: "14:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Thursday",
      opens: "08:00",
      closes: "17:00",
    },
    // Confirmed closed by the office - stated explicitly rather than omitted
    // so Google shows "Closed" instead of leaving the day unknown.
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "00:00",
    },
  ],
  ...(REVIEW_COUNT
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: REVIEW_RATING,
          reviewCount: REVIEW_COUNT,
        },
      }
    : {}),
};

/** Block 2 of 3 - the product and its price. */
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "ClearCorrect Clear Aligners",
  description:
    "Nearly invisible, removable clear aligners fitted and monitored by a Southampton, PA dentist.",
  brand: { "@type": "Brand", name: "ClearCorrect" },
  offers: {
    "@type": "Offer",
    price: priceNumeric,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: absoluteUrl("/"),
    seller: { "@type": "Dentist", name: PRACTICE.name },
  },
};

/**
 * Block 3 of 3 - the FAQ.
 *
 * Built by mapping the same FAQS array the visible accordion renders, because
 * the handoff requires the schema answers to be "word-for-word identical to
 * the visible FAQ text". Hand-copying them into a second literal is how that
 * requirement quietly breaks the first time someone edits one and not the
 * other - here it cannot happen.
 */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function ClearCorrectLandingPage() {
  return (
    <>
      {/* Three blocks rather than one @graph: the handoff specifies three
          discrete scripts, and Google's Rich Results Test reports per-block,
          which makes a failure easier to localise at QA time. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Lenis. Renders nothing; no-ops entirely under prefers-reduced-motion
          and leaves native scrolling in place on touch devices. */}
      <SmoothScroll />

      {/* Skip link - the first tab stop should be the conversion, not the
          logo. Handoff A1 names it "Skip to consultation form". */}
      <a
        href="#consult"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to consultation form
      </a>

      {/* Wraps everything with a booking CTA so all of them - offer band,
          footer and the sticky mobile bar - open one shared dialog rather
          than each mounting its own. */}
      <BookingProvider>
        {/* Section order follows handoff Part A top-to-bottom.
            The argument it builds: here is the product and price (Hero) ->
            book it (OfferBand) -> who does it (MeetTheDentists) -> how it
            works (ProcessSteps) -> why here and not mail-order (WhyUs) ->
            what it costs and how to pay (InsuranceAndFinancing) -> proof
            (Reviews) -> objections (Faq) -> where we are (LocationBlock).

            Education sits before price because an aligner visitor cannot
            judge $5,000 until they know what the process involves.

            Bottom padding on mobile clears the sticky call bar so it never
            covers the footer's last line. */}
        <main className="w-full overflow-x-hidden bg-white pb-13 md:pb-0">
          <LpHeader />
          <Hero />
          <OfferBand />
          <MeetTheDentists />
          <ProcessSteps />
          <WhyUs />
          {/* Reads public/images/lp/insurance/ - any logo file present is
              used, any carrier without one renders as type. */}
          <InsuranceAndFinancing carriers={getCarriers()} />
          <Reviews />
          <Faq />
          <LocationBlock />
          <LpFooter year={new Date().getFullYear()} />
        </main>

        {/* Mobile only. Hidden until the hero scrolls away, then offers Call
            and Free Consultation. */}
        <StickyCallBar />

        {/* Fixed at every width - lifted clear of StickyCallBar on mobile,
            at the true corner from md up where that bar doesn't render. */}
        <GoogleReviewBadge />
      </BookingProvider>
    </>
  );
}
