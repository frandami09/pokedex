<template>

    <div class="d-flex px-3 flex-column">

        <div class="row my-3 px-0">
            <div class="col-auto">
                <IconPokeball height="32" width="24"></IconPokeball>
            </div>

            <div class="col-auto">
                <div class="pokemon-list-header"> Pokédex </div>
            </div>

             <div class="col-auto ms-auto ps-2 pe-0">
                <div class="form-group pt-1">
                    <select v-model="$i18n.locale" style="background: transparent;border: transparent;">
                        <option>es</option>
                        <option>en</option>
                    </select>
                </div>
            </div>

            <div class="col-auto">
                <div class="form-group pt-1">
                    <select v-model.number="elementsPerPage" style="background: transparent;border: transparent;">
                        <option>5</option>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                </div>
            </div>

            <div class="col-auto align-self-center px-1">
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

    	<div
            class="search-results mx-0 my-2"
        >
    		<PokePreview
    			v-for="pokemon in currentyDisplaying"
    			:key="pokemon.name"
    			:name="pokemon.name"
    		>
    		</PokePreview>
        </div>

        <PokePagination
            :selected_page="currentPage"
            :elements_per_page="elementsPerPage"
            :content_length="currentyDisplayingRaw.length"
            @selected_page="currentPage = $event.page"
        >
        </PokePagination>


    </div>

</template>
<script>

import PokePreview from '@/components/PokePreview.vue'
import PokeSearch from '@/components/PokeSearch.vue'
import PokePagination from '@/components/PokePagination.vue'
import PokeSort from '@/components/PokeSort.vue'
import IconPokeball from '@/components/icons/IconPokeball.vue'

export default {

    components: {
        IconPokeball,
    	PokePreview,
        PokeSearch,
        PokeSort,
        PokePagination
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
    		elementsPerPage: 5,
    		orderBy: 'id',
    		orderDirection: 'asc',
    	}
    },

    computed: {

        currentyDisplayingRaw(){
            let result = this.pokemon_list.filter( pokemon => pokemon.name.includes( this.searchTerms ) );

            result = result.sort((current, next) => {
                if ( this.orderDirection === 'asc' ) {
                    return current[ this.orderBy ] < next[ this.orderBy ] ? -1 : 1;
                } else {
                    return current[ this.orderBy ] > next[ this.orderBy ] ? -1 : 1;
                }
            });

            return result;
        },

    	currentyDisplaying(){

    		const from = (this.currentPage * this.elementsPerPage) - this.elementsPerPage;
            const to = (this.currentPage * this.elementsPerPage);

            return this.currentyDisplayingRaw.slice(from, to);

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

.search-results{
    display: grid; /* 1 */
    grid-template-columns: repeat(auto-fill, 100px); /* 2 */
    grid-gap: 1rem; /* 3 */
    justify-content: space-between; /* 4 */
}

</style>