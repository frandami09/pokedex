export default {

	data(){
		return {
			prefixApiURL: 'https://pokeapi.co/api/v2',
		}
	},

	methods: {
		get( resource_name, resource_id ){
			return new Promise( (resolve, reject) => {
	            fetch( `${this.prefixApiURL}/${resource_name}/${resource_id}` )
			    .then( response => response.json() )
			    .then( data => resolve( data ) );
	        })
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
