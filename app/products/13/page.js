"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronLeft, FaShoppingCart, FaHeart } from "react-icons/fa";

export default function GandouraKaranflaPage() {
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
              src="/fergani.jpg"
              alt="Fergani Constantine"
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
              <h1 className="text-3xl font-bold">Le Fergani Constantinois </h1>
              <div className="px-3 py-1 bg-[#FFF0F3] text-[#D8315B] text-xs font-semibold rounded-full mt-2 inline-block border border-[#FF8BA7]">
               
              </div>
            </div>
            <p className="text-2xl font-semibold text-[#D8315B]">💰 13000 Da</p>
          </div>

          {/* Product features */}
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="bg-[#FFF0F3] text-[#D8315B] px-3 py-1 rounded-full text-sm font-medium border border-[#FF8BA7]">
              Tunique traditionnelle
            </span>
            <span className="bg-[#FFF0F3] text-[#D8315B] px-3 py-1 rounded-full text-sm font-medium border border-[#FF8BA7]">
              Confort et élégance
            </span>
            <span className="bg-[#FFF0F3] text-[#D8315B] px-3 py-1 rounded-full text-sm font-medium border border-[#FF8BA7]">
              Artisanat nord-africain
            </span>
          </div>

          {/* Description détaillée */}
          <div className="mt-6 border-t border-[#FF8BA7] pt-6">
            <h2 className="text-xl font-semibold mb-3 text-[#D8315B]">Description</h2>
            <p className="text-gray-800 text-lg leading-relaxed">
              <strong>Le Fergani Constantinois </strong> est une tenue traditionnelle féminine originaire de Constantine, ville emblématique de l’élégance en Algérie. Il est reconnu pour son raffinement et son lien avec l’héritage musical et aristocratique de la région.
Il se compose d’un tissu en velours riche, souvent orné de broderies dorées faites à la main, et accompagné d’accessoires somptueux tels que la chéchia brodée, les bijoux d’argent ou encore le mendil. Cette tenue est indissociable des grandes occasions telles que les mariages, et elle est également associée à la musique malouf et à des figures artistiques comme Mohamed Tahar Fergani, d’où son nom.



            </p>
            
            <div className="mt-4 bg-[#FFF0F3] p-4 rounded-lg border border-[#FF8BA7]">
              <p className="text-gray-800">
Linguistiquement, le mot « Fergani » est un nom propre dérivé (antroponyme) utilisé ici comme déterminant d’identité culturelle, créant une association immédiate entre le costume et une tradition musicale et sociale spécifique. Le mot « Constantinois », adjectif de provenance, joue ici un rôle de marqueur géo-linguistique, positionnant le vêtement dans un cadre territorial et symbolique précis.           
</p>
 <p className="mt-4 text-gray-800 text-lg">

Linguistiquement, le mot « Fergani » est un nom propre dérivé (antroponyme) utilisé ici comme déterminant d’identité culturelle, créant une association immédiate entre le costume et une tradition musicale et sociale spécifique. Le mot « Constantinois », adjectif de provenance, joue ici un rôle de marqueur géo-linguistique, positionnant le vêtement dans un cadre territorial et symbolique précis.
              </p>            
          </div>
           <div className="mt-4 bg-[#FFF0F3] p-4 rounded-lg border border-[#FF8BA7]">
              <p className="text-gray-800">
Références :
•	Belkaïd, A. (1999). Le costume traditionnel algérien. ENAG Éditions.
•	Aït-Amara, S. (2010). La nomination dans la culture populaire algérienne : entre langue et identité. Revue de linguistique maghrébine.
•	Benrabah, M. (2007). Langue et pouvoir en Algérie. Paris : L’Harmattan.




            </p>
            </div>
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