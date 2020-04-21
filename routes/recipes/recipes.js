var express = require('express');
var router = express.Router();
var faker = require('faker');
//code to handle the different posts
router.post('/add', function (req, res) {
    //this endpoint is going to be called with form data once the data has succesfully been written to a db just render a view
    res.render('index');
});
router.post('/read', function (req, res) {
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
