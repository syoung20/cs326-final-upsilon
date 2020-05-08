const express = require('express');
const router = express.Router();
var faker = require('faker');
const database = require('../../database')


//code to handle the different posts

router.post('/add', (req, res) => {

    //this endpoint is going to be called with form data once the data has succesfully been written to a db just render a view
    //console.log(req.body)

    let reqObj = {
        userID : "test0@email.com",
        "recipe.name": req.body['recipe.title'],
        "recipe.discription": req.body["recipe.discription"],
        "recipe.category": req.body["recipe.category"],
        "ingrediant": req.body["ingrediant"],
        "quantity" : req.body["quantity"],
        "instruction": req.body["instruction"],
        "cook.time": req.body["cook.time"],
        "cook.unit": req.body["cook.unit"], // 1 - hours 2 - minutes 
        "prep.time": req.body["prep.time"],
        "prep.unit": req.body['prep.unit'],
        "servings" : req.body["servings"],
        "image" : req.body['imageB64']

        


    }

    console.log(req.body.ingrediant)
    console.log(req.body.quantity)
    

    
    //console.log(reqObj)
    database.putRecipeData(reqObj.userID, reqObj["recipe.name"], reqObj.image, reqObj["prep.time"], reqObj["cook.time"], reqObj.servings, reqObj["recipe.discription"], reqObj.instruction, reqObj.ingrediant, reqObj.quantity).then(function (res) {
        //console.log(reqObj)
        console.log(res)
    })


    res.redirect('https://cs326-final-upsilon.herokuapp.com')

})


router.post('/read', (req, res) => {

    let recipeID : string = req.body.rid
    /*

    perform search for that id in db

    */
   let recTitle : string = "";
   let recImage : string = "";
   let recPrep : string = "";
   let recCook : string = "";
   let recDescription : string = "";
   let recServings : string = "";


    let recipe = database.getRecipeData(recipeID).then(function (data){
        recTitle = data.title;
        recImage = data.image;
        recPrep = data.prep_time;
        recCook = data.cook_time;
        recDescription = data.description;
        recServings = data.servings;
    });
    Promise.all([recipe]).then(function() {
        res.write(JSON.stringify({'title' : recTitle, 'image' : recImage, 'prep' : recPrep, 'cook' : recCook, 'description' : recDescription, 'servings' : recServings}));
        res.end();
    });
})

router.post('/instructions', (req, res) => {

    let recipeID : string = req.body.rid
    /*

    perform search for that id in db

    */
    let recInstructions : string[] = []

    let allInstructions = database.getRecipeInstructions(recipeID).then(function (res){

        for (let i = 0; i < res.length; i++) {
            recInstructions.push(res[i].instruction);
        }
    });
    Promise.all([allInstructions]).then(function() {
        res.write(JSON.stringify({'instructions' : recInstructions}));
        res.end();
    });
})

router.post('/ingredients', (req, res) => {

    let recipeID : string = req.body.rid
    /*

    perform search for that id in db

    */
   let recIngredients : string[] = []
   let recQuantities : string[] = []

    let allIngredients = database.getRecipeIngredients(recipeID).then(function (res){
        for (let i = 0; i < res.length; i++) {
            recIngredients.push(res[i].ingredient);
            recQuantities.push(res[i].quantity);
        }

    });
    Promise.all([allIngredients]).then(function() {
        res.write(JSON.stringify({'ingredients' : recIngredients, 'quantities' : recQuantities}));
        res.end();
    });
})






router.post('/addgroceries', (req, res) => {

    let groceriesToAdd: Array<string> = req.body.grocerieItems

    /*
    code to add these items to the current users groceries

    */
    res.status(200)
    res.send(JSON.stringify({ status: "successfully added" }))
    res.end()

})

router.post('/saverecipe', (req, res) => {

    let recipeId: string = req.body.rid
    let catId: string = req.body.catId
    database.addCategoryRecipe(catId, recipeId).then( function() {
        res.send(JSON.stringify({ status: "successfully added" }));
        res.end();
    })
});

    /*
    code to delete recipe 

    

    res.send(JSON.stringify({ status: "successfully saved recipie to category" }))
    res.end()

})*/









router.get('/', (req, res) => {
    res.redirect('/recipe.html')
})




module.exports = router;