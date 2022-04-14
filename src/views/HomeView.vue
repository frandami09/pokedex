<template>
    <PokemonList
        :pokemon_list="pokemonList"
    >
    </PokemonList>
</template>
<script>

import { usePokemonStore } from '@/stores/PokemonStore'
import { mapState } from 'pinia'
import PokemonList from '@/components/PokemonList.vue'

export default {

    components: { PokemonList },

    computed:{
        ...mapState( usePokemonStore, ['pokemonList'] )
    },

}

</script>
