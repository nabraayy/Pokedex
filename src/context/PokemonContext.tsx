import axios from "axios";
import { createContext, useEffect, useState, useReducer} from "react";
import {
  AllPokemonsResult,
  PokemosByTypeResult,
  PokeType,
} from "../interfaces/types";

const initialState = {
  capturedPokemons: JSON.parse(localStorage.getItem("capturedPokemons") || "[]"),
};


const actionTypes = {
  CAPTURE: "CAPTURE",
  RELEASE: "RELEASE",
};
interface PokemonData {
  id: number;
  name: string;
  sprite: string;
  height: number;
  weight: number;
  capturedAt: string; // Fecha y hora de captura
}
interface State {
  capturedPokemons: string[];
}

interface Action {
  type: string;
  payload: string;
}
function pokemonReducer(state: State, action: Action) {
  switch (action.type) {
    case actionTypes.CAPTURE:
      const newCapturedPokemons = [...state.capturedPokemons, action.payload];
      localStorage.setItem("capturedPokemons", JSON.stringify(newCapturedPokemons));
      return { ...state, capturedPokemons: newCapturedPokemons };

    case actionTypes.RELEASE:
      const filteredPokemons = state.capturedPokemons.filter(
        (pokemon) => pokemon !== action.payload
      );
      localStorage.setItem("capturedPokemons", JSON.stringify(filteredPokemons));
      return { ...state, capturedPokemons: filteredPokemons };

    default:
      return state;
  }
}
interface ContextProps {
  types: PokeType[];
  filterSelected: PokeType;
  pokemonsFiltered: string[] | null;
  changeTypeSelected: (type: PokeType) => void;
  capturedPokemons: string[];
  capturePokemon: (url: string) => void;
  releasePokemon: (url: string) => void;
}

export const PokemonContext = createContext<ContextProps>({} as ContextProps);

const PokemonProvider = ({ children }: any) => {
  let allPokemonsUrl = "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0";

  const defaultState: PokeType = {
    name: "All",
    url: allPokemonsUrl,
  };

  const [allPokemons, setAllPokemons] = useState(null);
  const [pokemonsFiltered, setPokemonsFiltered] = useState(null);

  const [types, setTypes] = useState([defaultState]);
  const [filterSelected, setFilterSelected] = useState(defaultState);
  
  const [state, dispatch] = useReducer(pokemonReducer, initialState);
  
  const capturePokemon = (url: string) => {
    dispatch({ type: actionTypes.CAPTURE, payload: url });
  };

  const releasePokemon = (url: string) => {
    dispatch({ type: actionTypes.RELEASE, payload: url });
  };

  const changeTypeSelected = async (type: PokeType) => {
    setFilterSelected(type);

    const { data } = await axios.get(type?.url!);
    let pokemons = data?.pokemon?.map(
      ({ pokemon }: PokemosByTypeResult) => {
        return pokemon?.url;
      }
    );

    type.name !== "All"
      ? setPokemonsFiltered(pokemons)
      : setPokemonsFiltered(allPokemons);
  };

  const getPokemonsType = async () => {
    const { data } = await axios.get("https://pokeapi.co/api/v2/type");
    setTypes([...types, ...data.results]);
  };

  const getAllPokemons = async () => {
    const { data } = await axios.get(allPokemonsUrl);

    let pokemons = data?.results?.map(
      (pokemon: AllPokemonsResult) => pokemon?.url
    );

    setAllPokemons(pokemons);
    setPokemonsFiltered(pokemons);
  };

  useEffect(() => {
    getPokemonsType();
    getAllPokemons();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        types,
        filterSelected,
        pokemonsFiltered,
        changeTypeSelected,
        capturedPokemons: state.capturedPokemons,
        capturePokemon,
        releasePokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;