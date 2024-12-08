import React, { useState } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';

const Home = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const API_ID = '211fb2af'; // Replace with your APP_ID
  const API_KEY = '50511b2ae574de50b6952a976ee03185'; // Replace with your APP_KEY (no extra spaces/newlines)
  const USER_ID = 'your_user_id'; // Replace with your actual User ID

  const fetchRecipes = async () => {
    if (!query.trim()) {
      alert('Please enter a search term.');
      return;
    }

    // Construct the API URL
    const API_URL = `https://api.edamam.com/search?q=${encodeURIComponent(query)}&app_id=${API_ID}&app_key=${API_KEY}`;

    try {
      const response = await axios.get(API_URL, {
        headers: {
          'Edamam-Account-User': 1063261278, // Add User ID to the request headers
        },
      });

      if (response.status === 200 && response.data.hits.length > 0) {
        setRecipes(response.data.hits);
      } else {
        setRecipes([]); // No results, empty the list
        alert('No recipes found. Please try a different search term.');
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      if (error.response) {
        alert(`Error: ${error.response.status} - ${error.response.data.error}`);
      } else if (error.request) {
        alert('Error: No response from server. Check your network connection.');
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  return (
    <div>
      <h1>Recipe Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="recipe-container">
        {recipes.length > 0 ? (
          recipes.map((item, index) => (
            <RecipeCard key={index} recipe={item.recipe} />
          ))
        ) : (
          <p>No recipes found. Try searching for something else!</p>
        )}
      </div>
    </div>
  );
};

export default Home;
