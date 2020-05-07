//event listner for ingrediant add 
let user_id_check = localStorage.getItem('user_id')
if(user_id_check == null){
    window.location.href = './login.html'
}

document.getElementById('leaveUs').addEventListener('click', function() {
    localStorage.clear()
    window.location.href = './index.html'
})



$("#ingrediantAdd").click(function () {
    
    if ($("#ingrediant")[0].value != "") { //making sure the search bar isn't empty
        updateingrediantsView()
    }
})

//an event listener for when the enter key is clicked
$("#ingrediant").keypress(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == 13 && this.value != "") { //making sure the search bar isn't empty
        updateingrediantsView()
    }
})



function updateingrediantsView() {
    // div holding all ingrediants
    let mainDiv = $("#incrediantsCard")[0]

    //create new ingrediant add form group
    let newFormGroup = document.createElement('div')
    newFormGroup.setAttribute('class', 'input-group mb-3')

    //let inputGroup = document.createElement('div')
    //inputGroup.setAttribute('class', 'input-group mb-3')

    //input bar 
    //<input type="text" class="form-control" placeholder="ingrediant Name" aria-label="Recipient's username" id='ingrediant' aria-describedby="button-addon2">
    let inputBar = document.createElement('input')
    inputBar.setAttribute('class', 'form-control')
    inputBar.setAttribute('type', 'text')
    inputBar.setAttribute('name', "ingrediant")
    inputBar.setAttribute('placeholder', 'Ingrediant')
    inputBar.setAttribute('aria-label', 'ingrediant')
    inputBar.setAttribute('id', 'ingrediant')
    inputBar.setAttribute("aria-describedby", "button-addon2")
    newFormGroup.appendChild(inputBar)
    
    let quantity = document.createElement('input')
    quantity.setAttribute('class', 'form-control')
    quantity.setAttribute('type', 'text')
    quantity.setAttribute('name', "quantity")
    quantity.setAttribute('placeholder', 'Quantity')
    quantity.setAttribute('aria-label', 'Quantity')
    quantity.setAttribute('id', 'ingrediantQ')
    quantity.setAttribute("aria-describedby", "button-addon2")
    newFormGroup.appendChild(quantity)

    let buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'input-group-append')

    let button = document.createElement('button')
    button.setAttribute('class', "btn btn-success")
    button.setAttribute("type", "button")
    button.innerText = "Add"
    button.setAttribute("id", "ingrediantAdd")
    buttonDiv.appendChild(button)
    newFormGroup.appendChild(buttonDiv)

    //newFormGroup.appendChild(inputGroup)


    //change old add area

    let oldInputBar = document.getElementById('ingrediant')
    oldInputBar.setAttribute('id', "")
    
    let oldButton = document.getElementById("ingrediantAdd")
    oldButton.setAttribute('id', '')
    oldButton.setAttribute('class', 'btn btn-danger oldingrediantButton')
    oldButton.innerText = 'Remove'





    mainDiv.appendChild(newFormGroup)
    addEventListener()
}


function addEventListener() {
    //event listner for ingrediant add 
    $("#ingrediantAdd").click(function () {
        console.log(this)
        if ($("#ingrediant")[0].value != "") { //making sure the search bar isn't empty
            updateingrediantsView()
        }
    })

    //an event listener for when the enter key is clicked
    $("#ingrediant").keypress(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == 13 && this.value != "") { //making sure the search bar isn't empty
            updateingrediantsView()
        }
    })



    $(".oldingrediantButton").click(function () {
        this.parentElement.parentElement.remove()
        //this.parentElement.parentElement.innerHTML = ""
    }) 

}