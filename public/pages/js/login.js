
var modal = document.getElementById("myModal");

var faker = 10;

var recoverMod = document.getElementById("recoverModal");

var btn = document.getElementById("myBtn");

var recover = document.getElementById("recoverPsw");

var span = document.getElementsByClassName("close")[0];

recover.onclick = function() {
  recoverMod.style.display = "block";
}

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  recoverMod.style.display = "none";
}

