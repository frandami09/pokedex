<template>

    <PokemonList
        :pokemon_list="pokemon_list"
    >
    </PokemonList>

</template>

<script>

import PokemonList from '@/components/PokemonList.vue'
import apiMixin from '@/mixins/apiMixin'

export default {

    components: { PokemonList },

    mixins: [ apiMixin ],

    data(){
        return {
            pokemon_list: [],
        }
    },

    mounted(){

        this.getPaginated( 'pokemon', 2000, 0 ).then( data => {
            this.pokemon_list = data.results;
        });

    }

}

</script>

<style lang="scss">

body{
    background-color: #e0e0e0;
}

</style>
