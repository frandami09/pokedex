<template>

	<div class="col">
        <ul class="my-auto justify-content-center pagination-row">
            <li @click="prev_page">&lt;</li>

            <li
                v-for="page in this.pagination_array"
                :class="{'current_page': page == selected_page}"
                @click="set_current_page(page)"
                :disabled="page == selected_page"
            >
                {{ page }}
            </li>

            <li @click="next_page">></li>
        </ul>
    </div><!-- navegacion -->

</template>
<script>
export default {

	props: {
		selected_page: Number,
		elements_per_page: Number,
		content_length: Number,
	},

	data(){
		return {

		}
	},

	computed: {
		//arreglo para motrar los numeros en la navegacion de la paginacion
        pagination_array: function(){
            let elements_count = this.content_length;
            let current_page = this.selected_page;
            let pages = [];
            let total_pages = Math.ceil(this.content_length / this.elements_per_page);
            let visible_pages_count = 5;

            let from_count = current_page - 2;

            //en caso de llegar a las ultimas dos paginas, las paginas a mostrar en la navegacion seran 3 o 4 mas para tener siempre 5 en pantalla
            if ((total_pages - current_page) < 2) {
                switch(total_pages - current_page){
                    case 0:
                        from_count = current_page - 4;
                    break;
                    case 1:
                        from_count = current_page - 3;
                    break;
                }

            }

            //anteriores a la actual
            for (let i = from_count; i < current_page; i++) {
                if (i > 0) {
                    pages.push(i);
                    visible_pages_count = visible_pages_count - 1
                }
            }

            //calculo las proximas a mostrar
            let remain_pages = current_page + visible_pages_count;

            for (let i = current_page; i < remain_pages; i++) {
                if (i <= total_pages) {
                    pages.push(i);
                }
            }

            return pages;
        },
	},

	methods: {

		next_page: function(){
            if (this.selected_page + 1 <= Math.ceil(this.content_length / this.elements_per_page)) {
                this.$emit('selected_page', { page: this.selected_page + 1 });
            }
        },

        prev_page: function(){
            if (this.selected_page - 1 > 0) {
                this.$emit('selected_page', { page: this.selected_page - 1 });
            }
        },

		set_current_page(page){
			this.$emit('selected_page', {page: page});
		}

	}
}
</script>

<style lang="scss">

.pagination-row{
	cursor:pointer;
	display: flex;
	padding-left: 0;
	list-style: none;
	li{
    	padding:.5rem;
    	color: var(--medium-gray);
    	&.current_page{
      		//background-color: #e0e0e0;
      		cursor:default;
      		color: var(--dark-gray);
		}
  	}
}

</style>