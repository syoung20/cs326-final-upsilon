const express = require('express');
const router = express.Router();


//code to handle the different posts

router.post('/', (req, res) => {
    
    


})



router.get('/login', (req, res) => {
    res.redirect('/login.html')
})

router.get('/signup', (req, res) => {
    res.redirect('/signup.html')
})

module.exports = router;