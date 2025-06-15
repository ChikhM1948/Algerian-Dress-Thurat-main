"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = ({ products }) => {
  return (
    <footer className="bg-[#FFF0F3] text-[#333333] pt-12 pb-6 border-t-2 border-[#D8315B]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#D8315B]">Algerian Dress Turath</h3>
            <p className="text-gray-700 mb-4">
              Votre destination pour les tenues traditionnelles algériennes de haute qualité.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#FF8BA7] hover:text-[#D8315B] transition duration-300">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#FF8BA7] hover:text-[#D8315B] transition duration-300">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#FF8BA7] hover:text-[#D8315B] transition duration-300">
                <FaTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#D8315B]">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-700 hover:text-[#FF8BA7] transition duration-300">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/produits" className="text-gray-700 hover:text-[#FF8BA7] transition duration-300">
                  Nos Vêtements
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-700 hover:text-[#FF8BA7] transition duration-300">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-[#FF8BA7] transition duration-300">
                  Contactez-nous
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#D8315B]">Contact</h3>
            <p className="text-gray-700 mb-2">📧 info@algeriadress.com</p>
            <p className="text-gray-700 mb-2">📱 +213 123 456 789</p>
            <p className="text-gray-700">📍 Relizane, Algérie</p>
          </div>
        </div>
        <div className="border-t border-[#FF8BA7] pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-700 text-sm mb-4 md:mb-0">
              © 2025 Algerian Dress Turath. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <span>Développé par</span>
              <span className="font-semibold text-[#D8315B]">DEV LAB</span>
              <span>|</span>
              <span>Idée de</span>
              <span className="font-semibold text-[#D8315B]">Benmadah Hana</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;