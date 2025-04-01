import React, { useState } from 'react';
import Header from './Header';

const Search = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const results = data.filter((item) =>
      item.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <Header />
      <main>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="search-results">
          {searchResults.map((result) => (
            <div key={result._id} className="search-result-item">
              <h2>{result.title}</h2>
              <p>{result.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Search;
