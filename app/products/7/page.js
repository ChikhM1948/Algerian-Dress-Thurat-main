"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronLeft, FaShoppingCart, FaHeart } from "react-icons/fa";

export default function GandouraCocktailPage() {
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
              src="/kandouracok.jpeg"
              alt="La gandoura cocktail"
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
              <h1 className="text-3xl font-bold">La gandoura cocktail</h1>
              <div className="px-3 py-1 bg-[#FFF0F3] text-[#D8315B] text-xs font-semibold rounded-full mt-2 inline-block border border-[#FF8BA7]">
                Annaba
              </div>
            </div>
            <p className="text-2xl font-semibold text-[#D8315B]">💰 10000 Da</p>
          </div>

          {/* Product features */}
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="bg-[#FFF0F3] text-[#D8315B] px-3 py-1 rounded-full text-sm font-medium border border-[#FF8BA7]">
              Style moderne
            </span>
            <span className="bg-[#FFF0F3] text-[#D8315B] px-3 py-1 rounded-full text-sm font-medium border border-[#FF8BA7]">
              Tissus luxueux
            </span>
            <span className="bg-[#FFF0F3] text-[#D8315B] px-3 py-1 rounded-full text-sm font-medium border border-[#FF8BA7]">
              Soirées élégantes
            </span>
          </div>

          {/* Description détaillée */}
          <div className="mt-6 border-t border-[#FF8BA7] pt-6">
            <h2 className="text-xl font-semibold mb-3 text-[#D8315B]">Description</h2>
            <p className="text-gray-800 text-lg leading-relaxed">
              <strong>La gandoura cocktail</strong> est une adaptation moderne de la gandoura traditionnelle, conçue pour être portée lors d'événements festifs ou de soirées. Cette version combine l'élégance du vêtement traditionnel avec des touches contemporaines, offrant ainsi une tenue raffinée et adaptée aux occasions spéciales.
            </p>
            
            <div className="mt-4 bg-[#FFF0F3] p-4 rounded-lg border border-[#FF8BA7]">
              <p className="text-gray-800 font-medium mb-2">Les caractéristiques principales de la gandoura cocktail incluent :</p>
              <ul className="space-y-2 list-disc pl-5">
                <li className="text-gray-800">
                  <span className="font-medium">Tissus luxueux :</span> Utilisation de matières nobles telles que la soie, le satin ou le velours, apportant une touche de sophistication.
                </li>
                <li className="text-gray-800">
                  <span className="font-medium">Couleurs variées :</span> Des teintes riches et profondes, comme le bordeaux, le vert émeraude ou le bleu nuit, sont fréquemment choisies pour leur aspect chic.
                </li>
                <li className="text-gray-800">
                  <span className="font-medium">Broderies et ornements :</span> Des motifs brodés à la main avec des fils dorés ou argentés, souvent agrémentés de perles ou de strass, ajoutent une dimension festive à la tenue.
                </li>
              </ul>
            </div>
            
            <p className="mt-4 text-gray-800 text-lg">
              Cette pièce polyvalente allie tradition et modernité, permettant aux femmes de porter un vêtement culturellement significatif tout en étant parfaitement adaptée aux tendances actuelles et aux occasions contemporaines.
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