import { defineStore } from 'pinia'

export const usePokemonStore = defineStore('pokemon', {

    state: () => ({

        //utilizada a manera de cache para agilizar las busquedas
        pokemonList: [],

        //pokemons cargados en los resultados de busqueda
        loadedPokemons: [],

    }),

    actions: {
        setPokemonList(list){
            this.pokemonList = list;
        },

        loadPokemon(pokemon){
            const index = this.loadedPokemons.findIndex( listed => listed.id == pokemon.id );
            if ( index == -1 ) {
                this.loadedPokemons.push( pokemon );
            } else {
                this.loadedPokemons[ index ] = pokemon;
            }
        },
    },
})