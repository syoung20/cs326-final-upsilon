//event listner for ingrediant add 
$("#ingrediantAdd").click(function () {
    if ($("#ingrediant")[0].value != "") { //making sure the search bar isn't empty
        updateIngrediantsView(this.value);
    }
});
//an event listener for when the enter key is clicked
$("#ingrediant").keypress(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == 13 && this.value != "") { //making sure the search bar isn't empty
        updateIngrediantsView(this.value);
    }
});
var listOfIngredients = [];
function updateIngrediantsView(value) {
    listOfIngredients.push(value);
    // div holding all ingrediants
    var mainDiv = $(".ingrediantsInputG")[0];
    //create new ingrediant add form group
    var inputGroup = document.createElement('div');
    inputGroup.setAttribute('class', 'input-group mb-3');
    //input bar 
    //<input type="text" class="form-control" placeholder="Ingrediant Name" aria-label="Recipient's username" id='ingrediant' aria-describedby="button-addon2">
    var inputBar = document.createElement('input');
    inputBar.setAttribute('class', 'form-control');
    inputBar.setAttribute('type', 'text');
    inputBar.setAttribute('placeholder', 'Ingrediant Name');
    inputBar.setAttribute('aria-label', 'Ingrediant');
    inputBar.setAttribute('id', 'ingrediant');
    inputBar.setAttribute("aria-describedby", "button-addon2");
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
        }
    });
    //an event listener for when the enter key is clicked
    $("#ingrediant").keypress(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == 13 && this.value != "") { //making sure the search bar isn't empty
            updateIngrediantsView();
        }
    });
    $(".oldButton").click(function () {
        this.parentElement.parentElement.remove();
        //this.parentElement.parentElement.innerHTML = ""
    });
}
