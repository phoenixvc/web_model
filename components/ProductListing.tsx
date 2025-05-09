import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from './Header';
import { useSession } from 'next-auth/client';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [session, loading] = useSession();
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/shop');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        setError('Failed to fetch products. Please try again later.');
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const addToCart = (product) => {
    // Add product to cart logic
  };

  return (
    <div>
      <Header />
      <main>
        <h1>Product Listing</h1>
        {error && <p>{error}</p>}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="product-list">
          {filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <h2>{product.title}</h2>
              <img src={product.image} alt={product.title} />
              <p>{product.description}</p>
              <p>${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductListing;
