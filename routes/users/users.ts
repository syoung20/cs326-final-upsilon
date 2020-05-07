const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const faker = require('faker');
const fetch_mod = require('node-fetch')
const database = require('../../database')
router.use(bodyParser.json({ extended: true }));

//code to handle the different posts
router.post('/read', (req, res) => {
    let userId : String = req.body.userId;
    let name : string;
    const getName = database.getUserData(userId).then(function(res) {
        name = res;
    });
    let recipeCategories : Array<object> = [];
    let getRecipebookData = database.getRecipebookData(userId).then(function(res) {
        console.log(res); 
        for (let i : number = 0; i < res.length; i++) {
            let categoryData : Array<string> = res[i]["row"].split(',');
            var imgstr : string;
            if (categoryData.length > 3) {
                imgstr = categoryData[2] + "," + categoryData[3].slice(0, categoryData[3].length-1);
            } else {
                imgstr = categoryData[2].slice(0, categoryData[2].length-1);
            }
            let category : {id : string, title: string, img: string} = {
            'id' : categoryData[0].slice(1),
            'title' : categoryData[1].replace(/\"/g, ''),
            'img' : imgstr
            };
            recipeCategories.push(category);
        }
    });
    let status : number = 200;
    Promise.all([getName, getRecipebookData]).then(function() {
        console.log("name returned: " + name);
        console.log("recipe categories returned: " + JSON.stringify(recipeCategories));
        console.log("first value in returned list: " + JSON.stringify(recipeCategories[0]));
        res.write(JSON.stringify({'userId' : userId, 'name' : name, 'recipeCategories' : recipeCategories, 'status' : status}));
        res.end();
    });
});

router.post('/pantry/read', (req, res) => {
    let userId : String = req.body.userId;
    let pantryCats = {}
    let getPantry : object = database.getPantryData(userId).then(function(result) {
        console.log("pantry result: " + JSON.stringify(result));
        for (let i : number = 0; i < result.length; i++) {
            let categoryData : Array<string> = result[i]["row"].split(',');
            let id : string = categoryData[0].slice(1);
            if (pantryCats[id]) {
                console.log("pantry cats id exists : " + JSON.stringify(pantryCats[id]));
                pantryCats[id]["items"].push(categoryData[2].slice(0, categoryData[2].length - 1).replace(/\"/g, ''))
            } else {
                pantryCats[id] = {
                    title : categoryData[1].replace(/\"/g, ''),
                    items : [categoryData[2].slice(0, categoryData[2].length - 1).replace(/\"/g, '')]
                };
                console.log("pantrycats id: " + JSON.stringify(pantryCats[id]));
            }
        }
        console.log("pantrycats : " + JSON.stringify(pantryCats));
        res.write(JSON.stringify(pantryCats));
        res.end();
    })
});

router.post('/pantry/cat/add', (req, res) => {
    let userId : String = req.body.userId;
    let cat : String = req.body.category;
    let catId : string;
    let addCat : object = database.addPantryCategory(userId, cat).then(function(result) {
        console.log("add cat response: " + JSON.stringify(result));
        catId = result["pantry_category_id"];
        res.write(JSON.stringify({'userId' : userId, 'categoryId' : catId, 'category' : cat}));
        res.end();  
    })
});

router.post('/pantry/cat/del', (req, res) => {
    let userId : String = req.body.userId;
    let catId : number = req.body.categoryId;
    database.deletePantryCategory(catId);
    res.write(JSON.stringify({'userId' : userId, 'categoryId' : catId}));
    res.end();
});

router.post('/pantry/cat/edit', (req, res) => {
    let userId : String = req.body.userId;
    let catId : number = req.body.categoryId;
    let title : String = req.body.title;
    let ingredients : Array<String> = req.body.ingredients;
    console.log(ingredients);
    database.updatePantryTitle(catId, title);
    database.deletePantryItems(catId);
    database.addPantryItems(catId, ingredients);
    res.write(JSON.stringify({'userId' : userId, 'categoryId' : catId, 'title' : title, 'ingredients': ingredients}));
    res.end();
});

router.post('/grocery/read', (req, res) => {
    let userId : String = req.body.userId;
    let groceryCats = {}
    let getGrocery : object = database.getGroceryData(userId).then(function(result) {
        console.log("grocery result: " + JSON.stringify(result));
        for (let i : number = 0; i < result.length; i++) {
            let categoryData : Array<string> = result[i]["row"].split(',');
            let id : string = categoryData[0].slice(1);
            if (groceryCats[id]) {
                console.log("grocery cats id exists : " + JSON.stringify(groceryCats[id]));
                groceryCats[id]["items"].push(categoryData[2].slice(0, categoryData[2].length - 1).replace(/\"/g, ''));
            } else {
                groceryCats[id] = {
                    title : categoryData[1].replace(/\"/g, ''),
                    items : [categoryData[2].slice(0, categoryData[2].length - 1).replace(/\"/g, '')]
                };
                console.log("grocerycats id: " + JSON.stringify(groceryCats[id]));
            }
        }
        console.log("grocerycats : " + JSON.stringify(groceryCats));
        res.write(JSON.stringify(groceryCats));
        res.end();
    })
});

router.post('/grocery/cat/add', (req, res) => {
    let userId : String = req.body.userId;
    let cat : String = req.body.category;
    let catId : string;
    let addCat : object = database.addGroceryCategory(userId, cat).then(function(result) {
        console.log("add cat response: " + JSON.stringify(result));
        catId = result["grocerylist_category_id"];
        res.write(JSON.stringify({'userId' : userId, 'categoryId' : catId, 'category' : cat}));
        res.end();  
    })
});

router.post('/grocery/cat/del', (req, res) => {
    let userId : String = req.body.userId;
    let catId : number = req.body.categoryId;
    database.deleteGroceryCategory(catId);
    res.write(JSON.stringify({'userId' : userId, 'categoryId' : catId}));
    res.end();
});

router.post('/grocery/cat/edit', (req, res) => {
    let userId : String = req.body.userId;
    let catId : number = req.body.categoryId;
    let title : String = req.body.title;
    let ingredients : Array<String> = req.body.ingredients;
    console.log(ingredients);
    database.updateGroceryTitle(catId, title);
    database.deleteGroceryItems(catId);
    database.addGroceryItems(catId, ingredients);
    res.write(JSON.stringify({'userId' : userId, 'categoryId' : catId, 'title' : title, 'ingredients': ingredients}));
    res.end();
});

router.post('/recipebook/read', (req, res) => {
    let userId : String = req.body.userId;
    let recipeCategories : Array<object> = [];
    let getRecipebookData = database.getRecipebookData(userId).then(function(res) {
        console.log(res); 
        for (let i : number = 0; i < res.length; i++) {
            let categoryData : Array<string> = res[i]["row"].split(',');
            let category : {id : string, title: string, img: string} = {
            'id' : categoryData[0].slice(1),
            'title' : categoryData[1].replace(/\"/g, ''),
            'img' : categoryData[2].slice(0, categoryData[2].length -1)
            };
            recipeCategories.push(category);
        }
    });
    Promise.all([getRecipebookData]).then(function() {
        console.log("recipe categories returned: " + JSON.stringify(recipeCategories));
        console.log("first value in returned list: " + JSON.stringify(recipeCategories[0]));
        res.write(JSON.stringify({'recipeCategories' : recipeCategories}));
        res.end();
    });
});

router.post('/recipebook/cat/add', (req, res) => {
    let userId : String = req.body.userId;
    let cat : number = req.body.category;
    let catId : number;
    let addRecipebookCategory : string = database.addRecipebookCategory(userId, cat).then(function(res) {
        console.log(JSON.stringify(res));
        catId = res["recipebook_category_id"];
    });
    Promise.all([addRecipebookCategory]).then(function() {
        res.write(JSON.stringify({'userId' : userId, 'categoryId' : catId, 'category' : cat}));
        res.end();
    });
});

router.post('/recipebook/cat/del', (req, res) => {
    let userId : String = req.body.userId;
    let catId : number = req.body.categoryId;
    let deleteCategory = database.deleteRecipebookCategory(userId, catId).then(function() {
        res.write(JSON.stringify({}));
        res.end();
    })
});

router.post('/recipebook/cat/read', (req, res) => {
    let userId : string = req.body.userId;
    let catId : number = req.body.categoryId;
    let title : string;
    let recipes : Array<object> = [];
    let getCategoryData : Array<object> = database.getRecipebookCategoryData(userId, catId).then(function(res) {
        console.log(res);
        title = res[0]["category"];
        for (let i : number = 1; i < res.length; i++) {
            let recipeData : Array<string> = res[i]["row"].split(',');
            console.log(recipeData[2]);
            var imgstr : string;
            if (recipeData.length > 3) {
                imgstr = recipeData[2] + "," + recipeData[3].slice(0, recipeData[3].length-1);
            } else {
                imgstr = recipeData[2].slice(0, recipeData[2].length-1);
            }
            let recipe : {recipeId : string, recipeTitle : string, recipeImg : string} = {
                recipeId : recipeData[0].slice(1),
                recipeTitle : recipeData[1].replace(/\"/g, ''),
                recipeImg : imgstr
            };
            recipes.push(recipe);
           
        }
    });
    Promise.all([getCategoryData]).then(function() {
        console.log("title returned: " + title);
        console.log("recipes returned: " + JSON.stringify(recipes));
        res.write(JSON.stringify({'userId' : userId, 'categoryId' : catId, 'title' : title, 'recipes' : recipes}))
        res.end();
    });
});

router.post('/recipebook/cat/edit', (req, res) => {
    let userId : String = req.body.userId;
    let catId : number = req.body.categoryId;
    let recipeId : number = req.body.recipeId;
    let removeRecipe : Array<object> = database.removeCategoryRecipe(userId, catId, recipeId).then(function(result) {
        console.log(JSON.stringify(result));
        res.write(JSON.stringify({'userId' : userId, 'categoryId' : catId, 'recipeId' : recipeId}));
        res.end();
    });
});

module.exports = router;