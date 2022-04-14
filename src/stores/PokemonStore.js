import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', {

    state: () => ({

        //utilizada a manera de cache para agilizar las busquedas
        pokemonList: [],

        //pokemons cargados en los resultados de busqueda
        loadedPokemons: {},

    }),

    actions: {
        setPokemonList(list){
            this.pokemonList = list;
            this.pokemonList.map( pokemon => {
                pokemon.id = pokemon.url.split('/').at(-2);
                return pokemon;
            })
        },

        storePokemon(pokemon){
            this.loadedPokemons[ pokemon.name ] = pokemon;
        },
    },
})