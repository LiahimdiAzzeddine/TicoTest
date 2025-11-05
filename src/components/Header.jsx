import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useCart } from "../contexts/CartContext";
import OrderSummary from "./OrderSummary";

export default function Header() {
  const location = useLocation();
  const { cart } = useCart();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
const cartCount = cart.maison.reduce((acc, item) => acc + item.qty, 0) +
                  cart.ecole.reduce((acc, item) => acc + 1, 0);

  const path = location.pathname;
  const hash = location.hash;
  const navigationItems = [
    { name: "L'application", path: "/application/" },
    { name: "À la maison", path: "/athome" },
    { name: "À l'école", path: "/atschool" },
    { name: "Au travail", path: "atwork" },
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

  useEffect(() => {
    if (path !== '/calendrier') return;
    const handleScroll = () => {
      const sections = ['calendrier', 'guide', 'jeu', 'box', 'atelier'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [path]);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsMobileMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className={`bg-white/95 backdrop-blur-sm border-b border-orange-400 px-3 sm:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-sm ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex items-center justify-between max-w-screen-lg md:max-w-screen-xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 transition-transform duration-200 hover:scale-105">
            <img src="/images/tico.webp" className="w-20 md:w-24 lg:w-28 2xl:w-36 h-auto" alt="TiCO logo" loading="eager" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-6">
            {navigationItems.map((item) => {
              let isActive = false;
              if (path === "/calendrier") {
                if (item.path === "/calendrier") isActive = activeSection === 'calendrier';
                else if (item.path.includes('#')) {
                  const sectionName = item.path.split('#')[1];
                  isActive = activeSection === sectionName;
                }
              } else {
                isActive = item.path.includes(path) && path !== '/';
              }
              return item.external ? (
                <a key={item.name} href={item.path} target="_blank" rel="noopener noreferrer"
                   className="text-sm lg:text-base xl:text-lg 2xl:text-xl font-medium text-[#0a548d] hover:text-[#ff8300] transition-all duration-200 ClashDisplayBold px-2 py-1 rounded-md hover:bg-orange-50 whitespace-nowrap">
                  {item.name}
                </a>
              ) : (
                <HashLink key={item.name} to={item.path}
                          className={`text-sm lg:text-base xl:text-lg 2xl:text-xl font-medium transition-all duration-200 ClashDisplayBold px-2 py-1 rounded-md whitespace-nowrap ${
                            isActive ? "text-[#ff8300] bg-orange-50" : "text-[#0a548d] hover:text-[#ff8300] hover:bg-orange-50"
                          }`}>
                  {item.name}
                </HashLink>
              );
            })}
          </nav>

          {/* Cart Desktop */}
          <div className="relative ml-4 hidden md:block">
            <button
              onClick={() => setIsOrderSummaryOpen(true)}
              className="relative focus:outline-none hover:scale-110 transition-transform"
              aria-label="Ouvrir le panier"
            >
              <img src={"/images/caddieorange.png"} alt="Panier" className="w-9 h-9 object-contain" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0a548d] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Cart & Menu Button Container */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Cart Mobile (visible dans le header) */}
            <button
              onClick={() => setIsOrderSummaryOpen(true)}
              className="relative focus:outline-none hover:scale-110 transition-transform"
              aria-label="Ouvrir le panier"
            >
              <img src={"/images/caddieorange.png"} alt="Panier" className="w-7 h-7 object-contain" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0a548d] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="text-[#0a548d] hover:text-[#ff8300] transition-all duration-200 p-2 rounded-md hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50"
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
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={closeMobileMenu}></div>

        {/* Menu Panel */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>

          {/* Header du menu mobile */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <img src="/images/tico.webp" className="w-24 h-auto" alt="TiCO logo" />

            <button onClick={closeMobileMenu}
                    className="text-gray-500 hover:text-[#ff8300] transition-colors p-2 rounded-md hover:bg-gray-100"
                    aria-label="Fermer le menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation mobile */}
          <nav className="flex flex-col p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-100px)]">
            {navigationItems.map((item, index) => {
              let isActive = false;
              if (path === "/calendrier") {
                if (item.path === "/calendrier") isActive = activeSection === 'calendrier';
                else if (item.path.includes('#')) {
                  const sectionName = item.path.split('#')[1];
                  isActive = activeSection === sectionName;
                }
              } else {
                isActive = item.path.includes(path) && path !== '/';
              }

              return item.external ? (
                <a
                  key={item.name}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="text-base font-medium text-[#0a548d] hover:text-[#ff8300] px-4 py-3 rounded-lg transition-all duration-200 hover:bg-orange-50 border-l-4 border-transparent hover:border-orange-300 transform hover:translate-x-1 ClashDisplayBold"
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
                <HashLink
                  key={item.name}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`text-base font-medium px-4 py-3 rounded-lg transition-all duration-200 border-l-4 transform hover:translate-x-1 ClashDisplayBold ${
                    isActive ? 'text-[#ff8300] bg-orange-50 border-orange-300'
                             : 'text-[#0a548d] hover:text-[#ff8300] hover:bg-orange-50 border-transparent hover:border-orange-300'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </HashLink>
              )
            })}
          </nav>

          {/* Footer du menu mobile */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">© 2024 TiCO - Tous droits réservés</p>
          </div>
        </div>
      </div>

      {/* Order Summary Modal */}
      <OrderSummary
        isOpen={isOrderSummaryOpen}
        onClose={() => setIsOrderSummaryOpen(false)}
      />
    </>
  );
}
