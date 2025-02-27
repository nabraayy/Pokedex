import { useContext, useState } from "react";
import { PokeballIconSmall } from "../../assets/pokeball";
import { Filters } from "../../components/Filters";
import { PokemonList } from "../../components/PokemonList";
import { PokemonContext } from "../../context/PokemonContext";
import { usePagination } from "../../hooks/usePagination";
import SearchBar from "../../components/SearchBar"; // <-- Importamos el buscador
 // <-- Importamos el botón
import styles from "./styles.module.scss";
import { Pagination } from "../../components/Pagination";
import CapturedButton from "../../components/Capturatebutton/CapturatedButton";

export const Home = () => {
  const { pokemonsFiltered } = useContext(PokemonContext);
  const { page, nextPage, previousPage, backToHome } = usePagination();
  const [search, setSearch] = useState("");
  const [showCaptured, setShowCaptured] = useState(false);

  let perPage = 12;
  
  const filteredPokemons = pokemonsFiltered?.filter((url) =>
    url.includes(search.toLowerCase())
  );
 
  return (
    <div className={styles.home}>
      <header>
        <div onClick={backToHome}>
          <PokeballIconSmall />
          <span>Pokédex</span>
        </div>
        <div className="buscador">
        <SearchBar/> 
        <CapturedButton />
        </div>
        
      </header>

      <Filters />
      <PokemonList
        page={page}
        perPage={perPage}
        pokemonsUrls={pokemonsFiltered}
      />
      <Pagination
        page={page}
        perPage={perPage}
        nextPage={nextPage}
        previousPage={previousPage}
        maxItems={pokemonsFiltered?.length!}
      />
    </div>
  );
};
