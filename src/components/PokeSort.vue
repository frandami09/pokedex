<template>

	<div class="order-controls-container align-items-center" @click="updateOrder">
		<div class="d-inline p-0">
			<label class="order-field" v-if="selectedOrderField == 'id'"> # </label>
			<label class="order-field" v-if="selectedOrderField == 'name'"> AZ </label>
		</div>

		<div class="d-inline p-0">
			<IconArrow class="mx-1" v-if="selectedOrderDirection == 'asc'"></IconArrow>
			<IconArrow class="mx-1" v-if="selectedOrderDirection == 'desc'" style="transform: rotate(180deg);"></IconArrow>
		</div>
	</div>

</template>

<script>

import IconArrow from '@/components/icons/IconArrow.vue'

export default {

	components: { IconArrow },

	props: {
		orderBy: String,
		orderDirection: String,
	},

	data(){
		return {

			selectedIndex: 0,

			orderOptions: [
				{ field: 'id', direction: 'asc' },
				{ field: 'id', direction: 'desc' },
				{ field: 'name', direction: 'asc' },
				{ field: 'name', direction: 'desc' },
			]
		}
	},

	computed: {
		selectedOrderField(){
			return this.orderOptions[ this.selectedIndex ].field;
		},
		selectedOrderDirection(){
			return this.orderOptions[ this.selectedIndex ].direction;
		},
	},

	watch: {
		selectedIndex(){
			this.$emit('updated', { order: this.selectedOrderField, direction: this.selectedOrderDirection })
		}
	},

	methods: {
		updateOrder(){
			if ( this.selectedIndex == (this.orderOptions.length -1) ) {
				this.selectedIndex = 0;
			} else {
				this.selectedIndex++;
			}
		}
	},

}

</script>

<style lang="scss">

.order-controls-container {
	min-width: 40px;
}

.order-field {
	font-weight: 500;
	font-size: 10px;
	line-height: 12px;
	color: var(--dark-gray);
	text-orientation: upright;
    writing-mode: vertical-lr;
    letter-spacing: -4px;
}

</style>