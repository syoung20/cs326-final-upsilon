

//dummy button for population
var recover = document.getElementById("myBtn");
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

function recipeRead() {
    console.log("arranca?")
    var url = "https://cs326-final-upsilon.herokuapp.com/recipes/read";
    var req = {'name' : 'nombre'};
    var resp = fetch(url,
        {
            method: 'POST',
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/json"
                },
            body: JSON.stringify(req)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if(recover != null){
                    console.log("hola");
                    recover.onclick = function() {
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
                
            })
}


//helper functions 
function listPopulation(listArray) {
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