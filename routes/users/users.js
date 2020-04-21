var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var faker = require('faker');
router.use(bodyParser.urlencoded({ extended: true }));
//code to handle the different posts
router.post('/read', function (req, res) {
    var userId = req.body.userId;
    var cat = faker.random.number(10);
    var name = faker.name.firstName();
    var recipeCategories = [];
    for (var i = 0; i < cat; i++) {
        recipeCategories.push({
            id: faker.random.number(20),
            title: faker.random.word() + " " + faker.random.word(),
            img: faker.image.imageUrl()
        });
    }
    var status = 200;
    res.write(JSON.stringify({ 'userId': userId, 'name': name, 'recipeCateogries': recipeCategories, 'status': status }));
    res.end();
});
router.post('/pantry/read', function (req, res) {
    var userId = req.body.userId;
    var cat = faker.random.number(10);
    var status = 200;
    var pantryCats = [];
    for (var i = 0; i < cat; i++) {
        var item = faker.random.number(10);
        var category = {
            id: faker.random.number(),
            title: faker.random.word(),
            items: []
        };
        for (var j = 0; j < item; j++) {
            category.items.push(faker.random.word());
        }
        pantryCats.push(category);
    }
    res.write(JSON.stringify({ 'userId': userId, 'categories': pantryCats, 'status': status }));
    res.end();
});
router.post('/pantry/cat/add', function (req, res) {
    var userId = req.body.userId;
    var cat = req.body.category;
    var catId = faker.random.number(20);
    var status = 200;
    res.write(JSON.stringify({ 'userId': userId, 'categoryId': catId, 'category': cat, 'status': status }));
    res.end();
});
router.post('/pantry/cat/del', function (req, res) {
    var userId = req.body.userId;
    var catId = req.body.categoryId;
    var status = 200;
    res.write(JSON.stringify({ 'userId': userId, 'categoryId': catId, 'status': status }));
    res.end();
});
router.post('/pantry/cat/edit', function (req, res) {
    var userId = req.body.userId;
    var catId = req.body.categoryId;
    var title = req.body.title;
    var ingredients = req.body.ingredients;
    res.write(JSON.stringify({ 'userId': userId, 'categoryId': catId, 'title': title, 'ingredeints': ingredients, 'status': 200 }));
    res.end();
});
router.post('/grocery/read', function (req, res) {
    var userId = req.body.userId;
    var cat = faker.random.number(10);
    var status = 200;
    var groceryCats = [];
    for (var i = 0; i < cat; i++) {
        var item = faker.random.number(10);
        var category = {
            id: faker.random.number(),
            title: faker.random.word(),
            items: []
        };
        for (var j = 0; j < item; j++) {
            category.items.push(faker.random.word());
        }
        groceryCats.push(category);
    }
    res.write(JSON.stringify({ 'userId': userId, 'categories': groceryCats, 'status': status }));
    res.end();
});
router.post('/grocery/cat/add', function (req, res) {
    var userId = req.body.userId;
    var cat = req.body.category;
    var catId = faker.random.number(20);
    var status = 200;
    res.write(JSON.stringify({ 'userId': userId, 'categoryId': catId, 'category': cat, 'status': status }));
    res.end();
});
router.post('/grocery/cat/del', function (req, res) {
    var userId = req.body.userId;
    var catId = req.body.categoryId;
    var status = 200;
    res.write(JSON.stringify({ 'userId': userId, 'categoryId': catId, 'status': status }));
    res.end();
});
router.post('/grocery/cat/edit', function (req, res) {
    var userId = req.body.userId;
    var catId = req.body.categoryId;
    var title = req.body.title;
    var ingredients = req.body.ingredients;
    res.write(JSON.stringify({ 'userId': userId, 'categoryId': catId, 'title': title, 'ingredeints': ingredients, 'status': 200 }));
    res.end();
});
router.post('/recipebook/read', function (req, res) {
    var userId = req.body.userId;
    var cat = faker.random.number(10);
    var status = 200;
    var recipeCategories = [];
    for (var i = 0; i < cat; i++) {
        recipeCategories.push({
            id: faker.random.number(20),
            title: faker.random.word() + " " + faker.random.word(),
            img: faker.image.imageUrl()
        });
    }
    res.write(JSON.stringify({ 'userId': userId, 'categories': recipeCategories, 'status': status }));
    res.end();
});
router.post('/recipebook/cat/add', function (req, res) {
    var userId = req.body.userId;
    var cat = req.body.category;
    var catId = faker.random.number(20);
    var status = 200;
    res.write(JSON.stringify({ 'userId': userId, 'categoryId': catId, 'category': cat, 'status': status }));
    res.end();
});
router.post('/recipebook/cat/del', function (req, res) {
    var userId = req.body.userId;
    var catId = req.body.categoryId;
    var status = 200;
    res.write(JSON.stringify({ 'userId': userId, 'categoryId': catId, 'status': status }));
    res.end();
});
router.post('/recipebook/cat/read', function (req, res) {
    var userId = req.body.userId;
    var catId = req.body.categoryId;
    var title = faker.random.word();
    var recipes = [];
    var num = faker.random.number(10);
    for (var i = 0; i < num; i++) {
        var recipe = {
            recipeId: faker.random.number(),
            recipeTitle: faker.random.word(),
            recipeImg: faker.image.imageUrl()
        };
        recipes.push(recipe);
    }
    var status = 200;
    res.write(JSON.stringify({ 'userId': userId, 'categoryId': catId, 'title': title, 'recipes': recipes, 'status': status }));
    res.end();
});
router.post('/recipebook/cat/edit', function (req, res) {
    var userId = req.body.userId;
    var catId = req.body.categoryId;
    var recipeId = req.body.recipeId;
    var status = 200;
    res.write(JSON.stringify({ 'userId': userId, 'categoryId': catId, 'recipeId': recipeId, 'status': status }));
    res.end();
});
module.exports = router;
