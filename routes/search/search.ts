import { thistle } from "color-name";

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
        else if(typeof searchQuery != 'string'){
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

        /*
        call to database to get data 
    */


        let sampleReturn = {
            recipes: [
                {
                    'title': 'Blackberry Lavender Cake with White Chocolate Buttercream',
                    'prep_time': '20mins',
                    'cook_time': '40mins',
                    'total_time': '1hr',
                    'servings': '4',
                    'recipe_id': 'rid0001'
                },
                {
                    'title': 'Blackberry Mint Cake with Mint Whipped Cream',
                    'prep_time': '20mins',
                    'cook_time': '40mins',
                    'total_time': '1hr',
                    'servings': '4',
                    'recipe_id': 'rid0002'
                },
                {
                    'title': 'Lemon Blackberry Cake with Mascarpone Whipped Cream Frosting',
                    'prep_time': '20mins',
                    'cook_time': '40mins',
                    'total_time': '1hr',
                    'servings': '4',
                    'recipe_id': 'rid0003'
                },
                {
                    'title': 'Blackberry Upside Down Vanilla Cake',
                    'prep_time': '20mins',
                    'cook_time': '40mins',
                    'total_time': '1hr',
                    'servings': '4',
                    'recipe_id': 'rid0004'
                },
                {
                    'title': 'Blackberry Cake with Cream Cheese Frosting',
                    'prep_time': '20mins',
                    'cook_time': '40mins',
                    'total_time': '1hr',
                    'servings': '4',
                    'recipe_id': 'rid0005'
                }
            ],
            recipe_count: 5
        }

        res.status(200)
        res.send(JSON.stringify(sampleReturn))
        console.log('data sent succesfully')

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