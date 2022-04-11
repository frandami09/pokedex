<template>

	<div @click="show_pokemon"> {{ this.pokemon.name }} </div>



</template>
<script>

import apiMixin from '@/mixins/apiMixin'

export default {

    mixins: [ apiMixin ],

    props: {
    	name: String,
    },

    created(){
    	this.get( 'pokemon', this.name ).then( data => {
    		this.pokemon = data;
    	});
    },

    data(){
    	return {
    		pokemon: {}
    	}
    },

    methods: {
    	show_pokemon( event ){
    		this.$router.push({ name: 'pokemon', params: { pokemon: this.pokemon } })
    	}
    }



}

</script>