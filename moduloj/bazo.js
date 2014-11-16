$(document).ready(function(){
  reshargi();

  //eventoj
  $("#formulario").submit(function(){
    serchi();
    return false;
  });
  $("#direkto").click(shanghiDirekton);
  $("#lingvo").change(aktualigiLingvon);

  if(localStorage.anstatauighi == null || localStorage.anstatauighi == "true"){
    $("#vorto").keypress(transkribiLiteron);
  }

  $("#x").click(function(){
    if(this.checked) {
      localStorage.anstatauighi = true;
      $("#vorto").bind('keypress', transkribiLiteron);
    }else{
      localStorage.anstatauighi = false;
      $("#vorto").unbind('keypress', transkribiLiteron);
    }
  });
});
