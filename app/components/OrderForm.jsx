"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const OrderForm = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
    quantity: 1,
    size: "M",
    paymentMethod: "livraison",
    notes: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is changed
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Le nom est requis";
    if (!formData.email.trim()) errors.email = "L'email est requis";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "L'email n'est pas valide";
    if (!formData.phone.trim()) errors.phone = "Le téléphone est requis";
    if (!formData.address.trim()) errors.address = "L'adresse est requise";
    if (!formData.city.trim()) errors.city = "La ville est requise";
    if (!formData.region.trim()) errors.region = "La région est requise";
    if (!formData.postalCode.trim()) errors.postalCode = "Le code postal est requis";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would normally submit the order to your backend
      console.log("Order submitted:", formData);
      setSubmitted(true);
      
      // Reset form after submission
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-[#FFF0F3] flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#D8315B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#D8315B] mb-4">Commande Réussie!</h3>
            <p className="text-gray-700 mb-6">
              Merci pour votre commande! Nous vous contacterons bientôt pour confirmer les détails.
            </p>
            <button
              onClick={onClose}
              className="bg-[#D8315B] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#FF8BA7] transition duration-300 border border-[#FF8BA7]"
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center border-b border-[#FF8BA7] p-4">
              <h2 className="text-xl font-bold text-[#D8315B]">Commander {product?.name}</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-[#D8315B] transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              {product && (
                <div className="flex mb-6 border-b border-[#FF8BA7] pb-6">
                  <div className="w-24 h-24 overflow-hidden rounded-md">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <p className="font-semibold text-[#D8315B] mt-1">{product.price}</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-[#D8315B] outline-none ${formErrors.fullName ? 'border-red-500' : 'border-[#FF8BA7]'}`}
                    />
                    {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-[#D8315B] outline-none ${formErrors.email ? 'border-red-500' : 'border-[#FF8BA7]'}`}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-[#D8315B] outline-none ${formErrors.phone ? 'border-red-500' : 'border-[#FF8BA7]'}`}
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-[#D8315B] outline-none ${formErrors.address ? 'border-red-500' : 'border-[#FF8BA7]'}`}
                    />
                    {formErrors.address && <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-[#D8315B] outline-none ${formErrors.city ? 'border-red-500' : 'border-[#FF8BA7]'}`}
                    />
                    {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Région</label>
                    <input
                      type="text"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-[#D8315B] outline-none ${formErrors.region ? 'border-red-500' : 'border-[#FF8BA7]'}`}
                    />
                    {formErrors.region && <p className="text-red-500 text-xs mt-1">{formErrors.region}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-[#D8315B] outline-none ${formErrors.postalCode ? 'border-red-500' : 'border-[#FF8BA7]'}`}
                    />
                    {formErrors.postalCode && <p className="text-red-500 text-xs mt-1">{formErrors.postalCode}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#FF8BA7] rounded-md focus:ring-2 focus:ring-[#D8315B] outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Taille</label>
                    <select
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#FF8BA7] rounded-md focus:ring-2 focus:ring-[#D8315B] outline-none"
                    >
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Méthode de paiement</label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center p-3 border border-[#FF8BA7] rounded-md cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="livraison"
                          checked={formData.paymentMethod === "livraison"}
                          onChange={handleChange}
                          className="mr-2 accent-[#D8315B]"
                        />
                        Paiement à la livraison
                      </label>
                      <label className="flex items-center p-3 border border-[#FF8BA7] rounded-md cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="transfert"
                          checked={formData.paymentMethod === "transfert"}
                          onChange={handleChange}
                          className="mr-2 accent-[#D8315B]"
                        />
                        Transfert bancaire
                      </label>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes supplémentaires</label>
                    <textarea
                      name="notes"
                      rows="3"
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full p-2 border border-[#FF8BA7] rounded-md focus:ring-2 focus:ring-[#D8315B] outline-none"
                      placeholder="Instructions spéciales pour la livraison, préférences, etc."
                    ></textarea>
                  </div>
                </div>
                
                <div className="border-t border-[#FF8BA7] pt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="mr-3 px-5 py-2 text-gray-700 hover:text-[#D8315B] transition-colors duration-300"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="bg-[#D8315B] text-white px-5 py-2 rounded-full shadow-md hover:bg-[#FF8BA7] transition duration-300 border border-[#FF8BA7]"
                  >
                    Confirmer la commande
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default OrderForm;