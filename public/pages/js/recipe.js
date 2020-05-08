

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

var ingredientsArray = [];
var quantitiesArray = [];

//add recipe
var catMod = document.getElementById("categoryModal");
var addToRecipebook = document.getElementById("recipeAdd");
var recipeMod = document.getElementById("recipeModal");
addToRecipebook.onclick = function() {
    console.log("here");
    if ($("#cats").children().length <=  1) {
        loadCategories();
    }
    catMod.style.display = "block";

}
var add = document.getElementById("catSubmit");
add.onclick = function() {
    var catId = document.querySelector('input[name="catId"]:checked').value;
    console.log(catId);
    addRecipe(catId);
    catMod.style.display = "none";
    recipeMod.style.display = "block";
}
//add to grocery list button

var addToGroceries = document.getElementById("buttonAdd");
var groceriesMod = document.getElementById("recoverModal");
var groceriesModTwo = document.getElementById('failModal');
var close = document.getElementsByClassName("close")[0];

if(addToGroceries != null){
    addToGroceries.onclick = function() {
        var userid = localStorage.getItem('user_id');
        groceryAddCat(userid);
    }
}




if(close != null){
    close.onclick = function() {
        groceriesMod.style.display = "none";
        groceriesModTwo.style.display = "none";       
        recipeMod.style.display = "none";
        catMod.style.display = "none";
    }
}

$(".modal .close").click(function() {
    groceriesMod.style.display = "none";
        recipeMod.style.display = "none";
        catMod.style.display = "none";
});
$("body").click(function(event) {
  if (event.target.id == "categoryModal") {
    catMod.style.display = "none";
  } else if (event.target.id == "recipeModal"){
    recipeMod.style.display = "none";
  } else if (event.target.id == "recoverModal") {
    groceriesMod.style.display = "none";
  }
});

if (localStorage.getItem('user_id') == null) {
    addToGroceries.style.display = "none";
    addToRecipebook.style.display = "none";
} else {
    addToGroceries.style.display = "block";
    addToRecipebook.style.display = "block";
}

var url = window.location.href;
var index = url.indexOf("?");
if (index != -1){
    var recipeID = url.slice(index + 1);
    loadRecipe(recipeID);
}

function loadRecipe(recid) {
    console.log(recid)
    recipeRead(recid);
    recipeIngredients(recid);
    recipeInstructions(recid);
}

function groceryAddCat(userid){
    var url = "https://cs326-final-upsilon.herokuapp.com/users/grocery/cat/add";
    var name = title.innerHTML;
    var req = {'userId' : userid, 'category' : name};
    console.log(req);
    var resp = fetch(url,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.error != 'true'){
                    groceryAddItems(data.categoryId, data.userId);
                    groceriesMod.style.display = "block";
                }
                else {
                    groceriesModTwo.style.display = "block";
                }
            })
}

function groceryAddItems(grocatId, userId) {
    var url = "https://cs326-final-upsilon.herokuapp.com/users/grocery/cat/edit";
    var name = title.innerHTML;
    var req = {'userId' : userId, 'categoryId' : grocatId, 'title' : name, 'ingredients' : ingredientsArray};
    var resp = fetch(url,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data != null){
                    console.log(data);
                }
            })
}

function recipeRead(recid) {
    var url = "https://cs326-final-upsilon.herokuapp.com/recipes/read";
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


function recipeRead(recid) {
    var url = "https://cs326-final-upsilon.herokuapp.com/recipes/read";
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
    var url = "https://cs326-final-upsilon.herokuapp.com/recipes/instructions";
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
    var url = "https://cs326-final-upsilon.herokuapp.com/recipes/ingredients";
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
                    var arrayQuants = [];
                        for (let i = 0; i < data.ingredients.length; i++){
                            arrayIng.push(data.ingredients[i]);
                            arrayQuants.push(data.quantities[i]);
                        }
                        ingredients.innerHTML = listPopulationTwo(arrayIng, arrayQuants);
                        ingredientsArray = arrayIng;
                        quantitiesArray = arrayQuants;
                        console.log(ingredientsArray);
                        console.log(quantitiesArray);
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

function listPopulationTwo(listArray, secondArray) {
    var i;
    listRef = "";
    for(i = 0; i < listArray.length; i++){
        listRef = listRef + "<li>" + secondArray[i] + " " + "<strong>" + listArray[i] + "</strong>" + "</li>";
    }
    return listRef;
}

function totalTime(prep, cook) {
    var total = prep + cook + "mins";
    return total;
}

async function addRecipe(catId) {
    var url = "https://cs326-final-upsilon.herokuapp.com/recipes/saverecipe";
    var data = {'catId' : catId.replace(/\"/g, ''), 'rid' : recipeID};
    const resp = await sendPostRequest(url, data);
    console.log(resp);
}

async function loadCategories() {
    console.log("here");
    const data = { 'userId' : localStorage.getItem('user_id') };
    const resp = await sendPostRequest('https://cs326-final-upsilon.herokuapp.com/users/recipebook/read', data);
    console.log(resp);
    var recipeCategories = resp["recipeCategories"];
    console.log(recipeCategories);
    for (var i = 0; i < recipeCategories.length; i++) {
        var catId = recipeCategories[i]["id"];
        var title = recipeCategories[i]["title"];
        var html = '<input type="radio" id="'+catId+'" class="cat" name="catId" value="'+catId+'"></input> <label for="'+catId+'">'+title+'</label><br>';
        $("#cats").append(html);
    }
}
async function sendPostRequest(newUrl, data) {
    var resp;
    await fetch(newUrl,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify(data)
        }).then(function(response) {
            console.log(response + '/n: resp')
            if (response != null) {
                return response.json();
            } else {
                return "no response";
            }
            
        }).then((response) => {
            resp = response;
            console.log(JSON.stringify(response));
          });
    console.log("received resp:" + JSON.stringify(resp));
    return resp;
}