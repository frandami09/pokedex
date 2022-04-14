<template>

	<div @click="show_pokemon"> {{ this.pokemon.name }} </div>

</template>
<script>

import pokemonServiceMixin from '@/mixins/pokemonServiceMixin'

export default {

    mixins: [ pokemonServiceMixin ],

    props: {
    	name: String,
    },

    async mounted(){
    	this.pokemon = await this.getPokemon( this.name );
    },

    data(){
    	return {
    		pokemon: {}
    	}
    },

    methods: {
    	show_pokemon( event ){
    		this.$router.push({ path: `/pokemon/${this.pokemon.name}` })
    	}
    }



}

</script>