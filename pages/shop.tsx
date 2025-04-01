import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductListing from '../components/ProductListing';
import ShoppingCart from '../components/ShoppingCart';

const Shop = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };

    fetchSession();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <h1>Shop</h1>
        <ProductListing />
        <ShoppingCart />
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
