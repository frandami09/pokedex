<template>

	<input
		type="text"
		name="searchTerms"
		v-model="searchTerms"
	>

	<div>
		<PokePreview
			v-for="pokemon in currentyDisplaying"
			:key="pokemon.name"
			:name="pokemon.name"
		>
		</PokePreview>
	</div>

</template>
<script>

import PokePreview from '@/components/PokePreview.vue'

export default {

    components: {
    	PokePreview,
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

    		let result = this.pokemon_list;

    		const from = (this.currentPage * this.elementsPerPage) - this.elementsPerPage;
            const to = (this.currentPage * this.elementsPerPage);

            result = result.slice(from, to);

            return result;
    	}

    }

}

</script>