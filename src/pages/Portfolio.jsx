import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollMorphHero from '../components/ui/ScrollMorphHero';
import CtaHook from '../components/ui/CtaHook';

gsap.registerPlugin(ScrollTrigger);

// Real work lives in /public/images/portfolio projects. Files are served from the
// web root, so we just build the URL and encodeURI() the spaces in folder/file names.
const BASE = '/images/portfolio projects';
const src = (folder, file) => encodeURI(`${BASE}/${folder}/${file}`);

const pageImages = (folder, page, indices) =>
  indices.map((i) => src(folder, `CREATIVZEDGE PORTFOLIO_Page_${page}_Image_${String(i).padStart(4, '0')}.jpg`));

// The single hero case study that opens the story.
const featured = {
  eyebrow: 'Case Study',
  title: 'Maiyson Therys',
  desc: 'A full identity system built from the ground up — where strategy, typography and art direction converge into one unmistakable voice. This is where every CreativeEdge story begins.',
  img: src('Maiyson therys', 'CREATIVZEDGE PORTFOLIO_Page_07_Image_0001.jpg'),
};

// Each chapter is a beat in the brand-building story, in the order a brand is born.
const chapters = [
  {
    no: '01',
    label: 'Logo Design',
    headline: 'Every brand begins with a mark.',
    desc: 'The single symbol that carries the weight of an entire identity. We craft marks that are simple to remember and impossible to forget.',
    images: [
      ...pageImages('Logo', '08', [4, 5, 6, 8, 11, 12, 13, 14, 15, 16, 17, 18]),
      src('Logo', 'automation.jpg'),
      src('Logo', 'hovik.jpg'),
      src('Logo', 'mulier .jpg'),
      src('Logo', 'rawyals .jpg'),
    ],
  },
  {
    no: '02',
    label: 'Brand Identity',
    headline: 'From a mark to a movement.',
    desc: 'Color, type, texture and tone — woven into a cohesive system that stays true everywhere it appears.',
    images: pageImages('Branding', '10', [1, 2, 3, 4, 5, 6, 7, 8]),
  },
  {
    no: '03',
    label: 'Social Media Design',
    headline: 'Where the brand meets its audience.',
    desc: 'Scroll-stopping creative engineered for the feed — consistent, on-brand and built to convert attention into action.',
    images: pageImages('SM-DESIGN', '09', [1, 2, 3, 4, 5, 6, 9]),
  },
  {
    no: '04',
    label: 'Packaging',
    headline: 'Design you can hold.',
    desc: 'The moment a brand becomes tangible. Packaging that earns the shelf and rewards the unboxing.',
    images: pageImages('Packaging', '12', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  },
  {
    no: '05',
    label: 'Vehicle Branding',
    headline: 'Brands that move.',
    desc: 'Identity taken to the streets — turning everyday transport into bold, rolling billboards.',
    images: pageImages('Vehical Branding', '11', [1, 2, 3]),
  },
  {
    no: '06',
    label: 'Events',
    headline: 'Moments, engineered.',
    desc: 'From stage to signage, we design the spaces and details that turn an event into an experience.',
    images: [...pageImages('Events', '13', [1, 2, 3, 4, 5]), src('Events', 'CREATIVZEDGE PORTFOLIO_Page_16_Image_0001.jpg')],
  },
];

const clients = [
  src('Our Clients', 'CREATIVZEDGE PORTFOLIO_Page_16_Image_0001.jpg'),
  src('Our Clients', 'CREATIVZEDGE PORTFOLIO_Page_17_Image_0001.jpg'),
  src('Our Clients', 'CREATIVZEDGE PORTFOLIO_Page_18_Image_0001.jpg'),
];

const Portfolio = () => {
  const rootRef = useRef(null);
  const featuredImgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Featured image: a soft reveal in place (no crop, full artwork stays visible)
      if (featuredImgRef.current) {
        gsap.fromTo(
          featuredImgRef.current,
          { scale: 1.04, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: featuredImgRef.current.parentElement,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Chapter intros: slide the text + big index number in as each chapter arrives
      gsap.utils.toArray('.chapter-intro').forEach((intro) => {
        gsap.fromTo(
          intro.querySelectorAll('.chapter-reveal'),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: intro,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Gallery items reveal smoothly in batches as they scroll into view
      ScrollTrigger.batch('.gallery-item', {
        start: 'top 90%',
        onEnter: (batch) =>
          gsap.fromTo(
            batch,
            { y: 80, opacity: 0, scale: 0.96 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.9,
              stagger: 0.1,
              ease: 'power3.out',
              overwrite: true,
            }
          ),
        onLeaveBack: (batch) => gsap.set(batch, { y: 80, opacity: 0, scale: 0.96, overwrite: true }),
      });

      ScrollTrigger.refresh();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative pb-20 overflow-hidden min-h-screen bg-background">
      {/* Immersive scroll-morph hero — scatter → line → circle → arc, driven by scroll */}
      <section className="h-screen w-full">
        <ScrollMorphHero />
      </section>

      <div className="ambient-glow top-[40%] left-[-10%] bg-primary/20"></div>
      <div className="ambient-glow bottom-[-10%] right-[-10%] bg-secondary/10"></div>

      <section className="max-w-7xl mx-auto px-margin relative z-10 pt-32">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-28"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-[1px] bg-secondary/40"></div>
            <span className="font-outfit text-[12px] font-black tracking-[0.4em] text-secondary uppercase">The Work</span>
            <div className="w-8 h-[1px] bg-secondary/40"></div>
          </div>
          <h1 className="syne-title text-[clamp(2rem,7vw,5.5rem)] text-primary mb-10 leading-[1] break-words [overflow-wrap:anywhere]">
            A Brand, <span className="text-gradient">Built.</span>
          </h1>
          <p className="font-inter text-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
            Scroll through the journey — from the first mark to the final touchpoint. Every project below is real work,
            crafted for real brands by CreativeEdge.
          </p>
        </motion.div>

        {/* Featured case study */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-40">
          <div className="relative rounded-3xl overflow-hidden glass-card !p-0 bg-white/[0.02]">
            <img
              ref={featuredImgRef}
              src={featured.img}
              alt={featured.title}
              className="block w-full h-auto object-contain"
            />
          </div>
          <div className="lg:pl-6">
            <span className="font-outfit text-[11px] font-black tracking-[0.3em] text-accent uppercase block mb-5">
              {featured.eyebrow}
            </span>
            <h2 className="font-syne text-4xl md:text-5xl text-primary uppercase leading-[0.95] mb-8">
              {featured.title}
            </h2>
            <p className="font-inter text-on-surface-variant leading-relaxed text-lg">{featured.desc}</p>
            <div className="w-16 h-[2px] bg-accent mt-10"></div>
          </div>
        </div>

        {/* Story chapters */}
        {chapters.map((chapter, ci) => (
          <div key={chapter.no} className="mb-40">
            <div className={`chapter-intro flex flex-col md:flex-row md:items-end gap-6 mb-14 ${ci % 2 === 1 ? 'md:flex-row-reverse md:text-right' : ''}`}>
              <span className="chapter-reveal font-syne text-[5rem] md:text-[8rem] leading-none text-primary/5 font-extrabold select-none">
                {chapter.no}
              </span>
              <div className={ci % 2 === 1 ? 'md:ml-auto' : ''}>
                <span className="chapter-reveal font-outfit text-[11px] font-black tracking-[0.3em] text-accent uppercase block mb-4">
                  {chapter.label}
                </span>
                <h2 className="chapter-reveal font-syne text-3xl md:text-4xl text-primary uppercase leading-tight mb-4 max-w-xl">
                  {chapter.headline}
                </h2>
                <p className={`chapter-reveal font-inter text-on-surface-variant leading-relaxed max-w-xl ${ci % 2 === 1 ? 'md:ml-auto' : ''}`}>
                  {chapter.desc}
                </p>
              </div>
            </div>

            {/* Masonry gallery */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
              {chapter.images.map((img, i) => (
                <div
                  key={i}
                  className="gallery-item group relative mb-6 break-inside-avoid rounded-2xl overflow-hidden glass-card !p-0"
                >
                  <img
                    src={img}
                    alt={`${chapter.label} work ${i + 1}`}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="absolute bottom-4 left-5 font-outfit text-[10px] font-black tracking-widest text-white uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    {chapter.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Closing — trusted by */}
        <div className="chapter-intro text-center mb-16">
          <span className="chapter-reveal font-outfit text-[11px] font-black tracking-[0.3em] text-accent uppercase block mb-5">
            The Result
          </span>
          <h2 className="chapter-reveal font-syne text-3xl md:text-5xl text-primary uppercase leading-tight mb-6">
            Trusted by <span className="text-gradient">Great Brands.</span>
          </h2>
          <p className="chapter-reveal font-inter text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            The work speaks for itself — and so do the partners who trust us to tell their story.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((img, i) => (
            <div key={i} className="gallery-item rounded-2xl overflow-hidden glass-card !p-0">
              <img src={img} alt={`Client ${i + 1}`} loading="lazy" className="w-full h-auto object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Engagement hook */}
      <CtaHook
        eyebrow="You've Seen the Work"
        title={
          <>
            Like what you see? Your brand could be <span className="text-gradient">next.</span>
          </>
        }
        subtitle="Every project here started with a single conversation. Let's start yours."
        primary={{ label: 'Start a Project', to: '/contact' }}
        secondary={{ label: 'Our Services', to: '/services' }}
      />
    </div>
  );
};

export default Portfolio;
