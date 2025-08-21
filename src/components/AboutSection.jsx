"use client";

import React, { memo, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Code, Palette, Zap, Heart, BookOpen } from "lucide-react";

// Pre-calculated background styles for performance
const BACKGROUND_STYLES = {
  radial:
    "radial-gradient(circle at center, rgba(30, 30, 50, 0.1) 0%, rgba(20, 20, 40, 0.05) 50%, transparent 100%)",
  overlay:
    "linear-gradient(to bottom, transparent 0%, rgba(17, 24, 39, 0.1) 50%, transparent 100%)",
};

// Animation variants - calculated once
const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
};

// Static configurations moved outside component
const FLOATING_ELEMENTS = [
  {
    color: "cyan",
    sizeClasses: "w-12 h-12 sm:w-20 sm:h-20 lg:w-28 lg:h-28",
    duration: 22,
    delay: 0,
    position: { top: "20%", left: "8%" },
    animate: { x: [0, 40, 0, -20, 0], y: [0, -20, 40, 20, 0] }, // Simplified keyframes
  },
  {
    color: "purple",
    sizeClasses: "w-10 h-10 sm:w-16 sm:h-16 lg:w-22 lg:h-22",
    duration: 28,
    delay: 1.5,
    position: { top: "60%", right: "12%" },
    animate: { x: [0, -35, 25, 0], y: [0, 35, -15, 0] }, // Simplified keyframes
  },
  {
    color: "slate",
    sizeClasses: "w-8 h-8 sm:w-14 sm:h-14 lg:w-18 lg:h-18",
    duration: 32,
    delay: 3,
    position: { top: "35%", right: "25%" },
    animate: { x: [0, -25, 15, 0], y: [0, -30, 10, 0] }, // Simplified keyframes
  },
  {
    color: "cyan",
    sizeClasses: "w-14 h-14 sm:w-18 sm:h-18 lg:w-24 lg:w-24",
    duration: 26,
    delay: 2,
    position: { top: "75%", left: "15%" },
    animate: { x: [0, 30, -15, 0], y: [0, -25, 20, 0] }, // Simplified keyframes
  },
];

const GRADIENT_CLASSES = {
  yellow: "from-yellow-400 to-yellow-600",
  blue: "from-blue-400 to-blue-600",
  purple: "from-purple-400 to-purple-600",
  cyan: "from-cyan-400 to-cyan-600",
  green: "from-green-400 to-green-600",
};

const GLOW_COLORS = {
  yellow: "0 0 12px rgba(250, 204, 21, 0.8)",
  blue: "0 0 12px rgba(96, 165, 250, 0.8)",
  purple: "0 0 12px rgba(168, 85, 247, 0.8)",
  cyan: "0 0 12px rgba(34, 211, 238, 0.8)",
  green: "0 0 12px rgba(74, 222, 128, 0.8)",
};

const SKILLS_DATA = [
  { name: "JavaScript", level: 85, color: "yellow" },
  { name: "React", level: 90, color: "blue" },
  { name: "Next.js", level: 80, color: "purple" },
  { name: "CSS/Tailwind", level: 88, color: "cyan" },
  { name: "Node.js", level: 75, color: "green" },
  { name: "TypeScript", level: 70, color: "blue" },
];

const PASSIONS_DATA = [
  {
    icon: Code,
    title: "Pixel Perfect Code",
    desc: "Crafting elegant solutions that just work beautifully",
  },
  {
    icon: Palette,
    title: "Visual Storytelling",
    desc: "Turning ideas into stunning digital experiences",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Building apps that load before you blink",
  },
  {
    icon: Heart,
    title: "User-Centric Design",
    desc: "Creating experiences that users genuinely love",
  },
];

const INTERESTS_DATA = [
  { icon: Zap, text: "MLBB gaming strategist 🎮" },
  { icon: Palette, text: "Sketch artist & creative mind 🎨" },
  { icon: BookOpen, text: "Avid reader & storyteller 📖" },
];

// Optimized FloatingElement with GPU acceleration
const FloatingElement = memo(
  ({ color, duration, delay, position, sizeClasses, animate }) => {
    const elementStyle = useMemo(
      () => ({
        ...position,
        transform: "translateZ(0)",
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
        className={`absolute rounded-full border-opacity-25 bg-gradient-to-br shadow-sm ${sizeClasses}
        ${
          color === "cyan"
            ? "border-cyan-400/25 from-cyan-400/15 to-transparent shadow-cyan-400/10"
            : color === "purple"
            ? "border-purple-400/25 from-purple-400/15 to-transparent shadow-purple-400/10"
            : "border-slate-400/25 from-slate-400/15 to-transparent shadow-slate-400/10"
        }`}
        style={elementStyle}
        animate={animate}
        transition={transition}
      />
    );
  }
);
FloatingElement.displayName = "FloatingElement";

// Optimized tech logo components with memoization
const TechLogos = {
  JavaScript: memo(() => (
    <div className="w-6 h-6 bg-yellow-400 rounded flex items-center justify-center">
      <span className="text-black font-bold text-sm">JS</span>
    </div>
  )),
  React: memo(() => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      <path
        d="M12 1c-4.5 0-8.5 1.5-8.5 4s4 4 8.5 4 8.5-1.5 8.5-4-4-4-8.5-4z"
        stroke="#61DAFB"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M12 15c-4.5 0-8.5 1.5-8.5 4s4 4 8.5 4 8.5-1.5 8.5-4-4-4-8.5-4z"
        stroke="#61DAFB"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M5.5 7c-2.25 3.9-2.25 8.1 0 12s6.75 4.5 9 0 2.25-8.1 0-12-6.75-4.5-9 0z"
        stroke="#61DAFB"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  )),
  "Next.js": memo(() => (
    <div className="w-6 h-6 bg-black rounded border border-white flex items-center justify-center">
      <span className="text-white font-bold text-xs">N</span>
    </div>
  )),
  "CSS/Tailwind": memo(() => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.47 6 12 6z"
        fill="#06B6D4"
      />
      <path
        d="M6 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C9.61 13.15 8.47 12 6 12z"
        fill="#06B6D4"
      />
    </svg>
  )),
  "Node.js": memo(() => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#339933">
      <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l7.44 4.3c.48.28 1.08.28 1.56 0l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.51-.2-.78-.2zm-.45 2.3v.01c.15-.08.31-.08.46 0l6.44 3.72c.15.09.24.25.24.42v7.42c0 .17-.09.33-.24.42l-6.44 3.72c-.15.08-.31.08-.46 0L5.11 15.84c-.15-.09-.24-.25-.24-.42V7.42c0-.17.09-.33.24-.42l6.44-3.72z" />
    </svg>
  )),
  TypeScript: memo(() => (
    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
      <span className="text-white font-bold text-sm">TS</span>
    </div>
  )),
};

// Add display names for debugging
Object.keys(TechLogos).forEach((key) => {
  TechLogos[key].displayName = `TechLogo${key.replace(/[^A-Za-z]/g, "")}`;
});

// Ultra-smooth SkillBar with buttery animations
const SkillBar = memo(({ skill, index }) => {
  const LogoComponent = TechLogos[skill.name];
  const gradientClass =
    GRADIENT_CLASSES[skill.color] || "from-gray-400 to-gray-600";

  // Buttery smooth transitions with optimized easing
  const barTransition = useMemo(
    () => ({
      delay: index * 0.08,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smooth entry
    }),
    [index]
  );

  const fillTransition = useMemo(
    () => ({
      delay: index * 0.08 + 0.2,
      duration: 1.6,
      ease: [0.23, 1, 0.32, 1], // Ultra-smooth easeOutExpo-like curve
    }),
    [index]
  );

  // GPU-optimized styles
  const barStyle = useMemo(
    () => ({
      transform: "translate3d(0, 0, 0)",
      willChange: "transform, opacity",
      backfaceVisibility: "hidden",
    }),
    []
  );

  const fillStyle = useMemo(
    () => ({
      transform: "translate3d(0, 0, 0)",
      willChange: "width",
      backfaceVisibility: "hidden",
      // Force hardware acceleration
      WebkitTransform: "translateZ(0)",
      MozTransform: "translateZ(0)",
      msTransform: "translateZ(0)",
      OTransform: "translateZ(0)",
    }),
    []
  );

  // Smooth percentage counter animation
  const percentageTransition = useMemo(
    () => ({
      delay: index * 0.08 + 0.4,
      duration: 1.4,
      ease: [0.23, 1, 0.32, 1],
    }),
    [index]
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -40, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      transition={barTransition}
      viewport={{ once: true, margin: "-50px" }}
      className="mb-4 lg:mb-6 group"
      style={barStyle}
    >
      <div className="flex justify-between items-center mb-2 lg:mb-3">
        <div className="flex items-center space-x-3">
          {LogoComponent && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{
                delay: index * 0.08 + 0.1,
                duration: 0.6,
                ease: [0.68, -0.55, 0.265, 1.55], // Bouncy spring effect
              }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <LogoComponent />
            </motion.div>
          )}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.08 + 0.15,
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            viewport={{ once: true }}
            className="text-gray-300 font-medium text-base lg:text-lg"
          >
            {skill.name}
          </motion.span>
        </div>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={percentageTransition}
          viewport={{ once: true }}
          className="text-gray-400 text-sm lg:text-base font-mono"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              delay: index * 0.08 + 0.6,
              duration: 0.4,
            }}
            viewport={{ once: true }}
          >
            {skill.level}%
          </motion.span>
        </motion.span>
      </div>

      {/* Enhanced progress bar container */}
      <div className="w-full bg-gray-800/80 backdrop-blur-sm rounded-full h-2 lg:h-3 overflow-hidden shadow-inner border border-gray-700/30">
        <motion.div
          initial={{
            width: 0,
            scaleX: 0,
            originX: 0,
          }}
          whileInView={{
            width: `${skill.level}%`,
            scaleX: 1,
          }}
          transition={fillTransition}
          viewport={{ once: true, margin: "-20px" }}
          className={`h-full bg-gradient-to-r ${gradientClass} rounded-full relative overflow-hidden group-hover:brightness-110 transition-all duration-500 ease-out`}
          style={fillStyle}
        >
          {/* Shimmer effect */}
          <motion.div
            initial={{ x: "-100%" }}
            whileInView={{ x: "100%" }}
            transition={{
              delay: index * 0.08 + 0.8,
              duration: 1.5,
              ease: "easeInOut",
              repeat: 1,
            }}
            viewport={{ once: true }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform skew-x-12"
          />

          {/* Subtle glow overlay */}
          <div className="absolute inset-0 bg-white/15 rounded-full mix-blend-overlay" />

          {/* Animated highlight */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              delay: index * 0.08 + 1.2,
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
});
SkillBar.displayName = "SkillBar";

// Optimized PassionCard with reduced effects and GPU acceleration
const PassionCard = memo(({ passion, index }) => {
  const Icon = passion.icon;

  const cardTransition = useMemo(
    () => ({
      delay: index * 0.1,
      duration: 0.6,
    }),
    [index]
  );

  const hoverTransition = useMemo(
    () => ({
      duration: 0.3,
      ease: "easeOut",
    }),
    []
  );

  const cardStyle = useMemo(
    () => ({
      transform: "translateZ(0)",
      willChange: "transform",
    }),
    []
  );

  return (
    <motion.div
      variants={ANIMATION_VARIANTS.fadeInUp}
      initial="initial"
      whileInView="animate"
      transition={cardTransition}
      viewport={{ once: true }}
      whileHover={{
        y: -6,
        scale: 1.02,
        transition: hoverTransition,
      }}
      className="relative bg-gradient-to-br from-gray-800/60 via-gray-900/40 to-black/60 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-6 lg:p-10 hover:border-cyan-400/60 transition-all duration-500 group overflow-hidden"
      style={cardStyle}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-cyan-400/8 to-purple-400/8 rounded-full opacity-50 group-hover:scale-125 transition-transform duration-500" />

      <div className="relative z-10">
        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-cyan-400/30 to-purple-400/30 rounded-2xl flex items-center justify-center mb-6 lg:mb-8 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500">
          <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
        </div>
        <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4 group-hover:text-cyan-100 transition-colors duration-300">
          {passion.title}
        </h3>
        <p className="text-gray-400 leading-relaxed text-base lg:text-lg group-hover:text-gray-300 transition-colors duration-300">
          {passion.desc}
        </p>
      </div>
    </motion.div>
  );
});
PassionCard.displayName = "PassionCard";

// Optimized InterestItem with GPU acceleration
const InterestItem = memo(({ interest, index }) => {
  const Icon = interest.icon;

  const itemTransition = useMemo(
    () => ({
      delay: index * 0.1,
      duration: 0.5,
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

  const itemStyle = useMemo(
    () => ({
      transform: "translateZ(0)",
      willChange: "transform",
    }),
    []
  );

  return (
    <motion.div
      variants={ANIMATION_VARIANTS.scaleIn}
      initial="initial"
      whileInView="animate"
      transition={itemTransition}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.03,
        transition: hoverTransition,
      }}
      className="flex items-center space-x-3 bg-gray-800/30 rounded-lg px-4 lg:px-6 py-3 lg:py-4 hover:bg-gray-700/30 transition-all duration-300"
      style={itemStyle}
    >
      <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-cyan-400" />
      <span className="text-gray-300 text-base lg:text-lg">
        {interest.text}
      </span>
    </motion.div>
  );
});
InterestItem.displayName = "InterestItem";

// Main component with comprehensive optimizations
export default function AboutSection() {
  // Memoized transition configs
  const transitions = useMemo(
    () => ({
      header: { duration: 0.8 },
      journey: { duration: 0.8 },
      skills: { duration: 0.8 },
      passions: { duration: 0.8 },
      interests: { duration: 0.8 },
    }),
    []
  );

  // Memoized background styles
  const overlayStyle = useMemo(
    () => ({
      background: BACKGROUND_STYLES.overlay,
    }),
    []
  );

  return (
    <section
      id="about"
      className="relative bg-gradient-to-b from-black via-gray-900 to-gray-950 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0" style={overlayStyle} />

      {FLOATING_ELEMENTS.map((element, index) => (
        <FloatingElement key={index} {...element} />
      ))}

      <div className="relative max-w-7xl mx-auto">
        <div className="min-h-screen flex flex-col justify-center py-16 lg:py-20">
          <motion.div
            variants={ANIMATION_VARIANTS.fadeInUp}
            initial="initial"
            whileInView="animate"
            transition={transitions.header}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 lg:mb-6">
              About{" "}
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                Me
              </span>
            </h2>
            <p className="text-gray-400 text-lg lg:text-xl max-w-3xl mx-auto">
              Get to know the person behind the code
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-20">
            <motion.div
              variants={ANIMATION_VARIANTS.fadeInLeft}
              initial="initial"
              whileInView="animate"
              transition={transitions.journey}
              viewport={{ once: true }}
            >
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 lg:p-10 h-full">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 lg:mb-8">
                  My Journey
                </h3>
                <div className="space-y-4 lg:space-y-6 text-gray-300 leading-relaxed text-base lg:text-lg">
                  <p>
                    Hi! I'm Muhammad Wasay, a web developer from Pakistan. What
                    began as simple curiosity has grown into a genuine love for
                    building digital experiences that truly make an impact.
                  </p>
                  <p>
                    I work with modern web technologies like React and Next.js,
                    focusing on writing clean, efficient code that turns ideas
                    into reality. For me, every project is a chance to learn
                    something new and push the limits of what can be built.
                  </p>
                  <p>
                    When I'm not coding, I'm usually exploring new technologies,
                    contributing to open source, or enjoying a cup of coffee
                    while sketching out my next project. I believe the best
                    software is built when technical skill meets genuine
                    passion.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={ANIMATION_VARIANTS.fadeInRight}
              initial="initial"
              whileInView="animate"
              transition={transitions.skills}
              viewport={{ once: true }}
            >
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 lg:p-10 h-full">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 lg:mb-8">
                  Skills & Technologies
                </h3>
                <div className="space-y-4 lg:space-y-6">
                  {SKILLS_DATA.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={ANIMATION_VARIANTS.fadeInUp}
            initial="initial"
            whileInView="animate"
            transition={transitions.passions}
            viewport={{ once: true }}
            className="mb-12 lg:mb-20"
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-white text-center mb-8 lg:mb-12">
              What Drives{" "}
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                Me
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {PASSIONS_DATA.map((passion, index) => (
                <PassionCard
                  key={passion.title}
                  passion={passion}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={ANIMATION_VARIANTS.fadeInUp}
            initial="initial"
            whileInView="animate"
            transition={transitions.interests}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-8 lg:mb-12">
              Beyond Code
            </h3>
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 max-w-3xl mx-auto">
              {INTERESTS_DATA.map((interest, index) => (
                <InterestItem
                  key={interest.text}
                  interest={interest}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
