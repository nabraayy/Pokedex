import { usePokemon } from "../../hooks/usePokemon";
import { background } from "../../utils/BackgroundsByType";
import { Link } from "react-router-dom";
import { Loader } from "../Loader";
import { useContext, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { PokemonContext } from "../../context/PokemonContext"
interface Props {
  url: string;
}

export const PokemonCard = ({ url }: Props) => {
  const { pokemon } = usePokemon(url);
  const { capturedPokemons, capturePokemon, releasePokemon } = useContext(PokemonContext);
  /* @ts-ignore */
  const backgroundSelected = background[pokemon?.types[0]?.type?.name];
  const isCaptured = capturedPokemons.includes(url);
  return (
    <Link to={`/${pokemon?.id}`} className={styles.pokeCard}>
      <div style={{ borderColor: backgroundSelected }} className={styles.top}>
        <span style={{ color: backgroundSelected }}>#{pokemon?.id}</span>
        {pokemon?.sprites?.other?.dream_world?.front_default ||
        pokemon?.sprites?.front_default ? (
          <img
            src={
              pokemon?.sprites?.other?.dream_world?.front_default ||
              pokemon?.sprites?.front_default
            }
            alt={pokemon?.name}
          />
        ) : (
          <div className={styles.loadingContainer}>
            <Loader color={backgroundSelected} />
          </div>
        )}
      </div>
      <div style={{ background: backgroundSelected }} className={styles.bottom}>
        {pokemon?.name}
        {isCaptured ?(
          <button onClick={()=>releasePokemon(url)}
          className={styles.module}>Liberar</button>
        ):(
          <button onClick={() =>capturePokemon(url)}
          className={styles.capture}>Capturar</button>
        )}
      </div>
    </Link>
  );
};