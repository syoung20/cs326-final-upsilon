import { papayawhip } from "color-name";
import { promises } from "fs";

$(".spinner-border").hide() //the loading sign
$(".searchParams").hide() // the yellow box alert that allows you to see availble filters

//an event listener for when the search button is clicked
$("#searchButton").click(function () {
    if ($("#searchbar")[0].value != "") { //making sure the search bar isn't empty
        $(".spinner-border").show()
        performSearch($("#searchbar")[0].value);
    }
})

//an event listener for when the enter key is clicked
$("#searchbar").keypress(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == 13 && this.value != "") { //making sure the search bar isn't empty
        $(".spinner-border").show()
        $("#searchParams").show()
        performSearch(this.value)
    }
})

//event listener to show filter options
$("#searchbar").click(function () {
    $(".searchParams").show()
})



let parameters = {
    recipe_categoreis: [],
    //add more parameters once we all decide on wgat they will be
}

$(".btn-primary").click(function (e) {
    if ($(this).attr("aria-pressed") == "false") {
        parameters.recipe_categoreis.push($(this)[0].value)
    }
})





async function performSearch(searchQuery) {

    /*
    perform fetch of request passing in the search query and parameters object
    */


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
        if(document.getElementById('resultsView') != null){
            document.getElementById('resultsView').remove()
        }

        let mainDiv = document.createElement('div')
        mainDiv.setAttribute('class', 'row')
        mainDiv.setAttribute('id', 'resultsView')
        //mainDiv.setAttribute('class', 'justify-content-center')

        json.recipes.forEach(element => {

            //nick's result card
            let resultCard = document.createElement('div')
            resultCard.setAttribute('class', 'result')
            resultCard.setAttribute('id', element['recipe_id'])

            //img
            let imageContainer = document.createElement('div')
            imageContainer.setAttribute('class', 'imgcontainer')
            let image = document.createElement('img')
            image.setAttribute('src', 'images/img.jpg')
            imageContainer.appendChild(image)
            resultCard.appendChild(imageContainer)

            //title 
            let titleAndlistdiv = document.createElement('div')
            let title = document.createElement('h3')
            title.innerText = element['title']
            titleAndlistdiv.appendChild(title)

            let ul = document.createElement('ul')
            
            for(let i : number = 0; i < 4; i++){
                let li = document.createElement('li')
                li.setAttribute('style', 'list-style-type: none')
                if(i == 0){li.innerText = "Prep-Time: " + "20mins"}
                else if(i == 1){li.innerText = "Cook-Time: " + "40mins"}
                else if(i == 2){li.innerText = "Total Time: " + "1hr"}
                else if(i == 3){li.innerText = "Servings: "+ "4"}
                ul.appendChild(li)
            }
            titleAndlistdiv.appendChild(ul)
            resultCard.appendChild(titleAndlistdiv)
            //append nick's card to the main result view 
            mainDiv.appendChild(resultCard)
            //append main result view to body
        });
        document.getElementsByTagName('body')[0].appendChild(mainDiv)
    }
}