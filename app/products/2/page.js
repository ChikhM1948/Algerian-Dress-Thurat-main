"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronLeft, FaShoppingCart, FaHeart } from "react-icons/fa";

export default function CaftanElKadiPage() {
  const [liked, setLiked] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF0F3] text-black p-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center text-[#D8315B] hover:text-[#FF8BA7] mb-6 transition-colors duration-300">
          <FaChevronLeft className="mr-2" /> Retour à la galerie
        </Link>

        <div className="bg-white p-6 rounded-lg shadow-lg border border-[#FF8BA7]">
          {/* Image with like button */}
          <div className="relative">
            <img
              src="/caftankadi.jpg"
              alt="Caftan El Kadi"
              className="w-full h-96 object-cover rounded-lg"
            />
            <button 
              onClick={() => setLiked(!liked)} 
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-[#FFF0F3] transition-colors duration-300 border border-[#FF8BA7]"
            >
              <FaHeart className={`${liked ? 'text-[#D8315B]' : 'text-gray-400'}`} />
            </button>
          </div>

          {/* Product header section */}
          <div className="mt-6 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">Caftan El Kadi</h1>
              <div className="px-3 py-1 bg-[#FFF0F3] text-[#D8315B] text-xs font-semibold rounded-full mt-2 inline-block border border-[#FF8BA7]">
                Constantine
              </div>
            </div>
            <p className="text-2xl font-semibold text-[#D8315B]">💰 8000 Da</p>
          </div>

          {/* Product features */}
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="bg-[#FFF0F3] text-[#D8315B] px-3 py-1 rounded-full text-sm font-medium border border-[#FF8BA7]">
              Patrimoine UNESCO
            </span>
            <span className="bg-[#FFF0F3] text-[#D8315B] px-3 py-1 rounded-full text-sm font-medium border border-[#FF8BA7]">
              Tarz Medjboud
            </span>
            <span className="bg-[#FFF0F3] text-[#D8315B] px-3 py-1 rounded-full text-sm font-medium border border-[#FF8BA7]">
              Velours brodé
            </span>
          </div>

          {/* Description détaillée */}
          <div className="mt-6 border-t border-[#FF8BA7] pt-6">
            <h2 className="text-xl font-semibold mb-3 text-[#D8315B]">Description</h2>
            <p className="text-gray-800 text-lg leading-relaxed">
              Le <strong>Caftan El Kadi</strong> (en arabe : قفطان القاضي), littéralement "caftan du juge", est une tenue traditionnelle algérienne originaire de la région de Constantine. À l'origine, ce vêtement était porté par les juges, les hauts fonctionnaires tels que les aghas et les bachagas durant la période de la Régence d'Alger. Avec le temps, il a été intégré à la garde-robe féminine et est désormais principalement porté par les femmes lors de cérémonies et d'événements festifs.
            </p>
            
            <div className="mt-4 bg-[#FFF0F3] p-4 rounded-lg border border-[#FF8BA7]">
              <p className="text-gray-800">
                Confectionné en velours de couleur foncée, généralement noire, le Caftan El Kadi se distingue par sa broderie dorée typique de la région de Constantine, appelée "Tarz Medjboud". Les motifs brodés s'inspirent souvent de la nature, représentant des feuilles, des fleurs, des branches ou des animaux, avec une prédilection pour le motif du paon d'or, emblématique de cette région. Une autre technique de broderie utilisée est le "Tarz Fetla".
              </p>
            </div>
            
            <p className="mt-4 text-gray-800 text-lg">
              La coupe du caftan est longue, avec des manches généralement longues et évasées. Traditionnellement, il est assorti d'accessoires tels que le "Taj el Fetla" (couronne constantinoise), des bracelets appelés "mkayess" ou "mssayess", et divers colliers comme le "djaouhar" ou le "skhab".
            </p>
            
            <p className="mt-4 text-gray-800 text-lg">
              Le Caftan El Kadi est un symbole de l'authenticité et du patrimoine culturel algérien. Il a été officiellement inscrit au patrimoine mondial immatériel de l'UNESCO, aux côtés de la Chedda de Tlemcen, renforçant ainsi sa reconnaissance internationale en tant qu'élément distinctif de l'identité algérienne.
            </p>
            
            <p className="mt-4 text-gray-800 text-lg">
              Aujourd'hui, le Caftan El Kadi continue d'être porté lors de grandes occasions festives à Constantine et dans les régions environnantes, perpétuant ainsi une tradition vestimentaire riche et emblématique de l'histoire algérienne.
            </p>
          </div>

          {/* Size selection */}
          <div className="mt-6 border-t border-[#FF8BA7] pt-6">
            <h2 className="text-xl font-semibold mb-3 text-[#D8315B]">Taille</h2>
            <div className="flex space-x-3">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className="w-12 h-12 border border-[#FF8BA7] rounded-full flex items-center justify-center hover:bg-[#FFF0F3] transition-colors duration-300"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex space-x-4">
            <button className="flex-1 bg-[#D8315B] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#FF8BA7] transition duration-300 flex items-center justify-center border border-[#FF8BA7]">
              <FaShoppingCart className="mr-2" />
              Acheter maintenant
            </button>
            <button className="flex-1 border border-[#FF8BA7] text-[#D8315B] px-6 py-3 rounded-full hover:bg-[#FFF0F3] transition duration-300">
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}