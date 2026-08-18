import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * Engagement hook / call-to-action — one component, three page-specific looks.
 *
 * Props:
 *  - variant: 'band' (Home) | 'editorial' (About) | 'circle' (Portfolio)
 *  - eyebrow: small uppercase kicker
 *  - title: node (can include <span className="text-gradient"> highlights)
 *  - subtitle: supporting line
 *  - primary / secondary: { label, to }
 *  - marqueeWords: decorative words for the 'band' variant strip
 */

const reveal = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

const PillLink = ({ to, label, filled }) => (
  <Link
    to={to}
    className={
      filled
        ? 'w-full sm:w-auto text-center bg-accent text-primary font-outfit font-black text-[12px] uppercase tracking-[0.2em] px-9 py-4 rounded-full transition-all hover:bg-surface hover:scale-[1.03]'
        : 'w-full sm:w-auto text-center border border-surface/30 text-surface font-outfit font-black text-[12px] uppercase tracking-[0.2em] px-9 py-4 rounded-full transition-all hover:border-accent hover:text-accent'
    }
  >
    {label}
  </Link>
);

/* Home — full-width dark band with a giant word strip gliding behind the content */
const BandCta = ({ eyebrow, title, subtitle, primary, secondary, marqueeWords }) => (
  // No bottom padding: the dark band is the last thing before the dark footer,
  // so spacing there would just expose the light page background as a stripe.
  <section className="relative z-10 pt-stack-lg">
    <motion.div {...reveal} className="cta-hook relative bg-primary text-surface overflow-hidden py-24 sm:py-32">
      <div className="ambient-glow top-[-30%] left-[10%] bg-accent opacity-20"></div>
      <div className="ambient-glow bottom-[-30%] right-[10%] bg-secondary opacity-10"></div>

      {/* Decorative marquee — oversized ghost words drifting behind the message */}
      <div aria-hidden="true" className="absolute top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden pointer-events-none select-none">
        <div className="cta-marquee-inner flex whitespace-nowrap will-change-transform">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center">
              {marqueeWords.map((word) => (
                <span key={word} className="flex items-center font-syne uppercase font-extrabold leading-none text-[clamp(5rem,14vw,11rem)] text-surface/[0.04]">
                  <span className="mx-10">{word}</span>
                  <span className="text-accent/15 text-[clamp(2rem,5vw,4rem)]">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 flex flex-col items-center text-center">
        {eyebrow && (
          <span className="font-outfit text-[11px] font-black tracking-[0.4em] text-accent uppercase mb-7 block">{eyebrow}</span>
        )}
        <h2 className="syne-title text-[clamp(1.4rem,3.8vw,2.9rem)] leading-[1.15] mb-7 max-w-4xl text-balance">{title}</h2>
        {subtitle && (
          <p className="font-inter text-base sm:text-lg text-surface/70 max-w-2xl mx-auto leading-relaxed mb-12">{subtitle}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full">
          {primary && <PillLink to={primary.to} label={primary.label} filled />}
          {secondary && <PillLink to={secondary.to} label={secondary.label} />}
        </div>
      </div>
    </motion.div>
  </section>
);

/* About — quiet editorial sign-off on the light page: big type left, actions right */
const EditorialCta = ({ eyebrow, title, subtitle, primary, secondary }) => (
  <section className="relative z-10 px-4 sm:px-margin py-stack-lg">
    <motion.div {...reveal} className="max-w-7xl mx-auto border-t border-primary/10 pt-16 md:pt-24">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
        <div className="lg:col-span-7">
          {eyebrow && (
            <span className="font-outfit text-[11px] font-black tracking-[0.4em] text-accent uppercase mb-7 block">{eyebrow}</span>
          )}
          <h2 className="syne-title text-[clamp(2rem,5.5vw,4.25rem)] leading-[1.05] text-primary text-balance">{title}</h2>
        </div>
        <div className="lg:col-span-5">
          {subtitle && (
            <p className="font-inter text-base sm:text-lg text-on-surface-variant leading-relaxed mb-10">{subtitle}</p>
          )}
          <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
            {primary && (
              <Link
                to={primary.to}
                className="group inline-flex items-center gap-2 font-outfit text-[13px] font-black uppercase tracking-[0.2em] text-primary border-b-2 border-accent pb-2 transition-colors hover:text-accent"
              >
                {primary.label}
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            )}
            {secondary && (
              <Link
                to={secondary.to}
                className="group inline-flex items-center gap-2 font-outfit text-[13px] font-black uppercase tracking-[0.2em] text-secondary border-b-2 border-primary/15 pb-2 transition-colors hover:text-primary hover:border-accent"
              >
                {secondary.label}
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

/* Portfolio — the giant circular button is the destination of the whole page */
const CircleCta = ({ eyebrow, title, subtitle, primary, secondary }) => (
  <section className="relative z-10 px-4 sm:px-margin py-stack-lg">
    <motion.div {...reveal} className="max-w-4xl mx-auto text-center flex flex-col items-center">
      {eyebrow && (
        <span className="font-outfit text-[11px] font-black tracking-[0.4em] text-accent uppercase mb-7 block">{eyebrow}</span>
      )}
      <h2 className="syne-title text-[clamp(1.6rem,4.5vw,3.25rem)] leading-[1.1] text-primary mb-6 text-balance">{title}</h2>
      {subtitle && (
        <p className="font-inter text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-14">{subtitle}</p>
      )}

      {primary && (
        <Link to={primary.to} aria-label={primary.label} className="group relative inline-flex mb-10">
          {/* Halo ring drifts out on hover */}
          <span className="absolute inset-0 rounded-full border border-accent/40 scale-110 transition-transform duration-500 group-hover:scale-125"></span>
          <span className="w-44 h-44 md:w-56 md:h-56 rounded-full bg-primary text-surface flex flex-col items-center justify-center gap-2 font-outfit font-black text-[12px] md:text-[13px] uppercase tracking-[0.2em] text-center px-6 transition-all duration-500 group-hover:bg-accent group-hover:text-primary group-hover:scale-[1.04]">
            {primary.label}
            <span className="material-symbols-outlined text-[26px] transition-transform duration-500 group-hover:-rotate-45">arrow_forward</span>
          </span>
        </Link>
      )}

      {secondary && (
        <Link
          to={secondary.to}
          className="group inline-flex items-center gap-2 font-outfit text-[12px] font-black uppercase tracking-[0.2em] text-secondary transition-colors hover:text-accent"
        >
          {secondary.label}
          <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
        </Link>
      )}
    </motion.div>
  </section>
);

const CtaHook = ({ variant = 'band', marqueeWords = ['Unforgettable', 'Bold', 'Memorable', 'Iconic'], ...props }) => {
  if (variant === 'editorial') return <EditorialCta {...props} />;
  if (variant === 'circle') return <CircleCta {...props} />;
  return <BandCta {...props} marqueeWords={marqueeWords} />;
};

export default CtaHook;
