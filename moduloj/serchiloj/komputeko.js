function Komputeko(deLingvo, alLingvo){
  this.deLingvo = deLingvo;
  this.alLingvo = alLingvo;
}

Komputeko.prototype.serchi = function(vorto){
  var url = 'http://www.komputeko.net/index_eo.php?vorto=' + vorto;

  var naciLingvo = this.deLingvo == "eo" ? this.alLingvo : this.deLingvo;
  if(naciLingvo == "es" || naciLingvo == "ca" || naciLingvo == "pl") {
    url = 'http://www.komputeko.net/varianto1/index_eo.php?vorto=' + vorto;
  }

  var chi = this;

  $.ajax({
    url: url
  }).done(function(html){ chi._aranghi(html); });
}

Komputeko.prototype._aranghi = function(html) {
  $("#traduko").empty();

  html = html.match(/<table class='search'[\s\S]*table>/);
  $("#xmlparser")[0].src = ''
  $("#xmlparser")[0].contentDocument.write(html);

  var doc = $("#xmlparser")[0].contentDocument;
  var indeksoDe = this._indeksoLingvo(this.deLingvo);
  var indeksoAl = this._indeksoLingvo(this.alLingvo);

  var tradukotaj = doc.evaluate("/html/body/table[@class='search']//td["+indeksoDe+"]", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var tradukitaj = doc.evaluate("/html/body/table[@class='search']//td["+indeksoAl+"]", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  var difinoj = 0;
  for(var i=0, l=tradukotaj.snapshotLength; i<l; i++){
    var tradukotaVorto = tradukotaj.snapshotItem(i);
    var tradukitaVorto = tradukitaj.snapshotItem(i);

    tradukotaVorto = this._purigi(tradukotaVorto);
    tradukitaVorto = this._purigi(tradukitaVorto);

    if(tradukitaVorto.length != 0 && tradukotaVorto.length != 0)
    {
      difinoj++;
      var dl = $("<dl/>").append("<dt>"+tradukotaVorto+"</dt>")
                         .append("<dd>"+tradukitaVorto+"</dd>");

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

Komputeko.prototype._purigi = function(vorto){
  $('.fonto', vorto).html('');
  var arrDifinoj1 = vorto.innerText.split(';');
  var arrDifinoj2 = [];
  for(var dif in arrDifinoj1){
     var x = arrDifinoj1[dif].split('OR')[0].trim();
     arrDifinoj2.push(x);
  }

  return arrDifinoj2.join('; ')
}

Komputeko.prototype._indeksoLingvo = function(lingvo){
  switch(lingvo){
    case "en":
      return 1;
    case "eo":
      return 2;
    case "nl":
    case "es":
      return 3;
    case "de":
    case "pl":
      return 4;
    case "ca":
    case "fr":
      return 5;
  }

}

Komputeko.prototype.disponeblajLingvoj = function(){
  var lingvoj = new Array();
  lingvoj['en'] = 'English';
  lingvoj['fr'] = 'Français';
  lingvoj['de'] = 'Deutsch';
  lingvoj['es'] = 'Español';
  lingvoj['nl'] = 'Nederlands';
  lingvoj['ca'] = 'Català';
  lingvoj['pl'] = 'Polski';

  return lingvoj;
}
