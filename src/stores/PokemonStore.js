import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', {

    state: () => ({

        selected_language: 'es',
        //utilizada a manera de cache para agilizar las busquedas
        pokemonList: [],

        //cantidad total de pokemons
        pokemonListCount: 0,

        //pokemons cargados en el store
        loadedPokemons: {},

        //especies de pokemon cargadas en el store
        loadedSpecies: {},

    }),

    actions: {
        setPokemonList(list){
            this.pokemonList = list.results;
            this.pokemonListCount = list.count;
            //le agrego una nueva propiedad id para poder ordenar la lista basada en los ids
            this.pokemonList.map( pokemon => {
                pokemon.id = Number( pokemon.url.split('/').at(-2) );
                return pokemon;
            })
        },

        storePokemon(pokemon){
            this.loadedPokemons[ pokemon.name ] = pokemon;
        },

        storeSpecies(species){
            this.loadedSpecies[ species.name ] = species;
        },
    },
})