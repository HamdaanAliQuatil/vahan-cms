import React, { useState, ChangeEvent, useEffect } from 'react';
import '../styles/search-box.css';

interface SearchResult {
  name: string;
  email: string;
  mobile_number: string;
  date_of_birth: string;
}

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/v1/entity/${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    if (query.trim() !== '') {
      fetchResults();
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="search-box-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search Record. name: <entity name> OR <entity name>"
        value={query}
        onChange={handleChange}
      />
      <div className="search-results">
        {loading && <div>Loading...</div>}
        {!loading &&
          results.map((result, index) => (
            <div
              key={index}
              className={`result-item ${index === 0 ? 'latest' : 'old'}`}
            >
              {result.name} - {result.email} - {result.mobile_number} - {result.date_of_birth}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchBox;