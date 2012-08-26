function konservi() {
  var konservi = $("#konserviRezultoj").attr("checked") != undefined;
  localStorage.konserviRezultoj = konservi;
  localStorage.tiparaGrando = $("#tiparaGrando").val();
  localStorage.motoro = $("#motoro").val();

  if(!konservi){
    localStorage.vorto = "";
    localStorage.rezultoj = "";
  }
}

function reshargi() {
  if(localStorage.konserviRezultoj != undefined && localStorage.konserviRezultoj != "false"){
    $("#konserviRezultoj").attr("checked", true);
  }

  var tiparaGrando = localStorage.tiparaGrando;
  if(tiparaGrando == undefined){
    tiparaGrando = 10;
  }
  $("#tiparaGrando").val(tiparaGrando);

  var motoro = localStorage.motoro;
  if(motoro == undefined){
    motoro = "Lernu";
  }
  $("#motoro").val(motoro);
}

var i18n=function(){function i(b){b=b.querySelectorAll(l);for(var d,f=0;d=b[f];f++)for(var e=0;e<h.length;e++){var c=h[e],a=d.getAttribute(c);a!=null&&j[c](d,a)}}var j={"i18n-content":function(b,d){b.textContent=chrome.i18n.getMessage(d)},"i18n-values":function(b,d){for(var f=d.replace(/\s/g,"").split(/;/),e=0;e<f.length;e++){var c=f[e].match(/^([^:]+):(.+)$/);if(c){var a=c[1];c=chrome.i18n.getMessage(c[2]);if(a.charAt(0)=="."){a=a.slice(1).split(".");for(var g=b;g&&a.length>1;)g=g[a.shift()];if(g){g[a]=c;a=="innerHTML"&&i(b)}}else b.setAttribute(a,c)}}}},h=[],k;for(k in j)h.push(k);var l="["+h.join("],[")+"]";return{process:i}}();

function showView(){
  if(!$(this).hasClass('navbar-item-selected')) {
    $(".kasxita").toggleClass("montrita");
    $(".navbar-item").toggleClass("navbar-item-selected");
  }
}

$(document).ready(function(){
  i18n.process(document);
  reshargi();

  $("#konservi").click(konservi);
  $("#opciojNav").click(showView);
  $("#priNav").click(showView);
});



