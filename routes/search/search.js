"use strict";
exports.__esModule = true;
var database = require('../../database');
var express = require('express');
var router = express.Router();
var faker = require('faker');
router.post('/', function (req, res) {
    try {
        var searchQuery = req.body.search_query;
        var parameters = req.body.params;
        if (searchQuery == undefined || parameters == undefined) {
            res.status(400);
            var badRequest = {
                error: '400 Bad Request',
                message: "didn't find expected fields"
            };
            res.send(JSON.stringify(badRequest));
            res.end();
        }
        else if (typeof searchQuery != 'string') {
            res.status(400);
            var badRequest = {
                error: '400 Bad Request',
                message: "didn't find expected fields"
            };
            res.send(JSON.stringify(badRequest));
            res.end();
        }
    }
    catch (exception) {
        res.status(400);
        var badRequest = {
            error: '500 Internal Server Error',
            message: "oops, something went wront with the internal server. Please try again later."
        };
        res.send(JSON.stringify(badRequest));
    }
    try {
        var searchQuery = req.body.search_query;
        var areThereCategoreis_1 = false;
        var areThereIngredients_1 = false;
        var searchQMatch_1 = [];
        if (req.body.params["recipe_categoreis"].length != 0) {
            areThereCategoreis_1 = true;
        }
        if (req.body.params["ingrediants_list"].length != 0) {
            areThereIngredients_1 = true;
        }
        var sampleReturn_1 = {
            recipes: [],
            recipe_count: 5
        };
        var recepiesWithCategories_1 = [];
        var withIngre_1 = [];
        // let sampleReturn;
        var returnedOBJ = database.search(searchQuery).then(function (res) {
            //console.log(typeof withIngre)
            res.forEach(function (element) {
                if (areThereIngredients_1) {
                    req.body.params["ingrediants_list"].forEach(function (ingrediant) {
                        if (element['ingredient'] == ingrediant.toLowerCase()) {
                            console.log('match');
                            withIngre_1.push(element);
                        }
                    });
                }
                if (areThereCategoreis_1) {
                    req.body.params["recipe_categoreis"].forEach(function (category) {
                        if (element['category'] == category.toLowerCase()) {
                            console.log('match');
                            recepiesWithCategories_1.push(element);
                        }
                    });
                }
                searchQMatch_1.push(element); //regardless of match of category or ingredient add it this array
            });
        }).then(function () {
            var returnA = [];
            if (recepiesWithCategories_1.length != 0) {
                recepiesWithCategories_1.forEach(function (cat) {
                    returnA.push(cat);
                });
            }
            if (withIngre_1.length != 0) {
                withIngre_1.forEach(function (ingre) {
                    returnA.push(ingre);
                });
            }
            if (returnA.length != 0) {
                sampleReturn_1.recipes = returnA;
                res.status(200);
                res.send(JSON.stringify(sampleReturn_1));
            }
            else {
                sampleReturn_1.recipes = searchQMatch_1;
                res.status(200);
                res.send(JSON.stringify(sampleReturn_1));
            }
        });
    }
    catch (exception) {
        res.status(500);
        var serverErrorMessage = {
            error: "500 Internal Server Error",
            message: "oops, something went wront with the internal server. Please try again later."
        };
        res.send(JSON.stringify(serverErrorMessage));
    }
});
router.get('/', function (req, res) {
    res.redirect('/');
});
module.exports = router;
