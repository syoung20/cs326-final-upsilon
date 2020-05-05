var express = require('express');
var router = express.Router();
var faker = require('faker');
var database = require('../../database');
//code to handle the different posts
router.post('/add', function (req, res) {
    //this endpoint is going to be called with form data once the data has succesfully been written to a db just render a view
    //console.log(req.body)
    var reqObj = {
        userID: "test0@email.com",
        "recipe.name": req.body['recipe.title'],
        "recipe.discription": req.body["recipe.discription"],
        "recipe.category": req.body["recipe.category"],
        "ingrediant": req.body["ingrediant"],
        "instruction": req.body["instruction"],
        "cook.time": req.body["cook.time"],
        "cook.unit": req.body["cook.unit"],
        "prep.time": req.body["prep.time"],
        "prep.unit": req.body['prep.unit'],
        "servings": req.body["servings"],
        "image": req.body['imageB64']
    };
    //console.log(reqObj)
    database.putRecipeData(reqObj.userID, reqObj["recipe.name"], reqObj.image, reqObj["prep.time"], reqObj["cook.time"], reqObj.servings, reqObj["recipe.discription"], reqObj.instruction, reqObj.ingrediant).then(function (res) {
        //  //console.log(reqObj)
        console.log(res);
    });
    res.redirect('https://cs326-final-upsilon.herokuapp.com');
});
router.post('/read', function (req, res) {
    var recipeID = req.body.rid;
    /*

    perform search for that id in db

    */
    var recTitle = "";
    var recImage = "";
    var recPrep = "";
    var recCook = "";
    var recDescription = "";
    var recServings = "";
    var recipe = database.getRecipeData(recipeID).then(function (data) {
        recTitle = data.title;
        recImage = data.image;
        recPrep = data.prep_time;
        recCook = data.cook_time;
        recDescription = data.description;
        recServings = data.servings;
    });
    Promise.all([recipe]).then(function () {
        res.write(JSON.stringify({ 'title': recTitle, 'image': recImage, 'prep': recPrep, 'cook': recCook, 'description': recDescription, 'servings': recServings }));
        res.end();
    });
});
router.post('/instructions', function (req, res) {
    var recipeID = req.body.rid;
    /*

    perform search for that id in db

    */
    var recInstructions = [];
    var allInstructions = database.getRecipeInstructions(recipeID).then(function (res) {
        for (var i = 0; i < res.length; i++) {
            recInstructions.push(res[i].instruction);
        }
    });
    Promise.all([allInstructions]).then(function () {
        res.write(JSON.stringify({ 'instructions': recInstructions }));
        res.end();
    });
});
router.post('/ingredients', function (req, res) {
    var recipeID = req.body.rid;
    /*

    perform search for that id in db

    */
    var recIngredients = [];
    var allIngredients = database.getRecipeIngredients(recipeID).then(function (res) {
        for (var i = 0; i < res.length; i++) {
            recIngredients.push(res[i].ingredient);
        }
    });
    Promise.all([allIngredients]).then(function () {
        res.write(JSON.stringify({ 'ingredients': recIngredients }));
        res.end();
    });
});
router.post('/edit', function (req, res) {
    var recipeID = req.body.rid;
    /*

    perform search for that id in db

    */
    var recipeReturn = {
        name: "foo",
        discription: "bar",
        ingrediants: "foo"
    };
    res.status(200);
    res.send(JSON.stringify(recipeReturn));
    res.end();
});
router.post('/del', function (req, res) {
    var recipeID = req.body.rid;
    /*
    code to delete recipe

    */
    res.send(JSON.stringify({ status: "successfully deleted" }));
    res.end();
});
router.post('/addgroceries', function (req, res) {
    var groceriesToAdd = req.body.grocerieItems;
    /*
    code to add these items to the current users groceries

    */
    res.status(200);
    res.send(JSON.stringify({ status: "successfully added" }));
    res.end();
});
router.post('/saverecipe', function (req, res) {
    var recipeID = req.body.rid;
    var category = req.body.category;
    /*
    code to delete recipe

    */
    res.send(JSON.stringify({ status: "successfully saved recipie to category" }));
    res.end();
});
router.post('/comments/add', function (req, res) {
    var rating = req.body.rating;
    var comment = req.body.comment;
    var rid = req.body.recipeID;
    /*
    code to add comment to the recipe
    */
    res.status(200);
    res.send(JSON.stringify({ status: "Comment Succesfully added" }));
    res.end();
});
router.post('comments/del', function (req, res) {
    var recipeID = req.body.recipeID;
    var commentID = req.body.commentID;
    /*
    code to delete comment

    */
    res.send(JSON.stringify({ status: "successfully deleted" }));
    res.end();
});
router.post('/comments/edit', function (req, res) {
    var rating = req.body.rating;
    var comment = req.body.comment;
    var rid = req.body.recipeID;
    /*
    code to edit comment to the recipe
    */
    res.status(200);
    res.send(JSON.stringify({ status: "Comment Succesfully edited" }));
    res.end();
});
router.get('/', function (req, res) {
    res.redirect('/recipe.html');
});
module.exports = router;
