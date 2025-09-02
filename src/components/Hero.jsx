"use client";

import React, { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Optimized floating elements with fewer keyframes and GPU acceleration
const FloatingElement = React.memo(
  ({ color, size, duration, delay, position, animate }) => (
    <motion.div
      className={`absolute rounded-full ${size} ${
        color === "cyan"
          ? "border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-transparent"
          : color === "purple"
          ? "border border-purple-400/20 bg-gradient-to-br from-purple-400/10 to-transparent"
          : "border border-slate-400/20 bg-gradient-to-br from-slate-400/10 to-transparent"
      }`}
      style={{
        ...position,
        transform: "translateZ(0)",
        willChange: "transform",
      }}
      animate={animate}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    />
  )
);

// Streamlined animated letter
const AnimatedLetter = React.memo(({ letter, index, isSpace }) => {
  if (isSpace) return <span className="inline-block w-4" />;

  return (
    <motion.span
      className="inline-block text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text"
      style={{ transform: "translateZ(0)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.03, duration: 0.4 }}
      whileHover={{ scale: 1.05, y: -3, transition: { duration: 0.15 } }}
    >
      {letter}
    </motion.span>
  );
});

const AnimatedName = React.memo(({ name, startDelay = 0 }) => (
  <>
    {name.split("").map((letter, index) => (
      <AnimatedLetter
        key={`${name}-${index}`}
        letter={letter}
        index={startDelay + index}
        isSpace={letter === " "}
      />
    ))}
  </>
));

export default function HeroSection() {
  const handleButtonClick = useCallback((e, href) => {
    e.preventDefault();
    document
      .querySelector(href)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const floatingElements = useMemo(
    () => [
      {
        color: "cyan",
        size: "w-16 h-16 sm:w-24 sm:h-24",
        duration: 15,
        delay: 0,
        position: { top: "15%", left: "10%" },
        animate: { x: [0, 30, 0], y: [0, -20, 0] },
      },
      {
        color: "purple",
        size: "w-12 h-12 sm:w-20 sm:h-20",
        duration: 18,
        delay: 1,
        position: { top: "70%", right: "15%" },
        animate: { x: [0, -25, 0], y: [0, 25, 0] },
      },
      {
        color: "slate",
        size: "w-10 h-10 sm:w-16 sm:h-16",
        duration: 20,
        delay: 2,
        position: { top: "40%", right: "20%" },
        animate: { x: [0, -20, 0], y: [0, -25, 0] },
      },
    ],
    []
  );

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8">
      {/* Solid background layers - no glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-black" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Optimized floating elements */}
      {floatingElements.map((element, index) => (
        <FloatingElement key={index} {...element} />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="uppercase text-sm sm:text-base tracking-widest text-gray-400 mb-8 font-medium"
        >
          ✨ Designing Digital Worlds That Spark Wonder.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white mb-6 md:mb-8"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Hey there! I'm
          </motion.span>
          <br />
          <div className="inline-block">
            <AnimatedName name="Muhammad" startDelay={2} />
          </div>
          <br />
          <div className="inline-block">
            <AnimatedName name="Wasay" startDelay={8} />
          </div>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          I'm passionate about creating{" "}
          <span className="text-cyan-400 font-semibold">beautiful</span>,{" "}
          <span className="text-purple-400 font-semibold">performant</span>, and{" "}
          <span className="text-cyan-400 font-semibold">user-friendly</span> web
          applications that make a difference. Let's build something amazing
          together! 🚀
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          onClick={(e) => handleButtonClick(e, "#projects")}
          className="relative group px-8 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white font-medium text-lg transition-all duration-300 hover:bg-gray-700 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 overflow-hidden"
          style={{ transform: "translateZ(0)" }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center gap-2 z-10">
            Explore My Work
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </span>
        </motion.button>
      </div>
    </section>
  );
}
