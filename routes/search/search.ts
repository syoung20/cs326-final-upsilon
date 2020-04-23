import { thistle } from "color-name";

const express = require('express');
const router = express.Router();
var faker = require('faker');


router.post('/', (req, res) => {

    /*

        code to validate request will go here. 

    */
    
    // the string that the user inputed
    let searchQuery: string = req.body.searchq

    // search parameters 

    
    interface parameters {
        tags: Array<String>,
        categories: Array<string>
        //more params will be added
    }

   let searchParameters: parameters = {
        tags: req.body.tags,
        categories: req.body.categories
    } 

    //perform search then send it back 
    
    let searchReturn = {
        matchedItems : [
            {
                title :  faker.commerce.productName(),
                discription : faker.lorem.paragraph()
            },
            {
                title :  faker.commerce.productName(),
                discription : faker.lorem.paragraph()
            }
        ],
        matchedCount : 2,
    }

    res.status(200)

    res.send(JSON.stringify(searchReturn))
    res.end()
})


router.get('/', (req, res) => {
    res.redirect('/')
})

module.exports = router;