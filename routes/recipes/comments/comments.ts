import { thistle } from "color-name";

const express = require('express');
const router = express.Router();
var faker = require('faker');


router.post('/add', (req, res) => {

    if(req.body.rating && req.body.comment && req.body.recipeID){
        res.status(200)

        res.send(JSON.stringify({status : "Comment Succesfully added"}))
        res.end()
    }
    else{
        res.status(400)
        res.end()
    }
    //let rating : string = req.body.rating
    //let comment : string = req.body.comment
    //let rid : string = req.body.recipeID
    
    /*
    code to add comment to the recipe
    */

    res.status(200)

    res.send(JSON.stringify({status : "Comment Succesfully added"}))
    res.end()
})


router.get('/', (req, res) => {
    res.redirect('/')
})

module.exports = router;