import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Testimonials from '../components/ui/Testimonials';
import CtaHook from '../components/ui/CtaHook';
import { asset } from '../lib/asset';

// The two sides of the studio, framed as outcomes. The full service detail
// lives on /services — this teaser stays deliberately distinct from it so no
// content repeats across pages.
const pillars = [
  {
    eyebrow: 'Design Studio',
    title: 'Make it unforgettable.',
    desc: 'From the logo on your card to the packaging on the shelf — every visual crafted to turn heads and win trust at first glance.',
    chips: ['Logo & Identity', 'Packaging', 'Social Creatives', 'Print & Ads', 'Menus', 'Stationery'],
    cta: 'Explore design services',
  },
  {
    eyebrow: 'Digital Growth',
    title: 'Make it findable.',
    desc: 'Get discovered everywhere your customers search — Google today, AI answers tomorrow. Visibility that compounds month after month.',
    chips: ['SEO', 'GEO', 'AEO', 'Social Media'],
    cta: 'See growth services',
  },
];

const Home = () => {
  return (
    <div className="relative">
      <Seo
        title="CreativzEdge | Graphic Design & Branding Studio in Chennai & Mumbai"
        description="CreativzEdge crafts logos, brand identities, packaging and social media creatives — plus SEO, GEO and AEO growth services. 15+ years of design expertise, studios in Chennai & Mumbai."
        path="/"
      />
      {/* Ambient Glows */}
      <div className="ambient-glow top-[-10%] left-[-10%] bg-primary"></div>
      <div className="ambient-glow bottom-[10%] right-[-10%] bg-secondary opacity-10"></div>
      <div className="ambient-glow top-[40%] right-[20%] bg-accent opacity-5"></div>

      {/* Hero Section */}
      {/* min-h-[100svh]: the hero owns the first screen — the next section starts
          below the fold. svh so mobile browser chrome doesn't cause overflow. */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden min-h-[100svh] pt-[140px] sm:pt-[180px] lg:pt-[220px] pb-8">

        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
            <img
              src={asset('/images/hero%20background.webp')}
              alt=""
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
            {/* Faded but visible: soft wash + top/bottom fade keeps the headline crisp */}
            <div className="absolute inset-0 bg-background/55"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/25 to-background"></div>
          </div>
  
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-margin relative z-10 text-center flex flex-col items-center [container-type:inline-size]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center"
            >
              <span className="font-outfit text-[10px] sm:text-[12px] font-black tracking-[0.3em] sm:tracking-[0.4em] text-secondary uppercase mb-6 block">
                15+ Years of Design Excellence
              </span>
              {/* Syne at tracking-tight is ~11.8x font-size for "Atmosphere"; 8cqw keeps the
                  word inside the container at every width — it was clipping on mid-size screens */}
              <h1 className="syne-title text-[clamp(1.5rem,8cqw,6rem)] leading-[0.9] text-primary mb-10 tracking-tight w-full whitespace-nowrap">
                Future <br />
                <span className="text-gradient">Atmosphere</span>
              </h1>
              <p className="font-inter text-base sm:text-body-lg text-primary font-medium max-w-xl mx-auto mb-12 leading-relaxed">
                We deliver bold, brand-focused graphic solutions that make your message stand out — crafted in our Chennai &amp; Mumbai studios and backed by over a decade of industry expertise.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full">
                <Link
                  to="/portfolio"
                  className="intense-glow-btn w-full sm:w-auto text-center"
                >
                  Explore Work
                </Link>


              <Link to="/contact" className="w-full sm:w-auto">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cyber-btn block w-full sm:w-auto text-center"
                >
                  Connect Now
                </motion.span>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-10 sm:gap-16 border-t border-primary/5 pt-6 w-full">
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

      {/* What We Do — the two sides of the studio */}
      <section className="relative z-10 pt-stack-sm pb-stack-lg">
        <div className="max-w-7xl mx-auto px-margin">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-primary"></div>
              <span className="font-outfit text-[12px] font-black tracking-[0.4em] text-primary uppercase">What We Do</span>
              <div className="w-8 h-[2px] bg-primary"></div>
            </div>
            <h2 className="syne-title text-[clamp(2rem,5vw,3.5rem)] text-primary leading-[1.05]">
              Stand out. <span className="text-secondary">Get found.</span>
            </h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                viewport={{ once: true }}
                className="group relative flex-1 overflow-hidden rounded-[26px] bg-primary text-surface p-8 sm:p-12 flex flex-col transition-transform duration-500 hover:-translate-y-2"
              >
                <span className="font-outfit text-[11px] font-black tracking-[0.3em] text-accent uppercase mb-6 block">
                  {pillar.eyebrow}
                </span>
                <h3 className="font-syne text-3xl sm:text-4xl text-surface mb-5 leading-tight group-hover:text-accent transition-colors">
                  {pillar.title}
                </h3>
                <p className="font-inter text-[15px] text-surface/70 leading-relaxed mb-8 max-w-md">{pillar.desc}</p>
                <div className="flex flex-wrap gap-2 mb-10">
                  {pillar.chips.map((chip) => (
                    <span
                      key={chip}
                      className="px-4 py-2 rounded-full border border-surface/15 text-[10px] font-outfit font-black uppercase tracking-widest text-surface/70"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <Link
                  to="/services"
                  className="mt-auto inline-flex items-center gap-2 font-outfit text-[12px] font-black uppercase tracking-[0.2em] text-accent hover:gap-4 transition-all"
                >
                  {pillar.cta}
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Engagement hook */}
      <CtaHook
        variant="band"
        eyebrow="Let's Create"
        title={
          <>
            Your brand deserves to be <span className="text-gradient">unforgettable.</span>
          </>
        }
        subtitle="From a single logo to a full identity system — let's build something the world remembers."
        primary={{ label: 'View Our Work', to: '/portfolio' }}
        secondary={{ label: 'Start Your Project', to: '/contact' }}
      />
    </div>
  );
};

export default Home;
