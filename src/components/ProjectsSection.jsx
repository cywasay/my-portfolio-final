"use client";

import React, {
  memo,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState,
} from "react";
import {
  motion,
  useAnimation,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";

// Simplified floating element with minimal animations
const FloatingElement = memo(({ color, duration, delay, position, size }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  const colorMap = {
    purple: "bg-purple-500/20 border-purple-400/30",
    cyan: "bg-cyan-500/20 border-cyan-400/30",
    emerald: "bg-emerald-500/20 border-emerald-400/30",
    rose: "bg-rose-500/20 border-rose-400/30",
  };

  return (
    <motion.div
      className={`absolute rounded-full border ${colorMap[color]} ${size}`}
      style={position}
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
});

FloatingElement.displayName = "FloatingElement";

// Minimal floating elements
const floatingElements = [
  {
    color: "purple",
    size: "w-16 h-16",
    duration: 4,
    delay: 0,
    position: { top: "10%", left: "5%" },
  },
  {
    color: "cyan",
    size: "w-12 h-12",
    duration: 5,
    delay: 1,
    position: { top: "60%", right: "8%" },
  },
  {
    color: "emerald",
    size: "w-20 h-20",
    duration: 6,
    delay: 2,
    position: { top: "30%", right: "12%" },
  },
  {
    color: "rose",
    size: "w-10 h-10",
    duration: 7,
    delay: 3,
    position: { top: "75%", left: "10%" },
  },
];

const projects = [
  {
    title: "E-Commerce Website",
    description:
      "A comprehensive online shopping platform with product catalogs, cart functionality, secure checkout, and user management.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    githubUrl: "#",
    liveUrl: "#",
    category: "Full Stack",
    color: "purple",
  },
  {
    title: "Practice Portfolio",
    description:
      "A responsive developer portfolio showcasing skills and projects with smooth animations and optimized performance.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/cywasay/my-portfolio",
    liveUrl: "https://my-portfolio-56cj3kh8z-cywasays-projects.vercel.app/",
    category: "Web Development",
    color: "cyan",
  },
  {
    title: "Thorfinns MLBB Guide",
    description:
      "A comprehensive Mobile Legends: Bang Bang guide website featuring hero guides, build recommendations, gameplay tips, and strategic insights.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/cywasay/my-mlbb-guide",
    liveUrl: "https://my-mlbb-guide.vercel.app/",
    category: "Gaming Guide",
    color: "emerald",
  },
  {
    title: "Cafe Bliss",
    description:
      "A modern and elegant cafe website featuring menu showcases, online ordering system, and seamless user experience with responsive design.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/cywasay/cafe-bliss",
    liveUrl: "https://cafe-bliss-gdv48bkq3-cywasays-projects.vercel.app/",
    category: "Web Development",
    color: "rose",
  },
];

// Simplified tech tag
const TechTag = memo(({ tech }) => (
  <span className="px-3 py-1.5 text-sm bg-gray-800 text-gray-300 rounded-lg border border-gray-700 hover:border-gray-600 hover:text-white transition-colors duration-200">
    {tech}
  </span>
));

TechTag.displayName = "TechTag";

// Optimized project card
const ProjectCard = memo(({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();

  const gradients = {
    purple: "from-purple-500 to-purple-600",
    cyan: "from-cyan-500 to-cyan-600",
    emerald: "from-emerald-500 to-emerald-600",
     rose: "from-rose-500 to-rose-600",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={shouldReduceMotion ? {} : { y: -5 }}
      className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <div
          className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${
            gradients[project.color]
          } text-white`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{project.category}</span>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-white mb-4 hover:text-cyan-400 transition-colors duration-300">
        {project.title}
      </h3>

      <p className="text-gray-400 mb-6 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.technologies.map((tech, i) => (
          <TechTag key={i} tech={tech} />
        ))}
      </div>

      <div className="flex space-x-4">
        <motion.a
          href={project.githubUrl}
          whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors duration-200 text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600"
        >
          <Github className="w-4 h-4" />
          <span>Code</span>
        </motion.a>

        <motion.a
          href={project.liveUrl}
          whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
          className={`flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${
            gradients[project.color]
          } rounded-xl text-white font-semibold hover:opacity-90 transition-opacity duration-200`}
        >
          <ExternalLink className="w-4 h-4" />
          <span>Demo</span>
        </motion.a>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

// Smooth loading wrapper
const SmoothLoader = memo(({ children, delay = 0 }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!isLoaded) {
    return <div className="opacity-0" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
});

SmoothLoader.displayName = "SmoothLoader";

export default function ProjectsSection() {
  const shouldReduceMotion = useReducedMotion();

  // Memoized floating elements
  const memoizedFloatingElements = useMemo(
    () =>
      floatingElements.map((element, index) => (
        <FloatingElement key={index} {...element} />
      )),
    []
  );

  return (
    <section
      id="projects"
      className="relative bg-gradient-to-b from-gray-950 to-gray-900 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Simplified background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-transparent" />

      {/* Floating elements only for non-reduced motion */}
      {!shouldReduceMotion && memoizedFloatingElements}

      <div className="relative max-w-6xl mx-auto">
        <SmoothLoader>
          <div className="min-h-screen flex flex-col justify-center py-20">
            {/* Header Section */}
            <div className="text-center mb-16">
              <motion.div
                className="inline-block bg-gray-900 border border-gray-800 rounded-2xl px-6 py-3 mb-6"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              >
                <span className="text-cyan-400 font-semibold">
                  ✨ Featured Work
                </span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                My{" "}
                <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                  Projects
                </span>
              </h2>

              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                A showcase of my passion projects and professional work, crafted
                with modern technologies
              </p>
            </div>

            {/* Projects Grid */}
            <SmoothLoader delay={200}>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </SmoothLoader>

            {/* Call to Action */}
            <SmoothLoader delay={400}>
              <div className="text-center">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 max-w-4xl mx-auto">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                    More Projects Coming Soon
                  </h3>
                  <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                    I'm constantly working on new projects. Follow my journey on
                    GitHub!
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.a
                      href="https://github.com/cywasay"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                      className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity duration-200"
                    >
                      <Github className="w-5 h-5" />
                      <span>Follow on GitHub</span>
                    </motion.a>

                    <motion.a
                      href="#contact"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                      className="inline-flex items-center space-x-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-300 hover:text-white font-semibold border border-gray-700 hover:border-gray-600 transition-all duration-200"
                    >
                      <span>Let's Work Together</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </SmoothLoader>
          </div>
        </SmoothLoader>
      </div>
    </section>
  );
}
