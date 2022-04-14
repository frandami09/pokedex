import apiMixin from '@/mixins/apiMixin'
import { mapState, mapActions } from 'pinia'
import { usePokemonStore } from '@/stores/PokemonStore'

export default {

	mixins: [ apiMixin ],

	computed: {
		...mapState( usePokemonStore, ['loadedPokemons'] ),
	},

	methods: {

		...mapActions( usePokemonStore, ['storePokemon', 'setPokemonList'] ),

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

		/**
         * Inicializo y dejo guardada la lista completa de pokemons para usarla de referencia en las busquedas
         */
        getPokemonList(){
	        this.getPaginated( 'pokemon', 2000, 0 ).then( data => {
	            this.setPokemonList( data.results );
	        });
        }

	}

}
