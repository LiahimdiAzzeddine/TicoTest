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
import ScrollToHashElement from './components/ScrollToHashElement';
import Contact from './pages/Contact';
import ChangePassword from './pages/ChangePassword';
import EmailValidation from './pages/EmailValidation';
import { SelectedIndexProvider } from './contexts/SelectedIndexProvider';
import Inscription from './pages/Inscription';
import AtHome from './pages/AtHome';
import Cart from './pages/Cart';
import AtSchool from './pages/AtSchool';
import Organizations from './pages/Organizations';
import Organization from './pages/Organization';
import { CartProvider } from './contexts/CartContext';
import CartSummary from './components/CartSummary';
import CheckoutEcole from './pages/CheckoutEcole';
import CheckoutMaison from './pages/CheckoutMaison';
import { Toaster } from 'react-hot-toast';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import Atwork from './pages/Atwork';

export default function App() {
  return (
    <CartProvider>
    <Toaster />
    <SelectedIndexProvider>
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
              <Route path="/athome" element={<AtHome />} />
               <Route path="/atwork" element={<Atwork />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/atschool" element={<AtSchool />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/jeu" element={<Jeu />} />
              <Route path="/box" element={<Box />} />
              <Route path="/atelier" element={<Atelier />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/inscription" element={<Inscription />} />
              <Route path="/organizations" element={<Organizations />} />
              <Route path="/checkoutEcole" element={<CheckoutEcole />} />
              <Route path="/checkoutMaison" element={<CheckoutMaison />} />
              <Route path="/organization/:id" element={<Organization />} />
              <Route path="/cartSummary" element={<CartSummary />} />
              <Route path="/tico/change_password" element={<ChangePassword />} />
              <Route path="/tico/validation/:token" element={<EmailValidation />} />

              <Route path="/paiement-reussi" element={<PaymentSuccess />} />
              <Route path="/paiement-annule" element={<PaymentCancel />} />
            </Routes>

          
          </main>
          <Footer />
        </Router>
      </div></SelectedIndexProvider>
  </CartProvider>
  );
}