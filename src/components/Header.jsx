import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const path = location.pathname;
  const hash = location.hash;
  const navigationItems = [
    { name: "Application", path: "/application/" },
    { name: "Calendrier", path: "/calendrier" },
    { name: "Guide", path: "/calendrier#guide" },
    { name: "Jeu", path: "/calendrier#jeu" },
    { name: "Box", path: "/calendrier#box" },
    { name: "Atelier", path: "/calendrier#atelier" },
    {
      name: "Crowdfunding",
      path: "https://app.mymoojo.com/project/tico",
      external: true,
    },
  ];

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // Fermer le menu mobile quand on redimensionne vers desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className={`bg-white/95 backdrop-blur-sm border-b border-orange-400 px-3 sm:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-sm ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex items-center justify-between max-w-screen-lg md:max-w-screen-xl mx-auto">


          {/* Logo - Amélioré pour mobile */}
          <Link to="/" className="flex-shrink-0 transition-transform duration-200 hover:scale-105">
            <img
              src="/images/tico.webp"
              className="w-20 md:w-24 lg:w-28 2xl:w-36 h-auto"
              alt="TiCO logo"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation - Amélioré */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-6">
      {navigationItems.map((item) => {
        const isActive =
          path === "/calendrier"
            ? item.path === `/calendrier${hash}`
            : item.path.includes(path) && path!='/';

        return item.external ? (
          <a
            key={item.name}
            href={item.path}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm lg:text-base xl:text-lg 2xl:text-xl font-medium text-[#0a548d] hover:text-[#ff8300] transition-all duration-200 ClashDisplayBold px-2 py-1 rounded-md hover:bg-orange-50 whitespace-nowrap"
          >
            {item.name}
          </a>
        ) : (
          <Link
            key={item.name}
            to={item.path}
            className={`text-sm lg:text-base xl:text-lg 2xl:text-xl font-medium transition-all duration-200 ClashDisplayBold px-2 py-1 rounded-md whitespace-nowrap ${
              isActive
                ? "text-[#ff8300] bg-orange-50"
                : "text-[#0a548d] hover:text-[#ff8300] hover:bg-orange-50"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>

          {/* Mobile Menu Button - Amélioré */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-[#0a548d] hover:text-[#ff8300] transition-all duration-200 p-2 rounded-md hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="relative w-6 h-6">
              <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
              <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 top-3 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay - Complètement revu */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={closeMobileMenu}
        ></div>

        {/* Menu Panel */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>

          {/* Header du menu mobile */}
          <div className="flex items-center justify-between p-4 ">
            <img
              src="/images/tico.webp"
                         className="w-24 sm:w-40 md:w-36 lg:w-36 2xl:w-40 h-auto"
              alt="TiCO logo"
            />
            <button
              onClick={closeMobileMenu}
              className="text-gray-500 hover:text-[#ff8300] transition-colors p-2 rounded-md hover:bg-gray-100"
              aria-label="Fermer le menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation mobile */}
          <nav className="flex flex-col p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-100px)]">
            {navigationItems.map((item, index) =>
              item.external ? (
                <a
                  key={item.name}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className={`text-base font-medium text-[#0a548d] hover:text-[#ff8300] px-4 py-3 rounded-lg transition-all duration-200 hover:bg-orange-50 border-l-4 border-transparent hover:border-orange-300 transform hover:translate-x-1 ClashDisplayBold`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    {item.name}
                    <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`text-base font-medium px-4 py-3 rounded-lg transition-all duration-200 border-l-4 transform hover:translate-x-1 ClashDisplayBold ${
                    location.pathname === item.path
                      ? 'text-[#ff8300] bg-orange-50 border-orange-300'
                      : 'text-[#0a548d] hover:text-[#ff8300] hover:bg-orange-50 border-transparent hover:border-orange-300'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Footer du menu mobile */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              © 2024 TiCO - Tous droits réservés
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
