"use client";

import { useState, useEffect } from "react";
import { FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { FaHeart, FaChevronLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";


// This data would normally come from a database or API
// For demonstration purposes, we're including it directly in the page
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

export default function ProductDetail({ params }) {
  const productId = parseInt(params.id);
  const product = products.find(p => p.id === productId);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [inWishlist, setInWishlist] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // States for managing cart and wishlist
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!product) return;
    
    setLoaded(true);
    
    // Load cart and wishlist from localStorage
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (e) {
        console.error("Error parsing saved cart:", e);
      }
    }
    
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        setWishlist(parsedWishlist);
        
        // Check if current product is in wishlist
        setInWishlist(parsedWishlist.some(item => item.id === productId));
      } catch (e) {
        console.error("Error parsing saved wishlist:", e);
      }
    }
  }, [productId, product]);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (loaded) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, loaded]);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (loaded) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, loaded]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="text-4xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-[#D8315B] mb-4">Produit non trouvé</h1>
        <p className="text-gray-600 mb-8">Nous n'avons pas pu trouver le produit que vous cherchez.</p>
        <Link href="/" className="bg-[#D8315B] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#FF8BA7] transition duration-300 border border-[#FF8BA7]">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const addToCart = () => {
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
        return [...prevCart, { product, quantity, size: selectedSize }];
      }
    });
    
    // Show confirmation
    alert("Produit ajouté au panier !");
  };
  
  const toggleWishlist = () => {
    if (inWishlist) {
      // Remove from wishlist
      setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== product.id));
      setInWishlist(false);
    } else {
      // Add to wishlist
      setWishlist(prevWishlist => {
        if (!prevWishlist.find(item => item.id === product.id)) {
          return [...prevWishlist, product];
        }
        return prevWishlist;
      });
      setInWishlist(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#333333]">
      {/* Navbar Component */}
      <Navbar 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
        cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)}
        wishlistItemCount={wishlist.length}
      />

      {/* Product Detail Section */}
      <section className="max-w-6xl mx-auto p-6 py-16">
        <Link href="/" className="inline-flex items-center text-[#D8315B] hover:text-[#FF8BA7] mb-8">
          <FaChevronLeft className="mr-2" /> Retour aux produits
        </Link>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative pt-[100%] w-full overflow-hidden rounded-lg border border-[#FF8BA7] shadow-lg">
            <img 
              src={product.image} 
              alt={product.name} 
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
          
          {/* Product Info */}
          <div>
            <div className="px-3 py-1 bg-[#FFF0F3] text-[#D8315B] text-xs font-semibold rounded-full mb-3 inline-block border border-[#FF8BA7]">
              {product.region}
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold text-[#D8315B] mb-6">{product.price}</p>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{product.longDescription || product.description}</p>
            </div>
            
            {/* Size Selection */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Taille</h2>
              <div className="flex space-x-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map(size => (
                  <button 
                    key={size}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border transition-colors duration-200 ${
                      selectedSize === size 
                        ? 'bg-[#D8315B] text-white border-[#D8315B]' 
                        : 'border-gray-300 hover:border-[#FF8BA7]'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity Selection */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Quantité</h2>
              <div className="flex items-center">
                <button 
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-200 transition-colors duration-200"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  <FiMinus />
                </button>
                <span className="mx-6 text-lg font-medium">{quantity}</span>
                <button 
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-300 hover:bg-gray-200 transition-colors duration-200"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <FiPlus />
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button 
                className="flex-1 bg-[#D8315B] text-white py-3 px-6 rounded-full shadow-md hover:bg-[#FF8BA7] transition duration-300 border border-[#FF8BA7] flex items-center justify-center"
                onClick={addToCart}
              >
                <FiShoppingCart className="mr-2" /> Ajouter au panier
              </button>
              
              <button 
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md border transition-colors duration-200 ${
                  inWishlist 
                    ? 'bg-[#FFF0F3] border-[#FF8BA7]' 
                    : 'bg-white border-gray-300 hover:border-[#FF8BA7]'
                }`}
                onClick={toggleWishlist}
              >
                <FaHeart className={`h-5 w-5 ${inWishlist ? 'text-[#D8315B]' : 'text-gray-400'}`} />
              </button>
            </div>
            
            {/* Buy Now Button */}
            <button 
              className="w-full mt-4 bg-[#FF8BA7] text-white py-3 px-6 rounded-full shadow-md hover:bg-[#D8315B] transition duration-300 border border-[#FF8BA7]"
              onClick={() => setShowOrderForm(true)}
            >
              Acheter maintenant
            </button>
          </div>
        </div>
      </section>

      {/* Order Form */}
      {showOrderForm && (
        <OrderForm
          product={product}
          onClose={() => setShowOrderForm(false)}
        />
      )}

      {/* Footer Component */}
      <Footer products={products} />
    </div>
  );
}