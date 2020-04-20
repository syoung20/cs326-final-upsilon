const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const faker = require('faker');

router.use(bodyParser.urlencoded({ extended: true }));

//code to handle the different posts
router.post('/read', (req, res) => {
    let userId : String = req.body.userId;
    let cat : number = faker.random.number(10);
    let name : String = faker.name.firstName();
    let recipeCategories = [];
    for (var i : number = 0; i < cat; i++) {
        recipeCategories.push({
            id : faker.random.number(20),
            title : faker.random.word() + " " + faker.random.word(),
            img : faker.image.imageUrl()
        });
    }
    let status : number = 200;
    res.write(JSON.stringify({'userId' : userId, 'name' : name, 'recipeCateogries' : recipeCategories, 'status' : status}));
    res.end();
})
router.post('/pantry/read', (req, res) => {
    let userId : String = req.body.userId;
    let cat : number = faker.random.number(10);
    let status : number = 200;
    let pantryCats = [];
    for (var i : number = 0; i < cat; i++) {
        let item : number = faker.random.number(10);
        let category: {id : number, title : String, items : Array<String>} = {
            id : faker.random.number(),
            title : faker.random.word(),
            items : []
        }
        for (var j : number = 0; j < item; j++) {
            category.items.push(faker.random.word());
        }
        pantryCats.push(category);
    }
    res.write(JSON.stringify({'userId' : userId, 'categories' : pantryCats, 'status' : status}));
    res.end();
})
router.post('/pantry/cat/add', (req, res) => {
    let userId : String = req.body.userId;
    let cat : String = req.body.category;
    let catId : number = faker.random.number(20);
    let status : number = 200;
    res.write(JSON.stringify({'userId' : userId, 'categoryId' : catId, 'category' : cat, 'status' : status}));
    res.end();  
})
router.post('/pantry/cat/del', (req, res) => {
    let userId : String = req.body.userId;
    let catId : number = req.body.categoryId;
    let status : number = 200;
    res.write(JSON.stringify({'userId' : userId, 'categoryId' : catId, 'status': status}));
    res.end();
})
router.post('/pantry/cat/edit', (req, res) => {
    let userId : String = req.body.userId;
    let catId : number = req.body.categoryId;
    let title : String = req.body.title;
    let ingredients : Array<String> = req.body.ingredients;
    res.write(JSON.stringify({'userId' : userId, 'categoryId' : catId, 'title' : title, 'ingredeints': ingredients, 'status' : 200}));
    res.end();
})
router.post('/grocery/read', (req, res) => {
    let userId : String = req.body.userId;
    let cat : number = faker.random.number(10);
    let status : number = 200;
    let groceryCats = [];
    for (var i : number = 0; i < cat; i++) {
        let item : number = faker.random.number(10);
        let category: {id : number, title : String, items : Array<String>} = {
            id : faker.random.number(),
            title : faker.random.word(),
            items : []
        }
        for (var j : number = 0; j < item; j++) {
            category.items.push(faker.random.word());
        }
        groceryCats.push(category);
    }
    res.write(JSON.stringify({'userId' : userId, 'categories' : groceryCats, 'status' : status}));
    res.end();
})
router.post('/grocery/cat/add', (req, res) => {
    let userId : String = req.body.userId;
    let cat : String = req.body.category;
    let catId : number = faker.random.number(20);
    let status : number = 200;
    res.write(JSON.stringify({'userId' : userId, 'categoryId' : catId, 'category' : cat, 'status' : status}));
    res.end(); 
})
router.post('/grocery/cat/del', (req, res) => {
    let userId : String = req.body.userId;
    let catId : number = req.body.categoryId;
    let status : number = 200;
    res.write(JSON.stringify({'userId' : userId, 'categoryId' : catId, 'status': status}));
    res.end();
})
router.post('/grocery/cat/edit', (req, res) => {
    let userId : String = req.body.userId;
    let catId : number = req.body.categoryId;
    let title : String = req.body.title;
    let ingredients : Array<String> = req.body.ingredients;
    res.write(JSON.stringify({'userId' : userId, 'categoryId' : catId, 'title' : title, 'ingredeints': ingredients, 'status' : 200}));
    res.end();
})
router.post('/recipebook/read', (req, res) => {
    let userId : String = req.body.userId;
    let cat : number = faker.random.number(10);
    let status : number = 200;
    let recipeCategories = [];
    for (var i : number = 0; i < cat; i++) {
        recipeCategories.push({
            id : faker.random.number(20),
            title : faker.random.word() + " " + faker.random.word(),
            img : faker.image.imageUrl()
        });
    }
    res.write(JSON.stringify({'userId' : userId, 'categories' : recipeCategories, 'status' : status}))
    res.end();
});
router.post('/recipebook/cat/add', (req, res) => {
    let userId : String = req.body.userId;
    let cat : number = req.body.category;
    let catId : number = faker.random.number(20);
    let status : number = 200;
    res.write(JSON.stringify({'userId' : userId, 'categoryId' : catId, 'category' : cat, 'status' : status}));
    res.end();
})
router.post('/recipebook/cat/del', (req, res) => {
    let userId : String = req.body.userId;
    let catId : number = req.body.categoryId;
    let status : number = 200;
    res.write(JSON.stringify({'userId' : userId, 'categoryId' : catId, 'status': status}));
    res.end();
})
router.post('/recipebook/cat/read', (req, res) => {
    let userId : String = req.body.userId;
    let catId : number = req.body.categoryId;
    let title : String = faker.random.word();
    let recipes : Array<object> = [];
    let num : number = faker.random.number(10);
    for (var i = 0; i < num; i++) {
        let recipe : {recipeId : number, recipeTitle : String, recipeImg : String} = {
            recipeId : faker.random.number(),
            recipeTitle : faker.random.word(),
            recipeImg : faker.image.imageUrl()
        }
        recipes.push(recipe);
    }
    let status : number = 200;
    res.write(JSON.stringify({'userId' : userId, 'categoryId' : catId, 'title' : title, 'recipes' : recipes, 'status' : status}))
    res.end();
})
router.post('/recipebook/cat/edit', (req, res) => {
    let userId : String = req.body.userId;
    let catId : number = req.body.categoryId;
    let recipeId : number = req.body.recipeId;
    let status : number = 200;
    res.write(JSON.stringify({'userId' : userId, 'categoryId' : catId, 'recipeId' : recipeId, 'status' : status}));
    res.end();
})
module.exports = router;