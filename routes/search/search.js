"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var faker = require('faker');
router.post('/', function (req, res) {
    /*

        code to validate request will go here.

    */
    // the string that the user inputed
    var searchQuery = req.body.searchq;
    var searchParameters = {
        tags: req.body.tags,
        categories: req.body.categories
    };
    //perform search then send it back 
    var searchReturn = {
        matchedItems: [
            {
                title: faker.commerce.productName(),
                discription: faker.lorem.paragraph()
            },
            {
                title: faker.commerce.productName(),
                discription: faker.lorem.paragraph()
            }
        ],
        matchedCount: 2
    };
    res.status(200);
    res.send(JSON.stringify(searchReturn));
    res.end();
});
router.get('/', function (req, res) {
    res.redirect('/');
});
module.exports = router;
