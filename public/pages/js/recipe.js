
//dummy button for population
var recover = document.getElementById("myBtn");

//dummy recipe JSON
var recipeName = 'Blackberry Lavender Cake with Chocolate Bttercream';
var recipeAuthor = 'Half-Baked Harvest';
var recDescription = 'This Balckberry Lavender Cake is the perfect recipe for those looking to cook a delicious dessert for a special family meal. It takes little time to prep and great for those berry lovers in the family.';
var recIngredients = ["1 cup canola oil", "1/2 cup plain greek yogurt", "3 large eggs", "2 cups granulated sugar", "1 tablespoon vanilla extract", "1 1/2 cups buttermilk", "3 3/4 cups all purpose flour", "1 teaspoon baking soda", "1 teaspoon baking powder", "1 teaspoon kosher salt", "6 cups blackberries", "1/2 cup honey", "1 tablespoon lemon juice", "1-2 teaspoons dried lavender", "3 sticks salted butter, at room temperature", "1 1/2 cups powdered sugar", "8 ounces white chocolate, melted and cooled"];
var recInstructions = ["Preheat oven to 350 degrees F. Grease 2 (8-inch) round cake pans. Line with parchment paper, then butter/spray with cooking spray.", "In the bowl of a stand mixer (or use a hand-held mixer) beat together the canola oil, yogurt, eggs, sugar, vanilla, and buttermilk. Add the flour, baking soda, baking powder, and salt and mix until just combined.", "Pour the batter among the cake pans and bake 30-35 minutes, until the tops are just set and no longer wiggly in the center. Remove and let cool five minutes, then run a knife around the edges of the pan and turn the cakes out onto a cooling rack. Cover and let the cakes cool completely before assembling.", "To make the jam. Add the blackberries, honey, lemon juice, and lavender to a medium size pot set over high heat. Bring the mixture to a boil, once boiling use a potato masher or fork to break down and mash the berries. Continue to cook for 5-8 minutes or until the jam has reduced and thickened by 1/3. Remove from the heat and let cool. Should thicken as it cools.", "To make the buttercream. Add the butter and powdered sugar to the bowl of a stand mixer. Beat the butter and powdered sugar together until the butter is light and fluffy. Add the melted white chocolate and beat until combined.", "To assemble. Using a large serrated knife, carefully cut each cake in half horizontally. Place one cake layer on a serving plate. Spread 1/4 of the buttercream over the cake and layer with about 1/4 cup of jam. Repeat with the remaining 3 cake layers. Be careful not to over fill your layers or the cake will be hard to slice. Lightly frost the outside of the cake. Chill 30 minutes. Serve or store in the fridge for up to 3 days."]
var recPreptime = 20;
var recCooktime = 40;
var totaltime = recPreptime + recCooktime;
var recServings = 4;
var recipe = (JSON.stringify({'title' : recipeName,'author': recipeAuthor, 'description' : recDescription, 'ingredients' : recIngredients, 'instructions' : recInstructions, 'preptime' : recPreptime, 'cooktime' : recCooktime, 'totaltime' : totaltime, 'servings' : recServings}));

// dummy JSON parser
var data = JSON.parse(recipe);

//fetching classes to be populated
var title = document.getElementById("recipeTitle");
var author = document.getElementById("recipeAuthor");
var description = document.getElementById("recipeDescription");
var preptime = document.getElementById("recipePreptime");
var cooktime = document.getElementById("recipeCooktime");
var totaltime = document.getElementById("recipeTotaltime");
var servings = document.getElementById("recipeServings");
var ingredients = document.getElementById("recipeIngredients");
var instructions = document.getElementById("recipeInstructions");

//add to grocery list button
var addToGroceries = document.getElementById("buttonAdd");
var groceriesMod = document.getElementById("recoverModal");
var close = document.getElementsByClassName("close")[0];
if(addToGroceries != null){
    addToGroceries.onclick = function() {
        groceriesMod.style.display = "block";
    }
}
if(close != null){
    close.onclick = function() {
        groceriesMod.style.display = "none";
    }
}

//function to populate website
if(recover != null){
    recover.onclick = function() {
        console.log(data.instructions);
        title.innerHTML = data.title; 
        author.innerHTML = data.author;
        description.innerHTML = data.description;
        preptime.innerHTML = data.preptime + "mins";
        cooktime.innerHTML = data.cooktime + "mins";
        totaltime.innerHTML = totalTime(data.preptime, data.cooktime);
        servings.innerHTML = data.servings;
        ingredients.innerHTML = listPopulation(data.ingredients);
        instructions.innerHTML = listPopulation(data.instructions);
    }
}

//helper functions 
function listPopulation(listArray) {
    console.log("hola");
    var i;
    listRef = "";
    for(i = 0; i < listArray.length; i++){
        listRef = listRef + "<li>" + listArray[i] + "</li>";
    }
    return listRef;
}

function totalTime(prep, cook) {
    var total = prep + cook + "mins";
    return total;
}