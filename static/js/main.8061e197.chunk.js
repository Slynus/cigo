(this.webpackJsonpcigo=this.webpackJsonpcigo||[]).push([[0],{228:function(e,t,a){e.exports=a(417)},416:function(e,t,a){},417:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(15),l=a.n(c),u=a(460),i=a(463),o=a(189),s=a(466),m=a(459),p=a(29),f=a.n(p),h=a(64),b=a(18),d=a(113),v=a(465),E=a(455),j=a(462),w=a(458),O=a(419),g=a(468),k=a(464),y=a(116),x=a.n(y),C=a(452),P=a(39),L=Object(C.a)({fab:{margin:0,top:"auto",right:20,bottom:20,left:"auto",position:"fixed"}});function V(e){var t=Object(g.a)({limit:25,ignoreCase:!0,ignoreAccents:!0});return r.a.createElement(k.a,{defaultValue:e.defaultValue.label,options:e.list.map((function(e){return e.label})),onInputChange:e.handleChange,selectOnFocus:!0,handleHomeEndKeys:!0,freeSolo:!0,filterOptions:t,renderInput:function(t){return r.a.createElement(j.a,Object.assign({},t,{label:e.label,variant:"outlined",InputProps:Object(d.a)(Object(d.a)({},t.InputProps),{},{startAdornment:r.a.createElement(w.a,{position:"end"},r.a.createElement(x.a,null))})}))}})}function A(e){var t;if(e.rainLevel>0){var a;switch(e.rainLevel){case 1:a="faible";break;case 2:a="mod\xe9r\xe9e";break;case 3:a="forte";break;default:a="torrentielle"}t="Attention pluie ".concat(a," pr\xe9vue dans ").concat(e.timeBeforeRain," minutes ! \ud83c\udf27\ufe0f")}else t="Vous pouvez sortir sans risque ! \ud83d\ude0e";return e.rainLevel>-1?r.a.createElement(O.a,{variant:"h2",component:"h1",gutterBottom:!0},t):null}function D(e){return r.a.createElement(P.d,{width:"100%",height:200},r.a.createElement(P.c,{height:200,width:500,data:e.chartData},r.a.createElement(P.b,{type:"monotone",dataKey:"niveauPluie",stroke:"#8884d8",isAnimationActive:!0}),r.a.createElement(P.f,{dataKey:"hours"}),r.a.createElement(P.g,{tickMargin:25}),r.a.createElement(P.a,{stroke:"#ccc"}),r.a.createElement(P.e,null)))}var I=function(e){var t=L();return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.a,{display:"flex",flexDirection:"column"},r.a.createElement(i.a,{my:1},r.a.createElement(V,{list:e.searchCityList,defaultValue:e.searchDefaultValue,inputValue:e.searchInputValue,handleChange:e.searchHandleChange,label:"Ville"})),r.a.createElement(i.a,{my:1},r.a.createElement(A,{rainLevel:e.rainLevel,timeBeforeRain:e.timeBeforeRain})),r.a.createElement(i.a,{my:1},r.a.createElement(D,{chartData:e.chartData})),r.a.createElement(v.a,{mdUp:!0},r.a.createElement(E.a,{color:"primary","aria-label":"search",className:t.fab,onClick:e.fabHandleClick},r.a.createElement(x.a,null)))))},S=a(117);S.setLevel("error");var B=S;var H=function(e){var t={label:"Rennes",id:352380},a=Object(n.useState)(t),c=Object(b.a)(a,2),l=c[0],u=c[1],i=Object(n.useState)(l),o=Object(b.a)(i,2),s=o[0],m=o[1],p=Object(n.useState)([]),d=Object(b.a)(p,2),v=d[0],E=d[1],j=Object(n.useState)(-1),w=Object(b.a)(j,2),O=w[0],g=w[1],k=Object(n.useState)(),y=Object(b.a)(k,2),x=y[0],C=y[1],P=Object(n.useState)([]),L=Object(b.a)(P,2),V=L[0],A=L[1];Object(n.useEffect)((function(){function e(){return(e=Object(h.a)(f.a.mark((function e(t){var a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S(t);case 3:a=e.sent,E(a),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),B.error(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}2!==l.label.length&&l.label!==t.label||function(t){e.apply(this,arguments)}(l.label)}),[l,t.label]);var D=Object(n.useCallback)(function(){var e=Object(h.a)(f.a.mark((function e(t){var a,n,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,M(t);case 3:a=e.sent,(n=a.find((function(e){return e.niveauPluie>0})))?(r=5*a.indexOf(n),g(n.niveauPluie),C(r)):g(0),A(a),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),B.error(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}(),[]);function S(e){return H.apply(this,arguments)}function H(){return(H=Object(h.a)(f.a.mark((function e(t){var a,n,r,c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="".concat("https://cors-anywhere.herokuapp.com","/http://www.meteofrance.com/mf3-rpc-portlet/rest/lieu/facet/pluie/search"),e.next=3,fetch("".concat(a,"/").concat(t));case 3:if(!(n=e.sent).ok){e.next=12;break}return e.next=7,n.json();case 7:return r=e.sent,c=r.map((function(e){var t=e.nomAffiche.split(" ");return t.length>1&&(t.pop(),t=t.join(" ")),{label:t,id:e.id}})),e.abrupt("return",c);case 12:throw new Error("Can't Fetch Search API");case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function M(e){return R.apply(this,arguments)}function R(){return(R=Object(h.a)(f.a.mark((function e(t){var a,n,r,c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=function(e){var t=e.niveauPluieText[0].split(" ")[0],a=t[2]+t[3],n=t[5]+t[6],r=new Date;r.setHours(a),r.setMinutes(n);var c=e.dataCadran;return c=c.map((function(e,t){var a={};0===e.niveauPluie?a.niveauPluie=null:a.niveauPluie=e.niveauPluie-1;var n,c=new Date(r.getTime());return c.setTime((n=5*t,r.getTime()+60*n*1e3)),a.hours="".concat(c.getHours(),":").concat((c.getMinutes()<10?"0":"")+c.getMinutes()),a}))},a="".concat("https://cors-anywhere.herokuapp.com","/http://www.meteofrance.com/mf3-rpc-portlet/rest/pluie"),e.next=4,fetch("".concat(a,"/").concat(t));case 4:if(!(n=e.sent).ok){e.next=12;break}return e.next=8,n.json();case 8:return r=e.sent,e.abrupt("return",c(r));case 12:throw new Error("Can't Fetch Meteo API");case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(n.useEffect)((function(){document.title="".concat(s.label),D(s.id)}),[s,D]),r.a.createElement(I,{searchDefaultValue:t,searchInputValue:l,searchCityList:v,searchHandleChange:function(e,t){var a=v.find((function(e){return e.label.toLowerCase()===t.toLowerCase()}));a?(u(a),m(a)):u({label:t})},rainLevel:O,timeBeforeRain:x,chartData:V,fabHandleClick:function(){document.getElementsByClassName("MuiAutocomplete-input")[0].focus()}})},M=Object(o.a)();M=Object(s.a)(M);var R=function(){return r.a.createElement(m.a,{theme:M},r.a.createElement(u.a,{maxWidth:!1},r.a.createElement(i.a,{my:6},r.a.createElement(u.a,{component:"main",maxWidth:"md"},r.a.createElement(H,null)))))},F=a(461);a(416);l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(F.a,null),r.a.createElement(R,null)),document.getElementById("root"))}},[[228,1,2]]]);
//# sourceMappingURL=main.8061e197.chunk.js.map