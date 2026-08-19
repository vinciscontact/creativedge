import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import DesignerPen from './components/ui/DesignerPen';
import ContactFloat from './components/ui/ContactFloat';
import Home from './pages/Home';
import { ORGANIZATION_SCHEMA } from './config/site';

// Home stays in the main bundle (it's the LCP-critical entry page); every other
// route is its own chunk so first paint doesn't pay for GSAP-heavy pages.
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
        <Suspense fallback={null}>
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
        </Suspense>
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
          {/* min-h-screen, not just flex-grow: between one route unmounting and
              the next one painting, <main> has no content. flex-grow can't hold
              the gap open because the footer is taller than the viewport, so
              there's no free space left to grow into — main collapsed to 0 and
              the footer flew up to the top of the screen on every reload and
              navigation. The floor keeps it below the fold until the page lands. */}
          <main className="flex-grow min-h-screen">
            <AnimatedRoutes />
          </main>

          <Footer />
          <DesignerPen />
          <ContactFloat />
        </div>
      </MotionConfig>
      </Router>
    </HelmetProvider>
  );
}

export default App;
