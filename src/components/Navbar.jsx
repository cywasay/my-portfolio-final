"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setIsVisible(
            currentScrollY <= lastScrollY.current || currentScrollY < 50
          );
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-6 right-6 z-50 transition-transform duration-200 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-cyan-400 shadow-lg transition-colors duration-150"
      >
        <Menu className="w-5 h-5" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20"
            onClick={() => setIsOpen(false)}
          />
          <nav className="absolute top-0 right-0 bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-xl min-w-max">
            <div className="flex flex-col space-y-3">
              {navItems.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="text-gray-300 hover:text-cyan-400 px-3 py-1 text-sm transition-colors duration-150"
                >
                  {label}
                </a>
              ))}
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-cyan-400 self-center mt-2 transition-colors duration-150"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
