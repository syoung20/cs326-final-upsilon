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

    let user_id = req.body.user_id;
    let password = req.body.user_id;
    let real = "";

    let user = database.loginUser(user_id).then(function (res) {
        if (res != null) {
            real = res.password;
        }
    })
    Promise.all([user]).then(function() {
        res.redirect("http://localhost:5657")
        if (real == "") {
            res.redirect("http://localhost:5657/login.html?one");
        }
        if (real == password) {
            res.redirect("http://localhost:5657/login.html?two");        
        }
        else {
            res.redirect("http://localhost:5657/login.html?three");
        }
    });
})

module.exports = router;