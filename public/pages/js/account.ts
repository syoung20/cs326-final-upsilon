const url = "http://localhost:5656/users/";
var userId : string; //right now just using email from account credentials
var view : string = "recipebook"; //view to keep track of current tab for post requests
var numRecip : number = 0; //used to adjust layout

//account.html popup divs. These are displayed/hidden based on clicks
var addCat = $("#category-form");
var editForm = $("#edit-form");
var settings = $("#change-password");
var recipeOptions = $("#recipe-popup");

//main page components to display and hide
var recipeCatHeader = $("#recipe-cat-header");
var recipeCat = $("#recipe-cat");
var recipebook = $("#recipebook");
var pantry = $("#pantry");
var grocery = $("#grocery");

//account navbar components
var recipebookTab = $("#recipebook-tab");
var pantryTab = $("#pantry-tab");
var groceryTab = $("#grocery-tab");

//Function to load account.html. Takes the user id (right now just email) as parameter.
function loadPage(id) {
    userId = id;
    window.location.href = 'account.html';
}

//EVENT HANDLERS
//load initial account data when DOM is loaded
$("document").ready(function() {
    loadAccountData();
    loadPantryGroceryData("pantry");
    loadPantryGroceryData("grocery");
});
//route to create_recipe.html on create recipe button click
$("#create").click(() => {
    window.location.href = "create_recipe.html";
});

//POPUP EVENT HANDLERS
//prevents any popup forms from automatically submitting
$("form").submit(() => {return false;})
//change password popup: open popup on gear click, route to page on button click
$("#user svg").click(() => {
    settings.show()
});
settings.find("button").click(() => {
    window.location.href="login.html"
});
//add category popup: open popup, add category on button click
$(".add-category h4").click(function() {
    addCat.show()
});
addCat.find("button").click(function() {
    loadNewCategory();
});
//edit category popup: open popup
$(document).on('click', ".edit-category", function(event) {
    editForm.show();
    var id : string = $(event.currentTarget).parent().parent().attr("id");
    editForm.find("form").attr("class", id);
    $("#edit-title").val($(event.currentTarget).parent().text());
    $("#edit-items").val($(event.currentTarget).parent().parent().find("ul li").map(function(){ 
        return $(this).text(); 
      }).get().join('\n'));
    $("#edit-items").attr("rows", $(event.currentTarget).parent().parent().find("ul li").length + 1);
});
//edit category popup: edit category on button click (either update or delete)
editForm.find(".btn-light").click(async function() {
    console.log("check1");
    var id : string = editForm.find("form").attr("class");
    var title : string = $("#edit-title").val() + "";
    var str : string = $("#edit-items").val() + "";
    var items : Array<string> = str.trim().split("\n");
    await editPantryGroceryData(id, title, items);
    editForm.hide();
});
editForm.find(".btn-danger").click(function() {
    console.log("check2");
    var id : string = editForm.find("form").attr("class");
    deleteCategory(id);
});
//view recipe popup: route to recipe page or delete recipe
$(document).on('click', ".recipe", function(event) {
    recipeOptions.show();
    recipeOptions.find("form").attr("class", $(event.currentTarget).attr("id"));
})
recipeOptions.find(".btn-light").click(() => {
    var id : string = recipeOptions.find("form").attr("class"); 
    window.location.href = "recipe.html";
});
recipeOptions.find(".btn-danger").click(() => {
    var id : string = recipeOptions.find("form").attr("class");
    var catId : string = recipeCatHeader.find("h3").attr("class");
    removeRecipe(id, catId);
    recipeOptions.hide();
});
//handle closing all popups
$(".popup .close").click(function() {
    settings.hide();
    addCat.hide();
    editForm.hide();
    recipeOptions.hide();
});
$("body").click(function(event) {
  if (event.target.id == "category-form") {
    addCat.hide();
  } else if (event.target.id == "edit-form"){
    editForm.hide();
  } else if (event.target.id == "recipe-popup") {
    recipeOptions.hide();
  } else if (event.target.id == "change-password") {
    settings.hide();
  }
});

//EVENT HANDLERS FOR ACCOUNT PAGE NAVIGATION
//handle account navbar clicks
pantryTab.click(showPantry);
recipebookTab.click(showRecipeBook);
groceryTab.click(showGrocery);
function showPantry() {
    view = "pantry";
    recipeCat.hide();
    recipeCatHeader.hide();
    recipebook.hide();
    grocery.hide();
    pantry.show();
    pantryTab.removeClass("unselected");
    recipebookTab.addClass("unselected");
    groceryTab.addClass("unselected");
}
function showRecipeBook() {
    view = "recipebook";
    recipeCat.hide();
    recipeCatHeader.hide();
    recipebook.show();
    grocery.hide();
    pantry.hide();
    pantryTab.addClass("unselected");
    recipebookTab.removeClass("unselected");
    groceryTab.addClass("unselected");
}
function showGrocery() {
    view = "grocery";
    recipeCat.hide();
    recipeCatHeader.hide();
    recipebook.hide();
    grocery.show();
    pantry.hide();
    pantryTab.addClass("unselected");
    recipebookTab.addClass("unselected");
    groceryTab.removeClass("unselected");
}
//recipe category: view recipes in category when click on recipe category
$(document).on('click', ".recipe-cat", function(event) {
    recipeCat.find(".recipe").remove();
    var id : string = $(event.currentTarget).attr("id")
    loadRecipeCategory(id);
    recipebook.hide();
    recipeCatHeader.show();
    recipeCat.show();
    recipeCatHeader.find("h3").attr("class", id);
});
//return from recipe book category to recipe book
recipeCatHeader.find("span").click(function() {
    showRecipeBook();
})
//delete category and return to recipe book
recipeCat.find("button").click(function() {
    showRecipeBook();
    var id : string = recipeCatHeader.find("h3").attr("class");
    deleteCategory(id);
    numRecip -= 1;
    adjustRecipebook();
})

//HELPER FUNCTIONS
function adjustRecipebook() {
    if (numRecip % 3 == 1) {
        $("#phantom1").show();
        $("#phantom2").hide();
    } else if (numRecip % 3 == 2) {
        $("#phantom1").hide();
        $("#phantom2").hide();
    } else {
        $("#phantom1").show();
        $("#phantom2").show();
    }
}

//FUNCTIONS FOR LOADING DATA TO HTML PAGE
//access /users/read and reflect data on html page
async function loadAccountData() {
    const data = { 'userId' : userId };
    const resp = await sendPostRequest(url + "read/", data);
    console.log(resp);
    var status : number = resp["status"];
    if (status == 200) {
        var name : string = resp["name"];
        var recipeCategories : Array<object> = resp["recipeCategories"];
        console.log(recipeCategories);
        $("#username").text(name);
        for (var i : number = 0; i < recipeCategories.length; i++) {
            var catId : string = recipeCategories[i]["id"];
            var title : string = recipeCategories[i]["title"];
            var img : string = recipeCategories[i]["img"];
            var html : string = '<div id="' + catId + '" class="recipe-cat m-3"><h3 class="recipe-title">' + title + '</h3><img class="recipe-img" src="' + img + '"></div>';
            $(html).insertBefore(recipebook.find(".add-category"));
        }
        numRecip = recipeCategories.length;
        adjustRecipebook();
    }
}
//access users/recipebook/cat/read and put data into html
async function loadRecipeCategory(id) {
    const data = {'userId' : userId, 'categoryId' : id};
    const resp = await sendPostRequest(url + "recipebook/cat/read", data)
    console.log(resp);
    var status : number = resp["status"];
    if (status == 200) {
        var name : string = resp["title"];
        var recipes : Array<object> = resp["recipes"];
        recipeCatHeader.find("h3").text(name);
        for (var i : number = 0; i < recipes.length; i++) {
            var recipeId : string = recipes[i]["recipeId"];
            var recipeTitle : string = recipes[i]["recipeTitle"];
            var recipeImg : string = recipes[i]["recipeImg"];
            var html : string = '<div id="' + recipeId + '" class="recipe m-3"><h3 class="recipe-title">' + recipeTitle + '</h3><img class="recipe-img" src="' + recipeImg + '"></div>';
            recipeCat.children().first().append(html)
        }
    }
}
//access users/pantry/read and users/grocery/read and put data into html
async function loadPantryGroceryData(tab) {
    const data = { 'userId' : userId };
    const resp = await sendPostRequest(url + tab + "/read/", data);
    console.log(resp);
    var status : number = resp["status"];
    if (status == 200) {
        var categories = resp["categories"];
        console.log("categories returned");
        console.log(categories);
        console.log(categories[0]);
        console.log(categories[0]["id"]);
        for (var i : number = 0; i < categories.length; i++) {
            var catId : string = categories[i]["id"];
            var title : string = categories[i]["title"];
            var items : string = categories[i]["items"];
            var html : string = '<div id="' + catId + '" class="food-category"><h3>' + title + ' <span class="edit-category"><svg class="no-hover-svg bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="rgb(126, 88, 88)" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/></svg><svg class="on-hover-svg bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="#501616 " xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/></svg></span></h3><ul>';
            for (var j : number = 0; j < items.length; j++) {
                html += '<li>'+ items[j] + '</li>'
            }
            html += '</ul></div>'
            $(html).insertBefore($("#"+ tab + " .add-category"));
        }
    }
}
//access users/recipebook/cat/add, users/pantry/cat/add, and users/grocery/cat/add, reflect changes in html
async function loadNewCategory() {
    const categoryName : string = addCat.find("input").val()+"";
    const data = {"userId" : userId, "category" : categoryName};
    const resp = await sendPostRequest(url + view + "/cat/add/", data);
    addCat.find("input").val("");
    if (resp["status"] == 200) {
        addCat.hide();
        var catId : number = resp["categoryId"];
        var title : String = resp["category"];
        var html : string = "";
        console.log("view");
        if (view == "recipebook") {
            numRecip = numRecip + 1;
            adjustRecipebook();
            html = '<div id="' + catId + '" class="recipe-cat m-3"><h3 class="recipe-title">' + title + '</h3><img class="recipe-img" src="./images/missing_img.png"></div>';
        } else {
            html = '<div id="' + catId + '" class="food-category"><h3>' + title + ' <span class="edit-category"><svg class="no-hover-svg bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="rgb(126, 88, 88)" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/></svg><svg class="on-hover-svg bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="#501616 " xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/></svg></span></h3><ul>';
        }
        $(html).insertBefore($("#"+ view + " .add-category"));
    }
}
//remove recipe from category
async function removeRecipe(recipeId, categoryId) {
    var data = {'userId' : userId, 'recipeId': recipeId, 'categoryId' :categoryId};
    console.log(data);
    const resp = await sendPostRequest(url + "recipebook/cat/edit", data);
    console.log(resp);
    if (resp["status"] == 200) {
        $("#" + resp["recipeId"]).remove();
    }
}
//access /users/pantry/cat/edit and /users/grocery/cat/edit, reflect changes in html
async function editPantryGroceryData(catId, title, items) {
    var data = {'userId' : userId, 'categoryId' : catId, 'title': title, 'ingredients' : items}
    const resp = await sendPostRequest(url + view + "/cat/edit", data);
    console.log(resp);
    var status : number = resp["status"];
    if (status == 200) {
        var html : string = "";
        if (resp["ingredients"][0] != "")
        {for (var i : number = 0; i < resp["ingredients"].length; i++) {
            html += "<li>"+ resp["ingredients"][i] + "</li>"
        }}
        $("#"+resp["categoryId"]).find("h3").html(resp["title"] + '<span class="edit-category"><svg class="no-hover-svg bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="rgb(126, 88, 88)" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/></svg><svg class="on-hover-svg bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="#501616 " xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/></svg></span>');
        $("#"+resp["categoryId"]).find("ul").html(html)
    }
}
//access users/recipebook/cat/del, users/pantry/cat/del, and users/grocery/cat/del, reflect changes in html
async function deleteCategory(id) {
    const data = {"userId" : userId, "categoryId" : id};
    const resp = await sendPostRequest(url + view + "/cat/del", data);
    console.log(resp);
    var status : number = resp["status"];
    if (status == 200) {
        $("#" + id).remove();
        editForm.hide();
    }
}

//FUNCTIONS FOR HTTP REQUESTS TO SERVER
//send http post request
async function sendPostRequest(newUrl, data) {
    var resp : object;
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
            return response.json();
        }).then((response) => {
            resp = response;
            console.log(JSON.stringify(response));
          });
    console.log("received resp:" + JSON.stringify(resp));
    return resp;
}