const express = require('express');
const router = express.Router();
var faker = require('faker');


//code to handle the different posts

router.post('/add', (req, res) => {
    
    //this endpoint is going to be called with form data once the data has succesfully been written to a db just render a view
    
    res.render('index')

})


router.post('/read', (req, res) => {
    
    let recipeID : string = req.body.rid

    /*

    perform search for that id in db

    */ 

    let recipeReturn = {
        name : "foo",
        discription : "bar",
        ingrediants : "foo",
        //more to be added
    }


    res.status(200)

    res.send(JSON.stringify(recipeReturn))
    res.end()


})


router.post('/edit', (req, res) => {
    
    let recipeID : string = req.body.rid

    /*

    perform search for that id in db

    */ 

    let recipeReturn = {
        name : "foo",
        discription : "bar",
        ingrediants : "foo",
        //more to be added
    }


    res.status(200)

    res.send(JSON.stringify(recipeReturn))
    res.end()


})

router.post('/del', (req, res) => {
    
    let recipeID : string = req.body.rid
    

    /*
    code to delete recipe 

    */
   
    res.send(JSON.stringify({status : "successfully deleted"}))
    res.end()

})

router.post('/addgroceries', (req, res) => {
    
    let groceriesToAdd : Array<string> = req.body.grocerieItems

    /*
    code to add these items to the current users groceries

    */
    res.status(200)
    res.send(JSON.stringify({status : "successfully added"}))
    res.end()

})

router.post('/saverecipe', (req, res) => {
    
    let recipeID : string = req.body.rid
    let category : string = req.body.category

    

    /*
    code to delete recipe 

    */
   
    res.send(JSON.stringify({status : "successfully saved recipie to category"}))
    res.end()

})

router.post('/comments/add', (req, res) => {

    
    let rating : string = req.body.rating
    let comment : string = req.body.comment
    let rid : string = req.body.recipeID
    
    /*
    code to add comment to the recipe
    */


   res.status(200)

   res.send(JSON.stringify({status : "Comment Succesfully added"}))
   res.end()
})


router.post('comments/del', (req, res) => {
    
    let recipeID : string = req.body.recipeID
    let commentID : string = req.body.commentID

    

    /*
    code to delete comment

    */
   
    res.send(JSON.stringify({status : "successfully deleted"}))
    res.end()

})

router.post('/comments/edit', (req, res) => {

    
    let rating : string = req.body.rating
    let comment : string = req.body.comment
    let rid : string = req.body.recipeID
    
    /*
    code to edit comment to the recipe
    */


   res.status(200)

   res.send(JSON.stringify({status : "Comment Succesfully edited"}))
   res.end()
})


router.get('/', (req, res) => {
    res.redirect('/recipe.html')
})




module.exports = router;