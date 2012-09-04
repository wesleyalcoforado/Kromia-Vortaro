function Revo(deLingvo, alLingvo){
  this.deLingvo = deLingvo;
  this.alLingvo = alLingvo;
}

Revo.prototype.serchi = function(vorto){
  var url = 'http://www.reta-vortaro.de/cgi-bin/sercxu.pl?sercxata=' + vorto;

  var chi = this;

  $.ajax({
    url: url,
    beforeSend: function(xhr){
      xhr.setRequestHeader('Accept-Language', chi.alLingvo);
    }
  }).done(function(html){ chi._aranghi(html); });
}

Revo.prototype._aranghi = function(html) {
  $("#traduko").empty();
  
  html = html.replace(/<script[^>]*>[\s|\S]*?<\/script>/g, '')
  html = html.replace(/<link[^>]*>/g, '')
  html = html.replace(/onload="sf\(\)"/g, '')
  
  $("#xmlparser")[0].src = ''
  $("#xmlparser")[0].contentDocument.write(html);

  var doc = $("#xmlparser")[0].contentDocument;
  
  var difinoj = 0;
  var rezultoj = $("a[target=precipa]", doc);
  for(var i=0; i<rezultoj.length; i+=2) {
    var de = rezultoj[i].innerText;
    
    if(i+1 < rezultoj.length){
      var al = rezultoj[i+1].innerText;
    
      difinoj++;
      var dl = $("<dl/>").append("<dt>"+de+"</dt>")
                         .append("<dd>"+al+"</dd>");

      $("#traduko").append(dl);
    }
  }  
  
  if(difinoj == 0) {
    $("#traduko").empty().append("Vorto ne trovata");
  }

  if(localStorage.konserviRezultoj == "true"){
    localStorage.vorto = $("#vorto").val();
    localStorage.rezultoj = $("#traduko").html();
  }

  $("#xmlparser")[0].src = '';
}

Revo.prototype.disponeblajLingvoj = function(){
  var lingvoj = new Array();
  lingvoj['en'] = 'English';
  lingvoj['af'] = 'Afrikaans';
  lingvoj['ar'] = 'العربية';
  lingvoj['be'] = 'Беларуская';
  lingvoj['bg'] = 'Български';
  lingvoj['br'] = 'Brezhoneg';
  lingvoj['ca'] = 'Català';
  lingvoj['cs'] = 'Česky';
  lingvoj['cy'] = 'Cymraeg';
  lingvoj['da'] = 'Dansk';
  lingvoj['de'] = 'Deutsch';
  lingvoj['el'] = 'Ελληνικά';
  lingvoj['es'] = 'Español';
  lingvoj['eu'] = 'Euskara';
  lingvoj['fa'] = 'فارسی';
  lingvoj['fi'] = 'Suomi';
  lingvoj['fr'] = 'Français';
  lingvoj['ga'] = 'Gaeilge';
  lingvoj['gd'] = 'Gàidhlig';
  lingvoj['gl'] = 'Galego';
  lingvoj['grc'] = 'Αρχαία Ελληνική';
  lingvoj['he'] = 'עברית';
  lingvoj['hr'] = 'Hrvatski';
  lingvoj['hu'] = 'Magyar';
  lingvoj['ia'] = 'Interlingua';
  lingvoj['id'] = 'Bahasa Indonesia';
  lingvoj['ie'] = 'Interlingue';
  lingvoj['is'] = 'Íslenska';
  lingvoj['it'] = 'Italiano';
  lingvoj['iu'] = 'ᐃᓄᒃᑎᑐᑦ/inuktitut';
  lingvoj['ja'] = '日本語';
  lingvoj['jbo'] = 'Lojban';
  lingvoj['ka'] = 'ქართული';
  lingvoj['kek'] = 'Q’eqchi’';
  lingvoj['kk'] = 'Қазақша';
  lingvoj['ko'] = '한국어';
  lingvoj['ku'] = 'Kurdî';
  lingvoj['la'] = 'Latina';
  lingvoj['lat'] = 'Latina archaica';
  lingvoj['lt'] = 'Lietuvių';
  lingvoj['lv'] = 'Latviešu';
  lingvoj['mo'] = 'Молдовеняскэ';
  lingvoj['nl'] = 'Nederlands';
  lingvoj['no'] = 'norsk (bokmål)‬';
  lingvoj['oc'] = 'Occitan';
  lingvoj['os'] = 'Ирон';
  lingvoj['pl'] = 'Polski';
  lingvoj['pt'] = 'Português';
  lingvoj['qu'] = 'Runa Simi';
  lingvoj['ro'] = 'Română';
  lingvoj['ru'] = 'Русский';
  lingvoj['sk'] = 'Slovenčina';
  lingvoj['sl'] = 'Slovenščina';
  lingvoj['sr'] = 'Српски / srpski';
  lingvoj['sv'] = 'Svenska';
  lingvoj['sw'] = 'Kiswahili';
  lingvoj['to'] = 'Lea faka-Tonga';
  lingvoj['tp'] = 'Tokipona';
  lingvoj['tr'] = 'Türkçe';
  lingvoj['uk'] = 'Українська';
  lingvoj['vo'] = 'Volapük';
  lingvoj['zh'] = '中文';

  return lingvoj;
}
