function serchi(){
  var vorto = $("#vorto").val();
  if(vorto.trim().length == 0){
    return false;
  }

  var delingvo = "eo";
  var allingvo = localStorage.lingvo;

  if(localStorage.direkto == "maldekstre"){
    delingvo = localStorage.lingvo;
    allingvo = "eo";
  }

  var serchilo = new this[localStorage.motoro](delingvo, allingvo);
  serchilo.serchi(vorto);

  montriSharghbildon();
}

function montriSharghbildon(){
  $("#traduko").empty().append("<div align='center'><img src='ajax.gif'></div>");
}

function shanghiDirekton(){
  var bildoDirekto = $("#direkto");

  if(localStorage.direkto == "dekstre"){
    localStorage.direkto = "maldekstre";
    bildoDirekto.attr("src", "sago_maldekstre.png");
  }else{
    localStorage.direkto = "dekstre"
    bildoDirekto.attr("src", "sago_dekstre.png");
  }
}

function reshargi(){
  if(localStorage.motoro == undefined){
    localStorage.motoro = "Lernu";
  }
  listigiLingvojn();

  debugger;

  if(localStorage.lingvo == null || !lingvoEstasDisponebla(localStorage.lingvo)){
    if(lingvoEstasDisponebla("pt"))
      localStorage.lingvo = "pt";
    else
      localStorage.lingvo = "en";
  }
  $("#lingvo").val(localStorage.lingvo);

  if(localStorage.direkto == null || localStorage.direkto == "dekstre"){
    localStorage.direkto = "dekstre";
  }else{
    $("#direkto").attr("src", "sago_maldekstre.png");
    localStorage.direkto = "maldekstre";
  }

  if(localStorage.konserviRezultoj == "true"){
    if(localStorage.vorto){
      $("#vorto").val(localStorage.vorto);
    }

    if(localStorage.rezultoj){
      $("#traduko").empty().append(localStorage.rezultoj);
    }
  }

  if(localStorage.tiparaGrando){
    var cxio = document.querySelectorAll('*');

    for(var i in cxio){
      if(cxio[i] && cxio[i].style){
        cxio[i].style.fontSize = localStorage.tiparaGrando + 'pt';
      }
    }
  }

  enfokusigiTekstujon();
}

function lingvoEstasDisponebla(lingvo) {
  return $("#lingvo option[value='"+lingvo+"']").length > 0;
}

function enfokusigiTekstujon(){
  $("#vorto").focus();
}

function listigiLingvojn(){
  var lingvoj = (new this[localStorage.motoro]).disponeblajLingvoj();
  for(var lingvo in lingvoj){
  	if(lingvoj[lingvo]){
  	  $("<option/>").val(lingvo).text(lingvoj[lingvo]).appendTo("#lingvo");
  	}
  }
}

function aktualigiLingvon(){
  localStorage.lingvo = $("#lingvo").val();
}

function xAlUtf8(t,el) {
  if (document.getElementById("x").checked) {
    t = t.replace(/c[xX]/g, "\u0109");
    t = t.replace(/g[xX]/g, "\u011d");
    t = t.replace(/h[xX]/g, "\u0125");
    t = t.replace(/j[xX]/g, "\u0135");
    t = t.replace(/s[xX]/g, "\u015d");
    t = t.replace(/u[xX]/g, "\u016d");
    t = t.replace(/C[xX]/g, "\u0108");
    t = t.replace(/G[xX]/g, "\u011c");
    t = t.replace(/H[xX]/g, "\u0124");
    t = t.replace(/J[xX]/g, "\u0134");
    t = t.replace(/S[xX]/g, "\u015c");
    t = t.replace(/U[xX]/g, "\u016c");
    if (t != document.getElementById(el).value) {
      document.getElementById(el).value = t;
    }
  }
}
