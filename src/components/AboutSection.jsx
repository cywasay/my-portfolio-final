"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { Code, Palette, Zap, Heart, BookOpen } from "lucide-react";

// Memoized FloatingElement component
const FloatingElement = memo(
  ({ color, duration, delay, position, sizeClasses, animate }) => (
    <motion.div
      className={`absolute rounded-full border border-${color}-400/40 bg-gradient-to-br from-${color}-400/30 to-transparent shadow-lg shadow-${color}-400/20 ${sizeClasses}`}
      style={{ ...position, filter: "blur(8px)" }}
      animate={animate}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    />
  )
);
FloatingElement.displayName = "FloatingElement";

// Memoized Technology Logo Components
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

// Optimized constants - moved outside component to prevent recreation
const floatingElements = [
  {
    color: "cyan",
    sizeClasses: "w-12 h-12 sm:w-20 sm:h-20 lg:w-28 lg:h-28",
    duration: 22,
    delay: 0,
    position: { top: "20%", left: "8%" },
    animate: { x: [0, 80, 0, -40, 0], y: [0, -40, 80, 40, 0] },
  },
  {
    color: "purple",
    sizeClasses: "w-10 h-10 sm:w-16 sm:h-16 lg:w-22 lg:h-22",
    duration: 28,
    delay: 1.5,
    position: { top: "60%", right: "12%" },
    animate: { x: [0, -70, 50, 0], y: [0, 70, -30, 0] },
  },
  {
    color: "slate",
    sizeClasses: "w-8 h-8 sm:w-14 sm:h-14 lg:w-18 lg:h-18",
    duration: 32,
    delay: 3,
    position: { top: "35%", right: "25%" },
    animate: { x: [0, -50, 30, 0], y: [0, -60, 20, 0] },
  },
  {
    color: "cyan",
    sizeClasses: "w-14 h-14 sm:w-18 sm:h-18 lg:w-24 lg:h-24",
    duration: 26,
    delay: 2,
    position: { top: "75%", left: "15%" },
    animate: { x: [0, 60, -30, 0], y: [0, -50, 40, 0] },
  },
];

const gradients = {
  yellow: "from-yellow-400 to-yellow-600",
  blue: "from-blue-400 to-blue-600",
  purple: "from-purple-400 to-purple-600",
  cyan: "from-cyan-400 to-cyan-600",
  green: "from-green-400 to-green-600",
};

const getSkillGradientClasses = (color) =>
  gradients[color] || "from-gray-400 to-gray-600";

const skills = [
  { name: "JavaScript", level: 85, color: "yellow" },
  { name: "React", level: 90, color: "blue" },
  { name: "Next.js", level: 80, color: "purple" },
  { name: "CSS/Tailwind", level: 88, color: "cyan" },
  { name: "Node.js", level: 75, color: "green" },
  { name: "TypeScript", level: 70, color: "blue" },
];

const passions = [
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

const interests = [
  { icon: Zap, text: "MLBB gaming strategist 🎮" },
  { icon: Palette, text: "Sketch artist & creative mind 🎨" },
  { icon: BookOpen, text: "Avid reader & storyteller 📖" },
];

// Memoized SkillBar component with fixed glow effect
const SkillBar = memo(({ skill, index }) => {
  const LogoComponent = TechLogos[skill.name];
  const gradientClass = getSkillGradientClasses(skill.color);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="mb-4 lg:mb-6 group cursor-pointer"
    >
      <div className="flex justify-between items-center mb-2 lg:mb-3">
        <div className="flex items-center space-x-3">
          {LogoComponent && (
            <div className="flex items-center justify-center">
              <LogoComponent />
            </div>
          )}
          <span className="text-gray-300 font-medium text-base lg:text-lg">
            {skill.name}
          </span>
        </div>
        <span className="text-gray-400 text-sm lg:text-base">
          {skill.level}%
        </span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2 lg:h-3 overflow-visible">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className={`h-full bg-gradient-to-r ${gradientClass} rounded-full relative transition-all duration-300 group-hover:shadow-lg`}
          style={{
            boxShadow: "0 0 0px transparent",
          }}
          onMouseEnter={(e) => {
            const colors = {
              yellow: "0 0 12px rgba(250, 204, 21, 0.8)",
              blue: "0 0 12px rgba(96, 165, 250, 0.8)",
              purple: "0 0 12px rgba(168, 85, 247, 0.8)",
              cyan: "0 0 12px rgba(34, 211, 238, 0.8)",
              green: "0 0 12px rgba(74, 222, 128, 0.8)",
            };
            e.currentTarget.style.boxShadow =
              colors[skill.color] || "0 0 12px rgba(107, 114, 128, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 0px transparent";
          }}
        >
          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
        </motion.div>
      </div>
    </motion.div>
  );
});
SkillBar.displayName = "SkillBar";

// Memoized PassionCard component
const PassionCard = memo(({ passion, index }) => {
  const Icon = passion.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.05, rotateX: 5 }}
      className="relative bg-gradient-to-br from-gray-800/60 via-gray-900/40 to-black/60 backdrop-blur-md border border-gray-600/30 rounded-2xl p-6 lg:p-10 hover:border-cyan-400/60 transition-all duration-500 group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>

      <div className="relative z-10">
        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-cyan-400/30 to-purple-400/30 rounded-2xl flex items-center justify-center mb-6 lg:mb-8 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
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

// Memoized InterestItem component
const InterestItem = memo(({ interest, index }) => {
  const Icon = interest.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      className="flex items-center space-x-3 bg-gray-800/30 rounded-lg px-4 lg:px-6 py-3 lg:py-4 hover:bg-gray-700/30 transition-all duration-300"
    >
      <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-cyan-400" />
      <span className="text-gray-300 text-base lg:text-lg">
        {interest.text}
      </span>
    </motion.div>
  );
});
InterestItem.displayName = "InterestItem";

// Main component with optimizations
export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-b from-black via-gray-900 to-gray-950 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent"></div>

      {floatingElements.map((element, index) => (
        <FloatingElement key={index} {...element} />
      ))}

      <div className="relative max-w-7xl mx-auto">
        <div className="min-h-screen flex flex-col justify-center py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
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
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 lg:p-10 h-full">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 lg:mb-8">
                  Skills & Technologies
                </h3>
                <div className="space-y-4 lg:space-y-6">
                  {skills.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
              {passions.map((passion, index) => (
                <PassionCard
                  key={passion.title}
                  passion={passion}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-8 lg:mb-12">
              Beyond Code
            </h3>
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 max-w-3xl mx-auto">
              {interests.map((interest, index) => (
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
