import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ownerImg from '../../assets/owner.jpeg';
import { asset } from '../../lib/asset';

gsap.registerPlugin(ScrollTrigger);

const MEMBERS = [
  {
    group: 'Strategic Advisor',
    imgSrc: asset('/images/portfolio%20projects/Our%20team/Venkat.webp'),
    name: 'Venkat',
    role: 'Strategic Advisor',
    company: 'cations.digital',
  },
  {
    group: 'Creative Team',
    imgSrc: asset('/images/portfolio%20projects/Our%20team/Deepika.webp'),
    name: 'Deepika',
    role: 'Finance / CRM',
  },
  {
    group: 'Creative Team',
    imgSrc: asset('/images/portfolio%20projects/Our%20team/sivabalan.webp'),
    name: 'Sivabalan',
    role: 'Creative Strategy Director',
  },
  {
    group: 'Creative Team',
    imgSrc: ownerImg,
    name: 'Venkata Krishnan',
    role: 'Creative Head',
    company: 'CreativzEdge',
  },
];

const PARTNERS = [
  {
    name: 'Tryphena Corera',
    tag: 'Design Partner',
    desc: 'Design partner uniting sharp visual identity with growth-led digital marketing — shaping brand visuals and campaigns that don’t just look striking, but move the numbers.',
    logo: asset('/images/portfolio%20projects/Our%20team/TC%20BG.webp'),
  },
  {
    name: 'VJM Technologies',
    tag: 'Technology Partner',
    desc: 'Technology partner providing reliable website support and innovative digital solutions, backed by 15+ years of industry experience.',
  },
  {
    name: 'Cations Digital',
    tag: 'Digital Marketing Agency — Mumbai',
    desc: 'Cations Digital Pvt. Ltd. is an end-to-end digital marketing agency based in Mumbai, India, and one of the fastest-growing companies in this segment — with deep digital domain expertise covering SEO, PPC, SMO, and web design & development, and 1000+ clients supported across business verticals and geographies.',
  },
  {
    name: 'TheVincis',
    tag: 'Engineering Partner',
    desc: 'Built on one conviction — the tier-2 and tier-3 businesses that keep India running deserve the same engineering the metro giants pay millions for. Certified by Microsoft and Infosys, TheVincis builds exactly that: systems that win customers, not showpieces.',
  },
];

// Full-width dark band, split layout: a portrait pinned on the left swaps as
// the member list scrolls past the viewport middle on the right. Everything
// is scroll-driven — there are intentionally no hover effects.
const TeamSection = () => {
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    // Whichever row sits around the middle of the screen is "active"
    const triggers = rowRefs.current.map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onToggle: (self) => self.isActive && setActive(i),
      })
    );

    const mm = gsap.matchMedia(section);

    // Content is visible by default (also in prerendered HTML and under
    // prefers-reduced-motion); it is only hidden here, moments before the
    // per-element reveal takes over.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.set('.team-reveal', { y: 60, autoAlpha: 0 });
      ScrollTrigger.batch('.team-reveal', {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.12, ease: 'power3.out' }),
      });
    });

    ScrollTrigger.refresh();
    return () => {
      triggers.forEach((t) => t.kill());
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-primary text-surface py-24 md:py-32">
      {/* Glow is clipped by its own wrapper: overflow-hidden on the section
          itself would break position:sticky on the portrait panel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-[-15%] w-[520px] h-[520px] rounded-full bg-accent/10 blur-[130px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-margin relative">
        <div className="team-reveal mb-14 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-accent/60"></div>
              <span className="font-outfit text-[12px] font-black tracking-[0.4em] text-surface/60 uppercase">The Collective</span>
            </div>
            <h2 className="syne-title text-[clamp(3rem,10vw,8rem)] leading-[0.9] text-surface">Our Team</h2>
          </div>
          <p className="max-w-xs font-inter text-sm text-surface/50 leading-relaxed md:text-right md:pb-2">
            The people behind every pixel — strategy, finance, design and growth under one roof.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[minmax(300px,380px)_1fr] lg:gap-16 xl:gap-24 lg:items-start">
          {/* Pinned portrait — swaps with the active row; desktop only */}
          <div className="team-reveal hidden lg:block sticky top-28">
            <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden border border-surface/10 bg-surface/5">
              {MEMBERS.map((member, i) => (
                <img
                  key={member.name}
                  src={member.imgSrc}
                  alt={member.name}
                  decoding="async"
                  className={`absolute inset-0 w-full h-full object-cover object-top grayscale transition-opacity duration-500 ${
                    i === active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-6 pt-14">
                <p className="syne-title text-2xl text-surface">{MEMBERS[active].name}</p>
                <p className="font-outfit text-[10px] tracking-[0.15em] uppercase font-black text-accent mt-1.5">
                  {MEMBERS[active].role}
                </p>
              </div>
            </div>
          </div>

          {/* Member list — the row nearest the viewport middle lights up */}
          <div>
            {MEMBERS.map((member, i) => {
              const isActive = i === active;
              const showLabel = member.group !== MEMBERS[i - 1]?.group;
              return (
                <div key={member.name}>
                  {showLabel && (
                    <div className={`team-reveal flex items-center gap-4 mb-3 ${i > 0 ? 'mt-12' : ''}`}>
                      <span className="font-outfit text-[11px] font-black tracking-[0.4em] uppercase text-accent">{member.group}</span>
                      <div className="flex-1 h-[1px] bg-surface/10"></div>
                    </div>
                  )}
                  <div
                    ref={(el) => { rowRefs.current[i] = el; }}
                    className={`team-reveal border-t border-surface/10 ${i === MEMBERS.length - 1 ? 'border-b' : ''}`}
                  >
                    <div className="flex items-center gap-4 md:gap-6 py-6 md:py-10">
                      <span
                        className={`font-outfit text-[11px] font-black w-7 shrink-0 transition-colors duration-500 ${
                          isActive ? 'text-accent' : 'text-surface/30'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {/* Small screens have no pinned portrait, so the photo rides in the row */}
                      <img
                        src={member.imgSrc}
                        alt={member.name}
                        loading="lazy"
                        decoding="async"
                        className="lg:hidden w-14 h-[70px] object-cover object-top rounded-xl grayscale shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`syne-title text-[clamp(1.5rem,5vw,3.5rem)] leading-none transition-colors duration-500 ${
                            isActive ? 'text-surface' : 'text-surface/40'
                          }`}
                        >
                          {member.name}
                        </h3>
                        <p
                          className={`font-outfit text-[10px] md:text-[11px] tracking-[0.15em] uppercase font-black mt-2 transition-colors duration-500 ${
                            isActive ? 'text-surface/80' : 'text-surface/35'
                          }`}
                        >
                          {member.role}
                          {member.company && <span className="text-surface/40 normal-case font-inter font-normal"> — {member.company}</span>}
                        </p>
                      </div>
                      {/* Personal logo rides at the row's end in a light chip so it reads on the dark band */}
                      {member.logo && (
                        <img
                          src={member.logo}
                          alt={`${member.name} logo`}
                          loading="lazy"
                          decoding="async"
                          className={`w-12 h-12 md:w-16 md:h-16 rounded-xl bg-white object-contain shrink-0 transition-opacity duration-500 ${
                            isActive ? 'opacity-100' : 'opacity-50'
                          }`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strategic partners — text cards below the list; a partner with a
            personal logo gets it as a light chip so it reads on the dark band */}
        <div className="mt-20 md:mt-28">
          <div className="team-reveal flex items-center gap-4 mb-8">
            <span className="font-outfit text-[11px] font-black tracking-[0.4em] uppercase text-accent">Strategic Partners</span>
            <div className="flex-1 h-[1px] bg-surface/10"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {PARTNERS.map((partner) => (
              <div key={partner.name} className="team-reveal min-w-0 rounded-[24px] border border-surface/10 bg-surface/[0.03] p-8 md:p-10 [container-type:inline-size]">
                {partner.logo && (
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    loading="lazy"
                    decoding="async"
                    className="w-14 h-14 rounded-xl bg-white object-contain mb-5"
                  />
                )}
                {/* Syne is ~13.4x font-size for "Technologies"; 7.2cqw guarantees the longest
                    word always fits its card whole at any width — words are never split */}
                <h3 className="syne-title text-[clamp(1.05rem,7.2cqw,1.875rem)] text-surface">{partner.name}</h3>
                <p className="font-outfit text-[10px] tracking-[0.15em] uppercase font-black text-accent mt-2">{partner.tag}</p>
                <p className="font-inter text-sm text-surface/60 leading-relaxed mt-4">{partner.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
