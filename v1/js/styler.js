var BSHStyler = (function(){

	var currentUrl;
	var apiKey;
	var designLookupKey;
	var apiVersion;

	var designToken;

	return{
		launch: function(config){

			if(typeof config.base_url != 'undefined'){		
				currentUrl = config.base_url;	
			}else{
				currentUrl = 'http://www.bootstraphero.com/'
			}

			apiVersion = config.api_version;
			apiKey = config.api_key;
			designLookupKey = config.design_lookup_key;

			$(config.target_selector).html('<iframe src=' + currentUrl + 'api/' + config.api_version + '/designs/launch?' + $.param(config) + ' width="100%" height="100%" frameBorder="0"></iframe>');

		},
		publish: function(callbackfn){

			var url = currentUrl + 'api/' + apiVersion + '/designs/publish/' + apiKey + '/' + designLookupKey + '/?callback=?';

			$.getJSON(url,'',function(res){
				designToken = res.design_token;
			    callbackfn();
			});
		},
		token: function(){
			return designToken;
		}
	}	
			
}());


















