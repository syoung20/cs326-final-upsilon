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
            res.redirect("https://cs326-final-upsilon.herokuapp.com");
        }
        else {
            res.redirect("https://cs326-final-upsilon.herokuapp.com/signup.html?no");
        }
    });
});
router.post('/check', function (req, res) {
    var user_id = req.body["email"];
    var password = req.body["pswd"];
    var real = "";
    var user = database.loginUser(user_id).then(function (res) {
        if (res != null) {
            real = res.password;
        }
    });
    Promise.all([user]).then(function () {
        if (real == "") {
            res.redirect("https://cs326-final-upsilon.herokuapp.com/login.html?one");
        }
        if (real == password) {
            var url = "https://cs326-final-upsilon.herokuapp.com/login.html#" + user_id + "?two";
            res.redirect(url);
        }
        else {
            res.redirect("https://cs326-final-upsilon.herokuapp.com/login.html?three");
        }
    });
});
module.exports = router;
