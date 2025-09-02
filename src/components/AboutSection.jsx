"use client";

import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Code, Palette, Zap, Heart, BookOpen } from "lucide-react";

const SKILLS_DATA = [
  { name: "JavaScript", level: 85, color: "from-yellow-400 to-yellow-600" },
  { name: "React", level: 90, color: "from-blue-400 to-blue-600" },
  { name: "Next.js", level: 80, color: "from-purple-400 to-purple-600" },
  { name: "CSS/Tailwind", level: 88, color: "from-cyan-400 to-cyan-600" },
  { name: "Node.js", level: 75, color: "from-green-400 to-green-600" },
  { name: "TypeScript", level: 70, color: "from-blue-400 to-blue-600" },
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

const FloatingElement = memo(
  ({ color, size, duration, delay, position, animate }) => (
    <motion.div
      className={`absolute rounded-full ${size} ${
        color === "cyan"
          ? "border border-cyan-400/15 bg-gradient-to-br from-cyan-400/8 to-transparent"
          : color === "purple"
          ? "border border-purple-400/15 bg-gradient-to-br from-purple-400/8 to-transparent"
          : "border border-slate-400/15 bg-gradient-to-br from-slate-400/8 to-transparent"
      }`}
      style={{ ...position, transform: "translateZ(0)" }}
      animate={animate}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    />
  )
);

const TechLogos = {
  JavaScript: () => (
    <div className="w-5 h-5 bg-yellow-400 rounded flex items-center justify-center">
      <span className="text-black font-bold text-xs">JS</span>
    </div>
  ),
  React: () => (
    <div className="w-5 h-5 bg-blue-400 rounded flex items-center justify-center">
      <span className="text-white font-bold text-xs">R</span>
    </div>
  ),
  "Next.js": () => (
    <div className="w-5 h-5 bg-black rounded border border-white flex items-center justify-center">
      <span className="text-white font-bold text-xs">N</span>
    </div>
  ),
  "CSS/Tailwind": () => (
    <div className="w-5 h-5 bg-cyan-400 rounded flex items-center justify-center">
      <span className="text-white font-bold text-xs">C</span>
    </div>
  ),
  "Node.js": () => (
    <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center">
      <span className="text-white font-bold text-xs">N</span>
    </div>
  ),
  TypeScript: () => (
    <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
      <span className="text-white font-bold text-xs">T</span>
    </div>
  ),
};

const SkillBar = memo(({ skill, index }) => {
  const LogoComponent = TechLogos[skill.name];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-3">
          {LogoComponent && (
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
              viewport={{ once: true }}
            >
              <LogoComponent />
            </motion.div>
          )}
          <span className="text-gray-300 font-medium">{skill.name}</span>
        </div>
        <span className="text-gray-400 text-sm">{skill.level}%</span>
      </div>

      <div className="w-full bg-gray-900 rounded-full h-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
        />
      </div>
    </motion.div>
  );
});

const PassionCard = memo(({ passion, index }) => {
  const Icon = passion.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-cyan-400 transition-all duration-300 group"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{passion.title}</h3>
      <p className="text-gray-400 leading-relaxed">{passion.desc}</p>
    </motion.div>
  );
});

const InterestItem = memo(({ interest, index }) => {
  const Icon = interest.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="flex items-center space-x-3 bg-gray-800 rounded-lg px-4 py-3 hover:bg-gray-700 transition-all duration-200"
    >
      <Icon className="w-5 h-5 text-cyan-400" />
      <span className="text-gray-300">{interest.text}</span>
    </motion.div>
  );
});

export default function AboutSection() {
  const floatingElements = useMemo(
    () => [
      {
        color: "cyan",
        size: "w-16 h-16",
        duration: 15,
        delay: 0,
        position: { top: "20%", left: "8%" },
        animate: { x: [0, 30, 0], y: [0, -20, 0] },
      },
      {
        color: "purple",
        size: "w-12 h-12",
        duration: 18,
        delay: 1,
        position: { top: "60%", right: "12%" },
        animate: { x: [0, -25, 0], y: [0, 25, 0] },
      },
      {
        color: "slate",
        size: "w-10 h-10",
        duration: 20,
        delay: 2,
        position: { top: "40%", right: "25%" },
        animate: { x: [0, -20, 0], y: [0, -25, 0] },
      },
    ],
    []
  );

  return (
    <section
      id="about"
      className="relative bg-gradient-to-b from-black via-gray-900 to-gray-950 px-4 sm:px-6 lg:px-8"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {floatingElements.map((element, index) => (
        <FloatingElement key={index} {...element} />
      ))}

      <div className="relative max-w-6xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About{" "}
            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
              Me
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get to know the person behind the code
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 h-full">
              <h3 className="text-2xl font-bold text-white mb-6">My Journey</h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
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
                  contributing to open source, or enjoying a cup of coffee while
                  sketching out my next project.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 h-full">
              <h3 className="text-2xl font-bold text-white mb-6">
                Skills & Technologies
              </h3>
              <div className="space-y-4">
                {SKILLS_DATA.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            What Drives{" "}
            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
              Me
            </span>
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-8">Beyond Code</h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
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
    </section>
  );
}
