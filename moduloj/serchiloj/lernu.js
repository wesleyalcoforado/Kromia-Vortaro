function Lernu(deLingvo, alLingvo){
  this.deLingvo = deLingvo;
  this.alLingvo = alLingvo;
}

Lernu.prototype.disponeblajLingvoj = function(){
  var lingvoj = new Array();
  lingvoj['eo'] = 'Esperanto';
  lingvoj['en'] = 'English';
  lingvoj['ar'] = 'عربي';
  lingvoj['bg'] = 'Български';
  lingvoj['cs'] = 'Čeština';
  lingvoj['zh'] = '中文';
  lingvoj['da'] = 'Dansk';
  lingvoj['fi'] = 'Suomi';
  lingvoj['fr'] = 'Français';
  lingvoj['de'] = 'Deutsch';
  lingvoj['el'] = 'Ελληνικά';
  lingvoj['he'] = 'עברית';
  lingvoj['hi'] = 'हिन्दी';
  lingvoj['es'] = 'Español';
  lingvoj['hu'] = 'Magyar';
  lingvoj['ga'] = 'Gaeilge';
  lingvoj['it'] = 'Italiano';
  lingvoj['ja'] = '日本語';
  lingvoj['ca'] = 'Català';
  lingvoj['ko'] = '한국어';
  lingvoj['hr'] = 'Hrvatski';
  lingvoj['lt'] = 'Lietuvių';
  lingvoj['nl'] = 'Nederlands';
  lingvoj['no'] = 'Norsk';
  lingvoj['fa'] = 'فارسی';
  lingvoj['pl'] = 'Polski';
  lingvoj['pt'] = 'Português';
  lingvoj['ro'] = 'Română';
  lingvoj['ru'] = 'Русский';
  lingvoj['sr'] = 'Српски';
  lingvoj['sk'] = 'Slovenčina';
  lingvoj['sl'] = 'Slovensko';
  lingvoj['hsb'] = 'Hornjoserbsce';
  lingvoj['sw'] = 'Kiswahili';
  lingvoj['sv'] = 'Svenska';
  lingvoj['th'] = 'ไทย';
  lingvoj['tr'] = 'Türkçe';
  lingvoj['uk'] = 'Українська';
  lingvoj['vi'] = 'Việt nam';

  return lingvoj;
}

Lernu.prototype.serchi = function(vorto){
  var url = 'http://www.lernu.net/cgi-bin/serchi.pl?modelo='+vorto+'&delingvo='+this.deLingvo+'&allingvo='+this.alLingvo;
  $.ajax({
    url: url
  }).done(this._aranghi);
}

Lernu.prototype._aranghi = function(datumoj){
  $("#traduko").empty()

  if(vortoTrovata(datumoj)){
    var rikordoj = datumoj.split('\n');
    var lineo = 0;
    var unuaVortoDeUnuaLineo = rikordoj[0].split('\t')[0];
    if(unuaVortoDeUnuaLineo.indexOf('·') != -1){
      var vortfarado = rikordoj[0];
      $("<span/>").attr("class", "vortfarado")
                  .append(vortfarado)
                  .appendTo("#traduko");

      lineo = 1;
    }

    while(lineo < rikordoj.length){
      var lineoVorto = rikordoj[lineo++];
      if(lastaLineo(lineoVorto) || lineoVorto.trim() == ''){
        continue;
      }

      var lineoTraduko = rikordoj[lineo++];
      var dl = html_igi(lineoVorto, lineoTraduko);
      $("#traduko").append(dl);
    }

  }else{
    $("#traduko").empty().append("Vorto ne trovata");
  }

  if(localStorage.konserviRezultoj == "true"){
    localStorage.vorto = $("#vorto").val();
    localStorage.rezultoj = $("#traduko").html();
  }
}

function lastaLineo(lineo){
  return /^\[\[.*\]\]\[\[.*\]\]/.test(lineo);
}

function html_igi(lineoVorto, lineoTraduko){
  var tradukota = lineoVorto.split('\t');
  var tradukotaVorto = tradukota[1];
  var silaboj = tradukota[2];
  var radiko = tradukota[3];

  if(silaboj.trim().length > 0){
    silaboj = silaboj.replace(/\//g, '&middot;');
    tradukotaVorto = tradukotaVorto + " <span class='detaloj'>(" + silaboj;
    if(radiko.trim().length > 0){
      tradukotaVorto = tradukotaVorto + ' &larr; '+ radiko;
    }
    tradukotaVorto = tradukotaVorto + ')</span>';
  }

  var tradukita = lineoTraduko.split('\t');
  var tradukitajVortoj = tradukita[3].replace('&gt;', '>').split(';');

  var dt = $("<dt/>").append(tradukotaVorto);
  var dl = $("<dl/>").append(dt);

  for(var v in tradukitajVortoj){
    var dd = $("<dd/>").append(tradukitajVortoj[v]);
    dl.append(dd);
  }

  return dl;
}

function vortoTrovata(datumoj){
  return  (datumoj != null) && (datumoj.indexOf("\n") != -1);
}



