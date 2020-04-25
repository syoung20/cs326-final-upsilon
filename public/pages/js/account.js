var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var url = "http://localhost:5657/users/";
var userId; //right now just using email from account credentials
var view = "recipebook"; //view to keep track of current tab for post requests
var numRecip = 0; //used to adjust layout
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
$("document").ready(function () {
    loadAccountData();
    loadPantryGroceryData("pantry");
    loadPantryGroceryData("grocery");
});
//route to create_recipe.html on create recipe button click
$("#create").click(function () {
    window.location.href = "create_recipe.html";
});
//POPUP EVENT HANDLERS
//prevents any popup forms from automatically submitting
$("form").submit(function () { return false; });
//change password popup: open popup on gear click, route to page on button click
$("#user svg").click(function () {
    settings.show();
});
settings.find("button").click(function () {
    window.location.href = "change_password.html";
});
//add category popup: open popup, add category on button click
$(".add-category h4").click(function () {
    addCat.show();
});
addCat.find("button").click(function () {
    loadNewCategory();
});
//edit category popup: open popup
$(document).on('click', ".edit-category", function (event) {
    editForm.show();
    var id = $(event.currentTarget).parent().parent().attr("id");
    editForm.find("form").attr("class", id);
    $("#edit-title").val($(event.currentTarget).parent().text());
    $("#edit-items").val($(event.currentTarget).parent().parent().find("ul li").map(function () {
        return $(this).text();
    }).get().join('\n'));
    $("#edit-items").attr("rows", $(event.currentTarget).parent().parent().find("ul li").length + 1);
});
//edit category popup: edit category on button click (either update or delete)
editForm.find(".btn-light").click(function () {
    return __awaiter(this, void 0, void 0, function () {
        var id, title, str, items;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("check1");
                    id = editForm.find("form").attr("class");
                    title = $("#edit-title").val() + "";
                    str = $("#edit-items").val() + "";
                    items = str.trim().split("\n");
                    return [4 /*yield*/, editPantryGroceryData(id, title, items)];
                case 1:
                    _a.sent();
                    editForm.hide();
                    return [2 /*return*/];
            }
        });
    });
});
editForm.find(".btn-danger").click(function () {
    console.log("check2");
    var id = editForm.find("form").attr("class");
    deleteCategory(id);
});
//view recipe popup: route to recipe page or delete recipe
$(document).on('click', ".recipe", function (event) {
    recipeOptions.show();
    recipeOptions.find("form").attr("class", $(event.currentTarget).attr("id"));
});
recipeOptions.find(".btn-light").click(function () {
    var id = recipeOptions.find("form").attr("class");
    window.location.href = "recipe.html";
});
recipeOptions.find(".btn-danger").click(function () {
    var id = recipeOptions.find("form").attr("class");
    var catId = recipeCatHeader.find("h3").attr("class");
    removeRecipe(id, catId);
    recipeOptions.hide();
});
//handle closing all popups
$(".popup .close").click(function () {
    settings.hide();
    addCat.hide();
    editForm.hide();
    recipeOptions.hide();
});
$("body").click(function (event) {
    if (event.target.id == "category-form") {
        addCat.hide();
    }
    else if (event.target.id == "edit-form") {
        editForm.hide();
    }
    else if (event.target.id == "recipe-popup") {
        recipeOptions.hide();
    }
    else if (event.target.id == "change-password") {
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
$(document).on('click', ".recipe-cat", function (event) {
    recipeCat.find(".recipe").remove();
    var id = $(event.currentTarget).attr("id");
    loadRecipeCategory(id);
    recipebook.hide();
    recipeCatHeader.show();
    recipeCat.show();
    recipeCatHeader.find("h3").attr("class", id);
});
//return from recipe book category to recipe book
recipeCatHeader.find("span").click(function () {
    showRecipeBook();
});
//delete category and return to recipe book
recipeCat.find("button").click(function () {
    showRecipeBook();
    var id = recipeCatHeader.find("h3").attr("class");
    deleteCategory(id);
    numRecip -= 1;
    adjustRecipebook();
});
//HELPER FUNCTIONS
function adjustRecipebook() {
    if (numRecip % 3 == 1) {
        $("#phantom1").show();
        $("#phantom2").hide();
    }
    else if (numRecip % 3 == 2) {
        $("#phantom1").hide();
        $("#phantom2").hide();
    }
    else {
        $("#phantom1").show();
        $("#phantom2").show();
    }
}
//FUNCTIONS FOR LOADING DATA TO HTML PAGE
//access /users/read and reflect data on html page
function loadAccountData() {
    return __awaiter(this, void 0, void 0, function () {
        var data, resp, status, name, recipeCategories, i, catId, title, img, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = { 'userId': userId };
                    return [4 /*yield*/, sendPostRequest(url + "read/", data)];
                case 1:
                    resp = _a.sent();
                    console.log(resp);
                    status = resp["status"];
                    if (status == 200) {
                        name = resp["name"];
                        recipeCategories = resp["recipeCategories"];
                        console.log(recipeCategories);
                        $("#username").text(name);
                        for (i = 0; i < recipeCategories.length; i++) {
                            catId = recipeCategories[i]["id"];
                            title = recipeCategories[i]["title"];
                            img = recipeCategories[i]["img"];
                            html = '<div id="' + catId + '" class="recipe-cat m-3"><h3 class="recipe-title">' + title + '</h3><img class="recipe-img" src="' + img + '"></div>';
                            $(html).insertBefore(recipebook.find(".add-category"));
                        }
                        numRecip = recipeCategories.length;
                        adjustRecipebook();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//access users/recipebook/cat/read and put data into html
function loadRecipeCategory(id) {
    return __awaiter(this, void 0, void 0, function () {
        var data, resp, status, name, recipes, i, recipeId, recipeTitle, recipeImg, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = { 'userId': userId, 'categoryId': id };
                    return [4 /*yield*/, sendPostRequest(url + "recipebook/cat/read", data)];
                case 1:
                    resp = _a.sent();
                    console.log(resp);
                    status = resp["status"];
                    if (status == 200) {
                        name = resp["title"];
                        recipes = resp["recipes"];
                        recipeCatHeader.find("h3").text(name);
                        for (i = 0; i < recipes.length; i++) {
                            recipeId = recipes[i]["recipeId"];
                            recipeTitle = recipes[i]["recipeTitle"];
                            recipeImg = recipes[i]["recipeImg"];
                            html = '<div id="' + recipeId + '" class="recipe m-3"><h3 class="recipe-title">' + recipeTitle + '</h3><img class="recipe-img" src="' + recipeImg + '"></div>';
                            recipeCat.children().first().append(html);
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//access users/pantry/read and users/grocery/read and put data into html
function loadPantryGroceryData(tab) {
    return __awaiter(this, void 0, void 0, function () {
        var data, resp, status, categories, i, catId, title, items, html, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = { 'userId': userId };
                    return [4 /*yield*/, sendPostRequest(url + tab + "/read/", data)];
                case 1:
                    resp = _a.sent();
                    console.log(resp);
                    status = resp["status"];
                    if (status == 200) {
                        categories = resp["categories"];
                        console.log("categories returned");
                        console.log(categories);
                        console.log(categories[0]);
                        console.log(categories[0]["id"]);
                        for (i = 0; i < categories.length; i++) {
                            catId = categories[i]["id"];
                            title = categories[i]["title"];
                            items = categories[i]["items"];
                            html = '<div id="' + catId + '" class="food-category"><h3>' + title + ' <span class="edit-category"><svg class="no-hover-svg bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="rgb(126, 88, 88)" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/></svg><svg class="on-hover-svg bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="#501616 " xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/></svg></span></h3><ul>';
                            for (j = 0; j < items.length; j++) {
                                html += '<li>' + items[j] + '</li>';
                            }
                            html += '</ul></div>';
                            $(html).insertBefore($("#" + tab + " .add-category"));
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//access users/recipebook/cat/add, users/pantry/cat/add, and users/grocery/cat/add, reflect changes in html
function loadNewCategory() {
    return __awaiter(this, void 0, void 0, function () {
        var categoryName, data, resp, catId, title, html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    categoryName = addCat.find("input").val() + "";
                    data = { "userId": userId, "category": categoryName };
                    return [4 /*yield*/, sendPostRequest(url + view + "/cat/add/", data)];
                case 1:
                    resp = _a.sent();
                    addCat.find("input").val("");
                    if (resp["status"] == 200) {
                        addCat.hide();
                        catId = resp["categoryId"];
                        title = resp["category"];
                        html = "";
                        console.log("view");
                        if (view == "recipebook") {
                            numRecip = numRecip + 1;
                            adjustRecipebook();
                            html = '<div id="' + catId + '" class="recipe-cat m-3"><h3 class="recipe-title">' + title + '</h3><img class="recipe-img" src="./images/missing_img.png"></div>';
                        }
                        else {
                            html = '<div id="' + catId + '" class="food-category"><h3>' + title + ' <span class="edit-category"><svg class="no-hover-svg bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="rgb(126, 88, 88)" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/></svg><svg class="on-hover-svg bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="#501616 " xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/></svg></span></h3><ul>';
                        }
                        $(html).insertBefore($("#" + view + " .add-category"));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//remove recipe from category
function removeRecipe(recipeId, categoryId) {
    return __awaiter(this, void 0, void 0, function () {
        var data, resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = { 'userId': userId, 'recipeId': recipeId, 'categoryId': categoryId };
                    console.log(data);
                    return [4 /*yield*/, sendPostRequest(url + "recipebook/cat/edit", data)];
                case 1:
                    resp = _a.sent();
                    console.log(resp);
                    if (resp["status"] == 200) {
                        $("#" + resp["recipeId"]).remove();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//access /users/pantry/cat/edit and /users/grocery/cat/edit, reflect changes in html
function editPantryGroceryData(catId, title, items) {
    return __awaiter(this, void 0, void 0, function () {
        var data, resp, status, html, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = { 'userId': userId, 'categoryId': catId, 'title': title, 'ingredients': items };
                    return [4 /*yield*/, sendPostRequest(url + view + "/cat/edit", data)];
                case 1:
                    resp = _a.sent();
                    console.log(resp);
                    status = resp["status"];
                    if (status == 200) {
                        html = "";
                        if (resp["ingredients"][0] != "") {
                            for (i = 0; i < resp["ingredients"].length; i++) {
                                html += "<li>" + resp["ingredients"][i] + "</li>";
                            }
                        }
                        $("#" + resp["categoryId"]).find("h3").html(resp["title"] + '<span class="edit-category"><svg class="no-hover-svg bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="rgb(126, 88, 88)" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/></svg><svg class="on-hover-svg bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="#501616 " xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/></svg></span>');
                        $("#" + resp["categoryId"]).find("ul").html(html);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//access users/recipebook/cat/del, users/pantry/cat/del, and users/grocery/cat/del, reflect changes in html
function deleteCategory(id) {
    return __awaiter(this, void 0, void 0, function () {
        var data, resp, status;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    data = { "userId": userId, "categoryId": id };
                    return [4 /*yield*/, sendPostRequest(url + view + "/cat/del", data)];
                case 1:
                    resp = _a.sent();
                    console.log(resp);
                    status = resp["status"];
                    if (status == 200) {
                        $("#" + id).remove();
                        editForm.hide();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//FUNCTIONS FOR HTTP REQUESTS TO SERVER
//send http post request
function sendPostRequest(newUrl, data) {
    return __awaiter(this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(newUrl, {
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
                    }).then(function (response) {
                        return response.json();
                    }).then(function (response) {
                        resp = response;
                        console.log(JSON.stringify(response));
                    })];
                case 1:
                    _a.sent();
                    console.log("received resp:" + JSON.stringify(resp));
                    return [2 /*return*/, resp];
            }
        });
    });
}
