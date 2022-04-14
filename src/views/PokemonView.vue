<template>

	<div class="pokemon-view d-flex flex-column">
		<IconPokeball class="pokemon-view-icon-pokeball"></IconPokeball>
		<div class="row pokemon-view-content">
			<div
				class="col-auto d-flex align-items-center"
				@click="go_back"
			>
				<IconArrowLeft class="pokemon-view-icon-arrow"></IconArrowLeft>
			</div>
			<div class="col">
                <div class="pokemon-view-header"> {{ this.pokemon.name }} </div>
			</div>
			<div class="col-auto ms-auto">
                <div class="pokemon-view-id"> {{ this.pokemon_id }} </div>
			</div>
		</div>
		<div class="pokemon-details-content">
			<div class="preview-image-container">
				<img class="preview-image-img" height="200" :src="pokemon_preview_image">
			</div>
			<div class="pokemon-details-type d-flex justify-content-center">
				<div
					v-for="type in pokemon.types"
					class="pokemon-type-badge" :style="{'background-color': colors[type.type.name] }"
				>
					{{ type.type.name }}
				</div>
			</div>
			<div class="about-text-label py-4">
				About
			</div>
			<div class="row justify-content-center">

				<div class="col-auto  d-flex flex-column text-center justify-content-end pokemon-details-box with-border">
					<div class="d-flex align-items-center p-2">
						<IconWeight></IconWeight>
						<span class="ps-2 weight-detail">{{ pokemon_weight }}</span>
					</div>
					<span class="weight-span"> weight </span>
				</div>

				<div class="col-auto  d-flex flex-column text-center justify-content-end pokemon-details-box with-border">
					<div class="d-flex align-items-center p-2">
						<IconRuler></IconRuler>
						<span class="ps-2 weight-detail">{{ pokemon_height }}</span>
					</div>
					<span class="weight-span"> height </span>
				</div>

				<div class="col-auto d-flex flex-column text-center pokemon-details-box justify-content-end">
					<div class="d-flex align-items-center px-2 flex-column">
						<label v-for="move in displaying_moves" class="d-block pokemon-move-label"> {{move.move.name}} </label>
					</div>
					<span class="weight-span"> moves </span>
				</div>

				<div class="pokemon-description py-4 px-5 text-center"> {{ pokemon_description }} </div>

				<div class="about-text-label py-4">
					Base Stats
				</div>

				<div class="row" v-for="stat in pokemon.stats">
					<div class="col-auto"> {{ stat.stat.name }} </div>
					<div class="col"> {{ stat.base_stat }} </div>
				</div>

			</div>
		</div>
	</div>

</template>
<script>

import pokemonServiceMixin from '@/mixins/pokemonServiceMixin'
import IconPokeball from '@/components/icons/IconPokeball.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import IconWeight from '@/components/icons/IconWeight.vue'
import IconRuler from '@/components/icons/IconRuler.vue'


export default {

	props: [ 'name' ],

	components: {
		IconPokeball,
		IconArrowLeft,
		IconWeight,
		IconRuler,
	},

	mixins: [ pokemonServiceMixin ],

	inject: [ 'colors' ],

	created(){
		this.loadPokemon();
	},

	data(){
		return {
			pokemon: {},
			loaded_species: {},
		}
	},

	computed: {
		pokemon_description(){
			if ( this.loaded_species.hasOwnProperty('flavor_text_entries') ) {
				return this.loaded_species.flavor_text_entries.filter( item => item.language.name == this.selected_language )[0].flavor_text;
			}
		}
	},

	watch: {
		name(){
			this.loadPokemon();
		}
	},

	methods: {
		go_back(){
			this.$router.back();
		},

		async loadPokemon(){
			this.pokemon = await this.getPokemon( this.name );
			this.loaded_species = await this.getPokemonSpecies( this.name );
		}
	}

}

</script>

<style lang="scss">

.pokemon-view{
	background-color: v-bind( type_color );
	min-height: 100%;
	height: 100vh;
	padding: .25rem;
	position: relative;
}

.pokemon-view-icon-pokeball{
	position: absolute;
	opacity: 0.1;
	right: .25rem;
	color: #FFFFFF;
}

.pokemon-view-content{
	padding: 1.5rem;
}

.pokemon-view-icon-arrow{
	color: #FFFFFF;
	cursor: pointer;
}

.pokemon-view-id{
	font-weight: 700;
	font-size: 12px;
	line-height: 32px;
	color: #FFFFFF;
}

.pokemon-view-header{
	font-family: 'Poppins';
	font-weight: 700;
	font-size: 24px;
	line-height: 32px;
	color: #FFFFFF;
	&:first-letter {
        text-transform: capitalize;
    }
}

.pokemon-details-content{
	margin-top: 136px;
	background-color: #FFFFFF;
	border-radius: 8px;
	height: 100%;
}

.preview-image-container{
	text-align: center;
	img.preview-image-img{
		z-index: 100;
		margin-top: -144px;
		position: relative;
	}
}

.pokemon-type-badge{
	margin-right: 1rem;
  	margin-left: 1rem;
  	padding-left: .5rem;
  	padding-right: .5rem;
  	padding-top: .2rem;
  	padding-bottom: .2rem;

  	font-family: 'Poppins';
	font-style: normal;
	font-weight: 700;
	font-size: 10px;
	line-height: 16px;
	color: #FFFFFF;
	border-radius: 10px;
	&:first-letter {
        text-transform: capitalize;
    }
}

.about-text-label{
	text-align: center;
	font-weight: 700;
	font-size: 14px;
	line-height: 16px;
	color: v-bind( type_color );
}

.weight-detail{
	font-size: 10px;
	line-height: 16px;
}

.weight-span{
	font-size: 8px;
	line-height: 12px;
	color: var(--medium-gray);
}

.pokemon-details-box{
	&.with-border{
		border-right: 1px solid var(--Light-Gray);
	}
}

.pokemon-move-label{
	font-size: 10px;
	line-height: 16px;
	&:first-letter {
        text-transform: capitalize;
    }
}

.pokemon-description{
	font-size: 10px;
	line-height: 16px;
}
</style>
