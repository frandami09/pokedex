<template>

	<div
        class="poke-preview-container"
        @click="show_pokemon"
    >
        <div class="poke-preview-id">
            {{ this.pokemon_id }}
        </div>
        <div class="poke-preview-img">
            <img height="72" :src="pokemon_preview_image">
        </div>
        <div class="poke-preview-name">
            {{ this.pokemon_name }}
        </div>
    </div>

</template>
<script>

import pokemonServiceMixin from '@/mixins/pokemonServiceMixin'

export default {

    mixins: [ pokemonServiceMixin ],

    props: {
    	name: String,
    },

    inject: ['colors'],

    async mounted(){
    	this.pokemon = await this.getPokemon( this.name );
    },

    data(){
    	return {
    		pokemon: {}
    	}
    },

    methods: {
    	show_pokemon( event ){
    		this.$router.push({ path: `/pokemon/${this.pokemon.name}` })
    	}
    },


}

</script>
<style lang="scss">

.poke-preview-container{
    position: relative;
    width: 104px;
    height: 112px;
    background: #FFFFFF;
    border: 1px solid v-bind(type_color);
    box-sizing: border-box;
    border-radius: 8px;
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 4px;
    margin-right: 4px;
    overflow: hidden;
    padding: 0;
    cursor: pointer;
    &:hover{
        box-shadow: 0 0 4px 0 v-bind(type_color);
    }

    .poke-preview-id{
        padding-top: .25rem;
        padding-right: .4rem;
        text-align: right;
        color: v-bind(type_color);
        font-size: 8px;
        line-height: 12px;
    }

    .poke-preview-img{
        text-align: center;
    }

    .poke-preview-name{
        position: absolute;
        bottom: 0;
        &:first-letter {
            text-transform: capitalize;
        }
        font-size: 10px;
        line-height: 16px;
        text-align: center;
        color: #FFFFFF;
        background-color: v-bind(type_color);
        width: 100%;
    }
}

</style>