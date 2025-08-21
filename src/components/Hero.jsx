"use client";

import React, { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Memoized background styles - calculated once
const BACKGROUND_STYLES = {
  radial:
    "radial-gradient(circle at center, rgba(30, 30, 50, 0.15) 0%, rgba(20, 20, 40, 0.1) 50%, transparent 100%)",
  grid: "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
};

// Pre-calculated animation variants for performance
const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  },
  letterEntry: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
};

// Static floating element configurations
const FLOATING_ELEMENTS = [
  {
    color: "cyan",
    sizeClasses: "w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32",
    duration: 20,
    delay: 0,
    position: { top: "15%", left: "10%" },
    animate: { x: [0, 50, 0, -25, 0], y: [0, -25, 50, 25, 0] }, // Reduced keyframes
  },
  {
    color: "purple",
    sizeClasses: "w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24",
    duration: 25,
    delay: 1,
    position: { top: "70%", right: "15%" },
    animate: { x: [0, -40, 30, 0], y: [0, 40, -20, 0] }, // Reduced keyframes
  },
  {
    color: "slate",
    sizeClasses: "w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20",
    duration: 30,
    delay: 2,
    position: { top: "40%", right: "20%" },
    animate: { x: [0, -30, 20, 0], y: [0, -35, 15, 0] }, // Reduced keyframes
  },
];

// Optimized FloatingElement with React.memo and GPU acceleration
const FloatingElement = React.memo(
  ({ color, duration, delay, position, sizeClasses, animate }) => {
    const elementStyle = useMemo(
      () => ({
        ...position,
        transform: "translateZ(0)", // GPU acceleration
        willChange: "transform",
      }),
      [position]
    );

    const transition = useMemo(
      () => ({
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }),
      [duration, delay]
    );

    return (
      <motion.div
        className={`absolute rounded-full border-opacity-30 bg-gradient-to-br shadow-sm ${sizeClasses}
        ${
          color === "cyan"
            ? "border-cyan-400/30 from-cyan-400/20 to-transparent shadow-cyan-400/10"
            : color === "purple"
            ? "border-purple-400/30 from-purple-400/20 to-transparent shadow-purple-400/10"
            : "border-slate-400/30 from-slate-400/20 to-transparent shadow-slate-400/10"
        }`}
        style={elementStyle}
        animate={animate}
        transition={transition}
      />
    );
  }
);

// Optimized AnimatedLetter with reduced effects and GPU acceleration
const AnimatedLetter = React.memo(({ letter, index, isSpace = false }) => {
  if (isSpace) return <span className="inline-block w-4"></span>;

  const letterTransition = useMemo(
    () => ({
      delay: 0.6 + index * 0.05,
      duration: 0.6,
      ease: "easeOut",
    }),
    [index]
  );

  const hoverTransition = useMemo(
    () => ({
      duration: 0.2,
      ease: "easeOut",
    }),
    []
  );

  const letterStyle = useMemo(
    () => ({
      transform: "translateZ(0)",
      willChange: "transform, opacity",
    }),
    []
  );

  return (
    <motion.span
      className="inline-block text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text cursor-default"
      style={letterStyle}
      variants={ANIMATION_VARIANTS.letterEntry}
      initial="initial"
      animate="animate"
      transition={letterTransition}
      whileHover={{
        scale: 1.1,
        y: -6,
        transition: hoverTransition,
      }}
    >
      {letter}
    </motion.span>
  );
});

// Optimized AnimatedName component
const AnimatedName = React.memo(({ name, startDelay = 0 }) => {
  const letters = useMemo(() => name.split(""), [name]);

  return (
    <>
      {letters.map((letter, index) => (
        <AnimatedLetter
          key={`${name}-${index}`}
          letter={letter}
          index={startDelay + index}
          isSpace={letter === " "}
        />
      ))}
    </>
  );
});

function HeroSection() {
  // Memoized click handler
  const handleButtonClick = useCallback((e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Memoized transition configs
  const transitions = useMemo(
    () => ({
      tagline: { delay: 0.3, duration: 0.8, ease: "easeOut" },
      heading: { delay: 0.6, duration: 0.8, ease: "easeOut" },
      greeting: { delay: 0.6, duration: 0.6, ease: "easeOut" },
      description: { delay: 1.4, duration: 0.8, ease: "easeOut" },
      button: { delay: 1.7, duration: 0.8, ease: "easeOut" },
    }),
    []
  );

  // Memoized grid background style
  const gridBackgroundStyle = useMemo(
    () => ({
      backgroundImage: BACKGROUND_STYLES.grid,
      backgroundSize: "60px 60px",
    }),
    []
  );

  // Memoized radial background style
  const radialBackgroundStyle = useMemo(
    () => ({
      background: BACKGROUND_STYLES.radial,
    }),
    []
  );

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Simplified background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-black" />
      <div className="absolute inset-0 z-0" style={radialBackgroundStyle} />
      <div className="absolute inset-0 z-0" style={gridBackgroundStyle} />

      {/* Optimized floating elements */}
      {FLOATING_ELEMENTS.map((element, index) => (
        <FloatingElement key={index} {...element} />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto py-12 px-4 md:px-8 flex flex-col items-center justify-center min-h-screen">
        <motion.p
          variants={ANIMATION_VARIANTS.fadeInUp}
          initial="initial"
          animate="animate"
          transition={transitions.tagline}
          className="uppercase text-sm sm:text-base tracking-widest text-gray-400 mb-8 font-medium"
        >
          ✨ Designing Digital Worlds That Spark Wonder.
        </motion.p>

        <motion.h1
          variants={ANIMATION_VARIANTS.fadeInUp}
          initial="initial"
          animate="animate"
          transition={transitions.heading}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white mb-6 md:mb-8"
        >
          <motion.span
            variants={ANIMATION_VARIANTS.fadeInLeft}
            initial="initial"
            animate="animate"
            transition={transitions.greeting}
            className="inline-block"
          >
            Hey there! I'm
          </motion.span>{" "}
          <br />
          <div className="inline-block">
            <AnimatedName name="Muhammad" startDelay={4} />
          </div>
          <br />
          <div className="inline-block">
            <AnimatedName name="Wasay" startDelay={12} />
          </div>
        </motion.h1>

        <motion.p
          variants={ANIMATION_VARIANTS.fadeInUp}
          initial="initial"
          animate="animate"
          transition={transitions.description}
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          I'm passionate about creating{" "}
          <span className="text-cyan-400 font-semibold">beautiful</span>,
          <span className="text-purple-400 font-semibold"> performant</span>,
          and
          <span className="text-cyan-400 font-semibold">
            {" "}
            user-friendly
          </span>{" "}
          web applications that make a difference. Let's build something amazing
          together! 🚀
        </motion.p>

        <motion.button
          variants={ANIMATION_VARIANTS.fadeInUp}
          initial="initial"
          animate="animate"
          transition={transitions.button}
          onClick={(e) => handleButtonClick(e, "#projects")}
          className="relative px-8 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white font-medium text-lg overflow-hidden transition-all duration-300 hover:bg-gray-700/50 hover:border-cyan-400/50 group hover:shadow-lg hover:shadow-cyan-400/20 mb-6"
          style={{ transform: "translateZ(0)", willChange: "transform" }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10 flex items-center gap-2">
            Explore My Work
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:scale-110" />
          </span>
        </motion.button>
      </div>
    </section>
  );
}

export default React.memo(HeroSection);
