<template>
	{{ pokemon.name }}
</template>
<script>

import apiMixin from '@/mixins/apiMixin'
import { mapState, mapActions } from 'pinia'
import { usePokemonStore } from '@/stores/PokemonStore'


export default {

	props: [ 'name' ],

	mixins: [ apiMixin ],

	mounted(){
		this.getLoaded();
	},

	data(){
		return {
			pokemon: {},
		}
	},

	computed: {
		...mapState( usePokemonStore, ['loadedPokemons'] )
	},

	watch: {
		name(){
			this.getLoaded();
		}
	},

	methods: {
		getLoaded(){
			this.pokemon = this.loadedPokemons.find( pokemon => pokemon.name == this.name );
		}
	}
}

</script>
