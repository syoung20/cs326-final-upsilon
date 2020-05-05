
var modal = document.getElementById("myModal");

var faker = 10;

var recoverMod = document.getElementById("recoverModal");

var btn = document.getElementById("myBtn");

var recover = document.getElementById("recoverPsw");

var span = document.getElementsByClassName("close")[0];

var email = document.getElementById("email");

var pswd = document.getElementById("pswd");

recover.onclick = function() {
  recoverMod.style.display = "block";
}
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
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/json"
                },
            body: JSON.stringify(req)
        })
            .then((data) => {
              console.log(data);
            })
            
}
*/

span.onclick = function() {
  recoverMod.style.display = "none";
}

