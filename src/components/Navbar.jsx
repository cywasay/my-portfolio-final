"use client";

import { useState, useEffect, useCallback, memo, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

// keep variants outside so they're not recreated
const variants = {
  button: {
    open: { scale: 0, opacity: 0, transition: { duration: 0.15 } },
    closed: { scale: 1, opacity: 1, transition: { duration: 0.15 } },
  },
  menu: {
    desktop: {
      closed: { scaleY: 0, opacity: 0, y: -10 },
      open: { scaleY: 1, opacity: 1, y: 0 },
    },
    mobile: {
      closed: { scaleX: 0, opacity: 0, x: 10 },
      open: { scaleX: 1, opacity: 1, x: 0 },
    },
  },
};

const NavLink = memo(({ href, label, onClick, className }) => (
  <motion.a
    href={href}
    onClick={onClick}
    className={className}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    style={{ transform: "translateZ(0)" }}
  >
    {label}
  </motion.a>
));

const MenuContent = memo(({ isMobile, onClose, handleNavClick }) => (
  <motion.nav
    className={`${
      isMobile
        ? "bg-gray-900/95 border border-gray-700/50 rounded-full px-4 py-3 flex items-center space-x-3"
        : "bg-gray-900/95 border border-gray-700/30 rounded-2xl px-6 py-6 flex flex-col space-y-4"
    } whitespace-nowrap min-w-max shadow-lg shadow-black/20`}
    style={{ transform: "translateZ(0)" }}
  >
    {navItems.map(({ href, label }) => (
      <NavLink
        key={href}
        href={href}
        label={label}
        onClick={(e) => handleNavClick(e, href)}
        className={`text-gray-300 hover:text-cyan-400 ${
          isMobile ? "text-sm px-2" : "text-base px-2 text-center font-medium"
        }`}
      />
    ))}
    <motion.button
      onClick={onClose}
      className="w-7 h-7 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-400 hover:text-cyan-400 flex-shrink-0"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ transform: "translateZ(0)" }}
    >
      <X className="w-4 h-4" />
    </motion.button>
  </motion.nav>
));

export default function Navbar() {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Optimized scroll handler
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrollDirection(
            currentScrollY > lastScrollY.current && currentScrollY > 50
              ? "down"
              : "up"
          );
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isVisible = scrollDirection === "up" || lastScrollY.current < 50;

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsDesktopMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return (
    <>
      {/* Desktop */}
      <header
        className="hidden sm:block fixed top-8 right-8 z-50 transition-transform duration-300"
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(-100%)",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.button
          onClick={() => setIsDesktopMenuOpen((p) => !p)}
          className="w-12 h-12 rounded-full bg-gray-900/90 border border-gray-700/30 flex items-center justify-center text-gray-300 hover:text-cyan-400 shadow-lg shadow-black/20"
          variants={variants.button}
          animate={isDesktopMenuOpen ? "open" : "closed"}
          style={{ transform: "translateZ(0)" }}
        >
          <Menu className="w-6 h-6" />
        </motion.button>

        <AnimatePresence>
          {isDesktopMenuOpen && (
            <motion.div
              variants={variants.menu.desktop}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute top-0 right-0 origin-top"
              style={{ transform: "translateZ(0)" }}
            >
              <MenuContent
                isMobile={false}
                onClose={() => setIsDesktopMenuOpen(false)}
                handleNavClick={handleNavClick}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile */}
      <header
        className="sm:hidden fixed top-6 right-6 z-50 transition-transform duration-300"
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(-100%)",
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.button
          onClick={() => setIsMobileMenuOpen((p) => !p)}
          className="w-12 h-12 rounded-full bg-gray-900/90 border border-gray-700/50 flex items-center justify-center text-gray-300 hover:text-cyan-400 shadow-lg shadow-black/20"
          variants={variants.button}
          animate={isMobileMenuOpen ? "open" : "closed"}
          style={{ transform: "translateZ(0)" }}
        >
          <Menu className="w-6 h-6" />
        </motion.button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={variants.menu.mobile}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute top-0 right-0 origin-right"
              style={{ transform: "translateZ(0)" }}
            >
              <MenuContent
                isMobile={true}
                onClose={() => setIsMobileMenuOpen(false)}
                handleNavClick={handleNavClick}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
