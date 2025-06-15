"use client";

import { useState, useEffect } from "react";
import { FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { FaHeart, FaChevronLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";


// This data would normally come from a database or API
// For demonstration purposes, we're including it directly in the page
const products = [
  { id: 1, name: "Djebba AL-Chattar", region: "Constantine", price: "3500 Da", description: "Elegant Algerian Kaftan with gold embroidery.", image: "/chattar.jpg", longDescription: "La Djebba AL-Chattar est une pièce emblématique de la garde-robe traditionnelle de Constantine. Confectionnée en velours de haute qualité, elle se distingue par ses somptueuses broderies en fil d'or réalisées selon la technique ancestrale du 'Medjboud'. Cette tenue d'apparat est portée lors des grandes occasions, particulièrement les mariages. Son prix reflète l'excellence du travail artisanal et la qualité des matériaux utilisés." },
  { id: 2, name: "Caftan El Kadi", region: "Constantine", price: "8000 Da", description: "Caftan du juge, une tenue traditionnelle de Constantine.", image: "/caftankadi.jpg", longDescription: "Le Caftan El Kadi, également connu sous le nom de 'Caftan du Juge', est une tenue d'origine ottomane qui a été adaptée aux traditions de Constantine. Porté à l'origine par les hauts dignitaires de la ville, ce vêtement élégant se caractérise par sa coupe ample et ses finitions raffinées. Sa popularité lors des cérémonies de mariage témoigne de son importance culturelle dans la région." },
  { id: 3, name: "Gandoura Medjboud", region: "Constantine", price: "7000 Da", description: "Vêtement traditionnel constantinois brodé au fil d'or.", image: "/images.jpeg", longDescription: "La Gandoura Medjboud est un vêtement traditionnel de Constantine reconnu pour ses broderies en fil d'or sur velours. Cette technique artisanale ancestrale, qui requiert une grande expertise et beaucoup de patience, fait de chaque pièce une œuvre d'art unique. Les motifs géométriques et floraux qui ornent cette gandoura racontent l'histoire et les traditions de la région." },
  { id: 4, name: "Caftan El Bey", region: "Constantine", price: "9000 Da", description: "Vêtement traditionnel remontant à la Régence d'Alger.", image: "/caftanbey.jpeg", longDescription: "Le Caftan El Bey est une tenue traditionnelle dont l'origine remonte à l'époque de la Régence d'Alger. Porté par les beys, les gouverneurs de provinces, ce vêtement symbolise le prestige et l'autorité. Sa confection implique l'utilisation de tissus nobles et de broderies élaborées, témoignant du savoir-faire artisanal algérien transmis de génération en génération." },
  { id: 5, name: "Lafa Anabia", region: "Annaba", price: "10000 Da", description: "Tenue traditionnelle emblématique d'Annaba.", image: "/lafaanabia.jpeg", longDescription: "La Lafa Anabia est un ensemble traditionnel d'Annaba composé d'une blouse et d'un sarouel ample. Ce qui distingue cette tenue, ce sont les broderies caractéristiques qui l'ornent, avec des motifs floraux typiques de la région. Les couleurs vives et les détails minutieux reflètent l'influence méditerranéenne et la richesse culturelle d'Annaba." },
  { id: 6, name: "Dlala Anabia", region: "Annaba", price: "10000 Da", description: "Tenue nuptiale traditionnelle d'Annaba.", image: "/dlala.jpeg", longDescription: "La Dlala est la tenue nuptiale par excellence d'Annaba. Cette robe cérémonielle se distingue par sa richesse en ornements et ses détails minutieux qui la rendent particulièrement somptueuse. Traditionnellement, la mariée annabie porte cette tenue lors de la cérémonie du henné, un moment fort des célébrations du mariage algérien." },
  { id: 7, name: "Gandoura Cocktail", region: "Annaba", price: "10000 Da", description: "Version moderne et festive de la gandoura traditionnelle.", image: "/Gandouracok.jpeg", longDescription: "La Gandoura Cocktail est une réinterprétation contemporaine de la gandoura traditionnelle d'Annaba. Tout en préservant l'essence du vêtement ancestral, cette version propose des coupes plus modernes et des combinaisons de couleurs adaptées aux occasions festives actuelles. Elle représente parfaitement la façon dont le patrimoine vestimentaire algérien évolue tout en conservant son authenticité." },
  { id: 8, name: "Gandoura Karanfla", region: "Annaba", price: "10000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/karanfla.jpeg", longDescription: "La Gandoura Karanfla tire son nom des motifs d'œillets (karanfel) qui la décorent. Cette tunique ample, traditionnellement portée en Afrique du Nord, se caractérise par ses broderies délicates et ses finitions soignées. Polyvalente, elle peut être portée lors de différentes occasions, des réunions familiales aux cérémonies plus formelles, illustrant la place centrale que tiennent les vêtements traditionnels dans la culture algérienne." },
  { id: 9, name: "Blouza Wahrania ", region: "Oran", price: "12000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/blouza.jpg", longDescription: "La Blouza Wahrania est une tenue emblématique de la ville d’Oran, en Algérie. Elle se distingue par sa coupe ajustée, ses manches courtes ou longues et sa fente centrale ornée de broderies dorées. Cette tenue est souvent portée lors des grandes célébrations comme les mariages ou les fêtes religieuses." }, 
  { id: 10, name: "Chedda Tlemcenienne ", region: "Tlemcen", price: "18000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/tlemcenienne.jpg", longDescription: "La Chedda Tlemcenienne est un costume traditionnel féminin emblématique de la région de Tlemcen, connue pour son riche patrimoine culturel et historique. Ce vêtement est particulièrement porté lors des cérémonies nuptiales et des grandes fêtes, symbolisant la noblesse et l’élégance de la mariée." },
  { id: 11, name: "Karakou Algérois ", region: "Alger", price: "11000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/karakoualger.jpg", longDescription: "Le Karakou algérois est un costume traditionnel emblématique d'Alger. Composé d’une veste en velours richement brodée au fil d’or (appelé fetla) et accompagné d’un pantalon seroual chelka, il est porté lors des mariages et grandes célébrations. Il incarne l’élégance et le raffinement de la femme algérienne." },
  { id: 12, name: "Ghlila ", region: "Alger", price: "10000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/ghlila.jpg", longDescription: "Ghlila est un vêtement traditionnel algérien originaire d’Alger. Il s’agit d’une veste courte, souvent confectionnée en velours et ornée de broderies dorées. Moins formelle que le Karakou, la Ghlila se distingue par sa coupe légère et son élégance simple. Elle est généralement portée avec un seroual ample lors des cérémonies ou fêtes familiales." },
  { id: 13, name: "Le Fergani Constantinois  ", region: "Constantine", price: "13000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/fergani.jpg", longDescription: "Le Fergani Constantinois est une tenue traditionnelle féminine originaire de Constantine, ville emblématique de l’élégance en Algérie. Il est reconnu pour son raffinement et son lien avec l’héritage musical et aristocratique de la région." },
  { id: 14, name: "La Taqendurt ", region: "Béjaïa", price: "7000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/taqendurt.jpg", longDescription: "La Taqendurt est la robe traditionnelle portée par les femmes de Kabylie." },
  { id: 15, name: "Le Caftan El Mansouriya  ", region: "Tlemcen", price: "9000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/elmansoriya.jpg", longDescription: "est une pièce maîtresse du patrimoine vestimentaire tlemcenien" },
  { id: 16, name: "Mlahfa Chaouïa   ", region: "Batna", price: "8000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/malhfa.jpg", longDescription: "La Mlahfa chaouïa est une grande pièce de tissu rectangulaire, souvent en coton ou en laine, " },
  { id: 17, name: "Caftan El Koronfla    ", region: "Anaba", price: "11000 Da", description: "Tunique ample, portée en Afrique du Nord.", image: "/caftankronfla.jpg", longDescription: "Le Caftan El Koronfla est un vêtement traditionnel algérien féminin, nommé d’après la fleur du clou de girofle (koronfla en arabe)." }


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