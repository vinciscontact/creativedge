import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * Reusable engagement hook / call-to-action banner.
 * Drop it near the bottom of any page to keep visitors moving toward contact.
 *
 * Props:
 *  - eyebrow: small uppercase kicker
 *  - title: node (can include <span className="text-gradient"> highlights)
 *  - subtitle: supporting line
 *  - primary / secondary: { label, to } (to = router path; use href via `external`)
 */
const CtaHook = ({ eyebrow, title, subtitle, primary, secondary }) => {
  return (
    <section className="relative z-10 px-4 sm:px-margin py-stack-lg">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="cta-hook relative overflow-hidden rounded-[2rem] bg-primary text-surface text-center px-6 sm:px-12 py-16 sm:py-24"
        >
          {/* Ambient accents */}
          <div className="ambient-glow top-[-30%] left-[10%] bg-accent opacity-20"></div>
          <div className="ambient-glow bottom-[-30%] right-[10%] bg-secondary opacity-10"></div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-surface/10 to-transparent"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {eyebrow && (
              <span className="font-outfit text-[11px] font-black tracking-[0.4em] text-accent uppercase mb-7 block">
                {eyebrow}
              </span>
            )}
            {/* Sized so the longest word ("unforgettable.") always fits on one
                line — no break-words/anywhere, which was snapping words in half. */}
            <h2 className="syne-title text-[clamp(1.4rem,3.8vw,2.9rem)] leading-[1.15] mb-7 max-w-4xl text-balance">
              {title}
            </h2>
            {subtitle && (
              <p className="font-inter text-base sm:text-lg text-surface/70 max-w-2xl mx-auto leading-relaxed mb-12">
                {subtitle}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full">
              {primary && (
                <Link
                  to={primary.to}
                  className="w-full sm:w-auto text-center bg-accent text-primary font-outfit font-black text-[12px] uppercase tracking-[0.2em] px-9 py-4 rounded-full transition-all hover:bg-surface hover:scale-[1.03]"
                >
                  {primary.label}
                </Link>
              )}
              {secondary && (
                <Link
                  to={secondary.to}
                  className="w-full sm:w-auto text-center border border-surface/30 text-surface font-outfit font-black text-[12px] uppercase tracking-[0.2em] px-9 py-4 rounded-full transition-all hover:border-accent hover:text-accent"
                >
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaHook;
