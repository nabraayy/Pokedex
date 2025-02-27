import { useContext } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import { PokemonList } from "../../components/PokemonList";  // Asegúrate de que este componente exista y esté bien configurado
import styles from "./captured.module.scss";  // Si necesitas estilos personalizados

const CapturedPage = () => {
  // Obtener los Pokémon capturados desde el contexto
  const { capturedPokemons } = useContext(PokemonContext);

  return (
    <div className={styles.capturedPage}>
      <h1>Pokémon Capturados</h1>
      
      {/* Mostrar los Pokémon capturados si existen */}
      {capturedPokemons.length > 0 ? (
        <PokemonList pokemonsUrls={capturedPokemons} />
      ) : (
        <p>No has capturado ningún Pokémon aún.</p>
      )}
    </div>
  );
};

export default CapturedPage;
