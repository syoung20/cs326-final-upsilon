

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
var image = document.getElementById("recImage");

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


var url = window.location.href;
var index = url.indexOf("?");
if (index != -1){
    var recipeID = url.slice(index + 1);
    loadRecipe(recipeID);
}





function loadRecipe(recid) {
    recipeRead(recid);
    recipeIngredients(recid);
    recipeInstructions(recid);
}


function recipeRead(recid) {
    var url = "http://localhost:5657/recipes/read";
    var req = {'rid' : recid};
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
                if (data != null){
                    title.innerHTML = data.title; 
                    description.innerHTML = data.description;
                    preptime.innerHTML = data.prep + "mins";
                    cooktime.innerHTML = data.cook + "mins";
                    totaltime.innerHTML = totalTime(data.prep, data.cook);
                    servings.innerHTML = data.servings;
                    image.src = data.image;
                }
            })
}



function recipeInstructions(recid) {
    var url = "http://localhost:5657/recipes/instructions";
    var req = {'rid' : recid};
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
                if (data != null){
                    var arrayIns = [];
                    for (let i = 0; i < data.instructions.length; i++){
                        arrayIns.push(data.instructions[i]);
                    }
                    instructions.innerHTML = listPopulation(arrayIns);
                }
            })
}

function recipeIngredients(recid) {
    var url = "http://localhost:5657/recipes/ingredients";
    var req = {'rid' : recid};
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
                if (data != null){
                    var arrayIng = [];
                    for (let i = 0; i < data.ingredients.length; i++){
                        arrayIng.push(data.ingredients[i]);
                    }
                    ingredients.innerHTML = listPopulation(arrayIng);
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