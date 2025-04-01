import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const FAQ = ({ faqs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const results = faqs.filter((faq) =>
      faq.question.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredFaqs(results);
  };

  return (
    <div>
      <Header />
      <main>
        <h1>Frequently Asked Questions</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="faq-list">
          {filteredFaqs.map((faq) => (
            <div key={faq.id} className="faq-item">
              <h2>{faq.question}</h2>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
