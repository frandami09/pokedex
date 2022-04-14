<template>

    <div class="d-flex px-3 flex-column">

        <div class="row my-3 px-3">
            <div class="col-auto">
                <IconPokeball height="32" width="24"></IconPokeball>
            </div>

            <div class="col-auto">
                <div class="pokemon-list-header"> Pokédex </div>
            </div>

            <div class="col-auto ms-auto align-self-center">
                <PokeSort
                    :orderBy="orderBy"
                    :orderDirection="orderDirection"
                    @updated="onOrderUpdate"
               >
               </PokeSort>
            </div>

        </div>

        <PokeSearch
            @updatedSearch="updateSearch"
        >
        </PokeSearch>

    	<div class="row no-gutters justify-content-between mx-0 my-2">
    		<PokePreview
    			v-for="pokemon in currentyDisplaying"
    			:key="pokemon.name"
    			:name="pokemon.name"
    		>
    		</PokePreview>
        </div>

    </div>

</template>
<script>

import PokePreview from '@/components/PokePreview.vue'
import PokeSearch from '@/components/PokeSearch.vue'
import PokeSort from '@/components/PokeSort.vue'
import IconPokeball from '@/components/icons/IconPokeball.vue'

export default {

    components: {
        IconPokeball,
    	PokePreview,
        PokeSearch,
        PokeSort
    },

    props: {
    	pokemon_list: Array,
    },

    mounted(){

    },

    data(){
    	return {
    		searchTerms: '',
    		currentPage: 1,
    		elementsPerPage: 10,
    		orderBy: 'id',
    		orderDirection: 'asc',
    	}
    },

    computed: {

    	currentyDisplaying(){

    		let result = this.pokemon_list.filter( pokemon => pokemon.name.includes( this.searchTerms ) );

            result = result.sort((current, next) => {
                if ( this.orderDirection === 'asc' ) {
                    return current[ this.orderBy ] < next[ this.orderBy ] ? -1 : 1;
                } else {
                    return current[ this.orderBy ] > next[ this.orderBy ] ? -1 : 1;
                }
            });

    		const from = (this.currentPage * this.elementsPerPage) - this.elementsPerPage;
            const to = (this.currentPage * this.elementsPerPage);

            result = result.slice(from, to);

            return result;
    	}

    },

    methods: {
        updateSearch( event ){
            this.searchTerms = event.searchTerms;
        },

        onOrderUpdate( event ){
            this.orderBy = event.order;
            this.orderDirection = event.direction;
        },

    }

}

</script>

<style>

.pokemon-list-header{
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
}

</style>