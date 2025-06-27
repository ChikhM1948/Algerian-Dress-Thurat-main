"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { FaFilter, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../app/components/Navbar ";
import Footer from "../app/components/Footer";
import ShoppingCart from "../app/components/ShoppingCart";
import Wishlist from "../app/components/Wishlist";
import OrderForm from "../app/components/OrderForm";

const products = [
  { id: 2, name: "Caftan El Kadi", region: "Constantine", price: "8000 Da", description: "Caftan du juge, une tenue traditionnelle de Constantine.", image: "/caftankadi.jpg" },
  { id: 4, name: "Caftan El Bey", region: "Constantine", price: "9000 Da", description: "Vêtement traditionnel remontant à la Régence d'Alger.", image: "/caftanbey.jpeg" },
  { id: 5, name: "Lafa Anabia", region: "Annaba", price: "10000 Da", description: "Tenue traditionnelle emblématique d'Annaba.", image: "/lafaanabia.jpeg" },
  { id: 6, name: "Dlala Anabia", region: "Annaba", price: "10000 Da", description: "Tenue nuptiale traditionnelle d'Annaba.", image: "/dlala.jpeg" },
  { id: 7, name: "Gandoura Cocktail", region: "Annaba", price: "10000 Da", description: "Version moderne et festive de la gandoura traditionnelle.", image: "/kandouracok.jpeg" },
  { id: 8, name: "Gandoura Karanfla", region: "Annaba", price: "10000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/karanfla.jpeg" },
  { id: 9, name: "Blouza Wahrania ", region: "Oran", price: "12000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/blouza.jpg" },
  { id: 10, name: "Chedda Tlemcenienne ", region: "Tlemcen", price: "18000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/tlemcenienne.jpg" },
  { id: 11, name: "Karakou Algérois ", region: "Alger", price: "11000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/karakoualger.jpg" },
  { id: 12, name: "Ghlila ", region: "Alger", price: "10000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/ghlila.jpg" },
  { id: 13, name: "Le Fergani Constantinois  ", region: "Constantine", price: "13000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/fergani.jpg" },
  { id: 14, name: "La Taqendurt ", region: "Béjaïa", price: "7000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/taqendurt.jpg" },
  { id: 15, name: "Le Caftan El Mansouriya  ", region: "Tlemcen", price: "9000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/elmansoriya.jpg" },
  { id: 16, name: "Mlahfa Chaouïa", region: "Batna", price: "8000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/malhfa.jpg" },
  { id: 17, name: "Caftan El Koronfla    ", region: "Anaba", price: "11000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/caftankronfla.jpg"},
  { id: 18, name: "Modma", nameAr: "مضمة", nameFr: "Ceinture Mdamma", region: "Nord Constantinois", price: "3000 Da", description: "Accessoire traditionnel porté autour de la taille.", image: "/modma.jpg" },
  { id: 19, name: "Khit er-Rouh", nameAr: "خيط الروح", nameFr: "Fil de l’âme", region: "Alger", price: "2500 Da", description: "Bijou raffiné utilisé dans les parures traditionnelles.", image: "/khaytroh.jpg" },
  { id: 20, name: "Erredif", nameAr: "الرديف", nameFr: "Ceinture Erredif", region: "Tlemcen", price: "4000 Da", description: "Pièce vestimentaire richement ornée, portée lors des fêtes.", image: "/rdaif.jpg" },
  { id: 21, name: "Chachia Tasa", nameAr: "شاشية الطاسة", nameFr: "Chéchia Tassa", region: "Constantine", price: "2000 Da", description: "Coiffe traditionnelle en feutre portée par les hommes.", image: "/chachiatassa.jpg" },
  { id: 22, name: "Chachia Sultani", nameAr: "شاشية سلطاني", nameFr: "Chéchia Sultani", region: "Tlemcen", price: "2200 Da", description: "Chéchia luxueuse, symbole de noblesse et d'élégance.", image: "/chachiasoltani.jpg" },
  { id: 23, name: "Jazeroun", nameAr: "الجازرون", nameFr: "Collier Djazroun", region: "Annaba", price: "1500 Da", description: "Accessoire en perles ou ambre, souvent porté au cou.", image: "/jazeroun.jpg" },
  { id: 24, name: "Skhab El Anbar", nameAr: "سخاب العنبر", nameFr: "Collier d'ambre", region: "Alger", price: "3500 Da", description: "Collier parfumé fait d’ambre traditionnel algérien.", image: "/skhabamber.jpg" },
  { id: 25, name: "Rraâach", nameAr: "الرعاعش", nameFr: "Boucles d’oreilles Rraâch", region: "Constantine", price: "1200 Da", description: "Bijoux d’oreilles ou décorations de tête traditionnelles.", image: "/rraach.jpg" },
  { id: 26, name: "Chantouf", nameAr: "شنتوف", nameFr: "Coiffe Chantouf", region: "Oran", price: "1800 Da", description: "Coiffure traditionnelle portée lors des cérémonies.", image: "/chantouf.jpg" },
  { id: 28, name: "Abrouq", nameAr: "العبروق", nameFr: "Accessoire de hanche Abrouq", region: "Biskra", price: "1700 Da", description: "Bijou ou accessoire de hanche porté dans le sud algérien.", image: "/abrouk.jpg" },
  { id: 29, name: "Nwachat", nameAr: "النواشات", nameFr: "Ornements Nwachat", region: "Ghardaïa", price: "1900 Da", description: "Accessoire féminin délicat porté sur la tête ou le buste.", image: "/nwachat.jpg" },
  { id: 30, name: "Khenaq", nameAr: "الخناق", nameFr: "Collier ras-du-cou Khenaq", region: "Alger", price: "3000 Da", description: "Collier ras-du-cou en perles ou tissu richement décoré.", image: "/khenak.jpg" },
  { id: 31, name: "Fouta", nameAr: "فوطة", nameFr: "Fouta", region: "Mostaganem", price: "2000 Da", description: "Pièce d’étoffe traditionnelle portée à la taille ou l’épaule.", image: "/fouta.jpg" },
  { id: 32, name: "Blouza Brokar", nameAr: "بلوزة بروكار", nameFr: "Blouza en brocart", region: "Oran", price: "10000 Da", description: "Blouza fabriquée avec du tissu brocart luxueux.", image: "/blouzabrokar.jpg" },
  { id: 33, name: "Blouza El Aqiq", nameAr: "بلوزة العقيق", nameFr: "Blouza en agate", region: "Oran", price: "11000 Da", description: "Blouza oranaise ornée de pierres précieuses (agates).", image: "/blouzaaqiq.jpg" },
  { id: 34, name: "Blouza El Waqr", nameAr: "بلوزة الوقر", nameFr: "Blouza El Waqr", region: "Oran", price: "10500 Da", description: "Blouza oranaise portée avec élégance lors des fêtes.", image: "/blouzawakr.jpg" },
  { id: 35, name: "Blouza Dentelle", nameAr: "بلوزة الدونتيل", nameFr: "Blouza en dentelle", region: "Oran", price: "11500 Da", description: "Blouza moderne confectionnée avec du tissu dentelle.", image: "/blouzadentelle.jpg" },
  { id: 36, name: "Blouza Ezzaïm", nameAr: "بلوزة الزعيم", nameFr: "Blouza Ezzaïm", region: "Oran", price: "12000 Da", description: "Modèle distinctif de blouza, populaire à Oran.", image: "/blouzazaim.jpg" },
  { id: 37, name: "Baouza Sidi Boumediene", nameAr: "باوزة سيدي بومدين", nameFr: "Baouza de Sidi Boumediene", region: "Tlemcen", price: "9500 Da", description: "Tenue traditionnelle en hommage à Sidi Boumediene.", image: "/baouzasidiboumediene.jpg" },
  { id: 38, name: "Hayek Achaâchi", nameAr: "حايك العشعاشي", nameFr: "Haïk Achaâchi", region: "Skikda", price: "8000 Da", description: "Haïk traditionnel typique de la région de Skikda.", image: "/hayekachacha.jpg" },
  { id: 39, name: "Hayek El Mermma", nameAr: "حايك المرمة", nameFr: "Haïk El Mermma", region: "Alger", price: "8500 Da", description: "Haïk en soie fine avec broderie spécifique à Alger.", image: "/hayekmorma.jpg" }


];

export default function ProductList() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Shopping cart state
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  
  // Wishlist state
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  
  // Order form state
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Hydration fix - only run localStorage operations after component mounts
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    // Load cart and wishlist from localStorage only after client-side hydration
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing saved cart:", e);
      }
    }
    
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Error parsing saved wishlist:", e);
      }
    }
  }, [isClient]);
  
  // Save cart to localStorage whenever it changes (only on client)
  useEffect(() => {
    if (isClient && cart.length >= 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isClient]);
  
  // Save wishlist to localStorage whenever it changes (only on client)
  useEffect(() => {
    if (isClient && wishlist.length >= 0) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isClient]);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (region === "" || product.region === region)
  );
  
  // Cart functions
  const addToCart = (product, quantity, size = "M") => {
    setCart(prevCart => {
      // Check if product is already in cart
      const existingItemIndex = prevCart.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex !== -1) {
        // Update quantity if product already exists
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Add new item to cart
        return [...prevCart, { product, quantity, size }];
      }
    });
    
    // Open cart when adding items
    setCartOpen(true);
  };
  
  const updateCart = (productId, newQuantity) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
  };
  
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };
  
  // Wishlist functions
  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      // Only add if not already in wishlist
      if (!prevWishlist.find(item => item.id === product.id)) {
        return [...prevWishlist, product];
      }
      return prevWishlist;
    });
  };
  
  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  };
  
  const toggleWishlist = (product) => {
    if (wishlist.find(item => item.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  // Order form functions
  const openOrderForm = (product) => {
    setSelectedProduct(product);
    setShowOrderForm(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#333333]">
      {/* Navbar Component */}
      <Navbar 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)}
        wishlistItemCount={wishlist.length}
        openCart={() => setCartOpen(true)}
        openWishlist={() => setWishlistOpen(true)}
      />

      {/* Hero Section with Image Background */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/bg.jpg')` // Replace with your actual image path
          }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-4 z-10"
          >
            <h1 className="text-4xl md:text-4xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
              L'Élégance Traditionnelle Algérienne
            </h1>
            <p className="text-xl md:text-2xl text-white mb-6 max-w-2xl mx-auto drop-shadow-lg">
              Découvrez l'élégance et les trésors linguistiques de la tenue traditionnelle algérienne 👗
            </p>
            <Link href="#products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#D8315B] px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-[#FFF0F3] transition duration-300 border border-[#D8315B]"
              >
                Explorer Notre Collection
              </motion.button>
            </Link>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg
              className="w-8 h-8 text-white drop-shadow-lg"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Product Section */}
      <section id="products" className="max-w-6xl mx-auto p-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#D8315B] mb-4">Nos Vêtements Traditionnels</h2>
          <p className="text-lg text-[#FF8BA7] max-w-2xl mx-auto">
            Chaque pièce raconte une histoire et représente une région unique d'Algérie
          </p>
        </motion.div>
        
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-10 bg-white p-4 rounded-lg shadow-md border border-[#FF8BA7]">
          <div className="relative w-full md:w-1/2">
            <FiSearch className="absolute left-3 top-3 text-[#FF8BA7]" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="border border-[#FF8BA7] p-3 pl-10 rounded-lg w-full focus:ring-2 focus:ring-[#D8315B] outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="relative w-full md:w-1/3">
            <FaFilter className="absolute left-3 top-3 text-[#FF8BA7]" />
            <select
              className="border border-[#FF8BA7] p-3 pl-10 rounded-lg w-full focus:ring-2 focus:ring-[#D8315B] outline-none"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value=""> 🇩🇿 Toutes les wilayas</option>
              <option value="Adrar">01 - Adrar</option>
              <option value="Chlef">02 - Chlef</option>
              <option value="Laghouat">03 - Laghouat</option>
              <option value="Oum El Bouaghi">04 - Oum El Bouaghi</option>
              <option value="Batna">05 - Batna</option>
              <option value="Béjaïa">06 - Béjaïa</option>
              <option value="Biskra">07 - Biskra</option>
              <option value="Béchar">08 - Béchar</option>
              <option value="Blida">09 - Blida</option>
              <option value="Bouira">10 - Bouira</option>
              <option value="Tamanrasset">11 - Tamanrasset</option>
              <option value="Tébessa">12 - Tébessa</option>
              <option value="Tlemcen">13 - Tlemcen</option>
              <option value="Tiaret">14 - Tiaret</option>
              <option value="Tizi Ouzou">15 - Tizi Ouzou</option>
              <option value="Alger">16 - Alger</option>
              <option value="Djelfa">17 - Djelfa</option>
              <option value="Jijel">18 - Jijel</option>
              <option value="Sétif">19 - Sétif</option>
              <option value="Saïda">20 - Saïda</option>
              <option value="Skikda">21 - Skikda</option>
              <option value="Sidi Bel Abbès">22 - Sidi Bel Abbès</option>
              <option value="Annaba">23 - Annaba</option>
              <option value="Guelma">24 - Guelma</option>
              <option value="Constantine">25 - Constantine</option>
              <option value="Médéa">26 - Médéa</option>
              <option value="Mostaganem">27 - Mostaganem</option>
              <option value="M'Sila">28 - M'Sila</option>
              <option value="Mascara">29 - Mascara</option>
              <option value="Ouargla">30 - Ouargla</option>
              <option value="Oran">31 - Oran</option>
              <option value="El Bayadh">32 - El Bayadh</option>
              <option value="Illizi">33 - Illizi</option>
              <option value="Bordj Bou Arreridj">34 - Bordj Bou Arreridj</option>
              <option value="Boumerdès">35 - Boumerdès</option>
              <option value="El Tarf">36 - El Tarf</option>
              <option value="Tindouf">37 - Tindouf</option>
              <option value="Tissemsilt">38 - Tissemsilt</option>
              <option value="El Oued">39 - El Oued</option>
              <option value="Khenchela">40 - Khenchela</option>
              <option value="Souk Ahras">41 - Souk Ahras</option>
              <option value="Tipaza">42 - Tipaza</option>
              <option value="Mila">43 - Mila</option>
              <option value="Aïn Defla">44 - Aïn Defla</option>
              <option value="Naâma">45 - Naâma</option>
              <option value="Aïn Témouchent">46 - Aïn Témouchent</option>
              <option value="Ghardaïa">47 - Ghardaïa</option>
              <option value="Relizane">48 - Relizane</option>
              <option value="El M'Ghair">49 - El M'Ghair</option>
              <option value="El Meniaa">50 - El Meniaa</option>
              <option value="Ouled Djellal">51 - Ouled Djellal</option>
              <option value="Bordj Badji Mokhtar">52 - Bordj Badji Mokhtar</option>
              <option value="Béni Abbès">53 - Béni Abbès</option>
              <option value="Timimoun">54 - Timimoun</option>
              <option value="Touggourt">55 - Touggourt</option>
              <option value="Djanet">56 - Djanet</option>
              <option value="In Salah">57 - In Salah</option>
              <option value="In Guezzam">58 - In Guezzam</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: product.id * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden border border-[#FF8BA7] relative"
              >
                {/* Image Container - Adjusted for better image display */}
                <div className="relative pt-[100%] w-full overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {/* Wishlist button overlaid on image */}
                  <div className="absolute top-4 right-4 z-10">
                    <button 
                      className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#FFF0F3] transition-all duration-300 border border-[#FF8BA7]"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                    >
                      <FaHeart className={`h-4 w-4 ${wishlist.find(item => item.id === product.id) ? 'text-[#D8315B]' : 'text-[#FF8BA7]'}`} />
                    </button>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-6 flex flex-col items-center">
                  <div className="px-3 py-1 bg-[#FFF0F3] text-[#D8315B] text-xs font-semibold rounded-full mb-3 border border-[#FF8BA7]">
                    {product.region}
                  </div>
                  <h2 className="text-xl font-bold text-center text-[#333333]">{product.name}</h2>
                  <p className="text-gray-700 text-sm mt-2 text-center">{product.description}</p>
                  <p className="text-lg font-semibold mt-4 text-[#D8315B]">{product.price}</p>

                  {/* Buttons */}
                  <div className="mt-6 flex space-x-4 w-full">
                    <Link href={`/products/${product.id}`} className="w-1/2">
                      <button className="w-full bg-[#D8315B] text-white px-4 py-2.5 rounded-full shadow-md hover:bg-[#FF8BA7] transition duration-300 flex items-center justify-center gap-2 text-sm border border-[#FF8BA7] font-medium">
                        <span className="hidden sm:inline">🔍</span> Présentation
                      </button>
                    </Link>

                    <button 
                      className="w-1/2 bg-white text-[#D8315B] px-4 py-2.5 rounded-full shadow-md hover:bg-[#FFF0F3] transition duration-300 flex items-center justify-center gap-2 text-sm border border-[#FF8BA7] font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                    >
                      <FiShoppingCart className="h-4 w-4" /> Ajouter
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 flex flex-col items-center justify-center py-16">
              <svg className="w-16 h-16 text-[#D4A373] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-gray-800 text-center text-xl font-medium">Aucune tenue trouvée. 😕</p>
              <button 
                onClick={() => {setSearch(""); setRegion("");}}
                className="mt-4 bg-[#D8315B] text-white px-5 py-2 rounded-full shadow-md hover:bg-[#FF8BA7] transition duration-300 border border-[#FF8BA7]"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer Component */}
      <Footer products={products} />
      
      {/* Shopping Cart */}
      <ShoppingCart 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cart={cart} 
        updateCart={updateCart} 
        removeFromCart={removeFromCart} 
      />
      
      {/* Wishlist */}
      <Wishlist 
        isOpen={wishlistOpen} 
        onClose={() => setWishlistOpen(false)} 
        wishlist={wishlist} 
        removeFromWishlist={removeFromWishlist} 
        addToCart={addToCart} 
      />
      
      {/* Order Form */}
      {showOrderForm && selectedProduct && (
        <OrderForm
          product={selectedProduct}
          onClose={() => {
            setShowOrderForm(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </div>
  );
}