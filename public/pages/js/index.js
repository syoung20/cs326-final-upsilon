"use strict";
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
exports.__esModule = true;
//sessionStorage.setItem('user_id', 'tinsae@gmail.com')
var searchString;
$(".spinner-border").hide(); //the loading sign
$(".searchParams").hide(); // the yellow box alert that allows you to see availble filters
//an event listener for when the search button is clicked
$("#searchButton").click(function () {
    if ($("#searchbar")[0].value != "") { //making sure the search bar isn't empty
        $(".spinner-border").show();
        //performSearch($("#searchbar")[0].value);
        performSearch();
    }
});
//an event listener for when the enter key is clicked
$("#searchbar").keypress(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == 13 && this.value != "") { //making sure the search bar isn't empty
        $(".spinner-border").show();
        $("#searchParams").show();
        //performSearch(this.value)
        performSearch();
    }
});
//event listener to show filter options
$("#searchbar").click(function () {
    $(".searchParams").show();
});
function performSearch() {
    return __awaiter(this, void 0, void 0, function () {
        function updateResultView(json) {
            return __awaiter(this, void 0, void 0, function () {
                var mainDiv, filtersMatched;
                return __generator(this, function (_a) {
                    //remove previous results view
                    if (document.getElementById('resultsView') != null) {
                        document.getElementById('resultsView').remove();
                    }
                    if (document.getElementById('filterStatus') != null) {
                        document.getElementById('filterStatus').remove();
                    }
                    console.log(json);
                    mainDiv = document.createElement('div');
                    mainDiv.setAttribute('class', 'row');
                    mainDiv.setAttribute('id', 'resultsView');
                    if (json.filters) {
                        filtersMatched = document.createElement('div');
                        if (json.filterMatchCat || json.filterMatchIng && json.recipe_count != 0) {
                            filtersMatched.setAttribute('class', 'row alert alert-success');
                            filtersMatched.innerText = "We were able to find a match for one or more of your filters";
                            filtersMatched.setAttribute('id', 'filterStatus');
                            document.getElementById('container').appendChild(filtersMatched);
                        }
                        else {
                            filtersMatched.setAttribute('class', 'row alert alert-danger');
                            filtersMatched.innerText = "Sorry, none of your filters matched";
                            filtersMatched.setAttribute('id', 'filterStatus');
                            document.getElementById('container').appendChild(filtersMatched);
                        }
                    }
                    json.recipes.forEach(function (element) {
                        //nick's result card
                        var link = document.createElement('a');
                        var resultCard = document.createElement('div');
                        resultCard.setAttribute('class', 'result');
                        resultCard.setAttribute('id', element['recipe_id']);
                        //img
                        var imageContainer = document.createElement('div');
                        imageContainer.setAttribute('class', 'imgcontainer');
                        var image = document.createElement('img');
                        image.setAttribute('src', element['image']);
                        imageContainer.appendChild(image);
                        resultCard.appendChild(imageContainer);
                        //title 
                        var titleAndlistdiv = document.createElement('div');
                        var title = document.createElement('h3');
                        title.innerText = element['title'];
                        titleAndlistdiv.appendChild(title);
                        var ul = document.createElement('ul');
                        for (var i = 0; i < 4; i++) {
                            var li = document.createElement('li');
                            li.setAttribute('style', 'list-style-type: none');
                            if (i == 0) {
                                li.innerText = "Prep-Time: " + element['prep_time'];
                            }
                            else if (i == 1) {
                                li.innerText = "Cook-Time: " + element['cook_time'];
                            }
                            else if (i == 2) {
                                li.innerText = "Total Time: " + "1hr";
                            } //need to calculate this 
                            else if (i == 3) {
                                li.innerText = "Servings: " + element['servings'];
                            }
                            ul.appendChild(li);
                        }
                        titleAndlistdiv.appendChild(ul);
                        resultCard.appendChild(titleAndlistdiv);
                        //append nick's card to the main result view 
                        link.setAttribute('href', 'https://cs326-final-upsilon.herokuapp.com/recipe.html?' + element.recipe_id);
                        link.appendChild(resultCard);
                        mainDiv.appendChild(link);
                        //append main result view to body
                    });
                    document.getElementById('container').appendChild(mainDiv);
                    return [2 /*return*/];
                });
            });
        }
        var searchQuery, parameters, requestBody, url;
        var _this = this;
        return __generator(this, function (_a) {
            if ($("#searchbar")[0].value == "") {
                return [2 /*return*/];
            }
            searchQuery = $("#searchbar")[0].value;
            parameters = {
                recipe_categoreis: [],
                ingrediants_list: []
                //add more parameters once we all decide on wgat they will be
            };
            $(".btn-light").each(function () {
                if (this.getAttribute("aria-pressed") == "true") {
                    parameters.recipe_categoreis.push(this.value);
                }
            });
            $(".ingrediantInput").each(function (index) {
                if (this.value !== "") {
                    parameters.ingrediants_list.push(this.value);
                }
            });
            console.log(parameters);
            requestBody = {
                "search_query": searchQuery,
                params: parameters
            };
            url = 'https://cs326-final-upsilon.herokuapp.com/search';
            fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(requestBody)
            })
                .then(function (res) { return res.json(); })
                .then(function (json) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            $(".spinner-border").hide();
                            return [4 /*yield*/, updateResultView(json)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); })["catch"](function (err) {
                console.log(err.message);
            });
            return [2 /*return*/];
        });
    });
}
/*

adding parameters

*/
//event listner for ingrediant add 
$("#ingrediantAdd").click(function () {
    if ($("#ingrediant")[0].value != "") { //making sure the search bar isn't empty
        updateIngrediantsView();
        performSearch();
        addEventListener();
    }
});
//re-do search
$(".btn-light").click(function () {
    performSearch();
});
//an event listener for when the enter key is clicked
$("#ingrediant").keypress(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == 13 && $("#ingrediant")[0].value != "") { //making sure the search bar isn't empty
        updateIngrediantsView();
        performSearch();
        addEventListener();
    }
});
function updateIngrediantsView() {
    // div holding all ingrediants
    var mainDiv = $(".ingrediantsInputG")[0];
    //create new ingrediant add form group
    var inputGroup = document.createElement('div');
    inputGroup.setAttribute('class', 'input-group mb-3');
    //input bar 
    //<input type="text" class="form-control" placeholder="Ingrediant Name" aria-label="Recipient's username" id='ingrediant' aria-describedby="button-addon2">
    var inputBar = document.createElement('input');
    inputBar.setAttribute('class', 'form-control ingrediantInput');
    inputBar.setAttribute('type', 'text');
    inputBar.setAttribute('placeholder', 'Ingrediant Name');
    //inputBar.setAttribute('aria-label', 'Ingrediant')
    inputBar.setAttribute('id', 'ingrediant');
    //inputBar.setAttribute("aria-describedby", "button-addon2")
    inputGroup.appendChild(inputBar);
    var buttonDiv = document.createElement('div');
    buttonDiv.setAttribute('class', 'input-group-append');
    var button = document.createElement('button');
    button.setAttribute('class', "btn btn-success");
    button.setAttribute("type", "button");
    button.innerText = "Add";
    button.setAttribute("id", "ingrediantAdd");
    buttonDiv.appendChild(button);
    inputGroup.appendChild(buttonDiv);
    //change old add area
    var oldInputBar = document.getElementById('ingrediant');
    oldInputBar.setAttribute('id', "");
    var oldButton = document.getElementById("ingrediantAdd");
    oldButton.setAttribute('id', '');
    oldButton.setAttribute('class', 'btn btn-danger oldButton');
    oldButton.innerText = 'Remove';
    mainDiv.appendChild(inputGroup);
    addEventListener();
}
function addEventListener() {
    //event listner for ingrediant add 
    $("#ingrediantAdd").click(function () {
        //console.log(this)
        if ($("#ingrediant")[0].value != "") { //making sure the search bar isn't empty
            updateIngrediantsView();
            performSearch();
        }
    });
    //an event listener for when the enter key is clicked
    $("#ingrediant").keypress(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == 13 && this.value != "") { //making sure the search bar isn't empty
            updateIngrediantsView();
            performSearch();
        }
    });
    $(".oldButton").click(function () {
        this.parentElement.parentElement.remove();
        performSearch();
        //this.parentElement.parentElement.innerHTML = ""
    });
}
