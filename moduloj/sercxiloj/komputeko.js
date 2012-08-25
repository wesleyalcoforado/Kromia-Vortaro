function Komputeko(deLingvo, alLingvo){
  this.deLingvo = deLingvo;
  this.alLingvo = alLingvo;
}

Komputeko.prototype.serchi = function(vorto){
  var url = 'http://komputeko.net/index_eo.php?vorto=' + vorto;
  $.ajax({
    url: url
  }).done(this._aranghi);
}

Komputeko.prototype._aranghi = function(html) {
  $("#traduko").empty();

  html = html.match(/<table class='search'[\s\S]*table>/); 
  $("#xmlparser")[0].src = ''
  $("#xmlparser")[0].contentDocument.write(html);
  
  var doc = $("#xmlparser")[0].contentDocument;
  var valuesEN = doc.evaluate("/html/body/table[@class='search']//td[1]", doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
  var valuesEO = doc.evaluate("/html/body/table[@class='search']//td[2]", doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
  
  var englishWord = valuesEN.iterateNext();
  var esperantoWord = valuesEO.iterateNext();
  while(englishWord)
  {
    var str = englishWord.textContent + ': ' + esperantoWord.textContent;
    $("#traduko").append(str + "<br/>");
    
    englishWord = valuesEN.iterateNext();
    esperantoWord = valuesEO.iterateNext();
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