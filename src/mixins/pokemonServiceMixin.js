import apiMixin from '@/mixins/apiMixin'
import { mapState, mapActions } from 'pinia'
import { usePokemonStore } from '@/stores/PokemonStore'

export default {

	mixins: [ apiMixin ],

	computed: {
		...mapState( usePokemonStore, ['loadedPokemons'] ),
	},

	methods: {

		...mapActions( usePokemonStore, ['storePokemon'] ),

		//Busco el pokemon en cuestion.
		//Si no existe en el store se lo pido a la api y lo almaceno en el store
		async getPokemon( name ){
			let pokemon = this.loadedPokemons.find( pokemon => pokemon.name == name );
			if (pokemon) {
				return pokemon;
			} else {
				pokemon = await this.get( 'pokemon', name );
				this.storePokemon( pokemon );
				return pokemon;
			}
		},

	}

}
