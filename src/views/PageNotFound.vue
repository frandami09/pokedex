<template>
	<div class="text-center m-5">
        <IconPokeball height="32" width="24"></IconPokeball>
        <span class="px-3"> {{ $t('page_not_found') }} </span>
  	</div>
</template>

<script>

import IconPokeball from '@/components/icons/IconPokeball.vue'

export default {
	name: 'PageNotFound',

	components: {
		IconPokeball
	}
}

</script>