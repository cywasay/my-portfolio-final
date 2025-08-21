"use client";

import React, { memo, useMemo, useCallback, useRef, useEffect } from "react";
import {
  motion,
  useAnimation,
  useInView,
  useReducedMotion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";

// Memoized color classes to prevent recalculation
const floatColorClasses = {
  purple:
    "border-purple-400/50 from-purple-500/40 via-purple-400/30 to-transparent",
  cyan: "border-cyan-400/50 from-cyan-500/40 via-cyan-400/30 to-transparent",
  slate:
    "border-slate-400/50 from-slate-500/40 via-slate-400/30 to-transparent",
  emerald:
    "border-emerald-400/50 from-emerald-500/40 via-emerald-400/30 to-transparent",
  rose: "border-rose-400/50 from-rose-500/40 via-rose-400/30 to-transparent",
};

// Optimized floating element with reduced motion support
const FloatingElement = memo(
  ({ color, duration, delay, position, sizeClasses, animate, blur = 12 }) => {
    const shouldReduceMotion = useReducedMotion();

    const optimizedAnimate = useMemo(
      () => (shouldReduceMotion ? { opacity: [0.3, 0.7, 0.3] } : animate),
      [shouldReduceMotion, animate]
    );

    const optimizedTransition = useMemo(
      () => ({
        duration: shouldReduceMotion ? duration * 0.5 : duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
        repeatType: "reverse",
      }),
      [duration, delay, shouldReduceMotion]
    );

    return (
      <motion.div
        className={`absolute rounded-full border-2 bg-gradient-to-br pointer-events-none will-change-transform ${floatColorClasses[color]} ${sizeClasses}`}
        style={{
          ...position,
          filter: `blur(${blur}px)`,
          transform: "translateZ(0)", // Force hardware acceleration
        }}
        animate={optimizedAnimate}
        transition={optimizedTransition}
      />
    );
  }
);

FloatingElement.displayName = "FloatingElement";

// Pre-computed floating elements configuration
const floatingElements = [
  {
    color: "purple",
    sizeClasses: "w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24",
    duration: 4,
    delay: 0,
    position: { top: "12%", left: "8%" },
    animate: {
      x: [0, 80, -40, 0],
      y: [0, -60, 40, 0],
      scale: [1, 1.2, 0.8, 1],
      rotate: [0, 180, 360],
    },
    blur: 10,
  },
  {
    color: "cyan",
    sizeClasses: "w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20",
    duration: 6,
    delay: 1,
    position: { top: "65%", right: "5%" },
    animate: {
      x: [0, -70, 50, 0],
      y: [0, 60, -30, 0],
      scale: [1, 0.7, 1.3, 1],
      rotate: [0, -90, 180, 0],
    },
    blur: 8,
  },
  {
    color: "emerald",
    sizeClasses: "w-14 h-14 sm:w-18 sm:h-18 lg:w-28 lg:h-28",
    duration: 5,
    delay: 0.5,
    position: { top: "35%", right: "15%" },
    animate: {
      x: [0, -50, 30, 0],
      y: [0, -50, 40, 0],
      scale: [1, 1.1, 0.9, 1],
      rotate: [0, 90, 270, 360],
    },
    blur: 15,
  },
  {
    color: "rose",
    sizeClasses: "w-8 h-8 sm:w-14 sm:h-14 lg:w-18 lg:h-18",
    duration: 7.5,
    delay: 1.5,
    position: { top: "80%", left: "15%" },
    animate: {
      x: [0, 60, -20, 0],
      y: [0, -40, 20, 0],
      scale: [1, 1.4, 0.6, 1],
      rotate: [0, -180, 90, 0],
    },
    blur: 6,
  },
  {
    color: "slate",
    sizeClasses: "w-6 h-6 sm:w-12 sm:h-12 lg:w-16 lg:h-16",
    duration: 9,
    delay: 2,
    position: { top: "20%", right: "35%" },
    animate: {
      x: [0, 40, -60, 0],
      y: [0, 70, -20, 0],
      scale: [1, 0.8, 1.2, 1],
      rotate: [0, 270, 90, 360],
    },
    blur: 20,
  },
];

const projects = [
  {
    title: "E-Commerce Website",
    description:
      "A comprehensive online shopping platform featuring product catalogs, shopping cart functionality, secure checkout process, and user account management. Built with modern web technologies for optimal performance and user experience.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Full Stack",
    color: "purple",
    featured: true,
  },
  {
    title: "Practice Portfolio",
    description:
      "A sleek and responsive developer portfolio website showcasing my skills, projects, and experience. Features smooth animations, dark theme, and optimized performance to create an impressive first impression.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/cywasay/my-portfolio",
    liveUrl: "https://my-portfolio-56cj3kh8z-cywasays-projects.vercel.app/",
    category: "Web Development",
    color: "cyan",
    featured: true,
  },
];

// Pre-computed gradient classes
const gradients = {
  cyan: "from-cyan-400 via-cyan-500 to-cyan-600",
  purple: "from-purple-400 via-purple-500 to-purple-600",
  green: "from-emerald-400 via-emerald-500 to-emerald-600",
  blue: "from-blue-400 via-blue-500 to-blue-600",
  pink: "from-pink-400 via-pink-500 to-pink-600",
  yellow: "from-yellow-400 via-yellow-500 to-yellow-600",
};

const hoverGradients = {
  cyan: "from-cyan-300 via-cyan-400 to-cyan-500",
  purple: "from-purple-300 via-purple-400 to-purple-500",
};

// Optimized tech tag component
const TechTag = memo(({ tech, index, projectIndex }) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const initialVariants = useMemo(
    () =>
      shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5, y: 20 },
    [shouldReduceMotion]
  );

  const animateVariants = useMemo(
    () =>
      shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 },
    [shouldReduceMotion]
  );

  return (
    <motion.span
      ref={ref}
      initial={initialVariants}
      animate={isInView ? animateVariants : initialVariants}
      transition={{
        delay: shouldReduceMotion
          ? 0
          : projectIndex * 0.15 + index * 0.05 + 0.35,
        duration: 0.25,
        ease: "easeOut",
      }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.08, y: -3 }}
      className="relative px-4 py-3 text-sm font-semibold bg-gradient-to-r from-gray-700/80 to-gray-800/80 text-gray-200 rounded-xl border border-gray-600/50 hover:border-cyan-400/50 hover:bg-gradient-to-r hover:from-gray-600/80 hover:to-gray-700/80 hover:text-white transition-all duration-300 cursor-default backdrop-blur-sm will-change-transform"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-purple-400/0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      <span className="relative z-10">{tech}</span>
    </motion.span>
  );
});

TechTag.displayName = "TechTag";

// Optimized project card with intersection observer and reduced motion
const ProjectCard = memo(({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimation();

  // Motion values for smooth hover effects
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const handleMouseEnter = useCallback(() => {
    if (!shouldReduceMotion) {
      y.set(-8);
      scale.set(1.02);
    }
  }, [y, scale, shouldReduceMotion]);

  const handleMouseLeave = useCallback(() => {
    if (!shouldReduceMotion) {
      y.set(0);
      scale.set(1);
    }
  }, [y, scale, shouldReduceMotion]);

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        rotateX: 0,
      });
    }
  }, [isInView, controls]);

  const categoryGradient = useMemo(
    () => gradients[project.color] || "from-gray-400 to-gray-600",
    [project.color]
  );

  const liveButtonGradient = useMemo(
    () => gradients[project.color] || "from-gray-400 to-gray-600",
    [project.color]
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, rotateX: shouldReduceMotion ? 0 : -15 }}
      animate={controls}
      transition={{
        delay: shouldReduceMotion ? 0 : index * 0.15,
        duration: shouldReduceMotion ? 0.3 : 0.5,
        ease: "easeOut",
      }}
      style={{ y, scale }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative bg-gradient-to-br from-gray-800/80 via-gray-900/60 to-black/80 backdrop-blur-xl border-2 border-gray-600/50 rounded-3xl p-8 lg:p-12 hover:border-cyan-400/60 transition-all duration-500 group overflow-hidden will-change-transform"
    >
      {/* Optimized background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-purple-400/5 to-rose-400/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-cyan-400/10 via-purple-400/8 to-transparent rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700 will-change-transform"></div>
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-br from-purple-400/8 via-rose-400/5 to-transparent rounded-full blur-2xl group-hover:scale-105 transition-transform duration-600 will-change-transform"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div
            className={`inline-flex items-center space-x-2 px-5 py-3 rounded-full text-sm font-bold bg-gradient-to-r ${categoryGradient} text-white transition-transform duration-300 group-hover:scale-105 will-change-transform`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{project.category}</span>
          </div>
        </div>

        <motion.h3
          className="text-3xl lg:text-4xl font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:to-purple-200 group-hover:bg-clip-text transition-all duration-400"
          whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
        >
          {project.title}
        </motion.h3>

        <p className="text-gray-300 leading-relaxed text-base lg:text-lg mb-10 group-hover:text-gray-200 transition-colors duration-400">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          {project.technologies.map((tech, techIndex) => (
            <TechTag
              key={techIndex}
              tech={tech}
              index={techIndex}
              projectIndex={index}
            />
          ))}
        </div>

        <div className="flex space-x-5">
          <motion.a
            href={project.githubUrl}
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -3 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            className="group/btn flex items-center space-x-3 px-7 py-4 bg-gradient-to-r from-gray-700/80 to-gray-800/80 hover:from-gray-600/90 hover:to-gray-700/90 rounded-2xl transition-all duration-400 text-gray-200 hover:text-white border-2 border-gray-600/50 hover:border-gray-500/70 backdrop-blur-sm relative overflow-hidden will-change-transform"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-600"></div>
            <Github className="w-5 h-5 relative z-10 group-hover/btn:rotate-6 transition-transform duration-300 will-change-transform" />
            <span className="font-semibold relative z-10">View Code</span>
          </motion.a>

          <motion.a
            href={project.liveUrl}
            whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -3 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            className={`group/btn flex items-center space-x-3 px-7 py-4 bg-gradient-to-r ${liveButtonGradient} rounded-2xl transition-all duration-400 text-white hover:text-gray-50 font-semibold relative overflow-hidden will-change-transform`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-600"></div>
            <ExternalLink className="w-5 h-5 relative z-10 group-hover/btn:rotate-6 transition-transform duration-300 will-change-transform" />
            <span className="relative z-10">Live Demo</span>
          </motion.a>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-400/10 via-purple-400/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

// Optimized animated text component
const AnimatedText = memo(({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
      });
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 50,
        scale: shouldReduceMotion ? 1 : 0.9,
      }}
      animate={controls}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.5,
        delay: shouldReduceMotion ? 0 : delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
});

AnimatedText.displayName = "AnimatedText";

export default function ProjectsSection() {
  const shouldReduceMotion = useReducedMotion();

  // Memoize floating elements to prevent re-renders
  const memoizedFloatingElements = useMemo(
    () =>
      floatingElements.map((element, index) => (
        <FloatingElement key={`float-${index}`} {...element} />
      )),
    []
  );

  // Memoize project cards
  const memoizedProjectCards = useMemo(
    () =>
      projects.map((project, index) => (
        <ProjectCard key={project.title} project={project} index={index} />
      )),
    []
  );

  return (
    <section
      id="projects"
      className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-black px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-radial from-cyan-900/5 via-transparent to-purple-900/5"></div>

      {!shouldReduceMotion && memoizedFloatingElements}

      <div className="relative max-w-7xl mx-auto">
        <div className="min-h-screen flex flex-col justify-center py-20 lg:py-24">
          <AnimatedText className="text-center mb-16 lg:mb-20">
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      background: [
                        "linear-gradient(45deg, #06b6d4, #8b5cf6)",
                        "linear-gradient(45deg, #8b5cf6, #06b6d4)",
                        "linear-gradient(45deg, #06b6d4, #8b5cf6)",
                      ],
                    }
              }
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block p-1 rounded-3xl mb-6"
            >
              <div className="bg-gray-950 rounded-3xl px-6 py-3">
                <span className="text-cyan-400 font-semibold text-lg">
                  ✨ Featured Work
                </span>
              </div>
            </motion.div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 lg:mb-8">
              My{" "}
              <motion.span
                className="text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text bg-300%"
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Projects
              </motion.span>
            </h2>
            <motion.p
              className="text-gray-400 text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.25,
                duration: 0.4,
              }}
            >
              A showcase of my passion projects and professional work, crafted
              with dedication and modern technologies
            </motion.p>
          </AnimatedText>

          <AnimatedText
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-7xl mx-auto"
            delay={0.2}
          >
            {memoizedProjectCards}
          </AnimatedText>

          <AnimatedText className="text-center mt-20 lg:mt-28" delay={0.4}>
            <div className="relative bg-gradient-to-br from-gray-800/60 via-gray-900/40 to-black/60 backdrop-blur-xl border-2 border-gray-700/60 rounded-3xl p-10 lg:p-16 max-w-5xl mx-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-purple-400/5 to-rose-400/5"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-rose-400/20 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <motion.h3
                  className="text-3xl lg:text-4xl font-bold text-white mb-6"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                >
                  More Projects Coming Soon
                </motion.h3>
                <p className="text-gray-300 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
                  I'm constantly working on new projects and learning
                  cutting-edge technologies. Follow my journey on GitHub to see
                  what I'm building next!
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <motion.a
                    href="https://github.com/cywasay"
                    whileHover={
                      shouldReduceMotion ? {} : { scale: 1.08, y: -5 }
                    }
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    className="group/cta inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl text-white font-bold transition-all duration-500 relative overflow-hidden will-change-transform"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-700"></div>
                    <Github className="w-6 h-6 relative z-10 group-hover/cta:rotate-12 transition-transform duration-300 will-change-transform" />
                    <span className="relative z-10">Follow on GitHub</span>
                  </motion.a>
                  <motion.a
                    href="#contact"
                    whileHover={
                      shouldReduceMotion ? {} : { scale: 1.08, y: -5 }
                    }
                    whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                    className="group/cta inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-gray-700/80 to-gray-800/80 hover:from-gray-600/90 hover:to-gray-700/90 rounded-2xl text-gray-200 hover:text-white font-bold border-2 border-gray-600/50 hover:border-gray-500/70 transition-all duration-500 relative overflow-hidden will-change-transform"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-700"></div>
                    <motion.span
                      className="relative z-10"
                      whileHover={
                        shouldReduceMotion ? {} : { letterSpacing: "0.05em" }
                      }
                      transition={{ duration: 0.2 }}
                    >
                      Let's Work Together
                    </motion.span>
                  </motion.a>
                </div>
              </div>
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
