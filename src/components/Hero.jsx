"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const FloatingElement = ({ color, duration, delay, position, sizeClasses, animate }) => (
  <motion.div
    className={`absolute rounded-full border border-${color}-400/40 bg-gradient-to-br from-${color}-400/30 to-transparent shadow-lg shadow-${color}-400/20 ${sizeClasses}`}
    style={{ ...position, filter: "blur(8px)" }}
    animate={animate}
    transition={{ duration, repeat: Infinity, ease: "linear", delay }}
  />
);

const AnimatedLetter = ({ letter, index, isSpace = false }) => {
  if (isSpace) return <span className="inline-block w-4"></span>;

  return (
    <motion.span
      className="inline-block text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text cursor-default transition-all duration-300 hover:scale-110 hover:-translate-y-2"
      style={{ filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.3))" }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.05, duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.15, y: -8, filter: "drop-shadow(0 0 16px rgba(34, 211, 238, 0.6))" }}
    >
      {letter}
    </motion.span>
  );
};

const AnimatedName = ({ name, startDelay = 0 }) => (
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
);

const backgroundStyles = {
  radial: "radial-gradient(circle at center, rgba(30, 30, 50, 0.3) 0%, rgba(20, 20, 40, 0.2) 50%, transparent 100%)",
  grid: "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)"
};

const floatingElements = [
  {
    color: "cyan",
    sizeClasses: "w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32",
    duration: 20,
    delay: 0,
    position: { top: "15%", left: "10%" },
    animate: { x: [0, 100, 0, -50, 0], y: [0, -50, 100, 50, 0] }
  },
  {
    color: "purple",
    sizeClasses: "w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24",
    duration: 25,
    delay: 1,
    position: { top: "70%", right: "15%" },
    animate: { x: [0, -80, 60, 0], y: [0, 80, -40, 0] }
  },
  {
    color: "slate",
    sizeClasses: "w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20",
    duration: 30,
    delay: 2,
    position: { top: "40%", right: "20%" },
    animate: { x: [0, -60, 40, 0], y: [0, -70, 30, 0] }
  }
];

const animationProps = {
  tagline: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3, duration: 0.8, ease: "easeOut" } },
  heading: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6, duration: 0.8, ease: "easeOut" } },
  greeting: { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.6, duration: 0.6, ease: "easeOut" } },
  description: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 1.4, duration: 0.8, ease: "easeOut" } },
  button: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 1.7, duration: 0.8, ease: "easeOut" } }
};

function HeroSection() {
  const handleButtonClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-black"></div>
      <div className="absolute inset-0 z-0" style={{ background: backgroundStyles.radial }}></div>
      <div className="absolute inset-0 z-0" style={{ backgroundImage: backgroundStyles.grid, backgroundSize: "60px 60px" }}></div>

      {floatingElements.map((element, index) => (
        <FloatingElement key={index} {...element} />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto py-12 px-4 md:px-8 flex flex-col items-center justify-center min-h-screen">
        <motion.p
          {...animationProps.tagline}
          className="uppercase text-sm sm:text-base tracking-widest text-gray-400 mb-8 font-medium"
        >
          ✨ Designing Digital Worlds That Spark Wonder.
        </motion.p>

        <motion.h1
          {...animationProps.heading}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white mb-6 md:mb-8"
        >
          <motion.span {...animationProps.greeting} className="inline-block">
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
          {...animationProps.description}
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          I'm passionate about creating{" "}
          <span className="text-cyan-400 font-semibold">beautiful</span>,
          <span className="text-purple-400 font-semibold"> performant</span>,
          and
          <span className="text-cyan-400 font-semibold"> user-friendly</span>{" "}
          web applications that make a difference. Let's build something amazing
          together! 🚀
        </motion.p>

        <motion.button
          {...animationProps.button}
          onClick={(e) => handleButtonClick(e, "#projects")}
          className="relative px-8 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white font-medium text-lg overflow-hidden transition-all duration-300 hover:bg-gray-700/50 hover:border-cyan-400/50 group hover:shadow-lg hover:shadow-cyan-400/20 mb-6"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></span>
          <span className="relative z-10 flex items-center gap-2">
            Explore My Work
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:scale-110" />
          </span>
        </motion.button>
      </div>
    </section>
  );
}

export default HeroSection;