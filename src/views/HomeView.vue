<template>
    <PokemonList
        :pokemon_list="pokemonList"
    >
    </PokemonList>
</template>
<script>

import pokemonServiceMixin from '@/mixins/pokemonServiceMixin'
import { usePokemonStore } from '@/stores/PokemonStore'
import { mapState, mapActions } from 'pinia'
import PokemonList from '@/components/PokemonList.vue'

export default {

    components: { PokemonList },

    mixins: [ pokemonServiceMixin ],

    computed:{
        ...mapState( usePokemonStore, ['pokemonList'] )
    },

}

</script>
