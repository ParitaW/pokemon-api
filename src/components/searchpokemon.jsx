import React, { useState } from "react";
import "../App.css";

function SearchPokemon() {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoding] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  //fetch pokemon by name or id
  const fetchPokemon = async (pokemon) => {
    setLoding(true);
    setError("");
    try {
      const reponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      if (!reponse.ok) {
        throw new Error("Pokemon not found");
      }
      const data = await reponse.json();
      setPokemonData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoding(false);
    }
  };

  // handle search button click
  const handleSearch = () => {
    if (search.trim()) {
      fetchPokemon(search.toLowerCase());
    }
  };

  // fetch random pokemon on load or when button is clicked
  const loadRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    fetchPokemon(randomId);
  };

  return (
    <div className="search-container">
      <h1>Pokemon search</h1>
      <div>
        <input
          type="text"
          placeholder="Enter pokemon name or id"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={loadRandomPokemon}>Random Pokemon</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && pokemonData && (
        <div className="pokemon-container">
          <h2>{pokemonData.name}</h2>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`}
            alt={pokemonData.name}
          />
          <p>
            <strong>Type: </strong>
            {pokemonData.types.map((type) => type.type.name).join(", ")}
          </p>
          <p>
            <strong>Abilities: </strong>
            {pokemonData.abilities
              .map((ability) => ability.ability.name)
              .join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchPokemon;
