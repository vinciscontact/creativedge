import { useState, useEffect, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

// --- Card sizing ---
const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

// --- Main Hero Component ---
const TOTAL_IMAGES = 20;
// Virtual scroll range. The morph (scatter→circle→arc) finishes by ~600; we keep
// only a short shuffle beyond that, then release scroll to the page so visitors
// reach the actual gallery quickly instead of being trapped in the hero.
const MAX_SCROLL = 1000;

// Real CreativeEdge work, served from /public/images/portfolio projects.
// encodeURI() handles the spaces in the folder / file names.
const BASE = "/images/portfolio projects";
const u = (folder, file) => encodeURI(`${BASE}/${folder}/${file}`);
const page = (folder, p, i) =>
    u(folder, `CREATIVZEDGE PORTFOLIO_Page_${p}_Image_${String(i).padStart(4, "0")}.jpg`);

const IMAGES = [
    { src: page("Branding", "10", 1), label: "Brand Identity" },
    { src: page("Branding", "10", 2), label: "Brand Identity" },
    { src: page("Branding", "10", 3), label: "Brand Identity" },
    { src: page("Branding", "10", 4), label: "Brand Identity" },
    { src: page("Branding", "10", 5), label: "Brand Identity" },
    { src: page("Branding", "10", 6), label: "Brand Identity" },
    { src: page("Branding", "10", 7), label: "Brand Identity" },
    { src: page("Branding", "10", 8), label: "Brand Identity" },
    { src: u("Logo", "automation.jpg"), label: "Logo Design" },
    { src: u("Logo", "hovik.jpg"), label: "Logo Design" },
    { src: u("Logo", "mulier .jpg"), label: "Logo Design" },
    { src: u("Logo", "rawyals .jpg"), label: "Logo Design" },
    { src: page("Packaging", "12", 1), label: "Packaging" },
    { src: page("Packaging", "12", 2), label: "Packaging" },
    { src: page("Packaging", "12", 3), label: "Packaging" },
    { src: page("SM-DESIGN", "09", 1), label: "Social Media" },
    { src: page("SM-DESIGN", "09", 2), label: "Social Media" },
    { src: page("Vehical Branding", "11", 1), label: "Vehicle Branding" },
    { src: page("Events", "13", 1), label: "Events" },
    { src: u("Maiyson therys", "CREATIVZEDGE PORTFOLIO_Page_07_Image_0001.jpg"), label: "Case Study" },
];

// Helper for linear interpolation
const lerp = (start, end, t) => start * (1 - t) + end * t;

// Hidden starting spread, computed once at module load (kept out of render so the
// component stays pure). These are only the invisible scatter origins (opacity 0).
const SCATTER_POSITIONS = IMAGES.map(() => ({
    x: (Math.random() - 0.5) * 1500,
    y: (Math.random() - 0.5) * 1000,
    rotation: (Math.random() - 0.5) * 180,
    scale: 0.6,
    opacity: 0,
}));

// Pure geometry: where card `i` should be for the current phase + live scroll
// values. Called inside a MotionValue transform (per frame) — it must stay pure
// and allocation-light. (m = morph 0..1, r = scroll rotation 0..360, p = parallax px)
function computeTarget(phase, size, scatter, i, m, r, p) {
    if (phase === "scatter") return scatter;

    if (phase === "line") {
        const lineSpacing = 70;
        const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
        return { x: i * lineSpacing - lineTotalWidth / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
    }

    // circle → bottom-arc morph
    const isMobile = size.width < 768;
    const minDimension = Math.min(size.width, size.height);

    // A. Circle position
    const circleRadius = Math.min(minDimension * 0.35, 350);
    const circleAngle = (i / TOTAL_IMAGES) * 360;
    const circleRad = (circleAngle * Math.PI) / 180;
    const circleX = Math.cos(circleRad) * circleRadius;
    const circleY = Math.sin(circleRad) * circleRadius;
    const circleRot = circleAngle + 90;

    // B. Bottom arc ("rainbow") position
    const baseRadius = Math.min(size.width, size.height * 1.5);
    const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
    const arcApexY = size.height * (isMobile ? 0.35 : 0.25);
    const arcCenterY = arcApexY + arcRadius;

    const spreadAngle = isMobile ? 100 : 130;
    const startAngle = -90 - spreadAngle / 2;
    const step = spreadAngle / (TOTAL_IMAGES - 1);

    const scrollProgress = Math.min(Math.max(r / 360, 0), 1);
    const maxRotation = spreadAngle * 0.8;
    const boundedRotation = -scrollProgress * maxRotation;

    const currentArcAngle = startAngle + i * step + boundedRotation;
    const arcRad = (currentArcAngle * Math.PI) / 180;
    const arcX = Math.cos(arcRad) * arcRadius + p;
    const arcY = Math.sin(arcRad) * arcRadius + arcCenterY;
    const arcRot = currentArcAngle + 90;
    const arcScale = isMobile ? 1.4 : 1.8;

    // C. Interpolate (morph)
    return {
        x: lerp(circleX, arcX, m),
        y: lerp(circleY, arcY, m),
        rotation: lerp(circleRot, arcRot, m),
        scale: lerp(1, arcScale, m),
        opacity: 1,
    };
}

// --- FlipCard Component ---
// Each card derives its transform from the shared scroll/morph MotionValues and
// smooths the result with a single per-card spring. Because everything flows
// through MotionValues, Framer Motion writes the DOM directly — the morph runs
// at 60fps with zero React re-renders.
function FlipCard({ src, label, index, scatter, phaseMv, cw, ch, morph, rotate, parallax }) {
    // One target object per frame. Every dependency (phase, size, scroll, parallax)
    // is a MotionValue, so the derived target recomputes on ANY change — not just
    // on a React re-render — which keeps the phase transitions reliable.
    const target = useTransform([phaseMv, cw, ch, morph, rotate, parallax], ([ph, w, h, m, r, p]) => {
        const phase = ph === 0 ? "scatter" : ph === 1 ? "line" : "circle";
        return computeTarget(phase, { width: w, height: h }, scatter, index, m, r, p);
    });

    const cfg = { stiffness: 130, damping: 22, mass: 0.5 };
    const x = useSpring(useTransform(target, (t) => t.x), cfg);
    const y = useSpring(useTransform(target, (t) => t.y), cfg);
    const rotateZ = useSpring(useTransform(target, (t) => t.rotation), cfg);
    const scale = useSpring(useTransform(target, (t) => t.scale), cfg);
    const opacity = useSpring(useTransform(target, (t) => t.opacity), { stiffness: 80, damping: 20 });

    return (
        <motion.div
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                x,
                y,
                rotate: rotateZ,
                scale,
                opacity,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className="cursor-pointer group"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-200"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img src={src} alt={label || `work-${index}`} loading="lazy" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-primary flex flex-col items-center justify-center p-2 border border-white/10"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="text-[7px] font-black text-accent uppercase tracking-[0.2em] mb-1">CreativeEdge</p>
                        <p className="text-[9px] font-medium text-white leading-tight">{label}</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function ScrollMorphHero() {
    const [introPhase, setIntroPhase] = useState("scatter");
    const [reducedMotion, setReducedMotion] = useState(false);
    const containerRef = useRef(null);

    // Container size as MotionValues — updating these does NOT re-render React,
    // it just feeds the card transforms directly (smooth resize, no churn).
    const cw = useMotionValue(0);
    const ch = useMotionValue(0);

    // --- Respect prefers-reduced-motion ---
    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return;
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReducedMotion(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    // --- Container Size ---
    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries) => {
            for (const entry of entries) {
                cw.set(entry.contentRect.width);
                ch.set(entry.contentRect.height);
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);
        cw.set(containerRef.current.offsetWidth);
        ch.set(containerRef.current.offsetHeight);

        return () => observer.disconnect();
    }, [cw, ch]);

    // --- Virtual Scroll Logic ---
    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        // Reduced motion: never hijack scroll — the page scrolls normally.
        if (reducedMotion) return;

        const handleWheel = (e) => {
            // Release scroll back to the page at the boundaries so the hero
            // flows naturally into the gallery below (no scroll trapping).
            const atStart = scrollRef.current <= 0;
            const atEnd = scrollRef.current >= MAX_SCROLL;
            const scrollingDown = e.deltaY > 0;
            if ((atEnd && scrollingDown) || (atStart && !scrollingDown)) {
                return; // let the page scroll normally
            }

            e.preventDefault();
            const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        // Touch support
        let touchStartY = 0;
        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e) => {
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            touchStartY = touchY;

            const atStart = scrollRef.current <= 0;
            const atEnd = scrollRef.current >= MAX_SCROLL;
            if ((atEnd && deltaY > 0) || (atStart && deltaY < 0)) {
                return; // release to page
            }
            e.preventDefault();

            const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll, reducedMotion]);

    // --- Live scroll-driven values (raw MotionValues; each card springs them) ---
    // Morph: 0 (circle) -> 1 (bottom arc) over the first 600 of virtual scroll.
    const morph = useTransform(virtualScroll, [0, 600], [0, 1]);
    // Shuffle rotation after the morph completes, mapped to the shortened range.
    const scrollRotate = useTransform(virtualScroll, [600, MAX_SCROLL], [0, 360]);

    // --- Mouse Parallax (one shared spring; cards read it directly) ---
    const mouseX = useMotionValue(0);
    const parallax = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container || reducedMotion) return;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, reducedMotion]);

    // --- Intro Sequence ---
    useEffect(() => {
        // Reduced motion: skip the timed scatter→line build-up entirely. The
        // effective phase is forced to "circle" at render time (see `phase`).
        if (reducedMotion) return;
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [reducedMotion]);

    // Reduced-motion users skip the animated entrance and see the assembled circle.
    const phase = reducedMotion ? "circle" : introPhase;

    // Mirror the phase into a MotionValue so card transforms react to phase changes
    // without depending on a React re-render to recompute. 0=scatter 1=line 2=circle.
    const phaseMv = useMotionValue(0);
    useEffect(() => {
        phaseMv.set(phase === "scatter" ? 0 : phase === "line" ? 1 : 2);
    }, [phase, phaseMv]);

    // --- Overlay text driven by a smoothed morph (one spring, two overlays) ---
    const smoothMorph = useSpring(morph, { stiffness: 90, damping: 22, mass: 0.5 });
    const introFade = useTransform(smoothMorph, [0, 0.5], [1, 0]); // intro text fades as you scroll in
    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]); // arc heading fades in
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-background overflow-hidden">
            <div className="flex h-full w-full flex-col items-center justify-center" style={{ perspective: "1000px" }}>

                {/* Intro Text (scroll-fades via the outer wrapper; enters via the inner) */}
                {/* Mobile: sits in the open space above the ring so it never overlaps the
                    cards. Desktop: centered inside the larger ring's hollow. */}
                <motion.div
                    style={{ opacity: introFade }}
                    className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none px-6 w-full max-w-sm md:max-w-none top-[13%] -translate-y-0 md:top-1/2 md:-translate-y-1/2"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={phase === "circle" ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="syne-title text-2xl font-bold tracking-tight text-primary sm:text-3xl md:text-5xl"
                    >
                        Every brand begins with a <span className="text-gradient">mark.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={phase === "circle" ? { opacity: 0.6 } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-5 font-outfit text-[11px] font-black tracking-[0.3em] text-secondary uppercase"
                    >
                        Scroll to Explore
                    </motion.p>
                </motion.div>

                {/* Arc Active Content (Fades in) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[12%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <h2 className="syne-title text-3xl md:text-5xl text-primary tracking-tight mb-4">
                        Selected <span className="text-gradient">Work.</span>
                    </h2>
                    <p className="font-inter text-sm md:text-base text-on-surface-variant max-w-lg leading-relaxed">
                        Real work for real brands — from the first logo to the final touchpoint.{" "}
                        <br className="hidden md:block" />
                        Keep scrolling to walk through the full story.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {IMAGES.slice(0, TOTAL_IMAGES).map((item, i) => (
                        <FlipCard
                            key={i}
                            src={item.src}
                            label={item.label}
                            index={i}
                            scatter={SCATTER_POSITIONS[i]}
                            phaseMv={phaseMv}
                            cw={cw}
                            ch={ch}
                            morph={morph}
                            rotate={scrollRotate}
                            parallax={parallax}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
