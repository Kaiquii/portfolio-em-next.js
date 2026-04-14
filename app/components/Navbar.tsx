"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ui/ThemeToogle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "#person" },
    { name: "Sobre", href: "#about" },
    { name: "Projetos", href: "#projects" },
    { name: "Repositórios", href: "#github-repos" },
    { name: "Recomendações", href: "#testimonials" },
    { name: "Contatos", href: "#contacts" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled
          ? "bg-white/95 dark:bg-black/95 backdrop-blur-md shadow-lg py-3 border-b border-black/5 dark:border-white/5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-pink z-50 text-black dark:text-white"
        >
          <h1>kaiqui.dev</h1>
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex gap-8">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-black dark:text-white text-base font-medium hover:text-pink dark:hover:text-pink relative group py-2"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 z-50">
          <ThemeToggle />

          <button
            className="lg:hidden flex flex-col justify-around w-10 h-10 p-2 relative focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir Menu"
          >
            <span
              className={`block w-full h-0.75 rounded ${
                isOpen
                  ? "rotate-45 translate-y-2.5 bg-pink"
                  : "bg-black dark:bg-white"
              }`}
            />
            <span
              className={`block w-full h-0.75 rounded ${
                isOpen ? "opacity-0" : "bg-black dark:bg-white"
              }`}
            />
            <span
              className={`block w-full h-0.75 rounded ${
                isOpen
                  ? "-rotate-45 -translate-y-2.5 bg-pink"
                  : "bg-black dark:bg-white"
              }`}
            />
          </button>
        </div>

        <div
          className={`fixed top-0 left-0 w-full h-dvh bg-white dark:bg-black flex flex-col items-center justify-center gap-8 lg:hidden z-40 ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
        >
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-2xl font-bold text-black dark:text-white hover:text-pink dark:hover:text-pink"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
