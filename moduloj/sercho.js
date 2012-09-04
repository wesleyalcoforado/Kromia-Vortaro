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
  $("#traduko").empty().append("<div align='center'><img src='bildoj/ajax.gif'></div>");
}

function shanghiDirekton(){
  var bildoDirekto = $("#direkto");

  if(localStorage.direkto == "dekstre"){
    localStorage.direkto = "maldekstre";
    bildoDirekto.attr("src", "bildoj/sago_maldekstre.png");
  }else{
    localStorage.direkto = "dekstre"
    bildoDirekto.attr("src", "bildoj/sago_dekstre.png");
  }
}

function reshargi(){
  if(localStorage.motoro == undefined){
    localStorage.motoro = "Lernu";
  }
  
  if(localStorage.motoro == "Lernu"){
    $("#vortaro").css('backgroundImage', 'url(bildoj/lernu.png)')
  }else if(localStorage.motoro == "Komputeko"){
    $("#vortaro").css('backgroundImage', 'url(bildoj/komputeko.png)')
  }else{
    $("#vortaro").css('backgroundImage', 'url(bildoj/revo.png)')
  }
  
  listigiLingvojn();

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
    $("#direkto").attr("src", "bildoj/sago_maldekstre.png");
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

function transkribiLiteron(evento) {
  var kodo = evento.which;
  if (!evento.which){
    return;
  }
  var teksto = String.fromCharCode(kodo);

  if (kodo && kodo > 33 && (!(evento.ctrlKey || evento.altKey))){
    if (evento.preventDefault){
      evento.preventDefault();
    }

    var objekto = $(this)[0];
    var antauTeksto = objekto.value.substring(0, objekto.selectionStart);
    var rezulto = transkribi(antauTeksto + teksto);
    var cetero = objekto.value.substr(objekto.selectionEnd);
    objekto.value = rezulto + cetero;

    objekto.setSelectionRange(rezulto.length, rezulto.length);
  }
}

function transkribi(teksto) {
  var necxapelitaj = new Array();
  var cxapelitaj = new Array();

  necxapelitaj['h'] = new Array ('c','C','ĉ','Ĉ','g','G','ĝ','Ĝ','h','H','ĥ','Ĥ','j','J','ĵ','Ĵ','s','S','ŝ','Ŝ','u','U','ŭ','Ŭ','');
  cxapelitaj['h'] = new Array ('ĉ','Ĉ','ch','Ch','ĝ','Ĝ','gh','Gh','ĥ','Ĥ','hh','Hh','ĵ','Ĵ','jh','Jh','ŝ','Ŝ','sh','Sh','ŭ','Ŭ','uh','Uh','h');

  necxapelitaj['H'] = new Array ('c','C','ĉ','Ĉ','g','G','ĝ','Ĝ','h','H','ĥ','Ĥ','j','J','ĵ','Ĵ','s','S','ŝ','Ŝ','u','U','ŭ','Ŭ','');
  cxapelitaj['H'] = new Array ('ĉ','Ĉ','cH','CH','ĝ','Ĝ','gH','GH','ĥ','Ĥ','hH','HH','ĵ','Ĵ','jH','JH','ŝ','Ŝ','sH','SH','ŭ','Ŭ','uH','UH','H');

  necxapelitaj['x'] = new Array ('c','C','ĉ','Ĉ','g','G','ĝ','Ĝ','h','H','ĥ','Ĥ','j','J','ĵ','Ĵ','s','S','ŝ','Ŝ','u','U','ŭ','Ŭ','');
  cxapelitaj['x'] = new Array ('ĉ','Ĉ','cx','Cx','ĝ','Ĝ','gx','Gx','ĥ','Ĥ','hx','Hx','ĵ','Ĵ','jx','Jx','ŝ','Ŝ','sx','Sx','ŭ','Ŭ','ux','Ux','x');

  necxapelitaj['X'] = new Array ('c','C','ĉ','Ĉ','g','G','ĝ','Ĝ','h','H','ĥ','Ĥ','j','J','ĵ','Ĵ','s','S','ŝ','Ŝ','u','U','ŭ','Ŭ','');
  cxapelitaj['X'] = new Array ('ĉ','Ĉ','cX','CX','ĝ','Ĝ','gX','GX','ĥ','Ĥ','hX','HX','ĵ','Ĵ','jX','JX','ŝ','Ŝ','sX','SX','ŭ','Ŭ','uX','UX','X');

  necxapelitaj['w'] = new Array ('');
  cxapelitaj['w'] = new Array ('ŭ');

  necxapelitaj['W'] = new Array ('');
  cxapelitaj['W'] = new Array ('Ŭ');
  

  var antauTeksto = teksto.substr(0, teksto.length-1);
  var lastaLitero = teksto.substr(teksto.length-1, 1);
  var necxapelita = necxapelitaj[lastaLitero];
  var cxapelita = cxapelitaj[lastaLitero];
  if (necxapelita){
    for (var i=0; i < necxapelita.length; i++){
      var pozicio = antauTeksto.length > necxapelita[i].length ? (antauTeksto.length - necxapelita[i].length) : 0;
      if (necxapelita[i] == antauTeksto.substr(pozicio, antauTeksto.length - pozicio)) {
        return antauTeksto.substr(0, antauTeksto.length - necxapelita[i].length) + cxapelita[i];
      }
    }
  }
  return teksto;
}

