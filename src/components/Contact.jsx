"use client";

import React, { useState, memo, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  Sparkles,
} from "lucide-react";

// Simplified floating elements
const FloatingElement = memo(({ color, size, position, duration, delay }) => {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) return null;

  const colorMap = {
    cyan: "bg-cyan-500/10 border-cyan-400/20",
    purple: "bg-purple-500/10 border-purple-400/20",
    emerald: "bg-emerald-500/10 border-emerald-400/20"
  };

  return (
    <motion.div
      className={`absolute rounded-full border ${colorMap[color]} ${size}`}
      style={position}
      animate={{ 
        y: [0, -15, 0],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
});

FloatingElement.displayName = "FloatingElement";

// Contact data
const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: "Email",
    value: "gz2750114@gmail.com",
    href: "mailto:gz2750114@gmail.com",
    color: "cyan"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 (342) 5446567",
    href: "https://wa.me/923425446567",
    color: "purple"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Rawalpindi, Pakistan",
    href: "#",
    color: "emerald"
  }
];

const SOCIAL_LINKS = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/cywasay",
    color: "from-gray-600 to-gray-800"
  },
  {
    icon: Linkedin,
    label: "LinkedIn", 
    href: "#",
    color: "from-blue-500 to-blue-700"
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: "#", 
    color: "from-sky-400 to-sky-600"
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.595z"/>
      </svg>
    ),
    label: "WhatsApp",
    href: "https://wa.me/923425446567",
    color: "from-green-500 to-green-700"
  }
];

// Floating elements config
const floatingElements = [
  { color: "cyan", size: "w-12 h-12", position: { top: "15%", right: "10%" }, duration: 6, delay: 0 },
  { color: "purple", size: "w-16 h-16", position: { bottom: "20%", left: "8%" }, duration: 8, delay: 1 },
  { color: "emerald", size: "w-10 h-10", position: { top: "60%", right: "5%" }, duration: 7, delay: 2 }
];

// Contact form component
const ContactForm = memo(() => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  }, []);

  const inputClass = "w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClass}
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">Subject</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className={inputClass}
          placeholder="Project discussion"
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm font-medium mb-2">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder="Tell me about your project..."
        />
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
        className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isSubmitting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </>
        )}
      </motion.button>
    </form>
  );
});

ContactForm.displayName = "ContactForm";

// Contact info component
const ContactInfo = memo(() => {
  const shouldReduceMotion = useReducedMotion();

  const colorMap = {
    cyan: { icon: "text-cyan-400", bg: "bg-cyan-500/10" },
    purple: { icon: "text-purple-400", bg: "bg-purple-500/10" },
    emerald: { icon: "text-emerald-400", bg: "bg-emerald-500/10" }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2 text-cyan-400" />
          Get In Touch
        </h3>
        <p className="text-gray-400 leading-relaxed">
          I'm always open to discussing new opportunities and collaborations.
        </p>
      </div>

      <div className="space-y-4">
        {CONTACT_ITEMS.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={shouldReduceMotion ? {} : { x: 5 }}
            className={`flex items-center space-x-4 p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition-all duration-200 ${
              item.label !== "Location" ? "cursor-pointer" : ""
            }`}
            onClick={() => {
              if (item.label === "Email") window.location.href = item.href;
              if (item.label === "Phone") window.open(item.href, "_blank");
            }}
          >
            <div className={`p-2 rounded-lg ${colorMap[item.color].bg}`}>
              <item.icon className={`w-4 h-4 ${colorMap[item.color].icon}`} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">{item.label}</p>
              <p className="text-white font-medium">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-6 border-t border-gray-700">
        <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
        <div className="flex space-x-3">
          {SOCIAL_LINKS.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.1, y: -2 }}
              className={`p-3 bg-gradient-to-r ${social.color} rounded-lg text-white hover:shadow-lg transition-all duration-200`}
              title={social.label}
            >
              <social.icon />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
});

ContactInfo.displayName = "ContactInfo";

// Smooth loader component
const SmoothLoader = memo(({ children, delay = 0 }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!isLoaded) return <div className="opacity-0" />;

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

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="contact" className="relative bg-gradient-to-b from-gray-950 to-gray-900 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Simple background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-transparent" />

      {/* Floating elements */}
      {!shouldReduceMotion && floatingElements.map((element, index) => (
        <FloatingElement key={index} {...element} />
      ))}

      <div className="relative max-w-6xl mx-auto">
        <SmoothLoader>
          <div className="min-h-screen flex flex-col justify-center py-20">
            {/* Header */}
            <div className="text-center mb-16">
              <motion.div
                className="inline-block bg-gray-900 border border-gray-800 rounded-2xl px-6 py-3 mb-6"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-300 font-semibold">Let's Connect</span>
                </div>
              </motion.div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Contact{" "}
                <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                  Me
                </span>
              </h2>
              
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                Ready to bring your ideas to life? Let's start a conversation and build something amazing together.
              </p>
            </div>

            {/* Content Grid */}
            <SmoothLoader delay={200}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Contact Form */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                      <Mail className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Send a Message</h3>
                  </div>
                  <ContactForm />
                </div>

                {/* Contact Info */}
                <div>
                  <ContactInfo />
                  
                  {/* Availability Status */}
                  <SmoothLoader delay={400}>
                    <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-emerald-400 font-semibold text-sm">Available for Work</span>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Currently open to new opportunities and exciting projects!
                      </p>
                    </div>
                  </SmoothLoader>
                </div>
              </div>
            </SmoothLoader>
          </div>
        </SmoothLoader>
      </div>
    </section>
  );
}