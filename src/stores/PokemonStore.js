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
            //le agrego una nueva propiedad id para poder ordenar la lista basada en los ids
            this.pokemonList.map( pokemon => {
                pokemon.id = Number( pokemon.url.split('/').at(-2) );
                return pokemon;
            })
        },

        storePokemon(pokemon){
            this.loadedPokemons[ pokemon.name ] = pokemon;
        },
    },
})