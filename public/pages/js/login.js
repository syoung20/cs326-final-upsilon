
var modal = document.getElementById("myModal");

var one = document.getElementById("one");

var three = document.getElementById("three");

var faker = 10;

var recoverMod = document.getElementById("recoverModal");

var btn = document.getElementById("myBtn");

//var recover = document.getElementById("recoverPsw");

var span = document.getElementById("spanone");
span.onclick = function() {
  three.style.display = "none";
}

var spanone = document.getElementById("spantwo");
spanone.onclick = function() {
    one.style.display = "none";
}



var url = window.location.href;
var index = url.indexOf("?");
if (index != -1){
    var response = url.slice(index + 1);
    if (response == "one"){
      one.style.display = "block";
    }
    if (response == "three") {
      three.style.display = "block";
    }
    if (response == "two") {
      var indexDos = url.indexOf("#");
      var userid = url.slice(indexDos + 1, index);
      localStorage.setItem('user_id', userid);
      window.location.replace("http://localhost:5657");
    }
}


//<span class=psw id="recoverPsw"><a>Recover password</a></span>

/*recover.onclick = function() {
  recoverMod.style.display = "block";
}
*/
/*
btn.onclick = function() {
  //modal.style.display = "block";
  var userEmail = email.value;
  var userPswd = pswd.value;
  
  var url = "http://localhost:5657/account/check";
    var req = {'user_id' : userEmail, "password" : userPswd};
    var resp = fetch(url,
        {
            method: 'POST',
            body: JSON.stringify(req)
        })
}
*/




