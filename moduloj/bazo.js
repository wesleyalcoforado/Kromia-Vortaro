$(document).ready(function(){
  reshargi();

  //eventoj
  $("#formulario").submit(function(){
    serchi();
    return false;
  });
  $("#direkto").click(shanghiDirekton);
  $("#lingvo").change(aktualigiLingvon);
});