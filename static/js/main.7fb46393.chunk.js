(window.webpackJsonpweather=window.webpackJsonpweather||[]).push([[0],{112:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(8),o=a.n(c),i=a(12),l=a(15),m=a(77),u=a(74),s=a(76),d=a(158),p=a(147),f=a(157),h=a(153),g=a(154),v=a(114),E=a(44),b=a(45),y=a(43),w=a(27),O=a(17),T="ASWcvsmMjzKodukBPmM4NMJY6mFIRoA5",j="http://dataservice.accuweather.com",I="REMOVE_LOCATION",k=[],C=Object(w.b)({favoriteLocationsList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_LOCATION":return[t.payload].concat(Object(O.a)(e));case I:var a=e.findIndex(function(e){return e&&e.id===t.payload.id});return-1!==a?(e.splice(a,1),Object(O.a)(e)):e;default:return e}},isTemperatureInF:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"TOGGLE_TEMPERATURE_TYPE":return!e;default:return e}}});var S=function(){try{var e=localStorage.getItem("state");if(null===e)return;return JSON.parse(e)}catch(t){return void console.log(t)}}(),x=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||w.c,N=Object(w.d)(C,S,x());N.subscribe(function(){return function(e){try{var t=JSON.stringify(e);localStorage.setItem("state",t)}catch(a){console.log(a)}}(N.getState())});var L=N,D=a(35),_=a(73),A=a.n(_),F=a(32),B=a.n(F),M=a(155),R=a(145),W=Object(u.a)(function(e){return{wrapper:Object(i.a)({display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",marginTop:"1rem",marginBottom:"1rem",width:"100%"},e.breakpoints.up("sm"),{marginTop:"3rem",marginBottom:"3rem",flexDirection:"row"}),textField:Object(i.a)({width:"100%"},e.breakpoints.up("sm"),{width:"80%",marginTop:e.spacing(.2),marginRight:e.spacing(1)}),button:Object(i.a)({marginTop:e.spacing(1),width:"7rem",height:"2.4rem"},e.breakpoints.up("sm"),{marginTop:0,transform:"translateY(-1.5px)",height:"2.6rem",width:"20%"})}}),P=Object(d.a)()(function(e){e.width;var t=Object(n.useState)("Enter location"),a=Object(D.a)(t,2),c=a[0],o=a[1],i=Object(l.c)(function(e){return e.favoriteLocationsList}),m=W(),u=r.a.createRef(),s=Object(l.b)();return r.a.createElement("div",{className:m.wrapper},r.a.createElement(M.a,{className:m.textField,placeholder:"San Francisco, CA",autoFocus:!0,variant:"outlined",margin:"dense",inputRef:u,label:c,error:"Enter location"!==c,onClick:function(){"Enter location"!==c&&o("Enter location")}}),r.a.createElement(R.a,{className:m.button,variant:"contained",color:"primary",onClick:function(){""!==u.current.value?B.a.get("".concat(j,"/locations/v1/cities/autocomplete?apikey=").concat(T,"&q=").concat(u.current.value)).then(function(e){var t=e.data;if(a=t[0].Key,0===i.length||void 0===i.find(function(e){return e.locationKey===a})){var a;u.current.value="";var n="".concat(t[0].LocalizedName,", ").concat(t[0].AdministrativeArea.ID),r=t[0].Key;s({type:"ADD_LOCATION",payload:{location:n,locationKey:r,id:A.a.v4()}})}else o("Already on the list")}).catch(function(e){var t=e.message;switch(t){case"Cannot read property 'LocalizedName' of undefined":o("The location was not found");break;case"Network Error":o("This api key requests limit exceeded");break;default:console.dir(t)}}):o("You haven't entered anything yet")}},"Search"))}),K=a(156),Y=a(146),J=a(41),U=a.n(J),z=Object(u.a)(function(e){return{cardUpperSection:{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",margin:"1rem 2rem 1rem 2rem"},deleteIconSpan:{transform:"translateY(-2.4px)"},cardMiddleSection:{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:"1rem",marginBottom:"1rem"},cardLowerSection:{margin:"1rem"}}});function G(e){var t=e.favoriteLocationsData,a=Object(l.c)(function(e){return e.isTemperatureInF}),n=Object(l.b)(),c=z();return r.a.createElement("div",null,t.map(function(e){return r.a.createElement(Y.a,{key:e.id,raised:!0,style:{background:e.isDayTime?"linear-gradient(to top left, #f37335, #fdc830 )":"linear-gradient(to top left, #7f7fd5, #86a8e7, #91eae4)",marginTop:"1rem",marginBottom:"1rem"}},r.a.createElement("div",{className:c.cardUpperSection},r.a.createElement(p.a,{gutterBottom:!0,variant:"h6",color:"primary",component:"p"},e.location),r.a.createElement("span",{className:c.deleteIconSpan,onClick:function(){var t;t=e.id,n({type:I,payload:{id:t}})}},r.a.createElement(U.a,{color:"secondary"}))),r.a.createElement("div",{className:c.cardMiddleSection},r.a.createElement(p.a,{variant:"h5",color:"textPrimary",component:"span"},a?"".concat(e.temperatureF).concat(String.fromCharCode(176)):"".concat(e.temperatureC).concat(String.fromCharCode(176))),r.a.createElement("img",{src:"".concat(e.weatherIcon),alt:"weather icon"})),r.a.createElement("div",{className:c.cardLowerSection},r.a.createElement(p.a,{variant:"body1",color:"textPrimary",align:"center",gutterBottom:!0,component:"p"},e.weatherText)))}))}var V=a(148),q=a(149),X=a(150),$=a(151),H=a(152);function Q(e){var t=e.favoriteLocationsData,a=Object(l.c)(function(e){return e.isTemperatureInF}),n=Object(l.b)(),c=function(e){return{backgroundColor:e%2>0?"transparent":"#EAE7E7"}};return r.a.createElement(V.a,{style:{width:"100%",marginTop:"2rem"}},r.a.createElement(q.a,null,t.map(function(e,t){return r.a.createElement(X.a,{key:Math.random(),style:c(t)},r.a.createElement($.a,null,e.location),r.a.createElement($.a,null,a?"".concat(e.temperatureF).concat(String.fromCharCode(176)):"".concat(e.temperatureC).concat(String.fromCharCode(176))),r.a.createElement($.a,{padding:"none"},e.weatherText),r.a.createElement($.a,null,r.a.createElement("img",{src:"".concat(e.weatherIcon),alt:"weather icon"})),r.a.createElement($.a,null,r.a.createElement(H.a,{size:"small",color:"secondary",onClick:function(){var t;t=e.id,n({type:I,payload:{id:t}})}},r.a.createElement(U.a,null))))})))}var Z=Object(d.a)()(function(e){var t=e.width,a=Object(n.useState)(!1),c=Object(D.a)(a,2),o=c[0],i=c[1],m=Object(n.useState)([]),u=Object(D.a)(m,2),s=u[0],d=u[1],f=Object(l.c)(function(e){return e.favoriteLocationsList}),h=Object(l.c)(function(e){return e.isTemperatureInF}),g=Object(l.b)();return Object(n.useEffect)(function(){var e=function(){for(var e=[],t=0;t<f.length;t++)e.push(B.a.get("".concat(j,"/currentconditions/v1/").concat(f[t].locationKey,"?apikey=").concat(T)));B.a.all(e).then(B.a.spread(function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return t.map(function(e,t){var a=e.data[0],n=1===String(a.WeatherIcon).length?"0".concat(a.WeatherIcon):a.WeatherIcon;return{location:f[t].location,id:f[t].id,temperatureF:a.Temperature.Imperial.Value,temperatureC:a.Temperature.Metric.Value,ifShowTemperatureF:!0,weatherText:a.WeatherText,weatherIcon:"https://developer.accuweather.com/sites/default/files/".concat(n,"-s.png"),isDayTime:a.IsDayTime}})})).then(function(e){d(e)}).catch(function(e){var t=e.message;"Network Error"===t&&i(!0),console.dir(t)})};e();var t=setInterval(function(){e()},3e5);return function(){clearInterval(t)}},[f,f.length]),o?r.a.createElement(p.a,{variant:"body1",color:"secondary"},"The limit of requests of this api key exceeded."):r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("label",null,"Celcius"),r.a.createElement(K.a,{checked:h,onChange:function(){g({type:"TOGGLE_TEMPERATURE_TYPE"})},color:"primary"}),r.a.createElement("label",null,"Fahrenheit")),"xs"===t?r.a.createElement(G,{favoriteLocationsData:s}):r.a.createElement(Q,{favoriteLocationsData:s}))}),ee=Object(s.a)({palette:{primary:{main:E.a[500]},secondary:{main:b.a[600]},background:{default:"#fff"}},"@global":{"html, body, #root":{width:"100%"}}}),te=Object(s.a)({palette:{primary:{main:E.a[500]},secondary:{main:b.a[400]},background:{paper:"#fff",default:y.a[100]}},"@global":{"html, body, #root":{width:"100%"}}}),ae=Object(u.a)(function(e){return{title:{marginTop:"2rem"},paper:Object(i.a)({height:"100%",width:"100%",padding:"5%"},e.breakpoints.up("md"),{marginTop:"2rem",marginBottom:"2rem",padding:"10%"})}}),ne=Object(d.a)()(function(e){var t=e.width,a=ae(),n=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{className:a.title,variant:"xs"===t?"h5":"h4",color:"secondary",align:"center",gutterBottom:!0},"Current Weather"),r.a.createElement(P,null),r.a.createElement(Z,null))};return r.a.createElement(l.a,{store:L},r.a.createElement(m.a,{basename:"/react_test_weather"},r.a.createElement(f.a,{theme:"xs"===t?ee:te},r.a.createElement(h.a,null),r.a.createElement(g.a,{maxWidth:"md"},"xs"===t?n():r.a.createElement(v.a,{className:a.paper,component:"div",elevation:2},n())))))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(ne,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},81:function(e,t,a){e.exports=a(112)}},[[81,1,2]]]);
//# sourceMappingURL=main.7fb46393.chunk.js.map