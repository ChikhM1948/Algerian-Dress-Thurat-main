"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import Link from "next/link";
import OrderForm from "./OrderForm";

const ShoppingCart = ({ isOpen, onClose, cart, updateCart, removeFromCart }) => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    // Calculate subtotal
    const total = cart.reduce((sum, item) => {
      const price = parseInt(item.product.price.replace(/\D/g, ''));
      return sum + (price * item.quantity);
    }, 0);
    setSubtotal(total);
  }, [cart]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCart(productId, newQuantity);
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      // For multi-product checkout, you would typically go to a checkout page
      // For simplicity, we'll just use the order form for the first item
      setSelectedProduct(cart[0].product);
      setShowOrderForm(true);
    }
  };

  const formatPrice = (price) => {
    // Format price to include spaces for thousands
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " Da";
  };

  return (
    <>
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
                  <FiShoppingBag className="mr-2" /> Mon Panier
                </h2>
                <button
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  onClick={onClose}
                >
                  <FiX className="h-6 w-6 text-gray-500" />
                </button>
              </div>
              
              {cart.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                  <img
                    src="/empty-cart.svg" // You should add this image to your public folder
                    alt="Panier vide"
                    className="w-40 h-40 mb-6 opacity-50"
                  />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Votre panier est vide</h3>
                  <p className="text-gray-500 mb-6">Découvrez notre collection et ajoutez des articles à votre panier</p>
                  <button 
                    onClick={onClose}
                    className="bg-[#D8315B] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#FF8BA7] transition duration-300 border border-[#FF8BA7]"
                  >
                    Continuer mes achats
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-grow overflow-y-auto p-4">
                    {cart.map((item) => {
                      const price = parseInt(item.product.price.replace(/\D/g, ''));
                      const itemTotal = price * item.quantity;
                      
                      return (
                        <motion.div 
                          key={item.product.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex border-b border-gray-200 py-4"
                        >
                          <div className="w-20 h-20 rounded-md overflow-hidden">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="ml-4 flex-grow">
                            <div className="flex justify-between">
                              <h3 className="font-semibold">{item.product.name}</h3>
                              <button 
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-gray-400 hover:text-[#D8315B] transition-colors duration-200"
                              >
                                <FiX className="h-5 w-5" />
                              </button>
                            </div>
                            
                            <p className="text-sm text-gray-500">{item.product.region}</p>
                            <p className="text-sm text-gray-500">Taille: {item.size || 'Standard'}</p>
                            
                            <div className="flex justify-between items-center mt-2">
                              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                                <button 
                                  onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                                >
                                  <FiMinus className="h-4 w-4" />
                                </button>
                                <span className="px-3">{item.quantity}</span>
                                <button 
                                  onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                  className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                                >
                                  <FiPlus className="h-4 w-4" />
                                </button>
                              </div>
                              
                              <p className="font-semibold text-[#D8315B]">
                                {formatPrice(itemTotal)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-600">Sous-total</span>
                      <span className="font-semibold">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between mb-6">
                      <span className="text-gray-600">Livraison</span>
                      <span className="font-semibold">À calculer</span>
                    </div>
                    
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-[#D8315B] text-white py-3 rounded-full shadow-md hover:bg-[#FF8BA7] transition duration-300 border border-[#FF8BA7] flex items-center justify-center"
                    >
                      Passer la commande
                    </button>
                    
                    <button
                      onClick={onClose}
                      className="w-full text-[#D8315B] mt-2 py-2"
                    >
                      Continuer mes achats
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {showOrderForm && selectedProduct && (
        <OrderForm 
          product={selectedProduct} 
          onClose={() => {
            setShowOrderForm(false);
            setSelectedProduct(null);
          }} 
        />
      )}
    </>
  );
};

export default ShoppingCart;