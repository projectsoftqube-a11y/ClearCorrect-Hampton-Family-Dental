/**
 * Google Tag Manager dataLayer helper.
 *
 * GTM (GTM-WLNN5FJV) is the single source of truth for conversion tracking on
 * this page - the same container the New Patients LP uses. There is no direct
 * Google Ads pixel and no gtag.js: the container fires each Ads conversion off
 * the events pushed here. Adding a pixel back alongside this would
 * double-count every conversion.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * EVENT NAMES ARE A CONTRACT - DO NOT RENAME
 * ─────────────────────────────────────────────────────────────────────────
 * The ClearCorrect handoff (part B5) specifies these five names and states
 * "Names must match exactly", because the Google Ads campaign
 * "Hampton - Search - ClearCorrect - Southampton PA" imports GA4 events by
 * name. A renamed event is not a broken build - it is a conversion that
 * silently stops recording while spend continues.
 *
 *   dataLayer event     Ads conversion                    Priority
 *   ─────────────────   ───────────────────────────────   ───────────
 *   generate_lead       Hampton - Form Submission         Primary
 *   book_click          Hampton - Book Online Click       Primary
 *   call_click          Hampton - Phone Call Click        Primary
 *   sms_click           Hampton - Text Message Click      Secondary
 *   directions_click    Hampton - Directions Click        Observation
 *
 * NOTE FOR WHOEVER OWNS THE GTM CONTAINER: these differ from the New Patients
 * page, which pushes `form_submit_success`. GTM-WLNN5FJV needs triggers for
 * the five names above or none of these conversions will record. Verify in
 * GA4 DebugView before the campaign is enabled (QA step B8).
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Push an event to the GTM dataLayer.
 *
 * Safe to call before the container has loaded: layout.tsx creates the array
 * ahead of the GTM snippet, and GTM replays anything already queued when it
 * initialises. Also safe during SSR - it no-ops rather than throwing on the
 * missing `window`.
 */
export function pushToDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/**
 * The campaign domain this page is served from.
 *
 * Hardcoded rather than read from `location.hostname` because it is the value
 * the GTM container keys on: a preview deploy on *.vercel.app must still
 * report as the live campaign domain, or those conversions land in a
 * different bucket.
 *
 * [CONFIRM] The handoff leaves subdomain-vs-path open ("clearcorrect.hampton
 * familydentist.com/ or /clearcorrect - confirm before build"). This assumes
 * the subdomain. It must match the campaign Final URL exactly.
 */
const SOURCE_DOMAIN = "clearcorrect.hamptonfamilydentist.com";

/** Shared on every push, so GA4 can segment this page from its sister LP. */
const PAGE_TYPE = "lp_clearcorrect";

/**
 * Successful consultation-form submission - the conversion this page exists
 * to produce. Maps to Ads "Hampton - Form Submission".
 *
 * MUST only be called once the API has confirmed the enquiry was accepted.
 * Never on button click, never on a validation error, never on a failed send:
 * a conversion counted for a lead that was never delivered is worse than no
 * tracking at all, because it silently inflates reported ad performance.
 *
 * Fires before the thank-you redirect, per handoff B4.
 */
export function trackGenerateLead() {
  pushToDataLayer({
    event: "generate_lead",
    form_name: "clearcorrect_consult",
    page_type: PAGE_TYPE,
    source_domain: SOURCE_DOMAIN,
  });
}

/**
 * Tap-to-call on any phone link. Maps to Ads "Hampton - Phone Call Click".
 *
 * `location` distinguishes the header CTA from the sticky mobile bar and the
 * footer, so the office can see which placement actually earns the calls.
 */
export function trackCallClick(location: string) {
  pushToDataLayer({
    event: "call_click",
    link_location: location,
    page_type: PAGE_TYPE,
    source_domain: SOURCE_DOMAIN,
  });
}

/** Booking widget / "Book online" click. Ads "Hampton - Book Online Click". */
export function trackBookClick(location: string) {
  pushToDataLayer({
    event: "book_click",
    link_location: location,
    page_type: PAGE_TYPE,
    source_domain: SOURCE_DOMAIN,
  });
}

/**
 * SMS link click. Ads "Hampton - Text Message Click" (secondary).
 *
 * ── CURRENTLY UNCALLED - this is deliberate. ──
 * The handoff's tracking table (B5) lists `sms_click`, but Part A never places
 * a text/SMS link in any section, so there is nothing on the page to fire it.
 * Rather than invent a CTA the copy does not ask for, the helper is defined
 * and ready: PHONE_SMS already exists in lp.config, so wiring it up is one
 * link and one onClick if the practice wants an SMS option.
 *
 * [CONFIRM] with whoever owns the campaign whether an SMS CTA is wanted. If
 * not, the "Hampton - Text Message Click" conversion will simply never fire.
 */
export function trackSmsClick(location: string) {
  pushToDataLayer({
    event: "sms_click",
    link_location: location,
    page_type: PAGE_TYPE,
    source_domain: SOURCE_DOMAIN,
  });
}

/** "Get directions" click. Ads "Hampton - Directions Click" (observation). */
export function trackDirectionsClick(location: string) {
  pushToDataLayer({
    event: "directions_click",
    link_location: location,
    page_type: PAGE_TYPE,
    source_domain: SOURCE_DOMAIN,
  });
}
