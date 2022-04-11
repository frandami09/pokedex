<template>

	<div @click="show_pokemon"> {{ this.pokemon.name }} </div>

</template>
<script>

import { usePokemonStore } from '@/stores/PokemonStore'
import { mapState, mapActions } from 'pinia'
import apiMixin from '@/mixins/apiMixin'

export default {

    mixins: [ apiMixin ],

    props: {
    	name: String,
    },

    created(){
    	this.get( 'pokemon', this.name ).then( data => {
    		this.pokemon = data;
    		this.loadPokemon( this.pokemon );
    	});
    },

    data(){
    	return {
    		pokemon: {}
    	}
    },

    methods: {
    	...mapActions( usePokemonStore, ['loadPokemon']),

    	show_pokemon( event ){
    		this.$router.push({ path: `/pokemon/${this.pokemon.name}` })
    	}
    }



}

</script>