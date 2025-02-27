import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
import styles from "./CapturedPokemons.module.scss";

const CapturedPokemons = () => {
  const { capturedPokemons, releasePokemon } = useContext(PokemonContext);

  return (
    <div className={styles.capturedContainer}>
      <h2>Pokémon Capturados</h2>
      {capturedPokemons.length === 0 ? (
        <p>No has capturado ningún Pokémon aún.</p>
      ) : (
        <ul>
          {capturedPokemons.map((pokemon) => (
            <li key={pokemon.id} className={styles.pokemonCard}>
              <img src={pokemon.sprite} alt={pokemon.name} />
              <div>
                <h3>{pokemon.name}</h3>
                <p>Altura: {pokemon.height} dm</p>
                <p>Peso: {pokemon.weight} hg</p>
                <p>Capturado: {pokemon.capturedAt}</p>
                <button onClick={() => releasePokemon(pokemon.id)}>Liberar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CapturedPokemons;