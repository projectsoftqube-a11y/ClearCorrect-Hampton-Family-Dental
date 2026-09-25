import { OFFER, PRACTICE_EMAIL } from "@/lib/lp.config";
import type { AccordionItem } from "@/components/Accordion";

/**
 * All page copy, lifted from the approved ClearCorrect handoff
 * (Hampton_ClearCorrect_LandingPage_Content_and_DevHandoff.md, Sep 2026).
 * Edit here, never in the components.
 *
 * Prices are the one exception: they live in lp.config.ts OFFER and are
 * interpolated, never typed out. The handoff is explicit that every price on
 * the page must read identically to the ad, and the reliable way to get that
 * is to make it impossible to write a second one.
 */

/**
 * Section 6 - "How ClearCorrect works". NEW versus the model page.
 *
 * Aligners are a considered purchase: nobody commits $5,000 to a process they
 * cannot picture. The model page's four-step block is reused as-is because the
 * shape is already right - what changes is that `duration` becomes a stage
 * label rather than a number of minutes, since aligner treatment runs over
 * months and a minutes figure here would be meaningless.
 *
 * Step 2 carries the price so the quote is framed as part of the process
 * rather than a separate negotiation.
 */
export const STEPS = [
  {
    duration: "Step 1",
    title: "Exam and X-rays",
    body: "We will take a look at your smile through some X-rays.",
  },
  {
    duration: "Step 2",
    title: "See your preview",
    body: `View your projected result and get a clear ${OFFER.price} quote.`,
  },
  {
    duration: "Step 3",
    title: "Wear your aligners",
    body: "Nearly invisible, removable trays you change on schedule.",
  },
  {
    duration: "Step 4",
    title: "Reveal your new smile",
    body: "Checkups in-house with your Southampton dentist throughout.",
  },
];

/**
 * Section 7 - "The difference: why choose us for ClearCorrect".
 *
 * Every one of these four answers an objection a mail-order aligner brand has
 * already put in the visitor's head by the time they land here, which is the
 * competitor this page is actually fighting - not the dentist down the road.
 * "Fitted by a dentist" leads for that reason.
 *
 * `stat` is the scannable token; `lead` and `body` confirm it. Facts only -
 * a founding date and an on-site scanner are things a competitor's copy
 * cannot simply also claim, which is the whole point of the section.
 */
export const WHY_US = [
  {
    stat: "DDS",
    lead: "Fitted by a dentist",
    body: "In-person care and supervision, not a mail-order kit",
  },
  {
    stat: "3D",
    lead: "Digital planning on-site",
    body: "Preview your result before you commit",
  },
  {
    stat: OFFER.savings.replace("Save ", "-"),
    lead: `${OFFER.price} all-in`,
    body: "Clear pricing, no surprises",
  },
  {
    stat: "30+",
    lead: "Years in Southampton",
    body: "Since 1995, formerly Brenner Dental Group",
  },
];

/**
 * Section 9 - "Affordability: care within reach".
 *
 * The handoff flags this one as critical, and it is: $5,000 is the number the
 * visitor stalls on, so the page has to answer "how would I actually pay for
 * this?" before they leave. Order is deliberate - the discount first (it is
 * the reason to act now), then the monthly figure (it reframes $5,000 as
 * something smaller), then insurance (it may reduce the figure again).
 *
 * The monthly card names no figure. The handoff shipped it as "from $[X]/mo"
 * with the instruction to leave a token until the practice confirms the real
 * number - but a visible "$[X]/mo" is worse than saying nothing: it reads as
 * a broken page to a visitor and cannot go live either way. The card now makes
 * the true claim (instalments exist, we'll explain them) with no number to be
 * wrong about. Add the figure here once the practice confirms it.
 */
export const FINANCING = [
  {
    title: `${OFFER.savings} today`,
    body: `${OFFER.price} instead of ${OFFER.wasPrice} on your ClearCorrect treatment.`,
  },
  {
    title: "Flexible monthly payments",
    body: "Spread the cost over monthly instalments so it fits your budget - we'll walk you through the options at your consultation.",
  },
  {
    title: "PPO insurance accepted",
    body: "We bill your plan directly where aligner benefits apply.",
  },
];

/**
 * The dentists.
 *
 * Portraits are shared with the Emergency LP - same people, same practice.
 * [CONFIRM] bios with the office.
 */
export type Dentist = {
  name: string;
  /** Post-nominals, shown small beside the name. */
  credential: string;
  /** The one-line promise under the name - what this dentist is *for*. */
  role: string;
  /** Headline for the bio - the claim the paragraphs then support. */
  headline: string;
  /** Bio paragraphs. Two each: who they are, then how they treat. */
  bio: string[];
  /**
   * Scannable proof - school, tenure, memberships, technology. Most visitors
   * read these and not the paragraphs, so anything that must land goes here.
   */
  facts: { label: string; value: string }[];
  /** Clinical focus, as chips. */
  focus: string[];
  file: string;
  src: string;
  alt: string;
  /** object-position for the round crop. */
  objectPosition?: string;
};

/**
 * Bios condensed from the practice's own long-form copy supplied by the office
 * (Sep 2026), then re-angled for aligners per handoff section 5.
 *
 * ORDER MATTERS: Dr. Dudhat leads on this page, where Dr. Brenner leads on the
 * New Patients page. The handoff says to "feature first for this page" the
 * ClearCorrect provider, and it is the right call - the visitor's unspoken
 * question is "who is actually doing my aligners", and the answer should be
 * the first face they see. The array order is the render order; do not sort.
 *
 * Nothing here is invented: every claim traces to the supplied text.
 */
export const DENTISTS: Dentist[] = [
  {
    name: "Dr. Keyur Dudhat",
    credential: "DMD",
    role: "Implant, restorative & cosmetic dentistry - ClearCorrect provider",
    headline: "Modern technology, unhurried care",
    bio: [
      "Penn State, then a DMD from Temple University's Kornberg School of Dentistry. Dr. Dudhat has built his training around implants, cosmetic work and digital treatment planning.",
      "He plans every aligner case with 3D digital imaging, so you can see your projected result before you start - and keeps treatment in-house from the first scan to your final smile, rather than sending you to a specialist across town.",
    ],
    facts: [
      { label: "Qualified", value: "Temple University Kornberg, DMD" },
      { label: "Undergraduate", value: "Penn State University" },
      { label: "Technology", value: "3D digital imaging & treatment planning" },
    ],
    focus: [
      "Clear aligners",
      "Implants",
      "Full-arch restoration",
      "Veneers",
      "Crowns & bridges",
    ],
    file: "lp/dr-keyur-dudhat.webp",
    src: "/images/lp/dr-keyur-dudhat.webp",
    alt: "Dr. Keyur Dudhat, ClearCorrect provider and implant dentist at Hampton Family Dental in Southampton, PA",
    /** Pulls the crop up to the face on a tall portrait. */
    objectPosition: "center 20%",
  },
  {
    name: "Dr. Jeffrey Brenner",
    credential: "DMD",
    role: "General, restorative & cosmetic dentistry",
    headline: "Over three decades of healthy smiles",
    bio: [
      "Temple University School of Dentistry, 1992. Dr. Brenner founded the practice here in Southampton in 1995 and has cared for multiple generations of the same local families ever since.",
      "His approach is conservative: keep as much of your natural tooth as possible, and recommend only what you genuinely need. It's why a first visit here rarely ends in a surprise treatment plan.",
    ],
    facts: [
      { label: "Qualified", value: "Temple University, 1992" },
      { label: "In Southampton since", value: "1995" },
      { label: "Member", value: "ADA · Pennsylvania Dental Association" },
    ],
    focus: ["Preventive care", "Restorations", "Implants", "Cosmetic dentistry"],
    file: "lp/dr-jeffrey-brenner.webp",
    src: "/images/lp/dr-jeffrey-brenner.webp",
    alt: "Dr. Jeffrey Brenner, general and restorative dentist at Hampton Family Dental in Southampton, PA",
    /** Pulls the crop up to the face on a tall portrait. */
    objectPosition: "center 20%",
  },
];

/**
 * Reviews - the real Google Business Profile set, supplied by the office
 * (Aug 2026). Names, review counts and dates are as they appear on Google.
 *
 * DELIBERATELY NOT ALIGNER-SPECIFIC. The handoff is explicit: "do not
 * fabricate aligner-specific quotes - use real reviews". Writing a plausible
 * ClearCorrect testimonial would be a fake review, which is both a Google
 * policy violation and an FTC matter. General practice reviews carry the
 * trust just fine.
 *
 * `when` is relative ("6 months ago") exactly as Google renders it, which means
 * it silently ages. Refresh this list when the review section is next revisited
 * rather than letting "3 months ago" quietly become two years old.
 *
 * Longer reviews are quoted in full; Google's own "… More" truncation is left
 * to the card, not baked into the text.
 */
export type Review = {
  name: string;
  /** e.g. "3 reviews" or "Local Guide · 15 reviews" - shown under the name. */
  meta: string;
  when: string;
  quote: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Susan Donohue",
    meta: "3 reviews",
    when: "3 months ago",
    quote:
      "Dr. Brenner is an amazing dentist. He really explains everything you need to know. The staff is awesome and very friendly.",
  },
  {
    name: "Donnalee Charlton",
    meta: "5 reviews",
    when: "8 months ago",
    quote:
      "I had a crown come off. I called for an appointment. Angela returned my call within minutes. I was in the chair within one hour. Casey was setting up and assisting as Dr. Brenner was working on my tooth. The staff is always so friendly.",
  },
  {
    name: "Colleen McKeown",
    meta: "3 reviews",
    when: "6 months ago",
    quote:
      "Dr. Brenner and his office staff are extremely kind and helpful. I have been going for years and they are very honest, accommodating and helpful. Grateful 💜☀️",
  },
  {
    name: "Gary Balasa",
    meta: "2 reviews",
    when: "a year ago",
    quote:
      "Dr. Brenner and his staff provide a pleasant atmosphere with excellent quality dental care. I have been going to this office for 6 years for surgery and maintenance and have been very happy with my experiences.",
  },
  {
    name: "Lauren Fioresi",
    meta: "10 reviews",
    when: "2 years ago",
    quote:
      "Tiffany was great and very knowledgeable. She made me feel very comfortable and I got through my cleaning without any pain or discomfort! Dr. Brenner is great and also very knowledgeable and cares about his patients.",
  },
  {
    name: "Cynthia Perez",
    meta: "8 reviews",
    when: "a year ago",
    quote:
      "My family has been going to Dr Brenner's office for a few years. Highly recommend! It's like family there, the staff is great. Dr. is always looking out for the best on your dental health. He's proactive and a great Dr and person. Love this place ❤️",
  },
  {
    name: "Arlene Santonastasi",
    meta: "17 reviews",
    when: "6 months ago",
    quote:
      "Dr. Brenner stepped into the waiting area and introduced himself to me. Everyone was cheerful and made me feel very comfortable!",
  },
  {
    name: "Samantha Freeman",
    meta: "5 reviews · 1 photo",
    when: "a year ago",
    quote:
      "Dr. Brenner and his team were simply fantastic. Finding a dentist, hygienist, and even friendly front desk all in one is hard to come by and they certainly have it all. My hygienist could sense I was nervous but walked me through each step of the way and took her time and was as gentle as she could be. I look forward to bringing my family here.",
  },
  {
    name: "Scott St. Pierre",
    meta: "Local Guide · 15 reviews · 5 photos",
    when: "2 years ago",
    quote:
      "Dr Brenner purchased the practice from a dentist I went to since I was a kid. It was an easy and smooth transition and my family has been with him since. He and the entire staff are friendly, professional and do an excellent job on our teeth. Could not be happier with their service.",
  },
  {
    name: "Ellyn Caplan Klein",
    meta: "Local Guide · 13 reviews",
    when: "a year ago",
    quote:
      "Dr. Brenner is superb, compassionate and I can see why he has been chosen as the best dentist. He is restoring my mouth and I am in great hands. His staff, Michelle and Casey, have been trained by Dr. Brenner and they are also excellent. Angela, the office manager, is absolutely excellent as are their dental hygienists. Make sure you go to this practice.",
  },
];

/**
 * Section 11 - "ClearCorrect: common questions". NEW versus the model page.
 *
 * Exists because aligners are a considered purchase that needs education and
 * objection-handling, and because it powers the FAQPage structured data.
 *
 * ── KEEP IN SYNC WITH THE JSON-LD ──
 * The handoff requires the schema answers to be "word-for-word identical to
 * the visible FAQ text". They are not duplicated to achieve that: page.tsx
 * builds the FAQPage block by mapping over this array, so the two cannot
 * drift. Do not hand-write a second copy of these answers anywhere.
 */
export const FAQS: AccordionItem[] = [
  {
    q: "How much does ClearCorrect cost here?",
    a: `Your all-in price is ${OFFER.price} - ${OFFER.savingsAmount} off the regular ${OFFER.wasPrice} - with monthly financing available.`,
  },
  {
    q: "Is ClearCorrect noticeable?",
    a: "The aligners are clear and removable, so most people won't notice you're wearing them.",
  },
  {
    q: "How is this different from mail-order aligners?",
    a: "Your treatment is planned, fitted, and monitored in person by a Southampton dentist - not shipped from a lab you never visit.",
  },
  {
    q: "Does insurance cover it?",
    a: `Many PPO plans include orthodontic and aligner benefits. Email your card to ${PRACTICE_EMAIL} and we'll verify before you commit.`,
  },
  {
    q: "How long does treatment take?",
    a: "It varies by case; you'll get a personalized timeline at your consultation.",
  },
  {
    q: "What's the first step?",
    a: "A consultation and digital scan.",
  },
];

/**
 * Opening hours.
 *
 * `confirm: true` rows are unverified. They render as "Call for hours" and are
 * deliberately omitted from the JSON-LD rather than guessed - wrong hours in
 * structured data send patients to a locked door.
 */
export const HOURS = [
  { day: "Monday", time: "9 AM – 5 PM", confirm: false },
  { day: "Tuesday", time: "9 AM – 6 PM", confirm: false },
  { day: "Wednesday", time: "8 AM – 2 PM", confirm: false },
  { day: "Thursday", time: "8 AM – 5 PM", confirm: false },
  { day: "Fri – Sun", time: "Closed", confirm: false },
];
