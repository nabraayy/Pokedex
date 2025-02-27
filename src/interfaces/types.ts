import { PokeTypes } from "../utils/BackgroundsByType";

export type PokeType = {
    name: PokeTypes | "All";
    url?: string;
};
export type AllPokemonsResult = {
    name: string;
    url?: string;
};
export type PokemosByTypeResult = {
    pokemon:{
        name: string;
        url: string;
    };
   
};