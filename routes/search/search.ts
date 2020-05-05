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
        
        /*
        if (req.body.params["recipe_categoreis"].length != 0) {
            areThereCategoreis = true;

        }

        if (req.body.params["ingrediants_list"].length != 0) {
            areThereIngredients = true;
        }
        let areThereFilters : boolean;
        if(areThereCategoreis == false && areThereIngredients == false){
            areThereFilters = false;
        }
        if(areThereCategoreis == true || areThereIngredients == true) {
            areThereFilters = true;
        }

        let returnObject = {
            recipes: [],
            recipe_count: 0,
            filters : areThereFilters,
            filterMatchIng : false,
            filterMatchCat : false,
            ingrediantsMatched : [],
            categoriesMatched : []

        }

        let recepiesWithCategories : Array<Object> = []
        let withIngre : Array<Object> = []


        // let returnObject;
        let returnedOBJ = database.search(searchQuery).then(function (res) {
            //console.log(typeof withIngre)
            res.forEach(function (element) {
                if (areThereIngredients) {
                    
                    req.body.params["ingrediants_list"].forEach( function(ingrediant) {
                        //console.log(element['ingredient'] + '   ' + ingrediant.toLowerCase())
                        if (element['ingredient'] == ingrediant.toLowerCase()) {
                            //console.log('match')
                            withIngre.push(element)
                            returnObject.filterMatchIng = true;
                            returnObject.ingrediantsMatched.push(ingrediant)
                        }
                    })
                }

                if (areThereCategoreis) {
                    req.body.params["recipe_categoreis"].forEach(function(category)   {
                        if (element['category'] == category.toLowerCase()) {
                            //console.log('match')
                            
                            recepiesWithCategories.push(element)
                            returnObject.filterMatchCat = true;
                            returnObject.categoriesMatched.push(category)
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
                returnA.forEach(function (prospect) {
                    if(returnObject.recipes.length == 0){
                        returnObject.recipes.push(prospect)
                    }
                    else{
                        returnObject.recipes.forEach(function (element) {
                            if(element.recipe_id == prospect.recipe_id){
                                console.log('already in return set')
                                return
                            }
                            else{
                                console.log('unique item added')
                                returnObject.recipes.push(prospect)
                            }
                        })
                    }
                })
                //returnObject.recipes = returnA;
                res.status(200)
                res.send(JSON.stringify(returnObject))
            }
            else {
                searchQMatch.forEach(function (prospect) {
                    //console.log(prospect)
                    if(returnObject.recipes.length == 0){
                        returnObject.recipes.push(prospect)
                    }
                    else{
                        returnObject.recipes.forEach(function (element) {
                            if(element.recipe_id == prospect.recipe_id){
                                return
                            }
                            else{
                                returnObject.recipes.push(prospect)
                            }
                        })
                    }
                    
                })
                //returnObject.recipes = searchQMatch
                res.status(200)
                res.send(JSON.stringify(returnObject))
            }

        })
        */
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

