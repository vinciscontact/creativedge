import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WhatWeDo from '../components/ui/WhatWeDo';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const stackRef = useRef(null);

  // Card-deck scroll effect: each service card sticks below the header and the
  // next one slides over it; the card beneath gently scales back and dims.
  // Depth and momentum without ever hijacking the scroll. Reduced motion gets
  // plain stacking (still fully readable).
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const cards = gsap.utils.toArray('.service-stack');
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          // Darken (never fade) the covered card — opacity let the light page
          // show through the deck and read as transparency. Starts only when
          // the next card begins physically covering this one (not when it
          // merely enters the viewport), so the active card stays fully lit
          // while it's being read.
          gsap.to(card.querySelector('.stack-inner'), {
            scale: 0.95,
            filter: 'brightness(0.72)',
            transformOrigin: 'center top',
            ease: 'none',
            scrollTrigger: {
              trigger: next,
              start: () => `top ${140 + card.offsetHeight * 0.85}px`,
              end: 'top 140px',
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
      },
      stackRef
    );
    return () => mm.revert();
  }, []);


  const services = [
    {
      id: '01',
      category: 'ADVERTISING',
      title: 'Ads & Campaigns',
      desc: 'Bold, scroll-stopping ad creatives built to convert attention into action. Digital banners, print ads, billboard layouts — every format, every platform.',
      bullets: ['Google & Meta display ads', 'Billboard & OOH layouts', 'Campaign visual systems', 'Print ad formats'],
      footer: 'PRINT · DIGITAL · OOH',
      color: '#ff4d4d'
    },
    {
      id: '02',
      category: 'PRINT COLLATERAL',
      title: 'Brochures & Catalogues',
      desc: 'Professionally laid-out brochures that tell your brand story with clarity and visual impact. Bi-fold, tri-fold, multi-page — structured to inform and impress.',
      bullets: ['Bi-fold & tri-fold brochures', 'Product catalogues', 'Company profiles', 'Print-ready PDF output'],
      footer: 'OFFSET · DIGITAL · PRINT',
      color: '#00f5d4'
    },
    {
      id: '03',
      category: 'BRAND IDENTITY',
      title: 'Logo & Brand Identity',
      desc: 'Your logo is the face of your brand. We craft timeless, versatile identities that work across every medium — from business cards to billboards.',
      bullets: ['Primary & secondary logos', 'Brand colour palette', 'Typography system', 'Brand guidelines PDF'],
      footer: 'AI · SVG · PNG · PDF',
      color: '#ff4d4d'
    },
    {
      id: '04',
      category: 'HOSPITALITY',
      title: 'Menu Cards & Restaurant',
      desc: 'Menus that make food look irresistible before the first bite. Elegant layouts, appetite-driving typography, and designs built for easy seasonal updates.',
      bullets: ['Dine-in & takeaway menus', 'QR menu design', 'Table cards & tent cards', 'Seasonal update layouts'],
      footer: 'PRINT · WEB · QR',
      color: '#00f5d4'
    },
    {
      id: '05',
      category: 'PRODUCT DESIGN',
      title: 'Packaging Design',
      desc: 'Packaging is your silent salesperson. We design shelf-ready, brand-aligned packaging that captures attention and communicates product value at a glance.',
      bullets: ['Box & carton dielines', 'Label & sticker design', 'Pouch & sachet layouts', '3D mockup visualisation'],
      footer: 'DIELINE · 3D MOCKUP',
      color: '#ff4d4d'
    },
    {
      id: '06',
      category: 'SOCIAL MEDIA',
      title: 'Social Media Creatives',
      desc: 'Content that stops the scroll. We create platform-native, on-brand social creatives — posts, stories, reels covers, and highlight icons — sized right, looking sharp.',
      bullets: ['Instagram & Facebook posts', 'Story & reel cover frames', 'LinkedIn & Twitter banners', 'Monthly content packs'],
      footer: 'ALL PLATFORMS · ALL SIZES',
      color: '#00f5d4'
    },
    {
      id: '07',
      category: 'PRINT MEDIA',
      title: 'Posters & Banners',
      desc: 'High-impact posters and banners designed to command attention in any space. Event promotions, product launches, in-store displays — we make you impossible to ignore.',
      bullets: ['Event & promo posters', 'Pull-up & roll-up banners', 'Outdoor hoardings', 'Digital screen formats'],
      footer: 'A3 · A1 · CUSTOM SIZE',
      color: '#ff4d4d'
    },
    {
      id: '08',
      category: 'STATIONERY',
      title: 'Business Cards & Stationery',
      desc: 'Your first physical handshake with a client. We design premium business cards and stationery that leave a lasting impression and reinforce your brand at every touchpoint.',
      bullets: ['Standard & premium cards', 'Letterheads & envelopes', 'Notepads & folders', 'Stamp & invoice designs'],
      footer: 'STANDARD · DIE-CUT · SPOT UV',
      color: '#00f5d4'
    }
  ];

  return (
    // overflow-clip (not hidden) keeps the ambient glows contained without
    // creating a scroll container, so the sticky card deck below can pin.
    <div className="relative pt-[220px] pb-20 overflow-clip min-h-screen bg-background">
      <div className="ambient-glow top-[-10%] left-[-10%] bg-primary/20"></div>
      <div className="ambient-glow bottom-[-10%] right-[-10%] bg-secondary/10"></div>

      <section className="max-w-7xl mx-auto px-margin relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-primary"></div>
              <span className="font-outfit text-[12px] font-black tracking-[0.4em] text-primary uppercase">Our Services</span>
              <div className="w-8 h-[2px] bg-primary"></div>
            </div>
            <h1 className="syne-title text-[clamp(2rem,5.5vw,4rem)] text-primary mb-6 leading-[1.1] text-balance">
              Every Visual Your Brand <br className="hidden sm:block" />
              Will Ever <span className="text-secondary">Need.</span>
            </h1>
            <p className="font-inter text-body-lg text-on-surface-variant leading-relaxed max-w-2xl">
              From a single business card to a full brand identity system — we craft every touchpoint with precision, purpose, and creative edge.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="glass px-6 py-3 rounded-full border border-secondary/20 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
              <span className="font-outfit text-[11px] font-black uppercase tracking-widest text-secondary">Currently taking new projects</span>
            </div>
            <p className="font-inter text-[13px] text-on-surface-variant/60">Graphic design + 8 specialist services</p>
          </motion.div>
        </div>

        {/* Services deck — each card sticks and the next slides over it */}
        <div ref={stackRef} className="relative mb-32">
          <div className="flex flex-col gap-6 md:gap-8">
            {services.map((service, i) => (
              <div
                key={service.id}
                className="service-stack sticky"
                style={{ top: `calc(110px + ${i * 12}px)` }}
              >
                <div
                  className="stack-inner velvet-card relative overflow-hidden rounded-[28px] text-surface p-7 sm:p-10 md:p-14 border border-white/10 will-change-transform"
                  style={{ boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 80px rgba(0,0,0,0.35), 0 0 40px ${service.color}14` }}
                >
                  {/* Ghost index */}
                  <span className="absolute top-6 right-8 font-syne text-[4rem] md:text-[6rem] font-black leading-none text-white/[0.05] select-none pointer-events-none">
                    {service.id}
                  </span>
                  {/* Accent edge */}
                  <span className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: service.color }}></span>

                  <span
                    className="inline-block px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] border mb-7"
                    style={{ color: service.color, borderColor: `${service.color}44`, backgroundColor: `${service.color}11` }}
                  >
                    {service.category}
                  </span>

                  <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-14">
                    <div className="md:w-1/2">
                      <h3 className="font-syne text-2xl sm:text-3xl md:text-4xl text-surface mb-5 leading-tight">{service.title}</h3>
                      <p className="font-inter text-[14px] sm:text-[15px] text-surface/70 leading-relaxed max-w-lg">{service.desc}</p>
                    </div>
                    <ul className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 content-start">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-[13px] text-surface/80 font-inter leading-relaxed">
                          <span className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: service.color }}></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
                    <span className="text-[9px] font-black uppercase tracking-widest text-surface/50">{service.footer}</span>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 font-outfit text-[11px] font-black uppercase tracking-[0.2em] hover:gap-3 transition-all"
                      style={{ color: service.color }}
                    >
                      Start This Project
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What We Do — Digital Growth */}
        <WhatWeDo />

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 glow-outline-container"
        >
          <div className="glow-outline-inner p-8 sm:p-12 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl text-surface mb-4 font-syne">
                We also do <span className="text-accent">custom graphic design</span> for any brief.
              </h2>
              <p className="text-surface/60 font-inter text-[14px]">
                Presentations · Infographics · Vehicle wraps · Event backdrops · Signage · Brand refreshes
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5 w-full lg:w-auto justify-center shrink-0">
              <Link to="/portfolio" className="w-full sm:w-auto text-center whitespace-nowrap px-8 py-4 border border-surface/30 text-surface font-black text-[11px] uppercase tracking-widest hover:bg-surface hover:text-primary transition-all">
                View Portfolio
              </Link>

              <Link to="/contact" className="glow-button-wrapper w-full sm:w-auto">
                <span></span>
                <span></span>
                <div className="glow-button-inner justify-center whitespace-nowrap">
                  Get A Free Quote
                  <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
