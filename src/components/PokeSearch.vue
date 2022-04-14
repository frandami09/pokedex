<template>
	<div class="form-group position-relative">
		<div
			class="poke-search-placeholder"
			@click="focusSearchInput"
			ref="search_placeholder"
		>
			<div class="position-relative">
				<IconSearch class="poke-search-icon"></IconSearch>
				<span class="placeholder-text"> {{ placeholder_text }} </span>
			</div>
		</div>
		<input
			class="form-control poke-search-input"
			type="text"
			name="searchTerms"
			v-model="searchTerms"
			ref="search_input"
			@blur="onInputBlur"
		>
		<IconClose
			class="close-button"
			@click="clearSearchTerms"
			v-show="searchHasText"
		></IconClose>
	</div>

</template>
<script>

import debounce from 'lodash.debounce';
import IconSearch from '@/components/icons/IconSearch.vue'
import IconClose from '@/components/icons/IconClose.vue'

export default {

	components: {
		IconSearch,
		IconClose,
	},

	data(){
		return {
			searchTerms: '',
		}
	},

	computed: {
		placeholder_text(){
			if ( this.searchTerms.length > 0 ) {
				return '';
			}
			return 'buscar ...';
		},

		searchHasText(){
			return this.searchTerms.length > 0;
		}
	},

	watch: {

		searchTerms: debounce( function( newVal ) {
            this.$emit('updatedSearch', { searchTerms: this.searchTerms });
        }, 300 ),

	},

	methods: {

		focusSearchInput(){
			this.$refs.search_placeholder.classList.add('focused');
			setTimeout( () => {
				this.$refs.search_input.focus();
			}, 300)
		},

		onInputBlur(){
			if ( this.searchHasText ) {
				return false;
			}
			this.$refs.search_placeholder.classList.remove('focused');
		},

		clearSearchTerms(){
			this.searchTerms = '';
			this.$refs.search_placeholder.classList.remove('focused');

		}

	}

}

</script>

<style lang="scss">

.poke-search-input{
	//text-align: center;
	padding-left: 2rem;
	height: 24px;
	background: #FFFFFF;
	border: 1px solid var(--Light-Gray);
	border-radius: 8px;
	font-size: 10px;
	line-height: 16px;
	color: var(--medium-gray);

	&:focus{
		//text-align: left;
		color: var(--medium-gray);
		background: #FFFFFF;
		border: 1px solid var(--Light-Gray);
		outline: 0;
		box-shadow: none;
	}
}

.poke-search-placeholder{
	overflow: hidden;
	padding-left: 1rem;
	padding-right: 1rem;
	position: absolute;
	width: 100%;
	text-align: center;
	cursor: text;
	transition: width .3s;
	.placeholder-text{
		padding-left: .5rem;
		padding-right: .5rem;
		display: inline-block;
		opacity: 1;
		transition: opacity .5s;
		font-size: 10px;
		line-height: 16px;
		color: var(--medium-gray);
	}

	&.focused{
		width: 0%;
		transition: width .3s;
		.placeholder-text{
			display: inline-block;
			opacity: 0;
			transition: opacity .1s;
		}
	}
}

.close-button{
	position: absolute;
	right: 1rem;
	top: .5rem;
	cursor: pointer;
}

</style>