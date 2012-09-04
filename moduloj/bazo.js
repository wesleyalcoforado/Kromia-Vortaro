$(document).ready(function(){
  reshargi();

  //eventoj
  $("#formulario").submit(function(){
    serchi();
    return false;
  });
  $("#direkto").click(shanghiDirekton);
  $("#lingvo").change(aktualigiLingvon);
  $("#vorto").keypress(transkribiLiteron);
  $("#x").click(function(){
    if(this.checked) {
      $("#vorto").bind('keypress', transkribiLiteron);
    }else{
      $("#vorto").unbind('keypress', transkribiLiteron);
    }
  });
});