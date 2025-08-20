"use client";

import React, { useState, useEffect, memo, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

const Footer = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  // Show back to top button when user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Memoized animation configurations
  const lineAnimation = useMemo(
    () => ({
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    }),
    []
  );

  const lineTransition = useMemo(
    () => ({
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }),
    []
  );

  const buttonVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.8, y: 20 },
      visible: { opacity: 1, scale: 1, y: 0 },
    }),
    []
  );

  return (
    <footer className="relative bg-gradient-to-b from-gray-950 to-black overflow-hidden">
      {/* Animated gradient line separator */}
      <div className="relative w-full h-px">
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(to_right,transparent,#22d3ee,#a855f7,#10b9814d,transparent)]"
          animate={lineAnimation}
          transition={lineTransition}
          style={{
            backgroundSize: "200% 100%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent blur-sm" />
      </div>

      {/* Footer content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 lg:py-12">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-gray-400 text-sm lg:text-base font-medium transition-colors duration-300 hover:text-gray-300"
              whileHover={{ scale: 1.02 }}
            >
              © {new Date().getFullYear()} Muhammad Wasay. All rights reserved.
            </motion.p>
          </motion.div>
        </div>

        {/* Back to top button */}
        <motion.button
          onClick={scrollToTop}
          variants={buttonVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          whileHover={{
            scale: 1.1,
            y: -3,
            boxShadow: "0 15px 30px rgba(6, 182, 212, 0.3)",
          }}
          whileTap={{ scale: 0.9 }}
          className="group fixed bottom-8 right-8 p-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl border-2 border-gray-600/40 rounded-xl text-white shadow-2xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20 z-50"
          title="Back to top"
        >
          {/* Background glow effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl blur-md"></span>

          {/* Button content */}
          <div className="relative z-10">
            <ChevronUp className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:-translate-y-0.5 duration-300" />
          </div>
        </motion.button>
      </div>

      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-gray-600/20 to-transparent" />
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
