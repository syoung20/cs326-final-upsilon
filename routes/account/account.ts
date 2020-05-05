const express = require('express');
const router = express.Router();
const database = require('../../database')



router.post('/create', (req, res) => {

    let user_id = req.body["email"];
    let name = req.body["fname"] + " " + req.body["lname"];
    let password = req.body["pswd"];
    let response;

    let call = database.putUserData(user_id, name, password).then(function (res) {
        response = res;
    });
    Promise.all([call]).then(function() {
        if (response != null) {
            res.redirect("http://localhost:5657");
        }
        else {
            res.redirect("http://localhost:5657/signup.html?no")
        }
    });
})


router.post('/check', (req, res) => {

    let user_id = req.body["email"];
    let password = req.body["pswd"];
    let real = "";

    let user = database.loginUser(user_id).then(function (res) {
        if (res != null) {
            real = res.password;
        }
    })
    Promise.all([user]).then(function() {
        if (real == "") {
            res.redirect("http://localhost:5657/login.html?one");
        }
        if (real == password) {
            var url = "http://localhost:5657/login.html#" + user_id + "?two";
            res.redirect(url);
                  
        }
        else {
            res.redirect("http://localhost:5657/login.html?three");
        }
    });
    
})

module.exports = router;