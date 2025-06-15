"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar ";
import Footer from "../components/Footer";
import { useState } from "react";

const products = [
  { id: 1, name: "Djebba AL-Chattar", region: "Constantine", price: "80000 Da", description: "Elegant Algerian Kaftan with gold embroidery.", image: "/chattar.jpg" },
  { id: 2, name: "Caftan El Kadi", region: "Constantine", price: "8000 Da", description: "Caftan du juge, une tenue traditionnelle de Constantine.", image: "/caftankadi.jpg" },
  { id: 3, name: "Gandoura Medjboud", region: "Constantine", price: "7000 Da", description: "Vêtement traditionnel constantinois brodé au fil d'or.", image: "/images.jpeg" },
  { id: 4, name: "Caftan El Bey", region: "Constantine", price: "9000 Da", description: "Vêtement traditionnel remontant à la Régence d'Alger.", image: "/caftanbey.jpeg" },
  { id: 5, name: "Lafa Anabia", region: "Annaba", price: "10000 Da", description: "Tenue traditionnelle emblématique d'Annaba.", image: "/lafaanabia.jpeg" },
  { id: 6, name: "Dlala Anabia", region: "Annaba", price: "10000 Da", description: "Tenue nuptiale traditionnelle d'Annaba.", image: "/dlala.jpeg" },
  { id: 7, name: "Gandoura Cocktail", region: "Annaba", price: "10000 Da", description: "Version moderne et festive de la gandoura traditionnelle.", image: "/Gandouracok.jpeg" },
  { id: 8, name: "Gandoura Karanfla", region: "Annaba", price: "10000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/karanfla.jpeg" }
];

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [region, setRegion] = useState("");

  // Regions info contains detailed information about each region's traditional clothing
  const regionsInfo = [
    {
      name: "Constantine",
      description: "Constantine, ancienne Cirta, est connue pour ses somptueuses tenues traditionnelles qui reflètent un riche héritage culturel et une excellente maîtrise artisanale. Les vêtements traditionnels de Constantine sont parmi les plus élaborés et prestigieux d'Algérie.",
      clothing: [
        {
          name: "Djebba Al-Chattar", 
          description: "La célèbre Djebba Al-Chattar est une tenue d'apparat constantinoise généralement confectionnée en velours et richement brodée de fils d'or selon la technique du 'Medjboud'. Elle est portée lors des grandes occasions, particulièrement les mariages. Son prix élevé reflète la minutie du travail artisanal et la qualité des matériaux utilisés."
        },
        {
          name: "Caftan El Kadi",
          description: "Le Caftan El Kadi (ou Caftan du Juge) est une tenue d'origine ottomane adaptée aux traditions constantinoises. Portée à l'origine par les hauts dignitaires de la ville, cette tenue élégante est désormais prisée lors des cérémonies de mariage."
        },
        {
          name: "Gandoura Medjboud",
          description: "La Gandoura Medjboud est reconnue pour ses broderies en fil d'or sur velours. Cette technique artisanale ancestrale nécessite une grande expertise et beaucoup de patience, ce qui en fait une pièce de grande valeur dans le patrimoine vestimentaire algérien."
        }
      ]
    },
    {
      name: "Annaba",
      description: "Annaba, l'antique Hippone, possède un patrimoine vestimentaire riche qui témoigne des diverses influences culturelles ayant façonné la région. Les tenues traditionnelles d'Annaba sont caractérisées par leurs couleurs vives et leurs motifs distinctifs.",
      clothing: [
        {
          name: "Dlala Anabia",
          description: "La Dlala est la tenue nuptiale emblématique d'Annaba. Elle se distingue par sa richesse en ornements et ses détails minutieux qui la rendent particulièrement somptueuse. La mariée annabie porte traditionnellement cette tenue lors de la cérémonie du henné."
        },
        {
          name: "Lafa Anabia",
          description: "La Lafa d'Annaba est un ensemble traditionnel composé d'une blouse et d'un sarouel (pantalon ample). Sa particularité réside dans les broderies qui l'ornent, avec des motifs floraux caractéristiques de la région."
        },
        {
          name: "Gandoura Karanfla",
          description: "La Gandoura Karanfla tire son nom des motifs d'œillets (karanfel) qui la décorent. C'est une pièce versatile qui peut être portée lors de différentes occasions, des réunions familiales aux cérémonies plus formelles."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#333333]">
      {/* Navbar Component */}
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-r from-[#D8315B] to-[#FF8BA7] overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-4"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
              À Propos de Nous
            </h1>
            <p className="text-xl md:text-2xl text-white mb-6 max-w-2xl mx-auto">
              Découvrez l'histoire et le patrimoine derrière nos tenues traditionnelles
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Us Content */}
      <section className="max-w-6xl mx-auto p-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#D8315B] mb-6 text-center">Notre Passion pour le Patrimoine</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-4">
                Bienvenue chez <span className="font-semibold text-[#D8315B]">Algerian Dress Turath</span>, votre destination privilégiée pour les tenues traditionnelles algériennes authentiques.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Notre mission est de préserver et promouvoir le riche patrimoine vestimentaire algérien, en proposant des pièces d'exception confectionnées selon les méthodes artisanales ancestrales.
              </p>
              <p className="text-lg text-gray-700">
                Chaque vêtement dans notre collection raconte une histoire unique, représentant fièrement les différentes régions d'Algérie et leurs traditions distinctives. Nous travaillons directement avec des artisans qualifiés pour garantir l'authenticité et la qualité supérieure de chaque création.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg border-2 border-[#FF8BA7]">
              <img 
                src="/about.jpg" 
                alt="Artisanat traditionnel algérien" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Our Traditional Clothing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#D8315B] mb-6 text-center">Nos Vêtements Traditionnels</h2>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-4xl mx-auto">
            Les vêtements traditionnels algériens représentent un patrimoine culturel inestimable. Chaque région possède ses propres tenues distinctives, façonnées par l'histoire, la géographie et les influences culturelles qui ont façonné l'Algérie au fil des siècles.
          </p>

          {/* Regional Clothing Information */}
          <div className="space-y-16">
            {regionsInfo.map((region, index) => (
              <div key={region.name} className="bg-[#FFF0F3] p-6 rounded-lg shadow-md border border-[#FF8BA7]">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <h3 className="text-2xl font-bold text-[#D8315B] mb-4">Région de {region.name}</h3>
                  <p className="text-gray-700 mb-6">{region.description}</p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {region.clothing.map((item) => (
                      <div key={item.name} className="bg-white p-4 rounded-lg shadow border border-[#FF8BA7]">
                        <h4 className="text-xl font-semibold text-[#FF8BA7] mb-2">{item.name}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#D8315B] mb-6 text-center">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#FF8BA7] flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#FFF0F3] flex items-center justify-center mb-4 border-2 border-[#FF8BA7]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#D8315B" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#D8315B] mb-2">Authenticité</h3>
              <p className="text-gray-700">
                Nous nous engageons à proposer des créations authentiques qui respectent fidèlement les techniques et motifs traditionnels.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#FF8BA7] flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#FFF0F3] flex items-center justify-center mb-4 border-2 border-[#FF8BA7]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#D8315B" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#D8315B] mb-2">Artisanat Local</h3>
              <p className="text-gray-700">
                Nous soutenons les artisans locaux en valorisant leur savoir-faire et en assurant des conditions de travail équitables.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#FF8BA7] flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[#FFF0F3] flex items-center justify-center mb-4 border-2 border-[#FF8BA7]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#D8315B" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#D8315B] mb-2">Qualité Supérieure</h3>
              <p className="text-gray-700">
                Nous ne faisons aucun compromis sur la qualité, en sélectionnant soigneusement les meilleurs matériaux pour chaque création.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer Component */}
      <Footer setRegion={setRegion} products={products} />
    </div>
  );
}