import apiMixin from '@/mixins/apiMixin'
import { mapState, mapActions } from 'pinia'
import { usePokemonStore } from '@/stores/PokemonStore'

export default {

	mixins: [ apiMixin ],

	computed: {
		...mapState( usePokemonStore, ['loadedPokemons', 'loadedSpecies'] ),

		pokemon_id(){
            if ( this.pokemon.hasOwnProperty('types') ) {
                return '#' + this.pokemon.id.toString().padStart(3, "0");
            }
            return '#000';
        },

        pokemon_name(){
            if ( this.pokemon.hasOwnProperty('name') ) {
                return this.pokemon.name;
            }
            return '#000';
        },

        type_color(){
            if ( this.pokemon.hasOwnProperty('types') ) {
                return this.colors[ this.pokemon.types[0].type.name ];
            }
            return 'white';
        },

        pokemon_preview_image(){
            if ( this.pokemon.hasOwnProperty('sprites') ) {
                return this.pokemon.sprites.other['official-artwork'].front_default
            }
        },

        pokemon_weight(){
        	if ( this.pokemon.hasOwnProperty('weight') ) {
                return (this.pokemon.weight / 10).toString() + ' kg';
            }
        },

        pokemon_height(){
        	if ( this.pokemon.hasOwnProperty('height') ) {
                return (this.pokemon.height / 10).toString() + ' m';
            }
        },

        displaying_moves(){
        	if ( this.pokemon.hasOwnProperty('moves') ) {
        		return this.pokemon.moves.slice(0,2);
        	}
        }
	},

	methods: {

		...mapActions( usePokemonStore, ['storePokemon', 'setPokemonList', 'storeSpecies'] ),

		//Busco el pokemon en cuestion.
		//Si no existe en el store se lo pido a la api y lo almaceno en el store
		async getPokemon( name ){
			let pokemon;
			if ( this.loadedPokemons[ name ] == undefined ) {
				pokemon = await this.get( 'pokemon', name );
				this.storePokemon( pokemon );
			} else {
				pokemon = this.loadedPokemons[name];
			}
			return pokemon;
		},

		//busco la especie del pokemon, util por sus descripciones detalladas
		async getPokemonSpecies( name ){
			let species;
			if ( this.loadedSpecies[ name ] == undefined ) {
				species = await this.get( 'pokemon-species', name );
				this.storeSpecies( species );
			} else {
				species = this.loadedSpecies[name];
			}
			return species;
		},

		/**
         * Inicializo y dejo guardada la lista completa de pokemons para usarla de referencia en las busquedas
         */
        getPokemonList(){
	        this.getPaginated( 'pokemon', 2000, 0 ).then( data => {
	            this.setPokemonList( data );
	        });
        }

	}

}
