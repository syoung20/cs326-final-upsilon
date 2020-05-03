const express = require('express');
const router = express.Router();
var faker = require('faker');


//code to handle the different posts

router.post('/add', (req, res) => {

    //this endpoint is going to be called with form data once the data has succesfully been written to a db just render a view
    //console.log(req.body)

    let responseObj = {
        "recipe.name": req.body['recipe.title'],
        "recipe.discription": req.body["recipe.discription"],
        "recipe.category": req.body["recipe.category"],
        "ingrediant": req.body["ingrediant"],
        "instruction": req.body["instruction"],
        "cook.time": req.body["cook.time"],
        "cook.unit": req.body["cook.unit"], // 1 - hours 2 - minutes 
        "prep.time": req.body["prep.time"],
        "prep.unit": req.body['prep.unit'],
        "image" : req.body['imageB64']

        // "image" : req.body['image']


    }
    console.log(responseObj)

    res.redirect('http://localhost:5657')

})


router.post('/read', (req, res) => {

    //let recipeID : string = req.body.rid

    /*

    perform search for that id in db

    */

    var recipeName = 'Blackberry Lavender Cake with Chocolate Bttercream';
    var recipeAuthor = 'Half-Baked Harvest';
    var recDescription = 'This Balckberry Lavender Cake is the perfect recipe for those looking to cook a delicious dessert for a special family meal. It takes little time to prep and great for those berry lovers in the family.';
    var recIngredients = ["1 cup canola oil", "1/2 cup plain greek yogurt", "3 large eggs", "2 cups granulated sugar", "1 tablespoon vanilla extract", "1 1/2 cups buttermilk", "3 3/4 cups all purpose flour", "1 teaspoon baking soda", "1 teaspoon baking powder", "1 teaspoon kosher salt", "6 cups blackberries", "1/2 cup honey", "1 tablespoon lemon juice", "1-2 teaspoons dried lavender", "3 sticks salted butter, at room temperature", "1 1/2 cups powdered sugar", "8 ounces white chocolate, melted and cooled"];
    var recInstructions = ["Preheat oven to 350 degrees F. Grease 2 (8-inch) round cake pans. Line with parchment paper, then butter/spray with cooking spray.", "In the bowl of a stand mixer (or use a hand-held mixer) beat together the canola oil, yogurt, eggs, sugar, vanilla, and buttermilk. Add the flour, baking soda, baking powder, and salt and mix until just combined.", "Pour the batter among the cake pans and bake 30-35 minutes, until the tops are just set and no longer wiggly in the center. Remove and let cool five minutes, then run a knife around the edges of the pan and turn the cakes out onto a cooling rack. Cover and let the cakes cool completely before assembling.", "To make the jam. Add the blackberries, honey, lemon juice, and lavender to a medium size pot set over high heat. Bring the mixture to a boil, once boiling use a potato masher or fork to break down and mash the berries. Continue to cook for 5-8 minutes or until the jam has reduced and thickened by 1/3. Remove from the heat and let cool. Should thicken as it cools.", "To make the buttercream. Add the butter and powdered sugar to the bowl of a stand mixer. Beat the butter and powdered sugar together until the butter is light and fluffy. Add the melted white chocolate and beat until combined.", "To assemble. Using a large serrated knife, carefully cut each cake in half horizontally. Place one cake layer on a serving plate. Spread 1/4 of the buttercream over the cake and layer with about 1/4 cup of jam. Repeat with the remaining 3 cake layers. Be careful not to over fill your layers or the cake will be hard to slice. Lightly frost the outside of the cake. Chill 30 minutes. Serve or store in the fridge for up to 3 days."]
    var recPreptime = 20;
    var recCooktime = 40;
    var recServings = 4;

   
   let resObj = {
    title: recipeName,
    author : recipeAuthor,
    description: recDescription,
    ingredients: recIngredients,
    instructions: recInstructions,
    preptime: recPreptime,
    cooktime: recCooktime,
    //totaltime: totaltime,
    servings: recServings
}
    res.send(JSON.stringify(resObj));
    res.end()

<<<<<<< HEAD





=======
    var recipeName = 'Blackberry Lavender Cake with Chocolate Bttercream';
    var recipeAuthor = 'Half-Baked Harvest';
    var recDescription = 'This Balckberry Lavender Cake is the perfect recipe for those looking to cook a delicious dessert for a special family meal. It takes little time to prep and great for those berry lovers in the family.';
    var recIngredients = ["1 cup canola oil", "1/2 cup plain greek yogurt", "3 large eggs", "2 cups granulated sugar", "1 tablespoon vanilla extract", "1 1/2 cups buttermilk", "3 3/4 cups all purpose flour", "1 teaspoon baking soda", "1 teaspoon baking powder", "1 teaspoon kosher salt", "6 cups blackberries", "1/2 cup honey", "1 tablespoon lemon juice", "1-2 teaspoons dried lavender", "3 sticks salted butter, at room temperature", "1 1/2 cups powdered sugar", "8 ounces white chocolate, melted and cooled"];
    var recInstructions = ["Preheat oven to 350 degrees F. Grease 2 (8-inch) round cake pans. Line with parchment paper, then butter/spray with cooking spray.", "In the bowl of a stand mixer (or use a hand-held mixer) beat together the canola oil, yogurt, eggs, sugar, vanilla, and buttermilk. Add the flour, baking soda, baking powder, and salt and mix until just combined.", "Pour the batter among the cake pans and bake 30-35 minutes, until the tops are just set and no longer wiggly in the center. Remove and let cool five minutes, then run a knife around the edges of the pan and turn the cakes out onto a cooling rack. Cover and let the cakes cool completely before assembling.", "To make the jam. Add the blackberries, honey, lemon juice, and lavender to a medium size pot set over high heat. Bring the mixture to a boil, once boiling use a potato masher or fork to break down and mash the berries. Continue to cook for 5-8 minutes or until the jam has reduced and thickened by 1/3. Remove from the heat and let cool. Should thicken as it cools.", "To make the buttercream. Add the butter and powdered sugar to the bowl of a stand mixer. Beat the butter and powdered sugar together until the butter is light and fluffy. Add the melted white chocolate and beat until combined.", "To assemble. Using a large serrated knife, carefully cut each cake in half horizontally. Place one cake layer on a serving plate. Spread 1/4 of the buttercream over the cake and layer with about 1/4 cup of jam. Repeat with the remaining 3 cake layers. Be careful not to over fill your layers or the cake will be hard to slice. Lightly frost the outside of the cake. Chill 30 minutes. Serve or store in the fridge for up to 3 days."]
    var recPreptime = 20;
    var recCooktime = 40;
    var recServings = 4;
    
    let resObj = {
        title: recipeName,
        author : recipeAuthor,
        description: recDescription,
        ingredients: recIngredients,
        instructions: recInstructions,
        preptime: recPreptime,
        cooktime: recCooktime,
        servings: recServings
    }
    res.send(JSON.stringify(resObj));
    res.end()
>>>>>>> 81c5deb98f969eadddcd636f5e528e3f9aa7efca
})


router.post('/edit', (req, res) => {

    let recipeID: string = req.body.rid

    /*

    perform search for that id in db

    */

    let recipeReturn = {
        name: "foo",
        discription: "bar",
        ingrediants: "foo",
        //more to be added
    }


    res.status(200)

    res.send(JSON.stringify(recipeReturn))
    res.end()


})

router.post('/del', (req, res) => {

    let recipeID: string = req.body.rid


    /*
    code to delete recipe 

    */

    res.send(JSON.stringify({ status: "successfully deleted" }))
    res.end()

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

    let recipeID: string = req.body.rid
    let category: string = req.body.category



    /*
    code to delete recipe 

    */

    res.send(JSON.stringify({ status: "successfully saved recipie to category" }))
    res.end()

})

router.post('/comments/add', (req, res) => {


    let rating: string = req.body.rating
    let comment: string = req.body.comment
    let rid: string = req.body.recipeID

    /*
    code to add comment to the recipe
    */


    res.status(200)

    res.send(JSON.stringify({ status: "Comment Succesfully added" }))
    res.end()
})


router.post('comments/del', (req, res) => {

    let recipeID: string = req.body.recipeID
    let commentID: string = req.body.commentID



    /*
    code to delete comment

    */

    res.send(JSON.stringify({ status: "successfully deleted" }))
    res.end()

})

router.post('/comments/edit', (req, res) => {


    let rating: string = req.body.rating
    let comment: string = req.body.comment
    let rid: string = req.body.recipeID

    /*
    code to edit comment to the recipe
    */


    res.status(200)

    res.send(JSON.stringify({ status: "Comment Succesfully edited" }))
    res.end()
})


router.get('/', (req, res) => {
    res.redirect('/recipe.html')
})




module.exports = router;