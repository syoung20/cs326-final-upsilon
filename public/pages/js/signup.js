

var modal = document.getElementById("myModal");

var span = document.getElementsByClassName("close")[0];


console.log(window.location.href)
if (window.location.href.length == 36){
  modal.style.display = "block";
}

var btn = document.getElementById("myBtn");

span.onclick = function() {
  modal.style.display = "none";
}
