export default {

	data(){
		return {
			prefixApiURL: 'https://pokeapi.co/api/v2',
		}
	},

	methods: {

		async get( resource_name, resource_id ) {
			const response = await fetch( `${this.prefixApiURL}/${resource_name}/${resource_id}` );
			if ( response.ok ) {
				const result = await response.json();
  				return result;
			} else {
				this.$router.push({ path: '/NotFound' })
			}
		},

		getPaginated( resource_name, limit = null, offset = null ){
			let queryString = '';

			if ( limit != null && offset != null ) {
				queryString += '?limit=' + limit + '&offset=' + offset ;
			}

			return new Promise( (resolve, reject) => {
	            fetch( this.prefixApiURL + '/' + resource_name + queryString )
			    .then( response => response.json() )
			    .then( data => resolve( data ) );
	        })
		}
	}

}
