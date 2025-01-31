import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import type { AppDispatch, RootState } from "../store";
import {
  getProducts,
  getCategories,
  deleteProduct,
} from "../store/slices/menuSlice";
import type { Product, MenuCategory } from "../types";
import { getImageUrl } from "../utils/imageUtils";

const Menu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, categories } = useSelector(
    (state: RootState) => state.menu
  );
  console.log('Menu state:', { products, loading, categories });
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !activeCategory || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await dispatch(deleteProduct(productId));
    }
  };

  return (
    <div className="min-h-screen bg-deep-blue/100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Menu Management</h1>
          <button
            onClick={() => {
              /* TODO: Implement new product creation */
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Add New Product
          </button>
        </div>

        {/* Search and Category Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-blue-900/50 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategory("")}
              className={`px-4 py-2 rounded whitespace-nowrap ${
                activeCategory === ""
                  ? "bg-blue-500 text-white"
                  : "bg-blue-900/50 text-white hover:bg-blue-800/50"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded whitespace-nowrap ${
                  activeCategory === category.id
                    ? "bg-blue-500 text-white"
                    : "bg-blue-900/50 text-white hover:bg-blue-800/50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <div className="relative mb-4">
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => {
                        /* TODO: Implement edit */
                      }}
                      className="p-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
                    >
                      <PencilIcon className="h-5 w-5 text-white" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 bg-red-500 rounded hover:bg-red-600 transition-colors"
                    >
                      <TrashIcon className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-300 mb-4">{product.description}</p>
                <div className="space-y-2">
                  {product.sizes.map((size) => (
                    <div
                      key={size.id}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-300">{size.name}</span>
                      <span className="text-white font-bold">
                        ${size.currentPrice.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Category</span>
                    <span className="text-white">
                      {
                        categories.find((c) => c.id === product.category)
                          ?.name
                      }
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
