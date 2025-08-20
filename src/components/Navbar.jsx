"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const animations = {
  hamburger: { duration: 0.15, ease: "easeOut" },
  desktopMenu: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  mobileMenu: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
};

const styles = {
  desktop: "hidden sm:block fixed top-8 right-8 z-50 transition-all duration-300",
  mobile: "sm:hidden fixed top-6 right-6 z-50 transition-all duration-300",
  desktopHamburger: "w-12 h-12 rounded-full bg-gray-900/60 backdrop-blur-md border border-gray-700/20 flex items-center justify-center text-gray-300 hover:text-cyan-400 transition-all duration-300 shadow-lg shadow-black/20",
  desktopNav: "bg-gray-900/60 backdrop-blur-md border border-gray-700/20 rounded-2xl px-6 py-6 flex flex-col space-y-4 whitespace-nowrap min-w-max shadow-lg shadow-black/20",
  hamburgerBtn: "w-12 h-12 rounded-full bg-gray-900/80 backdrop-blur-md border border-gray-700/50 flex items-center justify-center text-gray-300 hover:text-cyan-400 transition-all duration-300 shadow-lg shadow-black/20",
  mobileNav: "bg-gray-900/90 backdrop-blur-md border border-gray-700/50 rounded-full px-4 py-3 flex items-center space-x-3 whitespace-nowrap min-w-max shadow-lg shadow-black/20",
  closeBtn: "w-7 h-7 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors duration-200 flex-shrink-0",
  navLink: {
    desktop: "text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-base px-2 text-center font-medium",
    mobile: "text-gray-300 hover:text-cyan-400 transition-colors duration-200 text-sm px-2"
  }
};

export default function Navbar() {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY && currentScrollY > 50 ? "down" : "up");
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isVisible = scrollDirection === "up" || lastScrollY < 50;
  const visibilityClass = isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full";

  const handleNavClick = (e, href) => {
    setIsMobileMenuOpen(false);
    setIsDesktopMenuOpen(false);
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDesktopMenu = () => setIsDesktopMenuOpen(!isDesktopMenuOpen);

  return (
    <>
      <header className={`${styles.desktop} ${visibilityClass}`}>
        <div className="relative">
          <motion.button
            onClick={toggleDesktopMenu}
            className={styles.desktopHamburger}
            animate={{ scale: isDesktopMenuOpen ? 0 : 1, opacity: isDesktopMenuOpen ? 0 : 1 }}
            transition={animations.hamburger}
          >
            <Menu className="w-6 h-6" />
          </motion.button>

          <AnimatePresence>
            {isDesktopMenuOpen && (
              <motion.div
                initial={{ scaleY: 0, opacity: 0, y: -10 }}
                animate={{ scaleY: 1, opacity: 1, y: 0 }}
                exit={{ scaleY: 0, opacity: 0, y: -10 }}
                transition={animations.desktopMenu}
                className="absolute top-0 right-0 origin-top"
              >
                <nav className={styles.desktopNav}>
                  {navItems.map(({ href, label }, index) => (
                    <motion.a
                      key={href}
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      className={styles.navLink.desktop}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      {label}
                    </motion.a>
                  ))}
                  <motion.button 
                    onClick={toggleDesktopMenu} 
                    className={styles.closeBtn}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <header className={`${styles.mobile} ${visibilityClass}`}>
        <div className="relative">
          <motion.button
            onClick={toggleMobileMenu}
            className={styles.hamburgerBtn}
            animate={{ scale: isMobileMenuOpen ? 0 : 1, opacity: isMobileMenuOpen ? 0 : 1 }}
            transition={animations.hamburger}
          >
            <Menu className="w-6 h-6" />
          </motion.button>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0, x: 10 }}
                animate={{ scaleX: 1, opacity: 1, x: 0 }}
                exit={{ scaleX: 0, opacity: 0, x: 10 }}
                transition={animations.mobileMenu}
                className="absolute top-0 right-0 origin-right"
              >
                <nav className={styles.mobileNav}>
                  {navItems.map(({ href, label }, index) => (
                    <motion.a
                      key={href}
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      className={styles.navLink.mobile}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.15 }}
                    >
                      {label}
                    </motion.a>
                  ))}
                  <motion.button 
                    onClick={toggleMobileMenu} 
                    className={styles.closeBtn}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05, duration: 0.15 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}