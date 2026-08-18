import { Fragment, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { asset } from '../../lib/asset';

const GOOGLE_REVIEWS_URL =
  'https://www.google.com/search?kgmid=/g/11ylpc_5bh&hl=en-IN&q=Creativzedge#lrd=0x3a5267556e16bb0b:0x71872bfe942c800,1';

const encode = (p) => encodeURI(asset(p));

// Marquee / spotlight clients — featured with their photos.
const famousClients = [
  {
    name: 'Drums Sivamani',
    role: 'Padma Shri • Percussion Legend',
    tagline: 'Truly Dedicated.',
    img: encode('/images/famous client/Padma Shri Drums Sivamani.webp'),
    quote:
      "I've been associated with Creativzedge (Venkat) for a long time for all my design needs, and the experience has always been outstanding. Creative work, quick turnaround, and always available no matter the time. Truly dedicated and highly professional. Highly recommended!",
  },
  {
    name: 'Ms. Akila',
    role: 'Managing Partner — Dhara Logistics',
    tagline: 'Creative. Professional.',
    img: encode('/images/famous client/Ms. Akila  Managing Partner - Dhara Logistics.webp'),
    quote:
      'Thank you for the excellent standee poster and video support. The designs were creative, professional, and delivered with great quality. Really appreciate the timely coordination, attention to detail, and smooth execution throughout the process.',
  },
];

// Real client feedback pulled from our Google reviews (owner replies excluded).
const testimonials = [
  {
    name: 'Anusuya Bharath',
    role: 'Logo Design — SIGAI',
    rating: 5,
    quote:
      'Had an amazing experience with Creativzedge. The logo design was creative, professional, and exactly matched our brand vision. Very responsive, talented, and delivered high-quality work on time. Highly recommended for anyone looking for unique and premium logo designs!',
  },
  {
    name: 'Dr. Nithya Ranganathan',
    role: 'Founder — DHARANI Cosmetic & Diabetic Centre',
    rating: 5,
    quote:
      'We had collaborated with them for the last 5 years. Excellent social media post designs for our clinic. The team understands healthcare branding really well.',
  },
  {
    name: 'Pardesi Partyuk',
    role: 'Brand Partner',
    rating: 5,
    quote:
      'I have been working with CreativzEdge for the past year, and the experience has been excellent. Their work is always creative, professional, reliable, and delivered with great attention to detail.',
  },
  {
    name: 'Raghavendra Sriramdas',
    role: 'Brand Identity',
    rating: 5,
    quote:
      "Mr. Venkata's design skills are exceptional. He has a great eye for detail and creativity. He understood exactly what I needed after just one call and transformed my ideas into beautiful, professional designs.",
  },
  {
    name: 'Gopinath',
    role: 'Director — 359 Event Planners',
    rating: 5,
    quote:
      'Creativzedge transformed our vision into a stunning brand identity. Clean, creative, and delivered with perfection. Highly recommended for logo & branding work!',
  },
  {
    name: 'Abi',
    role: 'Director — Triya Construction',
    rating: 5,
    quote:
      "I'm very happy with the logo and brochure design. He clearly understood my requirements and delivered exactly what I was looking for. The entire experience was smooth and comfortable. Highly recommended.",
  },
  {
    name: 'Susila V',
    role: 'Verified Client',
    rating: 5,
    quote: 'Fast service, good job. Quick, reliable and exactly what we needed.',
  },
];

const initials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

const Stars = ({ count }) => (
  <div className="flex gap-0.5 mb-5" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < count ? 'text-accent' : 'text-primary/15'}>
        ★
      </span>
    ))}
  </div>
);

const FeaturedCard = ({ c }) => (
  <div className="glass-card h-full flex flex-col overflow-hidden border border-accent/25">
    <div className="relative bg-gradient-to-br from-primary/[0.06] to-accent/[0.08]">
      <div className="h-52 flex items-center justify-center p-3">
        <img
          src={c.img}
          alt={c.name}
          loading="lazy"
          decoding="async"
          className="max-w-full max-h-full object-contain rounded-xl"
        />
      </div>
      <span className="absolute top-4 left-4 font-outfit text-[9px] font-black tracking-[0.25em] text-primary uppercase bg-accent px-3 py-1.5 rounded-full shadow-lg">
        Featured Client
      </span>
    </div>
    <div className="p-8 pt-6 flex flex-col flex-grow">
      <Stars count={5} />
      <h3 className="syne-title text-xl text-primary mb-3">
        <span className="text-gradient">{c.tagline}</span>
      </h3>
      <p className="font-inter text-primary/80 leading-relaxed text-[15px] mb-8 flex-grow">"{c.quote}"</p>
      <div className="pt-6 border-t border-primary/5">
        <div className="font-outfit text-sm font-black text-primary uppercase tracking-wide">{c.name}</div>
        <div className="font-inter text-[12px] text-secondary">{c.role}</div>
      </div>
    </div>
  </div>
);

const ReviewCard = ({ t }) => (
  <div className="glass-card h-full flex flex-col overflow-hidden">
    {/* Initial panel mirrors the featured cards' photo slot so every card shares the same top rhythm */}
    <div className="h-52 flex items-center justify-center bg-gradient-to-br from-primary/[0.06] to-accent/[0.08]">
      <span
        aria-hidden="true"
        className="font-syne font-extrabold uppercase text-[6.5rem] leading-none text-primary/15 select-none"
      >
        {t.name[0]}
      </span>
    </div>
    <div className="p-8 pt-6 flex flex-col flex-grow">
      <Stars count={t.rating} />
      <p className="font-inter text-primary/80 leading-relaxed text-[15px] mb-8 flex-grow">"{t.quote}"</p>
      <div className="flex items-center gap-4 pt-6 border-t border-primary/5">
        <div className="w-11 h-11 rounded-full bg-primary text-surface flex items-center justify-center font-outfit text-[13px] font-black shrink-0">
          {initials(t.name)}
        </div>
        <div>
          <div className="font-outfit text-sm font-black text-primary uppercase tracking-wide">{t.name}</div>
          <div className="font-inter text-[12px] text-secondary">{t.role}</div>
        </div>
      </div>
    </div>
  </div>
);

// Featured clients lead, Google reviews follow. The run is rendered twice so
// the carousel can loop without the visitor ever seeing it rewind.
const SLIDES = [
  ...famousClients.map((c) => ({ kind: 'featured', id: c.name, data: c })),
  ...testimonials.map((t) => ({ kind: 'review', id: t.name, data: t })),
];
const COPIES = [0, 1];

// Glide speed in px/second. Slow enough that a review stays readable as it
// travels; hovering stops it outright.
const GLIDE_SPEED = 38;

// The track sets scroll-smooth in CSS, so a wrap has to opt out of it or the
// correction animates and the seam becomes visible.
const jumpTo = (el, left) => {
  const previous = el.style.scrollBehavior;
  el.style.scrollBehavior = 'auto';
  el.scrollLeft = left;
  el.style.scrollBehavior = previous;
};

// Distance from the first card of one copy to the first card of the next.
// Measured rather than derived from scrollWidth, which also counts the
// track's own horizontal padding.
const copyWidth = (el) => {
  const marks = el.querySelectorAll('[data-loop-start]');
  return marks.length === 2 ? marks[1].offsetLeft - marks[0].offsetLeft : 0;
};

const Testimonials = () => {
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const resumeRef = useRef(0);

  // Hold the glide still for a moment — used whenever the visitor takes over.
  const holdMotion = useCallback((ms) => {
    clearTimeout(resumeRef.current);
    pausedRef.current = true;
    if (ms > 0) resumeRef.current = setTimeout(() => { pausedRef.current = false; }, ms);
  }, []);

  const slide = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    // Let the arrow's own smooth scroll finish before the glide takes over.
    holdMotion(4000);
    // Stepping back from the very start hops to the twin copy first, so the
    // arrow keeps travelling instead of dead-ending at zero.
    const width = copyWidth(el);
    if (dir < 0 && width > 0 && el.scrollLeft <= 1) jumpTo(el, width);
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' });
  };

  // The wall glides continuously rather than stepping. Once it passes the
  // first copy it snaps back by exactly one copy — identical cards sit under
  // the viewport, so the travel never appears to restart.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    // A swipe past the first copy has to loop too, not just the glide.
    let settle;
    const onScroll = () => {
      clearTimeout(settle);
      settle = setTimeout(() => {
        const width = copyWidth(el);
        if (width > 0 && el.scrollLeft >= width) jumpTo(el, el.scrollLeft - width);
      }, 120);
    };
    el.addEventListener('scroll', onScroll, { passive: true });

    const pause = () => holdMotion(0);
    const resumeSoon = () => holdMotion(1500);
    el.addEventListener('pointerenter', pause);
    el.addEventListener('pointerleave', resumeSoon);
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('touchend', resumeSoon, { passive: true });

    let frame = 0;
    let previous = 0;
    // Browsers round scrollLeft to whole pixels, so reading it back as the
    // running total would quantise every frame up to 1px and overspeed the
    // glide. This float stays authoritative; scrollLeft is only the output.
    let position = el.scrollLeft;
    let lastWritten = el.scrollLeft;

    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      // Clamp so returning to a backgrounded tab doesn't lurch the track.
      const elapsed = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
      previous = now;

      if (reduced.matches || pausedRef.current || document.hidden) {
        // Stay in step with wherever the visitor left it.
        position = el.scrollLeft;
        lastWritten = position;
        return;
      }

      // A swipe or arrow moved the track out from under us — adopt it.
      if (Math.abs(el.scrollLeft - lastWritten) > 2) position = el.scrollLeft;

      const width = copyWidth(el);
      position += GLIDE_SPEED * elapsed;
      if (width > 0 && position >= width) position -= width;

      jumpTo(el, position);
      lastWritten = el.scrollLeft;
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      clearTimeout(resumeRef.current);
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointerenter', pause);
      el.removeEventListener('pointerleave', resumeSoon);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', resumeSoon);
    };
  }, [holdMotion]);

  return (
    <section className="py-stack-lg relative z-10 overflow-hidden">
      <div className="ambient-glow top-[10%] left-[-10%] bg-accent opacity-5"></div>

      <div className="max-w-7xl mx-auto px-margin relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-secondary/40"></div>
            <span className="font-outfit text-[12px] font-black tracking-[0.4em] text-secondary uppercase">
              Client Voices
            </span>
            <div className="w-8 h-[1px] bg-secondary/40"></div>
          </div>
          <h2 className="syne-title text-[clamp(2rem,6vw,4rem)] text-primary leading-[0.95] mb-6">
            Trusted by <span className="text-gradient">Real Brands.</span>
          </h2>
          <p className="font-inter text-base sm:text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Don't take our word for it — here's what our clients say about working with CreativzEdge.
          </p>
        </motion.div>

        {/* Slideable wall of reviews — featured clients lead, Google reviews follow */}
        <div className="relative">
          {/* Track — native swipe/scroll-snap; drag on touch, arrows on desktop */}
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto pb-4 -mx-margin px-margin [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {COPIES.map((copy) => (
              <Fragment key={copy}>
                {SLIDES.map((slideItem, index) => (
                  <div
                    key={`${copy}-${slideItem.id}`}
                    // The duplicate run is decorative; hiding it keeps assistive
                    // tech from reading every review out twice.
                    aria-hidden={copy === 1 ? 'true' : undefined}
                    data-loop-start={index === 0 ? '' : undefined}
                    className="shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  >
                    {slideItem.kind === 'featured' ? (
                      <FeaturedCard c={slideItem.data} />
                    ) : (
                      <ReviewCard t={slideItem.data} />
                    )}
                  </div>
                ))}
              </Fragment>
            ))}
          </div>

          {/* Arrow controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => slide(-1)}
              aria-label="Previous reviews"
              className="w-12 h-12 rounded-full glass border border-primary/10 flex items-center justify-center text-primary hover:border-accent hover:text-accent active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">chevron_left</span>
            </button>
            <button
              onClick={() => slide(1)}
              aria-label="Next reviews"
              className="w-12 h-12 rounded-full glass border border-primary/10 flex items-center justify-center text-primary hover:border-accent hover:text-accent active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* CTA to Google */}
        <div className="text-center mt-16">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="intense-glow-btn inline-flex items-center gap-3"
          >
            Read all reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
