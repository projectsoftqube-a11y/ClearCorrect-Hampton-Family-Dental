# Image prompts — Hampton Family Dental · ClearCorrect LP

Generation prompts for every image slot on this page. Generate in ChatGPT,
send the files back, and they get converted to WebP and wired in.

`src/components/ImageSlot.tsx` points here. Keep this file in step with the
slots it describes.

---

## Before you start — four things that matter

**1. Real practice photos beat AI every time on a local landing page.**
This page sells "fitted by a dentist down the road, not a kit in the post".
A generated stock-looking room actively undercuts that. Two slots already use
real photography of the actual Southampton office (`treatment-room.webp`,
`reception-area.webp`) — **keep those**. Only generate what cannot be shot
without a real patient in a chair: the aligner and scanning close-ups.

**2. Never present a generated person as a real patient.**
No captions like "Sarah, ClearCorrect patient". No before/after pairs — an AI
"after" implies a treatment result that never happened, which is a false
advertising problem on a page that takes paid traffic, not just a taste one.
Generated people are illustrative only; all the real proof on this page comes
from the Google reviews, which are genuine.

**3. Never ask for the ClearCorrect logo or any brand mark.**
It is a registered trademark and the model will render it wrong anyway. The
aligner is a plain clear tray. No text, no signage, no badges in frame.

**4. Check teeth and hands before you send anything.**
These are exactly what image models get wrong, and this page is a close-up of
both. Reject anything with fused teeth, an extra finger, or a tray that does
not sit like a real thermoplastic shell.

---

## Shared style block

Paste this **at the top of every prompt below**, then the per-image direction.

```
Photorealistic editorial photograph for a modern US dental practice website.
Bright, calm, clinical but warm. Soft natural window light from the left,
shallow depth of field, clean uncluttered background.

Colour grade: cool and restrained, built around deep petrol teal (#1E6076)
and dark navy (#143C50), with pale cool-grey neutrals (#F2F5F9, #DDE4EC) and
soft blue-grey accents (#788CB4). No warm orange or yellow cast.

Shot on a 50mm lens at f/2.0. Professional healthcare marketing photography.

Strictly: no text, no lettering, no signage, no logos, no brand marks, no
watermarks anywhere in the frame. Realistic, correctly formed teeth and hands.
```

---

## Canvas sizes and cropping

ChatGPT only outputs **1024×1024**, **1536×1024** (landscape) or **1024×1536**
(portrait). None of the slots below are those ratios, so each prompt names the
canvas to request and the crop to take afterwards.

**Compose loose.** Every slot is rendered with `object-fit: cover`, so the
browser crops to fill. Keep the subject clear of the frame edges or the crop
will cut through it. Where a slot uses an off-centre focal point it is noted.

---

## 1 · Hero — lead image (the big wide one)

| | |
|---|---|
| **File** | `clearcorrect-aligner-hero.webp` |
| **Final size** | 2400 × 1400 → crop to **21:9** |
| **Generate at** | 1536 × 1024 (landscape) |
| **Notes** | This is the **LCP element on mobile** — it loads first, so it must be sharp. Focal point is **40% from the top**: keep the tray slightly above centre. |

```
[shared style block]

Extreme close-up of a clear orthodontic aligner tray — a thin, transparent,
glossy thermoplastic shell moulded to the shape of upper teeth — held upright
between the thumb and index finger of a woman's hand. Clean bare fingers,
neat unpainted nails, no gloves, no jewellery.

The tray catches a soft highlight along its edge so its curve and transparency
read clearly against the background. Positioned slightly above the centre of
the frame, in the left third, with generous clean negative space to the right.

Background: a softly blurred modern dental treatment room in cool petrol and
grey tones, far out of focus.

Wide cinematic composition with plenty of room on both sides for cropping.
```

---

## 2 · Hero — the patient

| | |
|---|---|
| **File** | `clearcorrect-patient-smile.webp` |
| **Final size** | 1400 × 1000 → crop to **4:3** |
| **Generate at** | 1536 × 1024 (landscape) |

```
[shared style block]

A relaxed, genuinely happy woman in her early thirties, seated in a modern
dental practice, smiling a natural closed-lip-to-slightly-open smile with
straight, clean, realistic teeth. Not a forced grin. Casual smart clothing in
a muted blue-grey.

She is looking slightly off-camera, mid-conversation, as if a dentist just out
of frame is speaking to her. Warm, at ease, not posed like a stock model.

Background: a bright, softly blurred practice interior — pale walls, a hint of
petrol-teal cabinetry, natural light from a window behind her.

Head and shoulders, centred, with clear space above her head.
```

---

## 3 · Hero — the room

**Recommendation: skip this one and keep the real photo** already in place
(`treatment-room.webp`). It is the actual Southampton office, which is worth
more here than anything generated.

Only if you specifically want a scanner-focused frame instead:

| | |
|---|---|
| **File** | `clearcorrect-scan-room.webp` |
| **Final size** | 1400 × 1000 → crop to **4:3** |
| **Generate at** | 1536 × 1024 (landscape) |

```
[shared style block]

An immaculate, empty modern dental treatment room, viewed from the doorway.
A contemporary dental chair in pale grey upholstery, a wall-mounted monitor
angled toward where a patient would sit, and a slim intraoral scanner wand
resting in its cradle on a clean counter.

Deliberately unoccupied — no people. Spotless, calm, organised. Cabinetry in
soft petrol teal, pale walls, bright natural light from a window to the left.

Wide, straight-on composition.
```

---

## 4 · How ClearCorrect works — main image (tall)

| | |
|---|---|
| **File** | `clearcorrect-treatment-plan.webp` |
| **Final size** | 1200 × 1400 (portrait) → crops to **7:6** on desktop, **5:2 letterbox** on mobile |
| **Generate at** | 1024 × 1536 (portrait) |
| **Notes** | Focal point is **38% from the top**, and the mobile crop is a *very* wide letterbox slice through the upper-middle. **Keep both faces in the top half of the frame** or they will be cut off on phones. |

```
[shared style block]

A dentist in a clean petrol-teal scrub top, seated beside a patient, both
looking at a wall-mounted monitor and talking. The dentist is gesturing toward
the screen, explaining something. The patient is attentive and relaxed.

On the monitor: an abstract, softly out-of-focus 3D rendering of a dental arch
in pale blue-grey on a dark background. The screen content must be blurred
enough that no interface, numbers or text are legible.

Both faces clearly visible in the upper portion of the frame. Vertical
composition with headroom above them.

Background: a bright modern treatment room, softly out of focus.
```

---

## 5 · How ClearCorrect works — the scan

| | |
|---|---|
| **File** | `clearcorrect-scanner.webp` |
| **Final size** | 1400 × 1000 → crop to **7:5** |
| **Generate at** | 1536 × 1024 (landscape) |

```
[shared style block]

Close-up of a dentist's gloved hands holding a slim white intraoral scanner
wand near a patient's open mouth during a digital scan. Clean pale blue nitrile
gloves. The wand is a smooth modern handheld device with a small rounded tip.

Shot from the side at chair level. The patient's lower face only — no full
face needed. Calm and unhurried, not clinical or alarming.

Sharp focus on the scanner tip and the dentist's hands; background softly
blurred into cool grey and petrol tones.
```

---

## 6 · How ClearCorrect works — wearing the aligner

| | |
|---|---|
| **File** | `clearcorrect-tray-insert.webp` |
| **Final size** | 1400 × 1000 → crop to **7:5** |
| **Generate at** | 1536 × 1024 (landscape) |

```
[shared style block]

Close-up of a woman in her thirties placing a clear orthodontic aligner tray
onto her upper teeth. Her fingertips hold the thin transparent tray at its
edge, guiding it into position. Lower half of her face only — natural skin,
clean straight teeth, relaxed expression.

The tray is almost invisible: a faint glossy edge and a soft highlight are the
only things that reveal it. This is the point of the photograph — it should
look discreet, not like dental hardware.

Soft even light, plain pale cool-grey background, shallow depth of field.
```

---

## 7 · Why choose us — the dentist

| | |
|---|---|
| **File** | `clearcorrect-dentist-consult.webp` |
| **Final size** | 1400 × 1100 → crop to **5:4** |
| **Generate at** | 1536 × 1024 (landscape) |
| **Notes** | Focal point is **35% from the top** — keep faces high in the frame. |

```
[shared style block]

A dentist in a petrol-teal scrub top sitting and talking with a patient,
turned toward each other in conversation rather than mid-treatment. No
instruments in hand, no mask. Open, attentive body language — a consultation,
not a procedure.

This image carries the argument "fitted by a dentist in person, not ordered
by post", so the human contact is the subject. Both people should read as
comfortable and engaged.

Both faces in the upper half of the frame, with headroom. Bright modern
practice interior softly blurred behind them.
```

---

## 8 · Social share card *(optional)*

Currently reuses the New Patients OG image. Only worth generating if you want
aligner-specific link previews.

| | |
|---|---|
| **File** | `og-clearcorrect.jpg` |
| **Final size** | 1200 × 630 → crop to **1.91:1** |
| **Generate at** | 1536 × 1024 (landscape) |

```
[shared style block]

A clear orthodontic aligner tray held between two fingers, positioned in the
left third of the frame, with a smiling woman softly out of focus behind it on
the right. Clean, bright, uncluttered.

Wide banner composition with generous empty space — this is a social share
card and the sides will be cropped.

Absolutely no text anywhere in the image.
```

---

## Sending them back

- **PNG or JPG straight from ChatGPT is fine** — they get converted to WebP,
  resized and quality-tuned here. Do not pre-compress them.
- Keep the numbering above in the filename or message so each one lands in the
  right slot — `1-aligner-hero.png`, `4-treatment-plan.png`, and so on.
- Highest resolution available. They are downscaled, never upscaled.

Once they arrive: files go into `public/images/lp/`, and each `ImageSlot`
call site gets its `file`, `src` and `alt` updated. Nothing else changes.
