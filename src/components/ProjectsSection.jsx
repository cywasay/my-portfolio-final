"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Star, Sparkles } from "lucide-react";

const floatColorClasses = {
  purple:
    "border-purple-400/50 from-purple-500/40 via-purple-400/30 to-transparent shadow-purple-500/30",
  cyan: "border-cyan-400/50 from-cyan-500/40 via-cyan-400/30 to-transparent shadow-cyan-500/30",
  slate:
    "border-slate-400/50 from-slate-500/40 via-slate-400/30 to-transparent shadow-slate-500/30",
  emerald:
    "border-emerald-400/50 from-emerald-500/40 via-emerald-400/30 to-transparent shadow-emerald-500/30",
  rose: "border-rose-400/50 from-rose-500/40 via-rose-400/30 to-transparent shadow-rose-500/30",
};

const FloatingElement = memo(
  ({ color, duration, delay, position, sizeClasses, animate, blur = 12 }) => (
    <motion.div
      className={`absolute rounded-full border-2 bg-gradient-to-br shadow-2xl pointer-events-none ${floatColorClasses[color]} ${sizeClasses}`}
      style={{ ...position, filter: `blur(${blur}px)` }}
      animate={animate}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
        repeatType: "reverse",
      }}
    />
  )
);

FloatingElement.displayName = "FloatingElement";

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
    stars: 24,
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
    stars: 18,
  },
];

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

const ProjectCard = memo(({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 80, rotateX: -15 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
    viewport={{ once: true, margin: "-100px" }}
    whileHover={{
      y: -8,
      scale: 1.02,
    }}
    className="relative bg-gradient-to-br from-gray-800/80 via-gray-900/60 to-black/80 backdrop-blur-xl border-2 border-gray-600/50 rounded-3xl p-8 lg:p-12 hover:border-cyan-400/60 transition-all duration-500 group overflow-hidden shadow-2xl hover:shadow-cyan-500/10"
  >
    {/* Subtle background overlay on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-purple-400/5 to-rose-400/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    {/* Reduced background effects */}
    <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-cyan-400/10 via-purple-400/8 to-transparent rounded-full blur-3xl group-hover:scale-110 transition-all duration-700"></div>
    <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-br from-purple-400/8 via-rose-400/5 to-transparent rounded-full blur-2xl group-hover:scale-105 transition-all duration-600"></div>

    {/* Removed the border gradient overlay that was causing the shine */}

    <div className="relative z-10">
      <div className="flex items-center justify-between mb-6">
        <div
          className={`inline-flex items-center space-x-2 px-5 py-3 rounded-full text-sm font-bold bg-gradient-to-r ${
            gradients[project.color] || "from-gray-400 to-gray-600"
          } text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{project.category}</span>
        </div>
        {project.featured && (
          <motion.div
            className="flex items-center space-x-1 text-yellow-400"
            whileHover={{ scale: 1.1 }}
          >
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">{project.stars}</span>
          </motion.div>
        )}
      </div>

      <motion.h3
        className="text-3xl lg:text-4xl font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-200 group-hover:to-purple-200 group-hover:bg-clip-text transition-all duration-400"
        whileHover={{ scale: 1.01 }}
      >
        {project.title}
      </motion.h3>

      <p className="text-gray-300 leading-relaxed text-base lg:text-lg mb-10 group-hover:text-gray-200 transition-colors duration-400">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-3 mb-10">
        {project.technologies.map((tech, techIndex) => (
          <motion.span
            key={techIndex}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              delay: index * 0.15 + techIndex * 0.05 + 0.35,
              duration: 0.25,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.08,
              y: -3,
            }}
            className="relative px-4 py-3 text-sm font-semibold bg-gradient-to-r from-gray-700/80 to-gray-800/80 text-gray-200 rounded-xl border border-gray-600/50 hover:border-cyan-400/50 hover:bg-gradient-to-r hover:from-gray-600/80 hover:to-gray-700/80 hover:text-white transition-all duration-300 cursor-default shadow-md hover:shadow-lg backdrop-blur-sm"
          >
            {/* Subtle tech tag overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-purple-400/0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">{tech}</span>
          </motion.span>
        ))}
      </div>

      <div className="flex space-x-5">
        <motion.a
          href={project.githubUrl}
          whileHover={{
            scale: 1.05,
            y: -3,
          }}
          whileTap={{ scale: 0.95 }}
          className="group/btn flex items-center space-x-3 px-7 py-4 bg-gradient-to-r from-gray-700/80 to-gray-800/80 hover:from-gray-600/90 hover:to-gray-700/90 rounded-2xl transition-all duration-400 text-gray-200 hover:text-white border-2 border-gray-600/50 hover:border-gray-500/70 shadow-lg hover:shadow-xl backdrop-blur-sm relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-600"></div>
          <Github className="w-5 h-5 relative z-10 group-hover/btn:rotate-6 transition-transform duration-300" />
          <span className="font-semibold relative z-10">View Code</span>
        </motion.a>

        <motion.a
          href={project.liveUrl}
          whileHover={{
            scale: 1.05,
            y: -3,
          }}
          whileTap={{ scale: 0.95 }}
          className={`group/btn flex items-center space-x-3 px-7 py-4 bg-gradient-to-r ${
            gradients[project.color] || "from-gray-400 to-gray-600"
          } hover:bg-gradient-to-r hover:${
            hoverGradients[project.color] || "from-gray-300 to-gray-500"
          } rounded-2xl transition-all duration-400 text-white hover:text-gray-50 shadow-lg hover:shadow-xl font-semibold relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-600"></div>
          <ExternalLink className="w-5 h-5 relative z-10 group-hover/btn:rotate-6 transition-transform duration-300" />
          <span className="relative z-10">Live Demo</span>
        </motion.a>
      </div>
    </div>

    {/* Single subtle corner accent */}
    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-400/10 via-purple-400/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  </motion.div>
));

ProjectCard.displayName = "ProjectCard";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-black px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent"></div>

      <div className="absolute inset-0 bg-gradient-radial from-cyan-900/5 via-transparent to-purple-900/5"></div>

      {floatingElements.map((element, index) => (
        <FloatingElement key={index} {...element} />
      ))}

      <div className="relative max-w-7xl mx-auto">
        <div className="min-h-screen flex flex-col justify-center py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-20"
          >
            <motion.div
              animate={{
                background: [
                  "linear-gradient(45deg, #06b6d4, #8b5cf6)",
                  "linear-gradient(45deg, #8b5cf6, #06b6d4)",
                  "linear-gradient(45deg, #06b6d4, #8b5cf6)",
                ],
              }}
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
                className="text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text bg-300% animate-gradient"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
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
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              A showcase of my passion projects and professional work, crafted
              with dedication and modern technologies
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-7xl mx-auto"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mt-20 lg:mt-28"
          >
            <div className="relative bg-gradient-to-br from-gray-800/60 via-gray-900/40 to-black/60 backdrop-blur-xl border-2 border-gray-700/60 rounded-3xl p-10 lg:p-16 max-w-5xl mx-auto shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-purple-400/5 to-rose-400/5"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-rose-400/20 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <motion.h3
                  className="text-3xl lg:text-4xl font-bold text-white mb-6"
                  whileHover={{ scale: 1.05 }}
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
                    whileHover={{
                      scale: 1.08,
                      y: -5,
                      boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group/cta inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl text-white font-bold hover:shadow-2xl transition-all duration-500 relative overflow-hidden shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-700"></div>
                    <Github className="w-6 h-6 relative z-10 group-hover/cta:rotate-12 transition-transform duration-300" />
                    <span className="relative z-10">Follow on GitHub</span>
                  </motion.a>
                  <motion.a
                    href="#contact"
                    whileHover={{
                      scale: 1.08,
                      y: -5,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group/cta inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-gray-700/80 to-gray-800/80 hover:from-gray-600/90 hover:to-gray-700/90 rounded-2xl text-gray-200 hover:text-white font-bold border-2 border-gray-600/50 hover:border-gray-500/70 transition-all duration-500 relative overflow-hidden shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-700"></div>
                    <motion.span
                      className="relative z-10"
                      whileHover={{ letterSpacing: "0.05em" }}
                      transition={{ duration: 0.2 }}
                    >
                      Let's Work Together
                    </motion.span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}