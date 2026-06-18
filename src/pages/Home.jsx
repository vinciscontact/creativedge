import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import WhatWeDo from '../components/ui/WhatWeDo';
import Testimonials from '../components/ui/Testimonials';
import CtaHook from '../components/ui/CtaHook';

const Home = () => {
  return (
    <div className="relative">
      {/* Ambient Glows */}
      <div className="ambient-glow top-[-10%] left-[-10%] bg-primary"></div>
      <div className="ambient-glow bottom-[10%] right-[-10%] bg-secondary opacity-10"></div>
      <div className="ambient-glow top-[40%] right-[20%] bg-accent opacity-5"></div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-[140px] sm:pt-[180px] lg:pt-[220px] pb-20">

        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <img
              src="/images/hero%20background.jpg"
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
            {/* Faded but visible: soft wash + top/bottom fade keeps the headline crisp */}
            <div className="absolute inset-0 bg-background/55"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/25 to-background"></div>
          </div>
  
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-margin relative z-10 text-center flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center"
            >
              <span className="font-outfit text-[10px] sm:text-[12px] font-black tracking-[0.3em] sm:tracking-[0.4em] text-secondary uppercase mb-6 block">
                15+ Years of Design Excellence
              </span>
              <h1 className="syne-title text-[clamp(1.75rem,9vw,6rem)] leading-[0.9] text-primary mb-10 tracking-tight w-full whitespace-nowrap">
                Future <br />
                <span className="text-gradient">Atmosphere</span>
              </h1>
              <p className="font-inter text-base sm:text-body-lg text-primary font-medium max-w-xl mx-auto mb-12 leading-relaxed">
                We deliver bold, brand-focused graphic solutions that make your message stand out. High-fidelity design backed by over a decade of industry expertise.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
                <Link
                  to="/portfolio"
                  className="intense-glow-btn w-full sm:w-auto text-center"
                >
                  Explore Work
                </Link>


              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cyber-btn w-full sm:w-auto"
              >
                Connect Now
              </motion.button>
            </div>
            <div className="mt-16 sm:mt-20 flex flex-wrap justify-center gap-10 sm:gap-16 border-t border-primary/5 pt-12 w-full">
              <div className="text-center">
                <div className="font-outfit text-3xl font-black text-primary">5+</div>
                <div className="font-outfit text-[10px] font-black uppercase tracking-widest text-primary">Studio Years</div>
              </div>
              <div className="text-center">
                <div className="font-outfit text-3xl font-black text-primary">15+</div>
                <div className="font-outfit text-[10px] font-black uppercase tracking-widest text-secondary">Expertise Years</div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Decorative Lines */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        </div>
      </section>

      {/* What We Do — digital growth teaser */}
      <section className="relative z-10 py-stack-lg">
        <div className="max-w-7xl mx-auto px-margin">
          <WhatWeDo variant="compact" />
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Engagement hook */}
      <CtaHook
        eyebrow="Let's Create"
        title={
          <>
            Your brand deserves to be <span className="text-gradient">unforgettable.</span>
          </>
        }
        subtitle="From a single logo to a full identity system — let's build something the world remembers."
        primary={{ label: 'Start Your Project', to: '/contact' }}
        secondary={{ label: 'View Our Work', to: '/portfolio' }}
      />
    </div>
  );
};

export default Home;
