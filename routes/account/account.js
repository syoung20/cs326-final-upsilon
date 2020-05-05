var express = require('express');
var router = express.Router();
var database = require('../../database');
router.post('/create', function (req, res) {
    var user_id = req.body["email"];
    var name = req.body["fname"] + " " + req.body["lname"];
    var password = req.body["pswd"];
    var response;
    var call = database.putUserData(user_id, name, password).then(function (res) {
        response = res;
    });
    Promise.all([call]).then(function () {
        if (response != null) {
            res.redirect("http://localhost:5657");
        }
        else {
            res.redirect("http://localhost:5657/signup.html?no");
        }
    });
});
router.post('/check', function (req, res) {
    var user_id = req.body.user_id;
    var password = req.body.user_id;
    var real = "";
    var user = database.loginUser(user_id).then(function (res) {
        if (res != null) {
            real = res.password;
        }
    });
    Promise.all([user]).then(function () {
        res.redirect("http://localhost:5657");
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
});
module.exports = router;
