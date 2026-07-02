import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import DesignerPen from './components/ui/DesignerPen';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import { ORGANIZATION_SCHEMA } from './config/site';

// Cross-page transition: quick exit, slightly slower entrance (feels snappy but
// smooth). The scroll reset happens between the two, so the outgoing page never
// visibly jumps to the top mid-fade.
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, y: -12, transition: { duration: 0.28, ease: 'easeIn' } }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          {/* Catch-all: real 404 page (noindex) instead of a blank soft-404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

// Router must know the deploy subpath (GitHub Pages) — '/' everywhere else.
const BASENAME = import.meta.env.BASE_URL.replace(/\/+$/, '') || '/';

function App() {
  return (
    <HelmetProvider>
      <Router basename={BASENAME}>
      {/* Site-wide entity graph (brand + both studios + website) — ships on
          every route; per-page tags come from each page's <Seo>. */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(ORGANIZATION_SCHEMA)}</script>
      </Helmet>
      {/* reducedMotion="user" makes every framer-motion animation site-wide
          respect the OS "reduce motion" setting automatically. */}
      <MotionConfig reducedMotion="user">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>

          <Footer />
          <DesignerPen />
        </div>
      </MotionConfig>
      </Router>
    </HelmetProvider>
  );
}

export default App;
