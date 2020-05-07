var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var faker = require('faker');
var fetch_mod = require('node-fetch');
var database = require('../../database');
router.use(bodyParser.json({ extended: true }));
//code to handle the different posts
router.post('/read', function (req, res) {
    var userId = req.body.userId;
    var name;
    var getName = database.getUserData(userId).then(function (res) {
        name = res;
    });
    var recipeCategories = [];
    var getRecipebookData = database.getRecipebookData(userId).then(function (res) {
        console.log(res);
        for (var i = 0; i < res.length; i++) {
            var categoryData = res[i]["row"].split(',');
            var imgstr;
            if (categoryData.length > 3) {
                imgstr = categoryData[2] + "," + categoryData[3].slice(0, categoryData[3].length - 1);
            }
            else {
                imgstr = categoryData[2].slice(0, categoryData[2].length - 1);
            }
            var category = {
                'id': categoryData[0].slice(1),
                'title': categoryData[1].replace(/\"/g, ''),
                'img': imgstr
            };
            recipeCategories.push(category);
        }
    });
    var status = 200;
    Promise.all([getName, getRecipebookData]).then(function () {
        console.log("name returned: " + name);
        console.log("recipe categories returned: " + JSON.stringify(recipeCategories));
        console.log("first value in returned list: " + JSON.stringify(recipeCategories[0]));
        res.write(JSON.stringify({ 'userId': userId, 'name': name, 'recipeCategories': recipeCategories, 'status': status }));
        res.end();
    });
});
router.post('/pantry/read', function (req, res) {
    var userId = req.body.userId;
    var pantryCats = {};
    var getPantry = database.getPantryData(userId).then(function (result) {
        console.log("pantry result: " + JSON.stringify(result));
        for (var i = 0; i < result.length; i++) {
            var categoryData = result[i]["row"].split(',');
            var id = categoryData[0].slice(1);
            if (pantryCats[id]) {
                console.log("pantry cats id exists : " + JSON.stringify(pantryCats[id]));
                pantryCats[id]["items"].push(categoryData[2].slice(0, categoryData[2].length - 1).replace(/\"/g, ''));
            }
            else {
                pantryCats[id] = {
                    title: categoryData[1].replace(/\"/g, ''),
                    items: [categoryData[2].slice(0, categoryData[2].length - 1).replace(/\"/g, '')]
                };
                console.log("pantrycats id: " + JSON.stringify(pantryCats[id]));
            }
        }
        console.log("pantrycats : " + JSON.stringify(pantryCats));
        res.write(JSON.stringify(pantryCats));
        res.end();
    });
});
router.post('/pantry/cat/add', function (req, res) {
    var userId = req.body.userId;
    var cat = req.body.category;
    var catId;
    var addCat = database.addPantryCategory(userId, cat).then(function (result) {
        console.log("add cat response: " + JSON.stringify(result));
        catId = result["pantry_category_id"];
        res.write(JSON.stringify({ 'userId': userId, 'categoryId': catId, 'category': cat }));
        res.end();
    });
});
router.post('/pantry/cat/del', function (req, res) {
    var userId = req.body.userId;
    var catId = req.body.categoryId;
    database.deletePantryCategory(catId);
    res.write(JSON.stringify({ 'userId': userId, 'categoryId': catId }));
    res.end();
});
router.post('/pantry/cat/edit', function (req, res) {
    var userId = req.body.userId;
    var catId = req.body.categoryId;
    var title = req.body.title;
    var ingredients = req.body.ingredients;
    console.log(ingredients);
    database.updatePantryTitle(catId, title);
    database.deletePantryItems(catId);
    database.addPantryItems(catId, ingredients);
    res.write(JSON.stringify({ 'userId': userId, 'categoryId': catId, 'title': title, 'ingredients': ingredients }));
    res.end();
});
router.post('/grocery/read', function (req, res) {
    var userId = req.body.userId;
    var groceryCats = {};
    var getGrocery = database.getGroceryData(userId).then(function (result) {
        console.log("grocery result: " + JSON.stringify(result));
        for (var i = 0; i < result.length; i++) {
            var categoryData = result[i]["row"].split(',');
            var id = categoryData[0].slice(1);
            if (groceryCats[id]) {
                console.log("grocery cats id exists : " + JSON.stringify(groceryCats[id]));
                groceryCats[id]["items"].push(categoryData[2].slice(0, categoryData[2].length - 1).replace(/\"/g, ''));
            }
            else {
                groceryCats[id] = {
                    title: categoryData[1].replace(/\"/g, ''),
                    items: [categoryData[2].slice(0, categoryData[2].length - 1).replace(/\"/g, '')]
                };
                console.log("grocerycats id: " + JSON.stringify(groceryCats[id]));
            }
        }
        console.log("grocerycats : " + JSON.stringify(groceryCats));
        res.write(JSON.stringify(groceryCats));
        res.end();
    });
});
router.post('/grocery/cat/add', function (req, res) {
    var userId = req.body.userId;
    var cat = req.body.category;
    var catId;
    var addCat = database.addGroceryCategory(userId, cat).then(function (result) {
        console.log("add cat response: " + JSON.stringify(result));
        catId = result["grocerylist_category_id"];
        res.write(JSON.stringify({ 'userId': userId, 'categoryId': catId, 'category': cat }));
        res.end();
    });
});
router.post('/grocery/cat/del', function (req, res) {
    var userId = req.body.userId;
    var catId = req.body.categoryId;
    database.deleteGroceryCategory(catId);
    res.write(JSON.stringify({ 'userId': userId, 'categoryId': catId }));
    res.end();
});
router.post('/grocery/cat/edit', function (req, res) {
    var userId = req.body.userId;
    var catId = req.body.categoryId;
    var title = req.body.title;
    var ingredients = req.body.ingredients;
    console.log(ingredients);
    database.updateGroceryTitle(catId, title);
    database.deleteGroceryItems(catId);
    database.addGroceryItems(catId, ingredients);
    res.write(JSON.stringify({ 'userId': userId, 'categoryId': catId, 'title': title, 'ingredients': ingredients }));
    res.end();
});
router.post('/recipebook/read', function (req, res) {
    var userId = req.body.userId;
    var recipeCategories = [];
    var getRecipebookData = database.getRecipebookData(userId).then(function (res) {
        console.log(res);
        for (var i = 0; i < res.length; i++) {
            var categoryData = res[i]["row"].split(',');
            var category = {
                'id': categoryData[0].slice(1),
                'title': categoryData[1].replace(/\"/g, ''),
                'img': categoryData[2].slice(0, categoryData[2].length - 1)
            };
            recipeCategories.push(category);
        }
    });
    Promise.all([getRecipebookData]).then(function () {
        console.log("recipe categories returned: " + JSON.stringify(recipeCategories));
        console.log("first value in returned list: " + JSON.stringify(recipeCategories[0]));
        res.write(JSON.stringify({ 'recipeCategories': recipeCategories }));
        res.end();
    });
});
router.post('/recipebook/cat/add', function (req, res) {
    var userId = req.body.userId;
    var cat = req.body.category;
    var catId;
    var addRecipebookCategory = database.addRecipebookCategory(userId, cat).then(function (res) {
        console.log(JSON.stringify(res));
        catId = res["recipebook_category_id"];
    });
    Promise.all([addRecipebookCategory]).then(function () {
        res.write(JSON.stringify({ 'userId': userId, 'categoryId': catId, 'category': cat }));
        res.end();
    });
});
router.post('/recipebook/cat/del', function (req, res) {
    var userId = req.body.userId;
    var catId = req.body.categoryId;
    var deleteCategory = database.deleteRecipebookCategory(userId, catId).then(function () {
        res.write(JSON.stringify({}));
        res.end();
    });
});
router.post('/recipebook/cat/read', function (req, res) {
    var userId = req.body.userId;
    var catId = req.body.categoryId;
    var title;
    var recipes = [];
    var getCategoryData = database.getRecipebookCategoryData(userId, catId).then(function (res) {
        console.log(res);
        title = res[0]["category"];
        for (var i = 1; i < res.length; i++) {
            var recipeData = res[i]["row"].split(',');
            console.log(recipeData[2]);
            var imgstr;
            if (recipeData.length > 3) {
                imgstr = recipeData[2] + "," + recipeData[3].slice(0, recipeData[3].length - 1);
            }
            else {
                imgstr = recipeData[2].slice(0, recipeData[2].length - 1);
            }
            var recipe = {
                recipeId: recipeData[0].slice(1),
                recipeTitle: recipeData[1].replace(/\"/g, ''),
                recipeImg: imgstr
            };
            recipes.push(recipe);
        }
    });
    Promise.all([getCategoryData]).then(function () {
        console.log("title returned: " + title);
        console.log("recipes returned: " + JSON.stringify(recipes));
        res.write(JSON.stringify({ 'userId': userId, 'categoryId': catId, 'title': title, 'recipes': recipes }));
        res.end();
    });
});
router.post('/recipebook/cat/edit', function (req, res) {
    var userId = req.body.userId;
    var catId = req.body.categoryId;
    var recipeId = req.body.recipeId;
    var removeRecipe = database.removeCategoryRecipe(userId, catId, recipeId).then(function (result) {
        console.log(JSON.stringify(result));
        res.write(JSON.stringify({ 'userId': userId, 'categoryId': catId, 'recipeId': recipeId }));
        res.end();
    });
});
module.exports = router;
