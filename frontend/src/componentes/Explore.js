
import { Route, Link } from 'react-router-dom';
import React, { useState } from 'react';


function Explore() {
  const [dessertName, setDessertName] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `dessert_name=${dessertName}`,
    })
      .then((response) => response.json())
      .then((data) => setSearchResults(data.results))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Explore</h2>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={dessertName}
          onChange={(event) => setDessertName(event.target.value)}
          placeholder="Enter dessert name"
        />
        <button type="submit" >Search</button>
        <div >
          <Link to='/account'> Visit my account</Link>
        </div>
      </form>
      {searchResults.map((result, index) => (
        <div key={index}>
          <h3>{result.name}</h3>
          <p>{result.description}</p>
          <p>{result.ingredients}</p>
          <img src={result.photo} alt={result.name} />
        </div>
      ))}
    </div>
  );
}

export default Explore;