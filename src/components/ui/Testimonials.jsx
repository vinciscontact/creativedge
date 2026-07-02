import { useRef } from 'react';
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

const Testimonials = () => {
  const trackRef = useRef(null);

  const slide = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' });
  };

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

        {/* Famous client spotlight — storytelling, alternating rows */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-16">
            <div className="w-8 h-[1px] bg-accent/40"></div>
            <span className="font-outfit text-[11px] font-black tracking-[0.35em] text-accent uppercase">
              The Stories Behind the Work
            </span>
            <div className="w-8 h-[1px] bg-accent/40"></div>
          </div>

          <div className="flex flex-col gap-20 md:gap-28">
            {famousClients.map((c, i) => {
              const flip = i % 2 === 1;
              return (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid lg:grid-cols-12 gap-8 lg:gap-14 items-center ${flip ? 'lg:[direction:rtl]' : ''}`}
                >
                  {/* Photo panel — object-contain so nothing is ever cropped */}
                  <div className="lg:col-span-5 [direction:ltr]">
                    <div className="relative rounded-3xl overflow-hidden border border-primary/10 bg-gradient-to-br from-primary/[0.06] to-accent/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.08)] group">
                      <div className="aspect-[4/5] flex items-center justify-center p-4">
                        <img
                          src={c.img}
                          alt={c.name}
                          className="max-w-full max-h-full object-contain rounded-2xl transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                      <span className="absolute top-5 left-5 font-outfit text-[9px] font-black tracking-[0.25em] text-primary uppercase bg-accent px-3 py-1.5 rounded-full shadow-lg">
                        Featured Client
                      </span>
                    </div>
                  </div>

                  {/* Story content */}
                  <div className="lg:col-span-7 [direction:ltr]">
                    <span className="font-syne text-[3.5rem] md:text-[5rem] leading-none text-primary/5 font-extrabold block mb-2 select-none">
                      0{i + 1}
                    </span>
                    <Stars count={5} />
                    <h3 className="syne-title text-3xl md:text-5xl text-primary mb-7 leading-[0.95]">
                      <span className="text-gradient">{c.tagline}</span>
                    </h3>
                    <p className="font-inter text-on-surface-variant leading-relaxed text-lg mb-9 max-w-2xl">
                      <span className="text-accent text-3xl leading-none mr-1 align-[-0.3em] font-syne">“</span>
                      {c.quote}
                    </p>
                    <div className="pt-6 border-t border-primary/10 max-w-2xl">
                      <div className="font-outfit text-lg font-black text-primary uppercase tracking-wide">{c.name}</div>
                      <div className="font-inter text-sm text-secondary">{c.role}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Divider into the wall of reviews */}
        <div className="text-center mb-16 mt-4">
          <span className="font-outfit text-[11px] font-black tracking-[0.35em] text-secondary uppercase">
            …and many more who trust us
          </span>
        </div>

        {/* Slideable wall of reviews */}
        <div className="relative">
          {/* Track — native swipe/scroll-snap; drag on touch, arrows on desktop */}
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-margin px-margin scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="glass-card p-8 h-full flex flex-col">
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
