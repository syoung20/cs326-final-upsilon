const express = require('express');
const router = express.Router();
const database = require('../../database')



router.post('/create', (req, res) => {

    let user_id = req.userid;
    let name = req.name;
    let password = req.password;

    database.putUserData(user_id, name, password).then(function (res) {
        res.write(res);
        res.end();
    })
    })

router.post('/check', (req, res) => {

    let user_id = req.user_id;

    let user = database.loginUser(user_id).then(function (res) {
        res.write(JSON.stringify(res));
        res.end();
    })
})

module.exports = router;
