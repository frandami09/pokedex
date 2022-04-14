<template>

	<div class="overflow-hidden position-relative" :style="container_styles">

		<div
			:style="progress_bar_styles"
			style="transition: all .5s; z-index:100"
		></div>

		<div
			:style="{ 'background-color': this.barColor, 'height': this.height }"
			style="position: absolute; z-index: 1; opacity: .2; top: 0; width: 100%;"
		></div>

	</div>

</template>

<script>

export default {

	components: {

	},

	props: {

		//alto en pixeles
		height: {
			type: String,
			default: function(){
				return '35px';
			}
		},

		//Porcentaje de la barra, puede ser un entero o un string Ej: 50 o '50'
		//Pasar valores de 0 a 100
		progressPercent: [Number, String],


		//Color de fondo del contenedor
		backgroundColor: {
			type: String,
			default: function(){
				return '#fff';
			}
		},

		//color de fondo de la barra
		barColor: {
			type: String,
			default: function(){
				return '#395f97';
			}
		},

	},

	data:function(){
		return {
			progress: 0,
	  	}
	},

	mounted() {
		this.setPercent();
	},

  	watch:{

  		progressPercent: function(){
  			this.setPercent();
  		}

	},

	computed:{

		container_styles: function(){
			return {
				'height': this.height,
				'border': 0,
				'background-color': 'rgba(red('+this.barColor+'), green('+this.barColor+'), blue('+this.barColor+'), 0.2)',
				'border-radius': '4px',
			}
		},

		progress_bar_styles: function(){
			return {
				'width': this.progress + '%',
				'height': '100%',
				'background-color': this.barColor,
			}
		}

	},

	methods: {

		setPercent: function(){
			//fallback por si el padre me manda numeros fuera del rango de 0 a 100
			if (this.progressPercent < 0) {
  				this.progress = 0;
  				return
  			}

  			if (this.progressPercent > 100) {
  				this.progress = 100;
  				return
  			}

  			this.progress = this.progressPercent;
		}

	}

}

</script>

