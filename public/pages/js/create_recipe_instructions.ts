//event listner for instruction add 
$("#instructionAdd").click(function () {
    
    if ($("#instruction")[0].value != "") { //making sure the search bar isn't empty
        updateinstructionsView()
    }
})

//an event listener for when the enter key is clicked
$("#instruction").keypress(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == 13 && this.value != "") { //making sure the search bar isn't empty
        updateinstructionsView()
    }
})



function updateinstructionsView() {
    // div holding all instructions
    let mainDiv = $("#instructionsCard")[0]

    //create new instruction add form group
    let newFormGroup = document.createElement('div')
    newFormGroup.setAttribute('class', 'input-group mb-3')

    let inputGroup = document.createElement('div')
    inputGroup.setAttribute('class', 'input-group mb-3')

    //input bar 
    //<input type="text" class="form-control" placeholder="instruction Name" aria-label="Recipient's username" id='instruction' aria-describedby="button-addon2">
    let inputBar = document.createElement('input')
    inputBar.setAttribute('class', 'form-control')
    inputBar.setAttribute('type', 'text')
    inputBar.setAttribute('placeholder', 'instruction')
    inputBar.setAttribute('name', "instruction")
    inputBar.setAttribute('aria-label', 'instruction')
    inputBar.setAttribute('id', 'instruction')
    inputBar.setAttribute("aria-describedby", "button-addon2")
    inputGroup.appendChild(inputBar)

    let buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'input-group-append')

    let button = document.createElement('button')
    button.setAttribute('class', "btn btn-success")
    button.setAttribute("type", "button")
    button.innerText = "Add"
    button.setAttribute("id", "instructionAdd")
    buttonDiv.appendChild(button)
    inputGroup.appendChild(buttonDiv)

    newFormGroup.appendChild(inputGroup)


    //change old add area

    let oldInputBar = document.getElementById('instruction')
    oldInputBar.setAttribute('id', "")
    
    let oldButton = document.getElementById("instructionAdd")
    oldButton.setAttribute('id', '')
    oldButton.setAttribute('class', 'btn btn-danger oldInstructionButton')
    oldButton.innerText = 'Remove'





    mainDiv.appendChild(newFormGroup)
    addEventListener()
}


function addEventListener() {
    //event listner for instruction add 
    $("#instructionAdd").click(function () {
        //console.log(this)
        if ($("#instruction")[0].value != "") { //making sure the search bar isn't empty
            updateinstructionsView()
        }
    })

    //an event listener for when the enter key is clicked
    $("#instruction").keypress(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == 13 && this.value != "") { //making sure the search bar isn't empty
            updateinstructionsView()
        }
    })


    $(".oldInstructionButton").click(function () {
        this.parentElement.parentElement.remove()
        //this.parentElement.parentElement.innerHTML = ""
    }) 

}