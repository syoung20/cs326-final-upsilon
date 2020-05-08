import { thistle } from "color-name";
const database = require('../../database')

const express = require('express');
const router = express.Router();
var faker = require('faker');


router.post('/', (req, res) => {
    try {
        let searchQuery: string = req.body.search_query;
        let parameters = req.body.params;
        if (searchQuery == undefined || parameters == undefined) {
            res.status(400)
            let badRequest = {
                error: '400 Bad Request',
                message: "didn't find expected fields"
            }
            res.send(JSON.stringify(badRequest))
            res.end()
        }
        else if (typeof searchQuery != 'string') {
            res.status(400)
            let badRequest = {
                error: '400 Bad Request',
                message: "didn't find expected fields"
            }
            res.send(JSON.stringify(badRequest))
            res.end()
        }
    } catch (exception) {
        res.status(400)
        let badRequest = {
            error: '500 Internal Server Error',
            message: "oops, something went wront with the internal server. Please try again later."
        }
        res.send(JSON.stringify(badRequest))
    }

    try {

        let searchQuery: string = req.body.search_query;
        let areThereCategoreis: boolean = false
        let areThereIngredients: boolean = false
        let searchQMatch = []

       let returnObject = {
        recipes: [],
        recipe_count: 0,
        filters : areThereFilters,
        filterMatchIng : false,
        filterMatchCat : false,
        ingrediantsMatched : [],
        categoriesMatched : [],
        //filters : false
    }
        if (req.body.params["recipe_categoreis"].length != 0) {
            areThereCategoreis = true;

        }

        if (req.body.params["ingrediants_list"].length != 0) {
            areThereIngredients = true;
        }
        let areThereFilters: boolean;
        if (areThereCategoreis == false && areThereIngredients == false) {
            areThereFilters = false;
            // just make a call with the searchQuery because there was no params

            database.search(searchQuery).then(function(response) {
                returnObject.recipes = response
                res.status(200)
                res.send(JSON.stringify(returnObject))
            })

            
        }
        

        if (areThereCategoreis == true && areThereIngredients == true) {
            database.search(searchQuery, req.body.params["ingrediants_list"], req.body.params["recipe_categoreis"]).then(function(response) {
                
                if(response == []){
                    returnObject.recipe_count = 0
                    res.status(200)
                    res.send(JSON.stringify(returnObject))
                }
                else {
                    returnObject.filterMatchCat = true
                    returnObject.filterMatchIng = true
                    returnObject.filters = true
                    res.status(200)
                    returnObject.recipe_count = response.length
                    returnObject.recipes = response
                    res.send(JSON.stringify(returnObject))
                }
            })
        }
        

        if (areThereCategoreis == true) {
            database.search(searchQuery, undefined, req.body.params["recipe_categoreis"]).then(function(response) {
                
                if(response == []){
                    returnObject.recipe_count = 0
                    res.status(200)
                    res.send(JSON.stringify(returnObject))
                }
                else {
                    //returnObject.filterMatchCat = true
                   //returnObject.filters = true
                    res.status(200)
                    returnObject.recipe_count = response.length
                    returnObject.recipes = response
                    res.send(JSON.stringify(returnObject))
                }

            })
        }
        
        if (areThereIngredients == true) {
            console.log('in ingre')
            database.search(searchQuery, req.body.params["ingrediants_list"]).then(function(response) {
                //console.log(response)
                if(response == []){
                    returnObject.recipe_count = 0
                    res.status(200)
                    res.send(JSON.stringify(returnObject))
                }
                else {
                    returnObject.filterMatchIng = true
                    returnObject.filters = true
                   
                    returnObject.recipe_count = response.length
                    res.status(200)
                    returnObject.recipes = response
                    res.send(JSON.stringify(returnObject))
                }
            })
        }

    } catch (exception) {
        res.status(500)
        let serverErrorMessage = {
            error: "500 Internal Server Error",
            message: "oops, something went wront with the internal server. Please try again later."
        }
        res.send(JSON.stringify(serverErrorMessage))
    }

})


router.get('/', (req, res) => {
    res.redirect('/')
})

module.exports = router;

