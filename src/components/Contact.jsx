"use client";

import React, { useState, memo, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// Memoized WhatsApp icon component
const WhatsAppIcon = memo(() => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300"
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.595z" />
  </svg>
));
WhatsAppIcon.displayName = "WhatsAppIcon";

// Animation variants to prevent recreation
const formVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const infoVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const socialVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

const headerVariants = {
  badge: { opacity: 0, y: 20 },
  title: { opacity: 0, y: 30 },
  subtitle: { opacity: 0 },
};

const ContactForm = memo(() => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
  }, []);

  // Memoized input class
  const inputClassName = useMemo(() => 
    "w-full px-5 py-4 bg-gray-800/50 border-2 border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400/70 focus:bg-gray-800/70 transition-all duration-300 outline-none backdrop-blur-sm",
    []
  );

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial="hidden"
      whileInView="visible"
      variants={formVariants}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <label className="block text-gray-300 text-sm font-semibold mb-2">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputClassName}
            placeholder="John Doe"
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <label className="block text-gray-300 text-sm font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputClassName}
            placeholder="john@example.com"
          />
        </motion.div>
      </div>

      <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
        <label className="block text-gray-300 text-sm font-semibold mb-2">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className={inputClassName}
          placeholder="Let's discuss your project"
        />
      </motion.div>

      <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
        <label className="block text-gray-300 text-sm font-semibold mb-2">
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className={`${inputClassName} resize-none`}
          placeholder="Tell me about your project or just say hello..."
        />
      </motion.div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{
          scale: 1.02,
          y: -2,
        }}
        whileTap={{ scale: 0.98 }}
        className="group relative w-full px-8 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white font-medium text-lg overflow-hidden transition-all duration-300 hover:bg-gray-700/50 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out blur-md transform scale-110"></span>
        <span className="relative z-10 flex items-center justify-center gap-3">
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5 transition-transform group-hover:rotate-12 duration-300" />
              <span>Send Message</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:scale-110 duration-300" />
            </>
          )}
        </span>
      </motion.button>
    </motion.form>
  );
});

ContactForm.displayName = "ContactForm";

const ContactInfo = memo(() => {
  // Memoized contact items to prevent recreation
  const contactItems = useMemo(() => [
    {
      icon: Mail,
      label: "Email",
      value: "gz2750114@gmail.com",
      href: "mailto:gz2750114@gmail.com?subject=Hello&body=Hi there!",
      color: "cyan",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+92 (342) 5446567",
      href: "https://wa.me/923425446567?text=Hello! I would like to get in touch with you.",
      color: "purple",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Rawalpindi, Pakistan",
      href: "#",
      color: "emerald",
    },
  ], []);

  // Memoized social links
  const socialLinks = useMemo(() => [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/cywasay",
      color: "from-gray-600 to-gray-800",
      isExternal: true,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "#",
      color: "from-blue-500 to-blue-700",
      isExternal: true,
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "#",
      color: "from-sky-400 to-sky-600",
      isExternal: true,
    },
    {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      href: "https://wa.me/923425446567?text=Hello! I would like to get in touch with you.",
      color: "from-green-500 to-green-700",
      isExternal: false,
    },
  ], []);

  const handleContactClick = useCallback((item) => {
    if (item.label === "Phone") {
      window.open(item.href, "_blank");
    } else if (item.label === "Email") {
      window.location.href = item.href;
    }
  }, []);

  const handleSocialClick = useCallback((social, e) => {
    if (social.label === "WhatsApp") {
      e.preventDefault();
      window.open(social.href, "_blank");
    }
  }, []);

  // Memoized gradient classes
  const getIconGradient = useCallback((color) => {
    switch (color) {
      case "cyan": return "from-cyan-500/20 to-cyan-600/20";
      case "purple": return "from-purple-500/20 to-purple-600/20";
      default: return "from-emerald-500/20 to-emerald-600/20";
    }
  }, []);

  const getIconColor = useCallback((color) => {
    switch (color) {
      case "cyan": return "text-cyan-400";
      case "purple": return "text-purple-400";
      default: return "text-emerald-400";
    }
  }, []);

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      whileInView="visible"
      variants={infoVariants}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <MessageCircle className="w-6 h-6 mr-3 text-cyan-400" />
          Get In Touch
        </h3>
        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          I'm always open to discussing new opportunities, collaborations, or
          just having a friendly chat about technology and development.
        </p>
      </div>

      <div className="space-y-4">
        {contactItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial="hidden"
            whileInView="visible"
            variants={itemVariants}
            transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
            whileHover={{
              scale: 1.03,
              x: 10,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
            className={`group flex items-center space-x-4 p-5 bg-gray-800/40 hover:bg-gray-800/60 border border-gray-600/30 hover:border-gray-500/50 rounded-xl transition-all duration-300 backdrop-blur-sm ${
              item.label !== "Location" ? "cursor-pointer" : ""
            }`}
            onClick={() =>
              item.label !== "Location" && handleContactClick(item)
            }
          >
            <div
              className={`p-3 rounded-lg bg-gradient-to-r ${getIconGradient(item.color)} group-hover:scale-110 transition-transform duration-300`}
            >
              <item.icon className={`w-5 h-5 ${getIconColor(item.color)}`} />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">{item.label}</p>
              <p
                className={`text-white font-semibold group-hover:text-cyan-200 transition-colors duration-300 ${
                  item.label !== "Location" ? "hover:underline" : ""
                }`}
              >
                {item.value}
              </p>
              {item.label === "Phone" && (
                <p className="text-xs text-gray-500 mt-1">
                  Click to open WhatsApp
                </p>
              )}
              {item.label === "Email" && (
                <p className="text-xs text-gray-500 mt-1">
                  Click to send email
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-8 border-t border-gray-700/50">
        <h4 className="text-lg font-semibold text-white mb-6">
          Connect With Me
        </h4>
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.isExternal ? social.href : "#"}
              target={social.isExternal ? "_blank" : "_self"}
              rel={social.isExternal ? "noopener noreferrer" : undefined}
              onClick={(e) => handleSocialClick(social, e)}
              initial="hidden"
              whileInView="visible"
              variants={socialVariants}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
              whileHover={{
                scale: 1.15,
                y: -5,
                boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
              }}
              whileTap={{ scale: 0.9 }}
              className={`p-4 bg-gradient-to-r ${social.color} rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden cursor-pointer`}
              title={social.label}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
              <social.icon />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

ContactInfo.displayName = "ContactInfo";

// Memoized floating elements data
const floatingContactElements = [
  {
    color: "cyan",
    size: "w-16 h-16",
    position: { top: "10%", right: "10%" },
    animate: {
      x: [0, 30, -15, 0],
      y: [0, -25, 15, 0],
      rotate: [0, 180, 360],
    },
    duration: 8,
    delay: 0,
  },
  {
    color: "purple",
    size: "w-12 h-12",
    position: { bottom: "15%", left: "8%" },
    animate: {
      x: [0, -25, 20, 0],
      y: [0, 30, -10, 0],
      rotate: [0, -90, 270, 0],
    },
    duration: 6,
    delay: 1,
  },
  {
    color: "emerald",
    size: "w-20 h-20",
    position: { top: "60%", right: "5%" },
    animate: {
      x: [0, -20, 35, 0],
      y: [0, -35, 20, 0],
      rotate: [0, 90, 180, 360],
    },
    duration: 10,
    delay: 0.5,
  },
];

const FloatingContactElement = memo(
  ({ color, size, position, animate, duration, delay }) => {
    // Memoized gradient style
    const gradientStyle = useMemo(() => ({
      ...position,
      background: `radial-gradient(circle, ${
        color === "cyan"
          ? "rgba(6, 182, 212, 0.3)"
          : color === "purple"
          ? "rgba(139, 92, 246, 0.3)"
          : "rgba(16, 185, 129, 0.3)"
      } 0%, transparent 70%)`,
      filter: "blur(15px)",
    }), [color, position]);

    const transitionConfig = useMemo(() => ({
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
      repeatType: "reverse",
    }), [duration, delay]);

    return (
      <motion.div
        className={`absolute ${size} rounded-full opacity-20 pointer-events-none`}
        style={gradientStyle}
        animate={animate}
        transition={transitionConfig}
      />
    );
  }
);

FloatingContactElement.displayName = "FloatingContactElement";

export default function Contact() {
  // Memoized background position animation
  const backgroundAnimation = useMemo(() => ({
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  }), []);

  const backgroundTransition = useMemo(() => ({
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }), []);

  // Memoized availability pulse animation
  const pulseAnimation = useMemo(() => ({
    scale: [1, 1.5, 1],
    opacity: [1, 0, 1],
  }), []);

  const pulseTransition = useMemo(() => ({
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  }), []);

  return (
    <section
      id="contact"
      className="relative bg-gradient-to-b from-black via-gray-900 to-gray-950 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-purple-900/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/20 via-transparent to-transparent"></div>

      {/* Floating elements */}
      {floatingContactElements.map((element, index) => (
        <FloatingContactElement key={index} {...element} />
      ))}

      <div className="relative max-w-7xl mx-auto py-20 lg:py-32 min-h-screen flex flex-col justify-center">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <div className="text-center">
            <motion.div
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-800/60 to-gray-900/60 border border-gray-600/40 rounded-full mb-8 backdrop-blur-sm"
              initial="badge"
              whileInView={{ opacity: 1, y: 0 }}
              variants={headerVariants}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-300 font-semibold">Let's Connect</span>
            </motion.div>

            <motion.h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              initial="title"
              whileInView={{ opacity: 1, y: 0 }}
              variants={headerVariants}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Contact{" "}
              <motion.span
                className="text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text"
                animate={backgroundAnimation}
                transition={backgroundTransition}
              >
                Me
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-gray-400 text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
              initial="subtitle"
              whileInView={{ opacity: 1 }}
              variants={headerVariants}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Ready to bring your ideas to life? Let's start a conversation and
              build something amazing together
            </motion.p>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Contact Form */}
          <motion.div
            className="relative bg-gradient-to-br from-gray-800/60 via-gray-900/40 to-black/60 backdrop-blur-xl border-2 border-gray-600/40 rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-purple-400/5 to-transparent"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-cyan-400/15 to-purple-400/15 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-8">
                <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl">
                  <Mail className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white">
                  Send a Message
                </h3>
              </div>
              <ContactForm />
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ContactInfo />

            {/* Availability Status */}
            <motion.div
              className="mt-12 p-6 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-500/30 rounded-2xl backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <motion.div
                    className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full"
                    animate={pulseAnimation}
                    transition={pulseTransition}
                  />
                </div>
                <span className="text-emerald-400 font-semibold">
                  Available for Work
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Currently open to new opportunities and exciting projects. Let's
                discuss how we can work together!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}