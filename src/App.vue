<template>

    <div id="wrapper">
        <router-view />
    </div>

</template>

<script>

import pokemonServiceMixin from '@/mixins/pokemonServiceMixin'

export default {

    mixins: [ pokemonServiceMixin ],

    mounted(){
        this.getPokemonList();
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
}

</script>
<style>
@import '@/assets/base.css';
</style>
