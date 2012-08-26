function Komputeko(deLingvo, alLingvo){
  this.deLingvo = deLingvo;
  this.alLingvo = alLingvo;
}

Komputeko.prototype.serchi = function(vorto){
  var url = 'http://www.komputeko.net/index_eo.php?vorto=' + vorto;
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

  var tradukotaj = doc.evaluate("/html/body/table[@class='search']//td["+indeksoDe+"]", doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
  var tradukitaj = doc.evaluate("/html/body/table[@class='search']//td["+indeksoAl+"]", doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null); //default: EN

  var tradukotaVorto = tradukotaj.iterateNext();
  var tradukitaVorto = tradukitaj.iterateNext();
  while(tradukotaVorto)
  {
    tradukotaVorto = tradukotaVorto.innerText.trim();
    tradukitaVorto = tradukitaVorto.innerText.trim();

    if(tradukitaVorto.length != 0 && tradukotaVorto.length != 0)
    {
      var dl = $("<dl/>").append("<dt>"+tradukotaVorto+"</dt>")
                         .append("<dd>"+tradukitaVorto+"</dd>");

      $("#traduko").append(dl);
    }

    tradukotaVorto = tradukotaj.iterateNext();
    tradukitaVorto = tradukitaj.iterateNext();
  }

  if(localStorage.konserviRezultoj == "true"){
    localStorage.vorto = $("#vorto").val();
    localStorage.rezultoj = $("#traduko").html();
  }
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
