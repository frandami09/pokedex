<template>

    <div id="wrapper">
        <router-view />
    </div>

</template>

<script>

import apiMixin from '@/mixins/apiMixin'
import { usePokemonStore } from '@/stores/PokemonStore'
import { mapActions } from 'pinia'

export default {

    mixins: [ apiMixin ],

    mounted(){

        /**
         * Inicializo y dejo guardada la lista completa de pokemons para usarla de referencia en las busquedas
         */
        this.getPaginated( 'pokemon', 2000, 0 ).then( data => {
            this.setPokemonList( data.results );
        });

    },

    data(){

        return {

            colors: {
                //tipos de pokemon
                rock: '#B69E31',
                ghost: '#70559B',
                steel: '#B7B9D0',
                water: '#6493EB',
                grass: '#74CB48',
                psychic: '#FB5584',
                ice: '#9AD6DF',
                dark: '#75574C',
                fairy: '#E69EAC',
                normal: '#AAA67F',
                fighting: '#C12239',
                flying: '#A891EC',
                poison: '#A43E9E',
                ground: '#DEC16B',
                bug: '#A7B723',
                fire: '#F57D31',
                electric: '#F9CF30',
                dragon: '#7037FF',
            }

        }
    },

    provide(){
        return {
            colors: this.colors,
        }
    },

    methods:{
        ...mapActions( usePokemonStore, ['setPokemonList'] )
    }
}

</script>
<style>
@import '@/assets/base.css';
</style>
