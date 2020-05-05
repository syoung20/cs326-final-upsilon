import { papayawhip } from "color-name";
import { promises } from "fs";

//sessionStorage.setItem('user_id', 'tinsae@gmail.com')
let searchString: string

$(".spinner-border").hide() //the loading sign
$(".searchParams").hide() // the yellow box alert that allows you to see availble filters

//an event listener for when the search button is clicked
$("#searchButton").click(function () {
    if ($("#searchbar")[0].value != "") { //making sure the search bar isn't empty
        $(".spinner-border").show()
        //performSearch($("#searchbar")[0].value);
        performSearch()
    }
})

//an event listener for when the enter key is clicked
$("#searchbar").keypress(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == 13 && this.value != "") { //making sure the search bar isn't empty
        $(".spinner-border").show()
        $("#searchParams").show()
        //performSearch(this.value)
        performSearch()
    }
})

//event listener to show filter options
$("#searchbar").click(function () {
    $(".searchParams").show()
})





async function performSearch() {
    if ($("#searchbar")[0].value == "") { return }

    let searchQuery = $("#searchbar")[0].value
    /*
    perform fetch of request passing in the search query and parameters object
    */
    let parameters = {
        recipe_categoreis: [],
        ingrediants_list: []
        //add more parameters once we all decide on wgat they will be
    }

    $(".btn-light").each(function () {
        if (this.getAttribute("aria-pressed") == "true") {
            parameters.recipe_categoreis.push(this.value)
        }

    })



    $(".ingrediantInput").each(function (index) {
        if (this.value !== "") {
            parameters.ingrediants_list.push(this.value)
        }
    })

    console.log(parameters)

    let requestBody = {
        "search_query": searchQuery,
        params: parameters
    }

    let url = 'http://localhost:5657/search'


    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': "application/json",
        },
        body: JSON.stringify(requestBody)
    })
        .then(res => res.json())
        .then(async json => {
            $(".spinner-border").hide()
            await updateResultView(json);
        })
        .catch(err => {
            console.log(err.message)
        })


    async function updateResultView(json): Promise<boolean> {
        //remove previous results view
        if (document.getElementById('resultsView') != null) {
            document.getElementById('resultsView').remove()
        }

        if (document.getElementById('filterStatus') != null) {
            document.getElementById('filterStatus').remove()
        }

        console.log(json)

        let mainDiv = document.createElement('div')
        mainDiv.setAttribute('class', 'row')
        mainDiv.setAttribute('id', 'resultsView')


        if (json.filters) {


            let filtersMatched = document.createElement('div')
            if (json.filterMatchCat || json.filterMatchIng && json.recipe_count != 0) {

                filtersMatched.setAttribute('class', 'row alert alert-success')
                filtersMatched.innerText = "We were able to find a match for one or more of your filters"
                filtersMatched.setAttribute('id', 'filterStatus')
                document.getElementById('container').appendChild(filtersMatched)

            }
            else {
                filtersMatched.setAttribute('class', 'row alert alert-danger')
                filtersMatched.innerText = "Sorry, none of your filters matched"
                filtersMatched.setAttribute('id', 'filterStatus')
                document.getElementById('container').appendChild(filtersMatched)
            }

        }


        json.recipes.forEach(element => {

            //nick's result card
            let link = document.createElement('a');
            let resultCard = document.createElement('div')
            resultCard.setAttribute('class', 'result')
            resultCard.setAttribute('id', element['recipe_id'])

            //img
            let imageContainer = document.createElement('div')
            imageContainer.setAttribute('class', 'imgcontainer')
            let image = document.createElement('img')
            image.setAttribute('src', element['image'])
            imageContainer.appendChild(image)
            resultCard.appendChild(imageContainer)

            //title 
            let titleAndlistdiv = document.createElement('div')
            let title = document.createElement('h3')
            title.innerText = element['title']
            titleAndlistdiv.appendChild(title)

            let ul = document.createElement('ul')

            for (let i: number = 0; i < 4; i++) {
                let li = document.createElement('li')
                li.setAttribute('style', 'list-style-type: none')
                if (i == 0) { li.innerText = "Prep-Time: " + element['prep_time'] }
                else if (i == 1) { li.innerText = "Cook-Time: " + element['cook_time'] }
                else if (i == 2) { li.innerText = "Total Time: " + "1hr" } //need to calculate this 
                else if (i == 3) { li.innerText = "Servings: " + element['servings'] }
                ul.appendChild(li)
            }
            titleAndlistdiv.appendChild(ul)
            resultCard.appendChild(titleAndlistdiv)
            //append nick's card to the main result view 
            link.setAttribute('href', '/recipe.html?' + element.recipe_id)
            link.appendChild(resultCard)
            mainDiv.appendChild(link)
            //append main result view to body
        });
        document.getElementById('container').appendChild(mainDiv)
    }
}









/* 

adding parameters 

*/

//event listner for ingrediant add 
$("#ingrediantAdd").click(function () {

    if ($("#ingrediant")[0].value != "") { //making sure the search bar isn't empty

        updateIngrediantsView()
        performSearch()
        addEventListener()
    }
})



//re-do search
$(".btn-light").click(function () {
    performSearch()
})





//an event listener for when the enter key is clicked
$("#ingrediant").keypress(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == 13 && $("#ingrediant")[0].value != "") { //making sure the search bar isn't empty
        updateIngrediantsView()
        performSearch()
        addEventListener()
    }
})



function updateIngrediantsView() {

    // div holding all ingrediants
    let mainDiv = $(".ingrediantsInputG")[0]

    //create new ingrediant add form group



    let inputGroup = document.createElement('div')
    inputGroup.setAttribute('class', 'input-group mb-3')

    //input bar 
    //<input type="text" class="form-control" placeholder="Ingrediant Name" aria-label="Recipient's username" id='ingrediant' aria-describedby="button-addon2">
    let inputBar = document.createElement('input')
    inputBar.setAttribute('class', 'form-control ingrediantInput')
    inputBar.setAttribute('type', 'text')
    inputBar.setAttribute('placeholder', 'Ingrediant Name')
    //inputBar.setAttribute('aria-label', 'Ingrediant')
    inputBar.setAttribute('id', 'ingrediant')
    //inputBar.setAttribute("aria-describedby", "button-addon2")
    inputGroup.appendChild(inputBar)

    let buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'input-group-append')

    let button = document.createElement('button')
    button.setAttribute('class', "btn btn-success")
    button.setAttribute("type", "button")
    button.innerText = "Add"
    button.setAttribute("id", "ingrediantAdd")
    buttonDiv.appendChild(button)
    inputGroup.appendChild(buttonDiv)




    //change old add area

    let oldInputBar = document.getElementById('ingrediant')
    oldInputBar.setAttribute('id', "")

    let oldButton = document.getElementById("ingrediantAdd")
    oldButton.setAttribute('id', '')
    oldButton.setAttribute('class', 'btn btn-danger oldButton')
    oldButton.innerText = 'Remove'





    mainDiv.appendChild(inputGroup)
    addEventListener()

}


function addEventListener() {
    //event listner for ingrediant add 
    $("#ingrediantAdd").click(function () {
        //console.log(this)
        if ($("#ingrediant")[0].value != "") { //making sure the search bar isn't empty
            updateIngrediantsView()
            performSearch()
        }
    })

    //an event listener for when the enter key is clicked
    $("#ingrediant").keypress(function (e) {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode == 13 && this.value != "") { //making sure the search bar isn't empty
            updateIngrediantsView()
            performSearch()
        }
    })


    $(".oldButton").click(function () {
        this.parentElement.parentElement.remove()
        performSearch()
        //this.parentElement.parentElement.innerHTML = ""
    })




}

