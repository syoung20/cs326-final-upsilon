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
        

        if (req.body.params["recipe_categoreis"].length != 0) {
            areThereCategoreis = true;

        }

        if (req.body.params["ingrediants_list"].length != 0) {
            areThereIngredients = true;

        }


        let sampleReturn = {
            recipes: [],
            recipe_count: 5
        }

        let recepiesWithCategories : Array<Object> = []
        let withIngre : Array<Object> = []


        // let sampleReturn;
        let returnedOBJ = database.search(searchQuery).then(function (res) {
            //console.log(typeof withIngre)
            res.forEach(function (element) {
                
                if (areThereIngredients) {
                    
                    req.body.params["ingrediants_list"].forEach( function(ingrediant) {
                        
                        if (element['ingredient'] == ingrediant.toLowerCase()) {
                            console.log('match')
                            withIngre.push(element)
                        }
                    })
                }

                if (areThereCategoreis) {
                    req.body.params["recipe_categoreis"].forEach(function(category)   {
                        if (element['category'] == category.toLowerCase()) {
                            console.log('match')
                            recepiesWithCategories.push(element)
                        }
                    });
                }

                searchQMatch.push(element) //regardless of match of category or ingredient add it this array

            });

        }).then(function () {
            let returnA = []
            if (recepiesWithCategories.length != 0) {
                recepiesWithCategories.forEach(function(cat){
                    returnA.push(cat)
                })
            }
            if (withIngre.length != 0) {
                withIngre.forEach(function(ingre){
                    returnA.push(ingre)
                })
            }
            if (returnA.length != 0) {
                sampleReturn.recipes = returnA;
                res.status(200)
                res.send(JSON.stringify(sampleReturn))
            }
            else {
                sampleReturn.recipes = searchQMatch
                res.status(200)
                res.send(JSON.stringify(sampleReturn))
            }

        })


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

