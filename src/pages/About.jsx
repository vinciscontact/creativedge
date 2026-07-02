import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ownerImg from '../assets/owner.jpeg';
import Seo from '../components/Seo';
import CtaHook from '../components/ui/CtaHook';
import { asset } from '../lib/asset';

gsap.registerPlugin(ScrollTrigger);

// Animated number that counts up to `target` once it scrolls into view.
const CountUpStat = ({ target, label }) => {
  const numRef = useRef(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const obj = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 92%',
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString() + '+';
          },
        }),
    });
    return () => st.kill();
  }, [target]);

  return (
    <div className="glass p-8 flex flex-col items-center justify-center text-center">
      <span ref={numRef} className="syne-title text-3xl md:text-4xl text-primary leading-none mb-2">0+</span>
      <span className="font-outfit text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant/70">{label}</span>
    </div>
  );
};

const About = () => {
  const teamSectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Reveal Cards — fire once on enter, never reverse back to hidden
      gsap.fromTo(
        '.team-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: teamSectionRef.current,
            start: 'top 85%',
            once: true,
          }
        }
      );

      // 2. Parallax Image
      gsap.utils.toArray('.team-card img').forEach((img) => {
        gsap.fromTo(img,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: img.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      });

      // Recalculate trigger positions after layout/images settle
      ScrollTrigger.refresh();
    }, teamSectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, target) => {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    gsap.to(target, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4
    });
  };

  const handleMouseLeave = (e, target) => {
    gsap.to(target, {
      rotateX: 0,
      rotateY: 0,
      ease: 'power2.out',
      duration: 0.7
    });
  };

  const coreValues = [
    { title: 'Creativity', icon: 'lightbulb', desc: 'Bold ideas that break the template — every concept crafted to feel unmistakably yours.' },
    { title: 'Client-Centric', icon: 'handshake', desc: 'Your goals lead. We listen first, then design around the people you serve.' },
    { title: 'Quality & Excellence', icon: 'workspace_premium', desc: 'No detail too small. We obsess over the pixels so your brand never has to.' },
    { title: 'Reliability', icon: 'verified_user', desc: 'Deadlines met, promises kept — work you can count on, every single time.' },
    { title: 'Innovation', icon: 'rocket_launch', desc: 'Always one step ahead, blending fresh thinking with proven craft.' }
  ];

  // The currently expanded value row (opens on hover for desktop, tap for mobile).
  const [activeValue, setActiveValue] = useState(0);

  return (
    <div className="relative pt-[220px] pb-20 overflow-hidden min-h-screen bg-background">
      <Seo
        title="About CreativzEdge — 15+ Years of Brand Design Experience"
        description="Meet the CreativzEdge team: a Chennai & Mumbai design studio led by an Arena Multimedia–certified specialist. 1000+ projects delivered, 100+ happy clients, 15+ years of expertise."
        path="/about"
        breadcrumb="About"
      />
      <div className="ambient-glow top-[-10%] right-[-10%] bg-primary/20"></div>
      
      <section className="max-w-7xl mx-auto px-margin relative z-10">
        {/* Hero — single statement, merged studio story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-[2px] bg-brand-maroon/70"></div>
            <span className="font-outfit text-[12px] font-black tracking-[0.4em] text-primary uppercase">The Creative Edge</span>
            <div className="w-8 h-[2px] bg-brand-green/70"></div>
          </div>
          <h1 className="syne-title text-[clamp(1.75rem,7vw,5.5rem)] text-primary mb-10 leading-[1] break-words [overflow-wrap:anywhere]">
            Design That <span className="text-brand-maroon">Sells.</span> <br />
            Engineering That <span className="text-brand-green">Scales.</span>
          </h1>
          <div className="max-w-3xl mx-auto space-y-5 font-inter text-body-lg text-on-surface-variant leading-relaxed">
            <p>
              We don't just make things look good — we make them perform. CreativzEdge sits at the intersection of elite aesthetics and aggressive marketing strategy, architecting digital atmospheres that turn visitors into advocates.
            </p>
            <p>
              Led by an Arena Multimedia certified specialist, we bring over <span className="text-brand-green font-bold">15+ years</span> of experience turning small ideas into dynamic brands engineered to <span className="text-accent italic">stand out and grow.</span>
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {['Design Strategy', 'Motion Systems', 'Brand Engineering', 'Visual Direction'].map((skill) => (
              <span key={skill} className="px-5 py-2.5 glass rounded-full text-[10px] font-black uppercase tracking-widest text-secondary border border-primary/10 hover:border-accent hover:text-primary transition-all cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Animated Stat Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-40 grid grid-cols-2 lg:grid-cols-4 gap-px bg-primary/10 rounded-[28px] overflow-hidden border border-primary/10"
        >
          <CountUpStat target={1000} label="Projects Delivered" />
          <CountUpStat target={100} label="Happy Clients" />
          <CountUpStat target={15} label="Years of Experience" />
          <div className="glass p-8 flex flex-col items-center justify-center text-center">
            <span className="syne-title text-2xl md:text-3xl text-primary leading-none mb-2">IN · UK · USA</span>
            <span className="font-outfit text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant/70">Global Reach</span>
          </div>
        </motion.div>

        {/* Vision & Mission — editorial, ghost numbers */}
        <div className="mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="font-outfit text-[12px] font-black tracking-[0.4em] text-brand-maroon uppercase">01 —</span>
            <span className="font-outfit text-[12px] font-black tracking-[0.4em] text-secondary uppercase">Our Purpose</span>
            <div className="flex-grow h-[1px] bg-primary/10"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                label: 'Vision',
                accent: 'text-brand-green',
                bar: 'bg-brand-green',
                text: 'To become a leading creative design studio known for crafting impactful visual identities that inspire, engage, and elevate brands globally.'
              },
              {
                label: 'Mission',
                accent: 'text-brand-maroon',
                bar: 'bg-brand-maroon',
                text: 'To deliver high-quality, innovative designs that transform ideas into impactful visuals and help brands communicate effectively.'
              }
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="glass-card relative overflow-hidden p-10 md:p-14 group"
              >
                <div className={`absolute top-0 left-0 h-full w-1 ${item.bar}`}></div>
                <h3 className={`syne-title text-3xl uppercase tracking-wide mb-6 ${item.accent}`}>{item.label}</h3>
                <p className="font-inter text-on-surface-variant text-lg leading-relaxed max-w-md relative z-10">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Values — numbered editorial list */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10"
          >
            <span className="font-outfit text-[12px] font-black tracking-[0.4em] text-brand-green uppercase">02 —</span>
            <span className="font-outfit text-[12px] font-black tracking-[0.4em] text-secondary uppercase">Core Values</span>
            <div className="flex-grow h-[1px] bg-primary/10"></div>
          </motion.div>

          <div className="border-t border-primary/10">
            {coreValues.map((value, i) => {
              const isActive = activeValue === i;
              return (
                <motion.button
                  type="button"
                  key={value.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setActiveValue(i)}
                  onFocus={() => setActiveValue(i)}
                  onClick={() => setActiveValue(isActive ? -1 : i)}
                  aria-expanded={isActive}
                  className="relative block w-full text-left border-b border-primary/10 overflow-hidden outline-none"
                >
                  {/* Theme ink-sweep: a gold wash paints across the active row */}
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 origin-left bg-gradient-to-r from-accent/15 via-accent/5 to-transparent pointer-events-none"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {/* Drawn accent underline on the active row */}
                  <motion.span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-[2px] bg-accent origin-left"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ width: '100%' }}
                  />

                  <div className={`relative flex items-center gap-5 md:gap-10 py-7 transition-[padding] duration-500 ${isActive ? 'md:pl-4' : ''}`}>
                    <motion.span
                      className="font-syne text-xl font-extrabold w-10 shrink-0"
                      animate={{ color: isActive ? 'var(--color-accent, #c2a06b)' : 'rgba(0,0,0,0.18)' }}
                    >
                      0{i + 1}
                    </motion.span>

                    <motion.div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border"
                      animate={{
                        backgroundColor: isActive ? 'var(--color-accent, #c2a06b)' : 'rgba(0,0,0,0)',
                        borderColor: isActive ? 'var(--color-accent, #c2a06b)' : 'rgba(0,0,0,0.1)',
                        rotate: isActive ? [0, -12, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className={`material-symbols-outlined text-[22px] transition-colors duration-300 ${isActive ? 'text-surface' : 'text-accent'}`}>
                        {value.icon}
                      </span>
                    </motion.div>

                    <div className="min-w-0">
                      <h4 className={`font-syne text-xl md:text-3xl uppercase tracking-wide transition-colors duration-300 ${isActive ? 'text-accent' : 'text-primary'}`}>
                        {value.title}
                      </h4>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            key="desc"
                            initial={{ height: 0, opacity: 0, y: -4 }}
                            animate={{ height: 'auto', opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -4 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className="font-inter text-sm md:text-base text-on-surface-variant max-w-xl overflow-hidden"
                          >
                            <span className="block pt-2">{value.desc}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Chevron rotates to signal expand / collapse (not navigation) */}
                    <motion.span
                      className="material-symbols-outlined ml-auto shrink-0"
                      animate={{
                        color: isActive ? 'var(--color-accent, #c2a06b)' : 'rgba(0,0,0,0.18)',
                        rotate: isActive ? 180 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      expand_more
                    </motion.span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <section ref={teamSectionRef} className="py-24 mt-12 border-t border-primary/5">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-primary/40"></div>
              <span className="font-outfit text-[12px] font-black tracking-[0.4em] text-secondary uppercase block">The Collective</span>
              <div className="w-8 h-[1px] bg-primary/40"></div>
            </div>
            <h2 className="syne-title text-5xl text-primary">Meet The Team</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                imgSrc: ownerImg,
                name: "Venkat",
                role: "Founder / Creative Head",
                company: "CreativzEdge"
              },
              {
                imgSrc: asset("/images/portfolio%20projects/Our%20team/Venkat.webp"),
                name: "Venkat",
                role: "Strategic Advisor",
                company: "cations.digital"
              },
              {
                imgSrc: asset("/images/portfolio%20projects/Our%20team/Deepika.webp"),
                name: "Deepika",
                role: "Finance / CRM"
              },
              {
                imgSrc: asset("/images/portfolio%20projects/Our%20team/sivabalan.webp"),
                name: "Sivabalan",
                role: "Creative Strategy Director"
              }
            ].map((member, i) => (
              /* Caption sits below the photo (not overlaid) so names and roles
                 align identically across all four cards no matter how each
                 photo is framed. Grayscale-by-default unifies the mixed
                 color/B&W portraits; color returns on hover. */
              <div key={i} className="team-card group opacity-0 cursor-default">
                <div
                  onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                  onMouseLeave={(e) => handleMouseLeave(e, e.currentTarget)}
                  className="relative overflow-hidden rounded-[24px] aspect-[3/4] border border-primary/10 bg-surface shadow-xl"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <img
                    src={member.imgSrc}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-[110%] -top-[5%] absolute left-0 object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700 pointer-events-none"
                  />
                  {/* Soft accent wash on hover ties the cards to the theme */}
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                </div>

                <div className="pt-5 px-1 text-center">
                  <h3 className="text-xl font-syne text-primary mb-1 group-hover:text-accent transition-colors duration-300">{member.name}</h3>
                  <p className="text-secondary font-outfit text-[11px] tracking-[0.15em] uppercase font-black mb-1">{member.role}</p>
                  {/* Reserve the line even when empty so all captions stay level */}
                  <p className="text-on-surface-variant/60 text-xs font-inter min-h-[1.25rem]">{member.company || ' '}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* Engagement hook */}
      <CtaHook
        eyebrow="The Next Chapter"
        title={
          <>
            Great brands aren't found. They're <span className="text-gradient">built.</span>
          </>
        }
        subtitle="Let's build yours — with the same passion, precision, and dedication our clients rave about."
        primary={{ label: 'Work With Us', to: '/contact' }}
        secondary={{ label: 'See the Work', to: '/portfolio' }}
      />
    </div>
  );
};

export default About;
