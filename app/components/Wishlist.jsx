"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiHeart, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";

const Wishlist = ({ isOpen, onClose, wishlist, removeFromWishlist, addToCart }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black bg-opacity-40"
            onClick={onClose}
          ></div>
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-[#FF8BA7]">
              <h2 className="text-xl font-bold text-[#D8315B] flex items-center">
                <FiHeart className="mr-2" /> Ma Liste de Souhaits
              </h2>
              <button
                className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                onClick={onClose}
              >
                <FiX className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            {wishlist.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                <img
                  src="/empty-wishlist.svg" // You should add this image to your public folder
                  alt="Liste de souhaits vide"
                  className="w-40 h-40 mb-6 opacity-50"
                />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Votre liste de souhaits est vide</h3>
                <p className="text-gray-500 mb-6">Ajoutez vos articles préférés à votre liste de souhaits</p>
                <button 
                  onClick={onClose}
                  className="bg-[#D8315B] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#FF8BA7] transition duration-300 border border-[#FF8BA7]"
                >
                  Explorer la collection
                </button>
              </div>
            ) : (
              <div className="flex-grow overflow-y-auto p-4">
                {wishlist.map((product) => (
                  <motion.div 
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex border-b border-gray-200 py-4"
                  >
                    <div className="w-20 h-20 rounded-md overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">{product.name}</h3>
                        <button 
                          onClick={() => removeFromWishlist(product.id)}
                          className="text-gray-400 hover:text-[#D8315B] transition-colors duration-200"
                        >
                          <FiX className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <p className="text-sm text-gray-500">{product.region}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="font-semibold text-[#D8315B]">{product.price}</p>
                        <button 
                          onClick={() => {
                            addToCart(product, 1, "M");
                            removeFromWishlist(product.id);
                          }}
                          className="bg-[#D8315B] text-white px-3 py-1 rounded-full text-sm shadow-md hover:bg-[#FF8BA7] transition duration-300 border border-[#FF8BA7] flex items-center"
                        >
                          <FiShoppingCart className="mr-1 h-3 w-3" />
                          Ajouter au panier
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {wishlist.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="w-full bg-[#D8315B] text-white py-3 rounded-full shadow-md hover:bg-[#FF8BA7] transition duration-300 border border-[#FF8BA7]"
                >
                  Continuer mes achats
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Wishlist;