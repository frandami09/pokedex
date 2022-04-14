<template>

	<div class="pokemon-view">
		<img :src="pokemon_preview_image">
	</div>

</template>
<script>

import pokemonServiceMixin from '@/mixins/pokemonServiceMixin'

export default {

	props: [ 'name' ],

	mixins: [ pokemonServiceMixin ],

	inject: [ 'colors' ],

	async mounted(){
		this.pokemon = await this.getPokemon( this.name );
	},

	data(){
		return {
			pokemon: {},
		}
	},

	computed: {

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
		}
	},

	watch: {
		name(){
			this.pokemon = this.getPokemon( this.name );
		}
	},

}

</script>

<style lang="scss">

.pokemon-view{
	border-radius: 12px;
	background-color: v-bind( type_color );
	min-height: 100vh;
}


</style>
