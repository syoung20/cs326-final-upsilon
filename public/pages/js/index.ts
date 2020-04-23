import { papayawhip } from "color-name";

$(".spinner-border").hide() 
$(".searchParams").hide() 

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



let params = {
    recipe_categoreis : []
}

$(".btn-primary").click(function(e) {
    if($(this).attr("aria-pressed") == "false"){
        params.recipe_categoreis.push($(this)[0].value)
    }
})





async function performSearch(userQuery) {
    
    console.log(console.log(params))
    

}