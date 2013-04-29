
var BSHPreviewer = (function(){

LazyLoad=function(k){function p(b,a){var g=k.createElement(b),c;for(c in a)a.hasOwnProperty(c)&&g.setAttribute(c,a[c]);return g}function l(b){var a=m[b],c,f;if(a)c=a.callback,f=a.urls,f.shift(),h=0,f.length||(c&&c.call(a.context,a.obj),m[b]=null,n[b].length&&j(b))}function w(){var b=navigator.userAgent;c={async:k.createElement("script").async===!0};(c.webkit=/AppleWebKit\//.test(b))||(c.ie=/MSIE/.test(b))||(c.opera=/Opera/.test(b))||(c.gecko=/Gecko\//.test(b))||(c.unknown=!0)}function j(b,a,g,f,h){var j=
function(){l(b)},o=b==="css",q=[],d,i,e,r;c||w();if(a)if(a=typeof a==="string"?[a]:a.concat(),o||c.async||c.gecko||c.opera)n[b].push({urls:a,callback:g,obj:f,context:h});else{d=0;for(i=a.length;d<i;++d)n[b].push({urls:[a[d]],callback:d===i-1?g:null,obj:f,context:h})}if(!m[b]&&(r=m[b]=n[b].shift())){s||(s=k.head||k.getElementsByTagName("head")[0]);a=r.urls;d=0;for(i=a.length;d<i;++d)g=a[d],o?e=c.gecko?p("style"):p("link",{href:g,rel:"stylesheet"}):(e=p("script",{src:g}),e.async=!1),e.className="lazyload",
e.setAttribute("charset","utf-8"),c.ie&&!o?e.onreadystatechange=function(){if(/loaded|complete/.test(e.readyState))e.onreadystatechange=null,j()}:o&&(c.gecko||c.webkit)?c.webkit?(r.urls[d]=e.href,t()):(e.innerHTML='@import "'+g+'";',u(e)):e.onload=e.onerror=j,q.push(e);d=0;for(i=q.length;d<i;++d)s.appendChild(q[d])}}function u(b){var a;try{a=!!b.sheet.cssRules}catch(c){h+=1;h<200?setTimeout(function(){u(b)},50):a&&l("css");return}l("css")}function t(){var b=m.css,a;if(b){for(a=v.length;--a>=0;)if(v[a].href===
b.urls[0]){l("css");break}h+=1;b&&(h<200?setTimeout(t,50):l("css"))}}var c,s,m={},h=0,n={css:[],js:[]},v=k.styleSheets;return{css:function(b,a,c,f){j("css",b,a,c,f)},js:function(b,a,c,f){j("js",b,a,c,f)}}}(this.document);

	function appendLessURL(url, type){
		
		var head  = document.getElementsByTagName('head')[0];
	    var link  = document.createElement('link');
	    link.rel  = type;
	    link.type = 'text/less';
	    link.href = url;
	    link.media = 'all';
	    head.appendChild(link);
		
	    console.log('appended URL: ' + url);

	}

	function getURLParameter(name) {
	    return decodeURIComponent(
	        (location.search.match(RegExp("[?|&]"+name+'=(.+?)(&|$)'))||[,null])[1]
	    );  
	}

	return{
		check: function(){
			if(window.location.href.indexOf("bsh_preview=true") != -1){
				
				var designID = getURLParameter('bsh_design_id');
				var baseURL = getURLParameter('base_url');

				appendLessURL(baseURL + '/designs/' + designID + '/less_template', 'stylesheet/less');	
				console.log(getURLParameter('bsh_channel'));
				
				 LazyLoad.js("https://bsh-assets-origin.s3.amazonaws.com/js-test/less-1.3.3.min.js", function() {
				    LazyLoad.js("https://bsh-assets-origin.s3.amazonaws.com/js-test/pusher.min.js", function() {

							var pusher = new Pusher('6306e76f753c76f85203'); 
							var channel = pusher.subscribe(getURLParameter('bsh_channel'));
							
							channel.bind('css-update', function(less_url) {

									var sPushTime = less_url.split('timestamp=')[1];
									var cStartTime = new Date().getTime();

									var warmupTime = cStartTime - sPushTime;

									console.log(less_url)
									appendLessURL(less_url, 'stylesheet/less');	
									var postAppendURLTime = new Date().getTime();

									var appendTime = postAppendURLTime - cStartTime;

									less.refresh();
									var postRefreshTime = new Date().getTime();


									var totalTime = postRefreshTime - sPushTime;

									console.log("sPush-time:   " + sPushTime);
									console.log("cStart-time:  " + cStartTime);
									console.log("     WARMUP:  " + warmupTime);

									console.log("post-append:  " + postAppendURLTime);
									console.log("  APPENDURL:  " + appendTime);

									console.log(" ");
									console.log("TOTAL TIME -> " + totalTime);

							});

				    });
				  });

				
			}else{
				console.log('debug not found');
			}
		}
	}	
			
}());

$(function() {
	BSHPreviewer.check();
});