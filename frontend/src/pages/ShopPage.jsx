// src/components/ShopPage.jsx
import React, { useState, useEffect } from 'react';
import { FiFilter, FiX, FiHeart, FiStar, FiShoppingBag, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaGem, FaRing, } from 'react-icons/fa';
import { TbAngle } from "react-icons/tb";
import { GiDropEarrings } from "react-icons/gi";
import { GiNoseSide } from "react-icons/gi";

const dummyProducts = [
  {
    id: 1,
    title: "Elegant Gold Ring",
    price: 7999,
    image: "/images/p1.jpg",
    metal: "Gold",
    category: "Rings",
    rating: 4.8,
    discount: 10,
    isNew: true
  },
  {
    id: 2,
    title: "Diamond Pendant",
    price: 9999,
    image: "/images/p2.jpg",
    metal: "Platinum",
    category: "Necklaces",
    rating: 4.9,
    discount: 15,
    isNew: false
  },
  {
    id: 3,
    title: "Classic Earrings",
    price: 3499,
    image: "/images/p3.jpg",
    metal: "Silver",
    category: "Earrings",
    rating: 4.5,
    discount: 0,
    isNew: true
  },
  {
    id: 4,
    title: "Wedding Band",
    price: 5999,
    image: "/images/p4.jpg",
    metal: "Gold",
    category: "Rings",
    rating: 4.7,
    discount: 5,
    isNew: false
  },
  {
    id: 5,
    title: "Rose Gold Bracelet",
    price: 4599,
    image: "/images/p5.jpg",
    metal: "Rose Gold",
    category: "Bracelets",
    rating: 4.6,
    discount: 20,
    isNew: true
  },
  {
    id: 6,
    title: "Moissanite Ring",
    price: 10999,
    image: "/images/p6.jpg",
    metal: "Gold",
    category: "Rings",
    rating: 4.9,
    discount: 0,
    isNew: false
  },
  {
    id: 7,
    title: "Lab-Grown Diamond Set",
    price: 13999,
    image: "/images/p7.jpg",
    metal: "Lab Grown",
    category: "Necklaces",
    rating: 5.0,
    discount: 12,
    isNew: true
  },
  {
    id: 8,
    title: "Pearl Earrings",
    price: 2999,
    image: "/images/p8.jpg",
    metal: "Silver",
    category: "Earrings",
    rating: 4.4,
    discount: 0,
    isNew: false
  },
  {
    id: 9,
    title: "Designer Necklace",
    price: 12499,
    image: "/images/p9.jpg",
    metal: "Gold",
    category: "Necklaces",
    rating: 4.7,
    discount: 8,
    isNew: true
  },
  {
    id: 10,
    title: "Elegant Nosepin",
    price: 1999,
    image: "/images/p10.jpg",
    metal: "Gold",
    category: "Nosepin",
    rating: 4.3,
    discount: 0,
    isNew: true
  },
  {
    id: 11,
    title: "Sapphire Bracelet",
    price: 8999,
    image: "/images/p11.jpg",
    metal: "Platinum",
    category: "Bracelets",
    rating: 4.9,
    discount: 0,
    isNew: true
  },
  {
    id: 12,
    title: "Ruby Stud Earrings",
    price: 7499,
    image: "/images/p12.jpg",
    metal: "Gold",
    category: "Earrings",
    rating: 4.8,
    discount: 10,
    isNew: false
  },
];

const categoryIcons = {
  Rings: <FaRing className="text-amber-500" />,
  Necklaces: <GiDropEarrings className="text-blue-500" />,
  Earrings: <GiDropEarrings className="text-purple-500" />,
  Bracelets: <TbAngle className="text-rose-500" />,
  Nosepin: <GiNoseSide className="text-emerald-500" />
};

export default function ShopPage() {
  const [visibleCount, setVisibleCount] = useState(8);
  const [productsToShow, setProductsToShow] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    metals: [],
    categories: [],
    priceRange: [0, 20000]
  });
  const [sortOption, setSortOption] = useState('newest');
  const [expandedFilters, setExpandedFilters] = useState({
    metal: true,
    category: true,
    price: true
  });

  // Filter and sort products
  useEffect(() => {
    let filtered = [...dummyProducts];

    // Apply metal filters
    if (filters.metals.length > 0) {
      filtered = filtered.filter(product => filters.metals.includes(product.metal));
    }

    // Apply category filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => filters.categories.includes(product.category));
    }

    // Apply price range
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Apply sorting
    switch (sortOption) {
      case 'newest':
        // Assuming newer products have higher IDs
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setProductsToShow(filtered.slice(0, visibleCount));
  }, [visibleCount, filters, sortOption]);

  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  const toggleFilter = (type, value) => {
    setFilters(prev => {
      const currentValues = [...prev[type]];
      const index = currentValues.indexOf(value);

      if (index > -1) {
        currentValues.splice(index, 1);
      } else {
        currentValues.push(value);
      }

      return {
        ...prev,
        [type]: currentValues
      };
    });
  };

  const toggleFilterSection = (section) => {
    setExpandedFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Get unique metals and categories for filters
  const uniqueMetals = [...new Set(dummyProducts.map(p => p.metal))];
  const uniqueCategories = [...new Set(dummyProducts.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#4d2331] via-rose-900 to-[#4d2331] py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-100 mb-4 fraunces">Luxury Jewelry Collection</h1>
        <p className="max-w-2xl mx-auto text-gray-100 text-lg fraunces">
          Discover our exclusive collection of handcrafted jewelry pieces that blend timeless elegance with modern design.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 py-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 bg-amber-700 text-white px-4 py-2 rounded-lg"
          >
            <FiFilter /> Filters
          </button>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 bg-white appearance-none pr-8"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <FiChevronDown className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className={`hidden lg:block w-72 sticky top-24 h-fit bg-white rounded-xl shadow-lg p-6`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Filters</h3>
              <button
                onClick={() => setFilters({ metals: [], categories: [], priceRange: [0, 20000] })}
                className="text-amber-700 hover:underline text-sm"
              >
                Clear all
              </button>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <div
                className="flex justify-between items-center cursor-pointer mb-3"
                onClick={() => toggleFilterSection('price')}
              >
                <h4 className="font-semibold text-gray-700">Price Range</h4>
                {expandedFilters.price ? <FiChevronUp /> : <FiChevronDown />}
              </div>

              {expandedFilters.price && (
                <div className="pl-1">
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>₹0</span>
                      <span>₹20,000</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20000"
                      step="1000"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                      }))}
                      className="w-full h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-amber-700"
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm font-medium">Up to ₹{filters.priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Metal Filter */}
            <div className="mb-6">
              <div
                className="flex justify-between items-center cursor-pointer mb-3"
                onClick={() => toggleFilterSection('metal')}
              >
                <h4 className="font-semibold text-gray-700">Metal</h4>
                {expandedFilters.metal ? <FiChevronUp /> : <FiChevronDown />}
              </div>

              {expandedFilters.metal && (
                <div className="space-y-2 pl-1">
                  {uniqueMetals.map(metal => (
                    <div key={metal} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`metal-${metal}`}
                        checked={filters.metals.includes(metal)}
                        onChange={() => toggleFilter('metals', metal)}
                        className="w-4 h-4 text-amber-700 rounded focus:ring-amber-500"
                      />
                      <label htmlFor={`metal-${metal}`} className="ml-2 text-gray-700">
                        {metal}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <div
                className="flex justify-between items-center cursor-pointer mb-3"
                onClick={() => toggleFilterSection('category')}
              >
                <h4 className="font-semibold text-gray-700">Category</h4>
                {expandedFilters.category ? <FiChevronUp /> : <FiChevronDown />}
              </div>

              {expandedFilters.category && (
                <div className="space-y-2 pl-1">
                  {uniqueCategories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        checked={filters.categories.includes(category)}
                        onChange={() => toggleFilter('categories', category)}
                        className="w-4 h-4 text-amber-700 rounded focus:ring-amber-500"
                      />
                      <label htmlFor={`category-${category}`} className="ml-2 text-gray-700 flex items-center">
                        <span className="mr-2">{categoryIcons[category] || <FaGem />}</span>
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Active Filters */}
            {(filters.metals.length > 0 || filters.categories.length > 0 || filters.priceRange[1] < 20000) && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-2">Active Filters</h4>
                <div className="flex flex-wrap gap-2">
                  {filters.metals.map(metal => (
                    <span
                      key={metal}
                      className="bg-amber-100 text-rose-800 px-2 py-1 rounded-full text-sm flex items-center"
                    >
                      {metal}
                      <button
                        onClick={() => toggleFilter('metals', metal)}
                        className="ml-1 text-rose-800 hover:text-rose-900"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  ))}
                  {filters.categories.map(category => (
                    <span
                      key={category}
                      className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm flex items-center"
                    >
                      {category}
                      <button
                        onClick={() => toggleFilter('categories', category)}
                        className="ml-1 text-amber-800 hover:text-amber-900"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  ))}
                  {filters.priceRange[1] < 20000 && (
                    <span className="bg-rose-100 text-rose-900 px-2 py-1 rounded-full text-sm flex items-center">
                      Under ₹{filters.priceRange[1].toLocaleString()}
                      <button
                        onClick={() => setFilters(prev => ({
                          ...prev,
                          priceRange: [0, 20000]
                        }))}
                        className="ml-1 text-rose-800 hover:text-rose-900"
                      >
                        <FiX size={14} />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </aside>

          {/* Mobile Filter Overlay */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-opacity-50"
                onClick={() => setShowFilters(false)}
              ></div>
              <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-xl overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Filters</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiX size={24} />
                    </button>
                  </div>

                  {/* Mobile filters content (same as desktop but adapted) */}
                  <div className="space-y-6">
                    {/* Price Filter */}
                    <div>
                      <div
                        className="flex justify-between items-center cursor-pointer mb-3"
                        onClick={() => toggleFilterSection('price')}
                      >
                        <h4 className="font-semibold text-gray-700">Price Range</h4>
                        {expandedFilters.price ? <FiChevronUp /> : <FiChevronDown />}
                      </div>

                      {expandedFilters.price && (
                        <div className="pl-1">
                          <div className="mb-2">
                            <div className="flex justify-between text-sm text-gray-600">
                              <span>₹0</span>
                              <span>₹20,000</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="20000"
                              step="1000"
                              value={filters.priceRange[1]}
                              onChange={(e) => setFilters(prev => ({
                                ...prev,
                                priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                              }))}
                              className="w-full h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-amber-700"
                            />
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-sm font-medium">Up to ₹{filters.priceRange[1].toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Metal Filter */}
                    <div>
                      <div
                        className="flex justify-between items-center cursor-pointer mb-3"
                        onClick={() => toggleFilterSection('metal')}
                      >
                        <h4 className="font-semibold text-gray-700">Metal</h4>
                        {expandedFilters.metal ? <FiChevronUp /> : <FiChevronDown />}
                      </div>

                      {expandedFilters.metal && (
                        <div className="space-y-2 pl-1">
                          {uniqueMetals.map(metal => (
                            <div key={metal} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`mobile-metal-${metal}`}
                                checked={filters.metals.includes(metal)}
                                onChange={() => toggleFilter('metals', metal)}
                                className="w-4 h-4 text-amber-700 rounded focus:ring-amber-500"
                              />
                              <label htmlFor={`mobile-metal-${metal}`} className="ml-2 text-gray-700">
                                {metal}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Category Filter */}
                    <div>
                      <div
                        className="flex justify-between items-center cursor-pointer mb-3"
                        onClick={() => toggleFilterSection('category')}
                      >
                        <h4 className="font-semibold text-gray-700">Category</h4>
                        {expandedFilters.category ? <FiChevronUp /> : <FiChevronDown />}
                      </div>

                      {expandedFilters.category && (
                        <div className="space-y-2 pl-1">
                          {uniqueCategories.map(category => (
                            <div key={category} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`mobile-category-${category}`}
                                checked={filters.categories.includes(category)}
                                onChange={() => toggleFilter('categories', category)}
                                className="w-4 h-4 text-amber-700 rounded focus:ring-amber-500"
                              />
                              <label htmlFor={`mobile-category-${category}`} className="ml-2 text-gray-700 flex items-center">
                                <span className="mr-2">{categoryIcons[category] || <FaGem />}</span>
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={() => {
                        setFilters({ metals: [], categories: [], priceRange: [0, 20000] });
                        setShowFilters(false);
                      }}
                      className="flex-1 border border-gray-300 rounded-lg py-3 text-gray-700"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="flex-1 bg-amber-700 text-white rounded-lg py-3"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Section */}
          <section className="flex-1">
            {/* Desktop Header */}
            <div className="hidden lg:flex justify-between items-center mb-6 bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-2xl font-bold text-maroon fraunces">All Jewelry</h2>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 bg-white appearance-none pr-10"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6 text-gray-600">
              Showing {Math.min(productsToShow.length, dummyProducts.length)} of {dummyProducts.length} products
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productsToShow.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <a href="/product">
                    {/* Product Image */}
                    <div className="relative overflow-hidden">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {product.discount > 0 && (
                          <span className="bg-rose-800 text-white text-xs font-bold px-2 py-1 rounded">
                            {product.discount}% OFF
                          </span>
                        )}
                        {product.isNew && (
                          <span className="bg-rose-700 text-white text-xs font-bold px-2 py-1 rounded">
                            NEW
                          </span>
                        )}
                      </div>
                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="bg-white rounded-full p-2 shadow-md hover:bg-amber-50">
                          <FiHeart className="text-gray-600 hover:text-rose-500" />
                        </button>
                        <button className="bg-white rounded-full p-2 shadow-md hover:bg-amber-50">
                          <FiShoppingBag className="text-gray-600 hover:text-rose-700" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 group-hover:text-rose-900 transition-colors">
                          {product.title}
                        </h3>
                        <div className="flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">
                          <FiStar className="fill-amber-500 text-amber-500 mr-1" />
                          {product.rating}
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 mb-3 flex items-center">
                        <span className="mr-2">{categoryIcons[product.category] || <FaGem />}</span>
                        {product.category} | {product.metal}
                      </p>

                      <div className="mt-auto">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-bold text-maron">₹{product.price.toLocaleString()}</span>
                            {product.discount > 0 && (
                              <span className="ml-2 text-sm text-gray-500 line-through">
                                ₹{(product.price / (1 - product.discount / 100)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </span>
                            )}
                          </div>
                          <button className="bg-rose-900 hover:bg-amber-900 text-white rounded-full p-2 transition-colors">
                            <FiShoppingBag />
                          </button>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            {/* Load More */}
            {visibleCount < dummyProducts.length && productsToShow.length > 0 && (
              <div className="text-center mt-10">
                <button
                  onClick={loadMore}
                  className="bg-gradient-to-r from-amber-700 to-amber-800 text-white px-8 py-3 rounded-full hover:from-amber-800 hover:to-amber-900 transition-all shadow-lg hover:shadow-xl"
                >
                  Load More
                </button>
              </div>
            )}

            {/* No Results */}
            {productsToShow.length === 0 && (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">💎</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No matching products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters to find what you're looking for</p>
                <button
                  onClick={() => setFilters({ metals: [], categories: [], priceRange: [0, 20000] })}
                  className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Featured Categories Banner */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Shop By Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {uniqueCategories.map(category => (
            <div
              key={category}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer border border-gray-100"
            >
              <div className="text-3xl mb-3 flex justify-center">
                {categoryIcons[category] || <FaGem className="text-amber-500" />}
              </div>
              <h4 className="font-semibold text-gray-800">{category}</h4>
              <p className="text-sm text-gray-500 mt-1">
                {dummyProducts.filter(p => p.category === category).length} items
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}