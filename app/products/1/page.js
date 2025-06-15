"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronLeft, FaShoppingCart, FaHeart } from "react-icons/fa";

export default function DjebbaAlChattarPage() {
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
              src="/chattar.jpg"
              alt="Djebba AL-Chattar"
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
              <h1 className="text-3xl font-bold">Djebba AL-Chattar</h1>
              <div className="px-3 py-1 bg-[#FFF0F3] text-[#D8315B] text-xs font-semibold rounded-full mt-2 inline-block border border-[#FF8BA7]">
                Constantine
              </div>
            </div>
            <p className="text-2xl font-semibold text-[#D8315B]">💰 3500 Da</p>
          </div>

          {/* Product features */}
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="bg-[#FFF0F3] text-[#D8315B] px-3 py-1 rounded-full text-sm font-medium border border-[#FF8BA7]">
              Fait main
            </span>
            <span className="bg-[#FFF0F3] text-[#D8315B] px-3 py-1 rounded-full text-sm font-medium border border-[#FF8BA7]">
              Broderie en fil d'or
            </span>
            <span className="bg-[#FFF0F3] text-[#D8315B] px-3 py-1 rounded-full text-sm font-medium border border-[#FF8BA7]">
              Tenue de cérémonie
            </span>
          </div>

          {/* Description détaillée */}
          <div className="mt-6 border-t border-[#FF8BA7] pt-6">
            <h2 className="text-xl font-semibold mb-3 text-[#D8315B]">Description</h2>
            <p className="text-gray-800 text-lg leading-relaxed">
              La <strong>Djebba AL-Chattar</strong> est une tenue traditionnelle algérienne, emblématique de la ville de Constantine.
              Réservée aux grandes occasions, elle est confectionnée avec des tissus luxueux et brodée en fils d'or selon des
              techniques artisanales héritées depuis des siècles.
            </p>
            <p className="mt-4 text-gray-800 text-lg">
              Ce vêtement raffiné est souvent accompagné de bijoux traditionnels et symbolise l'élégance et le prestige de la
              culture constantinoise, il apparaît que le terme "Djebba Al-Chattar" n'est pas couramment référencé dans les sources disponibles. Cependant, en se basant sur l'étymologie et les usages régionaux des termes qui le composent, on peut proposer l'interprétation suivante :
            </p>
            
            <div className="mt-4 bg-[#FFF0F3] p-4 rounded-lg border border-[#FF8BA7]">
              <p className="text-gray-800">
                <strong>Djebba (جبّة)</strong> : Ce terme désigne une tunique traditionnelle ample, portée dans diverses régions du Maghreb et du Moyen-Orient. Par exemple, la djebba constantinoise est une robe féminine traditionnelle de la région de Constantine en Algérie, confectionnée en velours et richement brodée de fils d'or.
              </p>
              <p className="mt-2 text-gray-800">
                <strong>Al-Chattar (الشطّار)</strong> : Historiquement, les "shuttar" (شطّار) étaient des individus connus pour leur ruse et leur habileté, souvent considérés comme des aventuriers ou des marginaux dans le monde arabo-islamique médiéval.
              </p>
            </div>
            
            <p className="mt-4 text-gray-800 text-lg">
              Ainsi, l'expression "Djebba Al-Chattar" pourrait se traduire par "la tunique de l'astucieux" ou "la tunique de l'aventurier", suggérant un vêtement associé à une personne rusée ou habile. Cette interprétation reste hypothétique en l'absence de références spécifiques.
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