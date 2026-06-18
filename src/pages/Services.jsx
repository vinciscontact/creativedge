import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import WhatWeDo from '../components/ui/WhatWeDo';


const Services = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(-10); // Initial tilt
  const xSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 100, damping: 30 });
  
  const rotateY = useTransform(xSpring, (val) => `${val}deg`);
  const rotateX = useTransform(ySpring, (val) => `${val}deg`);

  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const spin360 = () => {
    setIsAutoRotating(false);
    x.set(x.get() + 360);
    setTimeout(() => setIsAutoRotating(true), 1000);
  };

  useEffect(() => {
    let interval;
    if (isAutoRotating) {
      interval = setInterval(() => {
        x.set(x.get() - 0.5);
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isAutoRotating, x]);


  const stats = [

    { label: 'SERVICE CATEGORIES', value: '8+' },
    { label: 'BRANDS SERVED', value: '100+' },
    { label: 'YEARS EXPERIENCE', value: '15+' },
    { label: 'YEARS AS STUDIO', value: '5+' }
  ];

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
    <div className="relative pt-[220px] pb-20 overflow-hidden min-h-screen bg-background">
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

        {/* Stats Section */}
        <div className="flex flex-wrap justify-center gap-6 mb-24 w-full">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="stat-card-effect w-[calc(50%-12px)] md:flex-1 min-w-[150px] max-w-[250px]"
            >
              <div className="stat-card-inner">
                <div className="stat-card__liquid"></div>
                <div className="stat-card__shine"></div>
                <div className="stat-card__content">
                  <div className="text-5xl font-black text-primary mb-3 font-outfit tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] font-black text-secondary/60 uppercase tracking-[0.3em]">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>


        {/* Services 3D Carousel Section */}
        <div 
          className="relative py-20 mb-32 group/carousel cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsAutoRotating(false)}
          onMouseLeave={() => setIsAutoRotating(true)}
        >
          {/* 360 Control Button */}
          <div className="absolute top-0 right-10 z-20">
            <button 
              onClick={spin360}
              className="flex items-center gap-2 px-6 py-3 glass rounded-full border border-primary/10 text-[10px] font-black uppercase tracking-widest text-primary hover:border-accent transition-all"
            >
              <span className="material-symbols-outlined text-[16px] animate-spin-slow">autorenew</span>
              360 Scan
            </button>
          </div>

          {/* Ambient Background for Carousel */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(197,168,128,0.1)_0%,transparent_70%)]"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
          </div>

          <div className="rotating-wrapper relative z-10">
            <motion.div 
              className="rotating-inner" 
              style={{ 
                '--quantity': services.length,
                rotateY,
                rotateX,
                animation: 'none'
              }}
              drag
              onDrag={(e, info) => {
                x.set(x.get() + info.delta.x * 0.5);
                y.set(y.get() - info.delta.y * 0.5);
              }}
            >


            {services.map((service, i) => (
              <div 
                key={service.id} 
                className="rotating-card group" 
                style={{ '--index': i }}
              >
                <div 
                  className="cyber-service-card group/inner"
                  style={{ 
                    '--card-color-glow': `${service.color}22`,
                    '--card-color-1': service.color,
                    '--card-color-2': service.color === '#ff4d4d' ? '#9d50ff' : '#ff6b9d' // Complementary color for gradient
                  }}
                >
                  <div className="cyber-service-card-body p-8 flex flex-col h-full text-left">
                    {/* Card Background Number */}
                    <div className="absolute top-4 right-6 font-syne text-[60px] font-black text-primary/[0.03] group-hover:text-primary/[0.05] transition-colors pointer-events-none">
                      {service.id}
                    </div>

                    {/* Category Label */}
                    <div className="mb-6">
                      <span 
                        className="px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] border"
                        style={{ color: service.color, borderColor: `${service.color}44`, backgroundColor: `${service.color}11` }}
                      >
                        {service.category}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-xl text-white mb-3 font-syne group-hover:text-accent transition-colors">{service.title}</h3>
                    <p className="text-[12px] text-white/80 leading-relaxed mb-6 font-inter line-clamp-3">
                      {service.desc}
                    </p>

                    {/* Bullets */}
                    <ul className="space-y-2 mb-8">
                      {service.bullets.slice(0, 3).map((bullet, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-[11px] text-white/70 group-hover:text-white transition-colors">
                          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: service.color }}></div>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* Footer */}
                    <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/50">{service.footer}</span>
                      <div className="w-2 h-2 border transition-colors group-hover:bg-current" style={{ borderColor: `${service.color}66`, color: service.color }}></div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
            </motion.div>
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
