import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Product, MenuCategory } from '../types';
import type { AppDispatch } from '../store';

const Menu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // TODO: Replace with actual Redux state
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Classic Margarita',
      description: 'Traditional margarita with lime and salt',
      price: 12.99,
      image: 'https://example.com/margarita.jpg',
      category: 'cocktails',
      brand: 'House Special',
      status: 'available',
      section: 'drinks',
      brandId: 'brand1',
      type: 'cocktail',
      inventory: {
        current: 100,
        minimum: 20,
        maximum: 200
      },
      sizes: [
        {
          id: 'size1',
          name: 'Regular',
          currentPrice: 12.99,
          isAvailable: true
        },
        {
          id: 'size2',
          name: 'Large',
          currentPrice: 15.99,
          isAvailable: true
        }
      ]
    }
  ]);

  const [categories] = useState<MenuCategory[]>([
    {
      id: 'cat1',
      name: 'Cocktails',
      code: 'cocktails',
      displayOrder: 1,
      isActive: true,
      type: 'beverage'
    }
  ]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUpdateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, ...updates } : product
      )
    );
  };

  const handleUpdateInventory = (
    productId: string,
    field: keyof Product['inventory'],
    value: number
  ) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      handleUpdateProduct(productId, {
        inventory: {
          ...product.inventory,
          [field]: value
        }
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Menu Management</h1>
        <button className="btn-primary">Add New Product</button>
      </div>

      {/* Search and Filter */}
      <div className="glass-card p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="input-field flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="input-field md:w-48"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.code}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="glass-card p-4">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  product.status === 'available' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {product.status}
                </span>
              </div>
              <p className="text-sm text-gray-300">{product.description}</p>
              
              {/* Inventory Management */}
              <div className="mt-4 space-y-2">
                <h4 className="font-semibold">Inventory</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs text-gray-400">Current</label>
                    <input
                      type="number"
                      className="input-field w-full"
                      value={product.inventory.current}
                      onChange={(e) => handleUpdateInventory(
                        product.id,
                        'current',
                        parseInt(e.target.value)
                      )}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Min</label>
                    <input
                      type="number"
                      className="input-field w-full"
                      value={product.inventory.minimum}
                      onChange={(e) => handleUpdateInventory(
                        product.id,
                        'minimum',
                        parseInt(e.target.value)
                      )}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">Max</label>
                    <input
                      type="number"
                      className="input-field w-full"
                      value={product.inventory.maximum}
                      onChange={(e) => handleUpdateInventory(
                        product.id,
                        'maximum',
                        parseInt(e.target.value)
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Sizes and Pricing */}
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Sizes & Pricing</h4>
                {product.sizes.map(size => (
                  <div key={size.id} className="flex justify-between items-center mb-2">
                    <span>{size.name}</span>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        className="input-field w-24"
                        value={size.currentPrice}
                        onChange={(e) => {
                          const newSizes = product.sizes.map(s =>
                            s.id === size.id
                              ? { ...s, currentPrice: parseFloat(e.target.value) }
                              : s
                          );
                          handleUpdateProduct(product.id, { sizes: newSizes });
                        }}
                      />
                      <button
                        className={`px-2 py-1 rounded ${
                          size.isAvailable
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-red-500 hover:bg-red-600'
                        }`}
                        onClick={() => {
                          const newSizes = product.sizes.map(s =>
                            s.id === size.id
                              ? { ...s, isAvailable: !s.isAvailable }
                              : s
                          );
                          handleUpdateProduct(product.id, { sizes: newSizes });
                        }}
                      >
                        {size.isAvailable ? 'Available' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  className="btn-secondary"
                  onClick={() => handleUpdateProduct(product.id, {
                    status: product.status === 'available' ? 'out_of_stock' : 'available'
                  })}
                >
                  Toggle Status
                </button>
                <button className="btn-primary">Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
