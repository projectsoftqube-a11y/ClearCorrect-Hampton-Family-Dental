/**
 * ClearCorrect LP - single source of truth for every value a marketer or the
 * office might need to change. Nothing below is hardcoded in the section
 * components, so a copy tweak never requires touching JSX.
 *
 * Sister page to the New Patients LP. Same practice, same design system,
 * different intent: that page converts people choosing a dentist, this one
 * converts a considered purchase. Aligners are a $5,000 decision, so this
 * page carries education and objection-handling the other does not need.
 */

export const PHONE_DISPLAY = "(215) 357-2224";
export const PHONE_TEL = "tel:+12153572224";
export const PHONE_SMS = "sms:+12153572224";

/**
 * Front-desk inbox. Patients are asked to email a photo of their insurance
 * card here rather than bring the card in, so this address is a real
 * conversion path - it appears in the cost section and the FAQ.
 */
export const PRACTICE_EMAIL = "info@hamptonfamilydentist.com";

/**
 * Online booking destination.
 * [CONFIRM] Replace with the practice's real booking URL before launch. Until
 * then every "Book online" CTA falls back to the phone number, which is a
 * working action rather than a dead link.
 */
export const BOOKING_URL = "";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * THE OFFER LOCK
 * ─────────────────────────────────────────────────────────────────────────
 * From the ClearCorrect handoff (Sep 2026):
 *
 *   "The ad copy, the Google Ads price/promotion assets, and this page must
 *    all state $6,500 -> $5,000 / save $1,500 identically. Do not round,
 *    reword, or vary it."
 *
 * The client's "Clear Correct edits" (Sep 2026) amended the figures to
 * $6,500 -> $5,500 / save $1,000. The rule still stands - the ads must be
 * updated to match.
 *
 * Every price on the page reads from this object for exactly that reason - a
 * hardcoded "$5,000" in one component is how the page and the ad drift apart,
 * and a price mismatch between an ad and its landing page is a Google Ads
 * disapproval, not just a copy bug.
 *
 * There is deliberately no monthly-financing figure in this object - see the
 * note where it used to sit, below.
 */
export const OFFER = {
  product: "ClearCorrect clear aligners",
  /** The all-in treatment price. */
  price: "$5,500",
  /** Struck through wherever both are shown together. */
  wasPrice: "$6,500",
  /** Always rendered as its own emphasis - it is the reason to act. */
  savings: "Save $1,000",
  /** Lowercase mid-sentence variant of the above. */
  savingsInline: "save $1,000",
  /**
   * The amount alone, for constructions where "save" is already carried by
   * the surrounding sentence - "that's $1,000 off the regular price". Using
   * savingsInline there produces "that's save $1,000 off".
   */
  savingsAmount: "$1,000",
  /** The ask. Free is the whole reason this converts at a $5k price point. */
  firstStep: "free consultation",
  /*
   * The handoff carried `financingFrom: "$[X]/mo"` here, rendered on the
   * affordability card. Removed rather than left as a visible token - a page
   * that ships "$[X]/mo" to a visitor is broken copy, and one that ships an
   * invented monthly payment is an unsubstantiated finance claim. The card
   * now states that instalments are available without naming a figure.
   *
   * [CONFIRM - PRACTICE] When the real number lands, add it back here and
   * interpolate it into the "Flexible monthly payments" card in content.ts.
   */
} as const;

export const PRACTICE = {
  name: "Hampton Family Dental",
  formerly: "formerly Brenner Dental Group",
  street: "283 Second Street Pike, Suite 140",
  city: "Southampton",
  state: "PA",
  zip: "18966",
  /**
   * Nine towns, per the ClearCorrect handoff - three more than the New
   * Patients page carries. Aligners pull from a wider radius than a routine
   * check-up does: people will drive 25 minutes for orthodontics and not for
   * a cleaning. Kept in sync with the `areaServed` array in the JSON-LD.
   */
  serving:
    "Serving Southampton, Richboro, Feasterville, Holland, Churchville, Ivyland, Huntingdon Valley, Warminster & Newtown",
  mapsQuery:
    "https://www.google.com/maps/search/?api=1&query=283+Second+Street+Pike,+Suite+140,+Southampton,+PA+18966",
} as const;

/** Machine-readable form of PRACTICE.serving, for the Dentist JSON-LD. */
export const AREA_SERVED = [
  "Southampton",
  "Richboro",
  "Feasterville",
  "Holland",
  "Churchville",
  "Ivyland",
  "Huntingdon Valley",
  "Warminster",
  "Newtown",
];

/**
 * Google review rating shown in the trust line and the aggregateRating.
 *
 * [CONFIRM - PRACTICE] `count` is unresolved. The handoff ships it as
 * "REPLACE_WITH_REAL_COUNT" because an invented reviewCount in structured
 * data is a manual-action risk, not a rounding error. While it is null the
 * JSON-LD omits aggregateRating entirely rather than emitting a guess, and
 * the visible badge shows the rating without a count.
 */
export const REVIEW_RATING = "4.9";
export const REVIEW_COUNT: string | null = null;

/**
 * Insurance carriers shown in the "PPO Insurances Accepted" strip.
 *
 * `slug` is also the filename the logo auto-detector looks for in
 * public/images/lp/insurance/ - e.g. `metlife.webp`. See src/lib/insurance.ts.
 * A carrier with no matching file renders as its name in type, which is a
 * perfectly good production state.
 *
 * Same five as the New Patients page, per the handoff ("reuse existing logo
 * set"). Delta Dental stays off the list: the practice is not in-network for
 * it (office instruction, Aug 2026) and the logo file on disk is a leftover.
 */
export type Carrier = {
  name: string;
  slug: string;
  /** Filled in at request time by getCarriers() when a file exists. */
  logo?: string;
};

export const CARRIERS: Carrier[] = [
  { name: "Cigna", slug: "cigna" },
  { name: "Aetna", slug: "aetna" },
  { name: "MetLife", slug: "metlife" },
  { name: "Guardian", slug: "guardian" },
  { name: "United Concordia", slug: "united-concordia" },
];

/**
 * REVIEW NOTES
 * ------------
 * [CONFIRM] (office to verify) and [DEV] (developer to supply) annotations
 * render as small amber notes that are visibly *not* part of the page design,
 * so the sign-off trail survives without shipping to visitors.
 *
 * OFF by default. Set NEXT_PUBLIC_LP_REVIEW_NOTES=true for a review pass.
 */
export const SHOW_REVIEW_NOTES =
  process.env.NEXT_PUBLIC_LP_REVIEW_NOTES === "true";

/**
 * Image placeholders render as designed, on-brand slots until real artwork
 * lands in /public/images/lp/. Set to `true` while adding new images so each
 * slot states which file it expects; keep `false` for anything public-facing.
 */
export const SHOW_IMAGE_SLOT_LABELS: boolean = false;
