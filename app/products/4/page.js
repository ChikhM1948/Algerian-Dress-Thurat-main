"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronLeft, FaShoppingCart, FaHeart } from "react-icons/fa";

export default function CaftanElBeyPage() {
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
              src="/caftanbey.jpeg"
              alt="Le caftan El Bey"
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
              <h1 className="text-3xl font-bold">Le caftan El Bey</h1>
              <div className="px-3 py-1 bg-[#FFF0F3] text-[#D8315B] text-xs font-semibold rounded-full mt-2 inline-block border border-[#FF8BA7]">
                Constantine
              </div>
            </div>
            <p className="text-2xl font-semibold text-[#D8315B]">💰 9000 Da</p>
          </div>

          {/* Product features */}
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="bg-[#FFF0F3] text-[#D8315B] px-3 py-1 rounded-full text-sm font-medium border border-[#FF8BA7]">
              Époque Ottomane
            </span>
            <span className="bg-[#FFF0F3] text-[#D8315B] px-3 py-1 rounded-full text-sm font-medium border border-[#FF8BA7]">
              Vêtement de prestige
            </span>
            <span className="bg-[#FFF0F3] text-[#D8315B] px-3 py-1 rounded-full text-sm font-medium border border-[#FF8BA7]">
              Broderies luxueuses
            </span>
          </div>

          {/* Description détaillée */}
          <div className="mt-6 border-t border-[#FF8BA7] pt-6">
            <h2 className="text-xl font-semibold mb-3 text-[#D8315B]">Description</h2>
            <p className="text-gray-800 text-lg leading-relaxed">
              <strong>Le caftan El Bey</strong> est un vêtement traditionnel algérien, dont l'origine remonte à l'époque de la Régence d'Alger. Durant cette période, le caftan était porté par les dignitaires turcs et les soldats, confectionné dans des étoffes luxueuses et arborant des couleurs variées.
            </p>
            
            <div className="mt-4 bg-[#FFF0F3] p-4 rounded-lg border border-[#FF8BA7]">
              <p className="text-gray-800">
                Lors de l'élection d'un dey, une cérémonie consistait à le revêtir d'un caftan, symbolisant son investiture officielle. De même, le bey du Titteri recevait un caftan d'or à porter lors de ses séjours dans la capitale. Dans le beylik de l'Est, l'attribution d'un caftan aux chefs de tribus après le bey symbolisait une alliance et une reconnaissance mutuelle entre le bey de Constantine et les tribus locales.
              </p>
            </div>
            
            <p className="mt-4 text-gray-800 text-lg">
              Au fil du temps, le caftan, initialement masculin, a été adopté par les femmes des grandes villes algériennes, notamment à Alger, Annaba, Béjaïa, Blida, Constantine, Miliana, Nedroma et Tlemcen. Les artisans locaux ont adapté ce vêtement en y intégrant des éléments culturels algériens, créant ainsi des variantes féminines richement ornées.
            </p>
            
            <p className="mt-4 text-gray-800 text-lg">
              Aujourd'hui, le caftan est principalement porté par les femmes lors d'occasions spéciales telles que les mariages, les réceptions ou les fêtes religieuses, reflétant l'élégance et le patrimoine culturel algérien.
            </p>
            
            <p className="mt-4 text-gray-800 text-lg">
              Bien que le terme "caftan El Bey" ne soit pas spécifiquement mentionné dans les sources disponibles, il est probable qu'il fasse référence à une variante du caftan associée aux beys, les gouverneurs provinciaux de l'époque ottomane en Algérie. Ce type de caftan serait alors caractérisé par des matériaux luxueux, des broderies élaborées et des motifs reflétant le statut élevé de son porteur.
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