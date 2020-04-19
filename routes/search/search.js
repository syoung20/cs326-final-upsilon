const express = require('express');
const router = express.Router();


router.post('/', (req, res) => {
    //code to handle the req will go here 
    

})


router.get('/', (req, res) => {
    res.redirect('/')
})

module.exports = router;