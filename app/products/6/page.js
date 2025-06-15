"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronLeft, FaShoppingCart, FaHeart } from "react-icons/fa";

export default function DlalaAnnabiaPage() {
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
              src="/dlala.jpeg"
              alt="La Dlala Annabia"
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
              <h1 className="text-3xl font-bold">La Dlala Annabia</h1>
              <div className="px-3 py-1 bg-[#FFF0F3] text-[#D8315B] text-xs font-semibold rounded-full mt-2 inline-block border border-[#FF8BA7]">
                Annaba
              </div>
            </div>
            <p className="text-2xl font-semibold text-[#D8315B]">💰 10000 Da</p>
          </div>

          {/* Product features */}
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="bg-[#FFF0F3] text-[#D8315B] px-3 py-1 rounded-full text-sm font-medium border border-[#FF8BA7]">
              Tenue nuptiale
            </span>
            <span className="bg-[#FFF0F3] text-[#D8315B] px-3 py-1 rounded-full text-sm font-medium border border-[#FF8BA7]">
              Broderie Fetla
            </span>
            <span className="bg-[#FFF0F3] text-[#D8315B] px-3 py-1 rounded-full text-sm font-medium border border-[#FF8BA7]">
              Patrimoine médiéval
            </span>
          </div>

          {/* Description détaillée */}
          <div className="mt-6 border-t border-[#FF8BA7] pt-6">
            <h2 className="text-xl font-semibold mb-3 text-[#D8315B]">Description</h2>
            <p className="text-gray-800 text-lg leading-relaxed">
              <strong>La Dlala Annabia</strong> est une tenue nuptiale traditionnelle algérienne, originaire de la ville d'Annaba (anciennement Bône). Datant de la période médiévale, elle est également connue sous le nom de "Dlala bonoise".
            </p>
            
            <div className="mt-4 bg-[#FFF0F3] p-4 rounded-lg border border-[#FF8BA7]">
              <p className="text-gray-800">
                Cette tenue se distingue par sa coiffe en velours ornée de pièces d'or, appelée "Dlala", surmontée de la "Tesriha". Le front est décoré du "jbin chaoui", un diadème frontal des Aurès, auquel sont attachées les "chouchnat", des boucles d'oreilles algériennes d'origine berbère.
              </p>
              <p className="mt-2 text-gray-800">
                Le cou est orné de plusieurs colliers traditionnels, tels que le "khit errih" ou "errouh", le "skhab" (sautoir aurèsien en pâte parfumée), le "khit echâir", le "kraffach boulahya" (collier du barbu), le "medbeh e'louiz" (collier à pièces d'or) et le "mkhebbel" (ras-de-cou en perles).
              </p>
            </div>
            
            <p className="mt-4 text-gray-800 text-lg">
              La tenue comprend également un caftan, initialement de couleur violette, brodé de "Fetla" (broderie dorée typique de la ville), porté par-dessus une gandoura ou djabba blanche également brodée en "Fetla", avec des manches en soie brodées au fil d'or appelées "kmam" ou "kmayem".
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