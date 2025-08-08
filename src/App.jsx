import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Application from './pages/Application';
import Header from './components/Header';
import Footer from './components/Footer';
import LegalNotices from './pages/LegalNotices';
import Faq from './pages/Faq';
import Calendrier from './pages/Calendrier';
import Guide from './pages/Guide';
import Jeu from './pages/Jeu';
import Box from './pages/Box';
import Atelier from './pages/Atelier';
import ScrollToTop from './components/ScrollToTop';
import ScrollToHashElement from './components/ScrollToHashElement';
import Contact from './pages/Contact';

export default function App() {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-start mx-auto">

      <Router>
      <ScrollToHashElement />

        <Header />
        <main className="mx-auto w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/application" element={<Application />} />
            <Route path="/legalNotices" element={<LegalNotices />} />
            <Route path="/faqs" element={<Faq />} />
            <Route path="/calendrier" element={<Calendrier />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/jeu" element={<Jeu />} />
            <Route path="/box" element={<Box />} />
            <Route path="/atelier" element={<Atelier />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}