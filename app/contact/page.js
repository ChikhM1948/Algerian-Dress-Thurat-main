"use client";

import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Navbar from "../components/Navbar ";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setSubmitted(false);
    }, 3000);
  };

  const products = []; // Empty array for Footer component

  return (
    <div className="min-h-screen bg-[#FFF0F3] text-black">
      {/* Navbar Component */}
      <Navbar 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gradient-to-r from-[#D8315B] to-[#FF8BA7] overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Contactez-nous
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              Nous sommes à votre écoute pour toutes vos questions sur nos tenues traditionnelles
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-[#D8315B] mb-6">Nos Coordonnées</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#FF8BA7] mb-8">
              <div className="flex items-start mb-4">
                <FaMapMarkerAlt className="text-[#D8315B] text-xl mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold text-lg">Adresse</h3>
                  <p className="text-gray-700">Rue des Artisans, Centre ville</p>
                  <p className="text-gray-700">Relizane, Algérie 48000</p>
                </div>
              </div>
              
              <div className="flex items-start mb-4">
                <FaPhone className="text-[#D8315B] text-xl mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold text-lg">Téléphone</h3>
                  <p className="text-gray-700">+213 123 456 789</p>
                  <p className="text-gray-700">+213 987 654 321</p>
                </div>
              </div>
              
              <div className="flex items-start mb-4">
                <FaEnvelope className="text-[#D8315B] text-xl mt-1 mr-4" />
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-700">contact@algeriandress.com</p>
                  <p className="text-gray-700">info@algeriandress.com</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-2">Suivez-nous</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-[#D8315B] hover:text-[#FF8BA7] transition duration-300">
                    <FaFacebook className="text-2xl" />
                  </a>
                  <a href="#" className="text-[#D8315B] hover:text-[#FF8BA7] transition duration-300">
                    <FaInstagram className="text-2xl" />
                  </a>
                  <a href="#" className="text-[#D8315B] hover:text-[#FF8BA7] transition duration-300">
                    <FaTwitter className="text-2xl" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Google Map */}
            <div className="bg-white p-4 rounded-lg shadow-md border border-[#FF8BA7] h-80">
              <h3 className="font-semibold text-lg mb-2 text-[#D8315B]">Notre Emplacement</h3>
              <div className="h-64 w-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103514.61477716054!2d0.5000748757922864!3d35.73773519374096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1281c5a3611b9bcf%3A0xd7c44f6eb555b401!2sRelizane!5e0!3m2!1sfr!2sdz!4v1710018862979!5m2!1sfr!2sdz" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded"
                ></iframe>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-[#D8315B] mb-6">Envoyez-nous un Message</h2>
            
            {submitted ? (
              <div className="bg-white p-8 rounded-lg shadow-md border border-[#FF8BA7] text-center">
                <div className="w-16 h-16 bg-[#FFF0F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#D8315B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#D8315B] mb-2">Message Envoyé</h3>
                <p className="text-gray-700 mb-4">
                  Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-[#FF8BA7]">
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Nom complet</label>
                    <input 
                      type="text" 
                      name="name" 
                      className="w-full p-2 border border-[#FF8BA7] rounded-md focus:ring-2 focus:ring-[#D8315B] outline-none"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      className="w-full p-2 border border-[#FF8BA7] rounded-md focus:ring-2 focus:ring-[#D8315B] outline-none"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Téléphone</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      className="w-full p-2 border border-[#FF8BA7] rounded-md focus:ring-2 focus:ring-[#D8315B] outline-none"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Sujet</label>
                    <input 
                      type="text" 
                      name="subject" 
                      className="w-full p-2 border border-[#FF8BA7] rounded-md focus:ring-2 focus:ring-[#D8315B] outline-none"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Message</label>
                  <textarea 
                    name="message" 
                    rows="6" 
                    className="w-full p-2 border border-[#FF8BA7] rounded-md focus:ring-2 focus:ring-[#D8315B] outline-none resize-none"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-[#D8315B] text-white py-3 rounded-full shadow-md hover:bg-[#FF8BA7] transition duration-300 border border-[#FF8BA7]"
                >
                  Envoyer le message
                </button>
              </form>
            )}
            
            {/* Business Hours */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-[#FF8BA7]">
              <h3 className="text-xl font-bold text-[#D8315B] mb-4">Horaires d'ouverture</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Lundi - mercredi</span>
                  <span className="font-semibold">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700"> Vendredi - Samedi </span>
                  <span className="font-semibold">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Jeudi </span>
                  <span className="font-semibold">Fermé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer products={products} />
    </div>
  );
}