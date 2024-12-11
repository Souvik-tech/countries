import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]); // Store all country data
  const [filteredCountries, setFilteredCountries] = useState([]); // Filtered country data for search
  const [searchTerm, setSearchTerm] = useState(""); // Search input value

  // Function to fetch all countries
  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data); // Store the entire response data
      setFilteredCountries(response.data); // Initially, show all countries
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle search input change
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter countries based on search term
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value)
    );
    setFilteredCountries(filtered);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="App">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for a country"
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />

      {/* Country Cards */}
      <div className="cardwrap">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div className="countryCard" key={country.cca3}>
              <figure className="">
                <img 
                  className="card-img"
                  src={country.flags.png}
                  alt={`${country.name.common} flag`}
                />
              </figure>
              <h3>{country.name.common}</h3>
            </div>
          ))
        ) : (
          <p>No countries found</p>
        )}
      </div>
    </div>
  );
}

export default App;
