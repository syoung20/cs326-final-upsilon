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
        var areThereFilters = void 0;
        if (areThereCategoreis_1 == false && areThereIngredients_1 == false) {
            areThereFilters = false;
        }
        if (areThereCategoreis_1 == true || areThereIngredients_1 == true) {
            areThereFilters = true;
        }
        var returnObject_1 = {
            recipes: [],
            recipe_count: 0,
            filters: areThereFilters,
            filterMatchIng: false,
            filterMatchCat: false,
            ingrediantsMatched: [],
            categoriesMatched: []
        };
        var recepiesWithCategories_1 = [];
        var withIngre_1 = [];
        // let returnObject;
        var returnedOBJ = database.search(searchQuery).then(function (res) {
            //console.log(typeof withIngre)
            res.forEach(function (element) {
                if (areThereIngredients_1) {
                    req.body.params["ingrediants_list"].forEach(function (ingrediant) {
                        //console.log(element['ingredient'] + '   ' + ingrediant.toLowerCase())
                        if (element['ingredient'] == ingrediant.toLowerCase()) {
                            //console.log('match')
                            withIngre_1.push(element);
                            returnObject_1.filterMatchIng = true;
                            returnObject_1.ingrediantsMatched.push(ingrediant);
                        }
                    });
                }
                if (areThereCategoreis_1) {
                    req.body.params["recipe_categoreis"].forEach(function (category) {
                        if (element['category'] == category.toLowerCase()) {
                            //console.log('match')
                            recepiesWithCategories_1.push(element);
                            returnObject_1.filterMatchCat = true;
                            returnObject_1.categoriesMatched.push(category);
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
                returnA.forEach(function (prospect) {
                    if (returnObject_1.recipes.length == 0) {
                        returnObject_1.recipes.push(prospect);
                    }
                    else {
                        returnObject_1.recipes.forEach(function (element) {
                            if (element.recipe_id == prospect.recipe_id) {
                                console.log('already in return set');
                                return;
                            }
                            else {
                                console.log('unique item added');
                                returnObject_1.recipes.push(prospect);
                            }
                        });
                    }
                });
                //returnObject.recipes = returnA;
                res.status(200);
                res.send(JSON.stringify(returnObject_1));
            }
            else {
                searchQMatch_1.forEach(function (prospect) {
                    //console.log(prospect)
                    if (returnObject_1.recipes.length == 0) {
                        returnObject_1.recipes.push(prospect);
                    }
                    else {
                        returnObject_1.recipes.forEach(function (element) {
                            if (element.recipe_id == prospect.recipe_id) {
                                return;
                            }
                            else {
                                returnObject_1.recipes.push(prospect);
                            }
                        });
                    }
                });
                //returnObject.recipes = searchQMatch
                res.status(200);
                res.send(JSON.stringify(returnObject_1));
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
