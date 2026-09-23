"use client";

import { GoogleG, Stars } from "./Reviews";

/**
 * Fixed bottom-left badge - the Google rating, always in view, one tap from
 * the review section. A visitor skimming the offer or the form can check
 * social proof without hunting for the reviews block further down the page.
 *
 * Scrolls to #reviews rather than linking out to Google directly: sending
 * paid-traffic visitors off-site before they've seen the form costs more
 * conversions than the badge is worth, and the reviews section already
 * carries the same rating with the real quotes behind it.
 *
 * Lifted above StickyCallBar on mobile (that bar is fixed full-width along
 * the same edge, md:hidden) so the two never overlap; sits at the true
 * viewport edge from md up, where StickyCallBar does not render.
 */
export default function GoogleReviewBadge() {
  return (
    <a
      href="#reviews"
      data-cta="review-badge"
      className="fixed bottom-[68px] left-3 z-40 flex items-center gap-1.5 rounded-full border border-beige-dark/60 bg-white py-1.5 pl-1.5 pr-3 shadow-[0_8px_24px_-8px_rgba(20,60,80,0.35)] transition-transform hover:-translate-y-0.5 active:scale-[0.97] sm:bottom-4 sm:left-4 sm:py-2 sm:pl-2 sm:pr-3.5"
      aria-label="4.9 out of 5 on Google - jump to patient reviews"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-beige-light sm:h-7 sm:w-7">
        <GoogleG className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="flex items-center gap-1">
          <span className="font-heading text-[13px] leading-none text-navy sm:text-[14px]">
            4.9
          </span>
          {/* Same amber star icons as the reviews section below, not a text
              glyph in the brand's petrol accent - a review badge reads as
              fake the moment its stars aren't the gold people expect from
              Google, and matching Reviews keeps the two consistent. Stars
              renders each icon at a fixed 14px regardless of className, which
              is why this isn't scaled down further. */}
          <Stars />
        </span>
        <span className="mt-1 text-[9px] font-semibold uppercase leading-none tracking-[0.08em] text-navy/45 sm:text-[9.5px]">
          Google reviews
        </span>
      </span>
    </a>
  );
}
