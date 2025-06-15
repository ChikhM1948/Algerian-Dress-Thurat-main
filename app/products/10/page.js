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
              src="/tlemcenienne.jpg.jpg"
              alt="Chedda Tlemcenienne"
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
              <h1 className="text-3xl font-bold">Chedda Tlemcenienne</h1>
              <div className="px-3 py-1 bg-[#FFF0F3] text-[#D8315B] text-xs font-semibold rounded-full mt-2 inline-block border border-[#FF8BA7]">
               
              </div>
            </div>
            <p className="text-2xl font-semibold text-[#D8315B]">💰 12000 Da</p>
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
              <strong>Chedda Tlemcenienne</strong> est un costume traditionnel féminin emblématique de la région de Tlemcen, connue pour son riche patrimoine culturel et historique. Ce vêtement est particulièrement porté lors des cérémonies nuptiales et des grandes fêtes, symbolisant la noblesse et l’élégance de la mariée.
La tenue comprend plusieurs éléments : une robe brodée de fils d’or et d’argent, un voile richement décoré appelé Mendil, et une coiffe majestueuse composée de bijoux en or (Algerian dhahab), notamment la khelkhal, les chaînes et les pièces traditionnelles. Ces ornements reflètent le savoir-faire artisanal ancestral et la richesse culturelle de la région.


            </p>
            
            <div className="mt-4 bg-[#FFF0F3] p-4 rounded-lg border border-[#FF8BA7]">
              <p className="text-gray-800">
Du point de vue linguistique, le terme « Chedda » dérive de l’arabe dialectal maghrébin, signifiant littéralement « attacher » ou « serrer », en référence à la manière dont le costume est ajusté et maintenu. Le qualificatif « Tlemcenienne » indique l’origine géographique selon le modèle nisba, un procédé morphologique arabe qui forme des adjectifs de provenance.            </p>
            </div>
            
            <p className="mt-4 text-gray-800 text-lg">
Cette double nomination illustre une interaction entre langue, culture et identité locale. Le costume de la Chedda n’est pas uniquement un habit, mais un signe linguistique et culturel fort, traduisant à la fois l’appartenance régionale et la transmission d’un héritage immatériel.
Cette tenue est aussi souvent accompagnée de chants et poèmes traditionnels en dialecte tlemcénien, renforçant ainsi la dimension orale et linguistique de la cérémonie (Belkaïd, 1999).

              </p>            
          </div>
           <div className="mt-4 bg-[#FFF0F3] p-4 rounded-lg border border-[#FF8BA7]">
              <p className="text-gray-800">
Références :
•	Belkaïd, A. (1999). Le costume traditionnel algérien. ENAG Éditions.
•	Boudjemaa, S. (2012). Artisanat et traditions vestimentaires de Tlemcen. Revue Maghrébine des Arts et Culture.
•	Benrabah, M. (2007). Langue et pouvoir en Algérie. Paris : L’Harmattan.

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