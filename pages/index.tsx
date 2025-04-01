import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Tips from '../components/Tips';
import ProductListing from '../components/ProductListing';
import BlogPostListing from '../components/BlogPostListing';
import CommunityHighlights from '../components/CommunityHighlights';

const HomePage = () => {
  return (
    <div>
      <Header />
      <main>
        <section>
          <h2>Tips for Webcam Modeling</h2>
          <Tips />
        </section>
        <section>
          <h2>Featured Products</h2>
          <ProductListing />
        </section>
        <section>
          <h2>Latest Blog Posts</h2>
          <BlogPostListing />
        </section>
        <section>
          <h2>Community Highlights</h2>
          <CommunityHighlights />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
