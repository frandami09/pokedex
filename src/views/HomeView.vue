<template>
  <PokemonList
        :pokemon_list="pokemonList"
    >
    </PokemonList>
</template>
<script>

import { usePokemonStore } from '@/stores/PokemonStore'
import { mapState, mapActions } from 'pinia'
import apiMixin from '@/mixins/apiMixin'
import PokemonList from '@/components/PokemonList.vue'

export default {

    components: { PokemonList },

    mixins: [ apiMixin ],

    mounted(){

    	/**
    	 * Inicializo y dejo guardada la lista completa de pokemons para usarla de referencia en las busquedas
    	 */
        this.getPaginated( 'pokemon', 2000, 0 ).then( data => {
            this.setPokemonList( data.results );
        });

    },

    computed:{
        ...mapState( usePokemonStore, ['pokemonList'] )
    },

    methods:{
        ...mapActions( usePokemonStore, ['setPokemonList'] )
    }

}

</script>
