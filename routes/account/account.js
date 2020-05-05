var express = require('express');
var router = express.Router();
var database = require('../../database');
router.post('/create', function (req, res) {
    var user_id = req.userid;
    var name = req.name;
    var password = req.password;
    database.putUserData(user_id, name, password).then(function (res) {
        res.write(res);
        res.end();
    });
});
router.post('/check', function (req, res) {
    var user_id = req.user_id;
    var user = database.loginUser(user_id).then(function (res) {
        res.write(JSON.stringify(res));
        res.end();
    });
});
module.exports = router;
