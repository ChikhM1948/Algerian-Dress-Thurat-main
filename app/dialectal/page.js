// app/dialectal/page.js
'use client';
import { useState } from 'react';

export default function DialectalPage() {
  const [search, setSearch] = useState('');

  const words = [
    {
      word: "فوطه",
      transcription: "[Fouta]",
      fr: "Pièce de tissu nouée à la taille, portée par les femmes à la maison ou pour certaines danses traditionnelles.",
      en: "A piece of fabric tied around the waist, worn by women at home or for certain traditional dances."
    },
    {
      word: "مدمة- البثرور",
      transcription: "[Mdamma]",
      fr: "Ceinture rigide en métal ou tissu brodé. Utilisée pour serrer la taille, souvent ornée.",
      en: "A rigid belt made of metal or embroidered fabric. Used to cinch the waist, often decorated."
    },
    {
      word: "خيط الروح زروف الزرير",
      transcription: "[Khit errouh]",
      fr: "Collier traditionnel en fil d'or ou d'argent. Très apprécié dans le Constantinois. Nom poétique : « fil de l'âme ».",
      en: "Traditional necklace made of gold or silver thread. Highly valued in the Constantine region. Poetic name: 'thread of the soul'."
    },
    {
      word: "خلخال بورطلين او اللرديف",
      transcription: "Khelkhal bouretlin / Eredif",
      fr: "Bijou circulaire porté à la cheville, généralement en or ou en argent, composé de deux grands anneaux se terminant parfois par des têtes de serpent.",
      en: "A circular ornament worn around the ankle, usually made of gold or silver, consisting of two large rings that sometimes end in snake-shaped heads."
    },
    {
      word: "شاشية",
      transcription: "[Chachia]",
      fr: "Coiffe masculine traditionnelle, en feutre ou tissu, portée dans plusieurs régions (ex. Algérois, Tlemcen, etc.).",
      en: "Traditional men's headwear, made of felt or fabric, worn in various regions (e.g. Algiers, Tlemcen, etc.)."
    },
    {
      word: "شاشية سلطاني",
      transcription: "Chachiet sultani",
      fr: "Chapeau rouge orné de pièces en or (louiz), coiffe décorée de monnaies d'or dites 'sultani'.",
      en: "Red hat adorned with gold coins (louiz); it is a headpiece decorated with gold coins known as 'sultani'."
    },
    {
      word: "شاشية الطاسة",
      transcription: "Chachiet el tasa",
      fr: "La chéchia Tassa remonte au XIXᵉ siècle. Elle était populaire autrefois chez les femmes d'Alger et de Constantine, qui la portaient pour orner la tête. Elle était brodée de fils d'or.",
      en: "The Tassa chachia dates back to the 19th century. It was popular among women in Algiers and Constantine, who wore it to adorn their heads. It was embroidered with gold threads."
    },
    {
      word: "مدبح الويز",
      transcription: "Medbeh el ouiz",
      fr: "C'est le nom d'un bijou en or, souvent sous forme de collier ou de bracelet, considéré comme un ornement traditionnel de la région d'Annaba en Algérie.",
      en: "It is the name of a gold piece, often in the form of a necklace or bracelet, considered a traditional ornament from the Annaba region in Algeria."
    },
    {
      word: "الجازرون",
      transcription: "El djazroun",
      fr: "Collier traditionnel en or",
      en: "Traditional gold necklace."
    },
    {
      word: "العبروق",
      transcription: "El abrouq",
      fr: "Il s'agit d'un voile en soie utilisé pour couvrir le visage de la mariée.",
      en: "It is a silk veil used to cover the bride's face."
    },
    {
      word: "محرمة لفتون",
      transcription: "Maharmet el fetoun",
      fr: "Tissu orné avec des extrémités décorées de franges.",
      en: "Decorated fabric with fringed ends."
    },
    {
      word: "النواشة",
      transcription: "Nwasha",
      fr: "Ornements féminins en forme de fils ou de pompons décorés de perles ou de pierres précieuses, utilisés pour embellir différentes parties du costume traditionnel.",
      en: "Nawasha are feminine ornaments in the form of threads or tassels decorated with beads or gemstones, used to adorn various parts of traditional clothing."
    },
    {
      word: "الرعاعش",
      transcription: "El raaech",
      fr: "Ornements dorés en forme de fleurs, ajoutés pour parfaire la parure et apporter des touches décoratives à la tenue de la mariée. Ils existent sous différentes formes.",
      en: "Golden floral ornaments added to complete the adornment and bring decorative touches to the bride's outfit. They come in various forms."
    },
    {
      word: "شنتوف الويز",
      transcription: "Chentouf el ouise",
      fr: "Collier composé d'un fil noir orné de pièces rondes en or appelées 'louizes'. Le nombre de louizes varie selon le collier, pouvant atteindre 20 pièces ou plus. Plus le nombre de pièces est élevé, plus la valeur et la richesse du collier sont estimées.",
      en: "It is a necklace made of a black thread adorned with round gold pieces called 'louizes'. The number of louizes varies, and it can reach 20 pieces or more. The greater the number of pieces, the higher the value and richness of the necklace."
    },
    {
      word: "سوار الانياب",
      transcription: "Siwar laanyab",
      fr: "Pièce de bijouterie composée d'éléments en forme de crocs, généralement fabriquée à partir de matériaux variés comme l'ivoire ou l'argent.",
      en: "A piece of jewelry made up of fang-shaped elements, usually crafted from various materials such as ivory or silver."
    },
    {
      word: "الخناق",
      transcription: "El khonag",
      fr: "Collier traditionnel porté autour du cou, souvent orné de 'khamsa' ou de pièces d'or appelées 'louizes', symbolisant la protection et l'élégance.",
      en: "A traditional necklace worn around the neck, often adorned with 'khamsa or coins called 'louizes', symbolizing protection and beauty."
    },
    {
      word: "الطلق",
      transcription: "El telg",
      fr: "Collier traditionnel long qui descend jusqu'en bas de la poitrine, souvent fabriqué en or et orné de plusieurs éléments décoratifs",
      en: "A traditional long necklace that reaches down to the lower chest, often made of gold and decorated with multiple ornamental pieces."
    },
    {
      word: "سخاب العنبر",
      transcription: "Skhab d'ambre",
      fr: "Collier fabriqué à la main à partir d'ingrédients naturels comme la farine de blé brûlée, le musc, le clou de girofle et des parfums orientaux. Il se distingue par son parfum envoûtant et sa valeur symbolique.",
      en: "It is a necklace handcrafted from natural ingredients such as burnt wheat flour, musk, clove, and oriental perfumes. It is known for its captivating fragrance and symbolic value."
    },
    {
      word: "الحايك",
      transcription: "[Haïk]",
      fr: "Grand-voile blanc qui couvre tout le corps de la femme porté dans les villes algériennes jusqu'au milieu du XXe siècle. Symbole de pudeur et d'élégance.",
      en: "A large white veil that covers the entire body of the woman, worn in Algerian cities until the mid-20th century. A symbol of modesty and elegance."
    },
    {
      word: "الملحفة",
      transcription: "[Mlahfa]",
      fr: "Tissu large, souvent coloré, porté par les femmes au Sahara. Variante saharienne du haïk, très présent chez les Touareg et dans le sud.",
      en: "A wide, often colorful fabric worn by women in the Sahara — a Saharan variant of the haïk, commonly seen among the Tuareg and in the southern regions."
    },
    {
      word: "بلوزة",
      transcription: "[Blouza]",
      fr: "Robe brodée portée lors des cérémonies. La blouza Wahrania (d'Oran) est célèbre pour sa coupe et ses broderies dorées." + " Avec plusieurs variantes : blouza zaaim, blouza sidi elhouari, blouza el mensouj, blouza dentelle, blouza el waqar, blouza el broukar.",
      en: "An embroidered dress worn during ceremonies, the Blouza Wahrania (from Oran) is famous for its cut and golden embroidery."
    },
    {
      word: "قندورة",
      transcription: "[Gandoura]",
      fr: "Robe longue droite, simple ou brodée portée par les femmes à la maison ou lors de fêtes. Variante masculine : gandoura d'été.",
      en: "A long straight dress, plain or embroidered, worn by women at home or during celebrations. The male version is the summer gandoura."
    },
    {
      word: "سروال",
      transcription: "[Seroual]",
      fr: "Pantalon ample traditionnel avec plusieurs variantes : seroual chelka (plissé), mdawer (bouffant), seroual loubia (plus droit), seroual testifa.",
      en: "Traditional loose-fitting trousers with several variations: seroual chelka (pleated), mdawer (puffy), and seroual loubia (straighter cut)."
    }
  ];

  const filteredWords = words.filter((w) =>
    w.word.includes(search)
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-4xl font-bold mb-4 drop-shadow-lg">
            📜 التراث الجزائري
          </h1>
          <p className="text-xl md:text-2xl opacity-90 font-light">
              richesse du dialecte algerien          </p>
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 ابحث عن كلمة... | Rechercher un mot..."
                className="w-full px-6 py-4 text-lg rounded-2xl border-0 shadow-2xl focus:outline-none focus:ring-4 focus:ring-white/30 text-gray-800 placeholder-gray-500 bg-white/95 backdrop-blur-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Bar */}
        <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📖</span>
              <div>
                <p className="text-2xl font-bold text-emerald-600">{words.length}</p>
                <p className="text-sm text-gray-600">Mots au total</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔍</span>
              <div>
                <p className="text-2xl font-bold text-teal-600">{filteredWords.length}</p>
                <p className="text-sm text-gray-600">Résultats trouvés</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇩🇿</span>
              <div>
                <p className="text-sm font-semibold text-gray-700">Patrimoine Culturel</p>
                <p className="text-xs text-gray-500">Algérie</p>
              </div>
            </div>
          </div>
        </div>

        {/* Words Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWords.map((item, index) => (
            <div key={index} className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 hover:border-emerald-200 hover:scale-105">
              {/* Arabic Word */}
              <div className="text-right mb-4">
                <h3 className="text-3xl font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                  {item.word}
                </h3>
                <p className="text-lg text-emerald-600 font-medium italic">
                  {item.transcription}
                </p>
              </div>
              
              {/* Separator */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent my-4"></div>
              
              {/* French Definition */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">🇫🇷 FR</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {item.fr}
                </p>
              </div>
              
              {/* English Definition */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">🇬🇧 EN</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.en}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredWords.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">Aucun résultat trouvé</h3>
            <p className="text-gray-500">Essayez avec d'autres termes de recherche</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-lg opacity-90">
            🌟 Préservation du patrimoine culturel algérien 🌟
          </p>
          <p className="text-sm opacity-75 mt-2">
            Collection de mots dialectaux traditionnels • Traditional dialectal words collection
          </p>
        </div>
      </footer>
    </main>
  );
}