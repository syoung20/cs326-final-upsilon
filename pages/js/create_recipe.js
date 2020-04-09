document.getElementsByTagName('button')[0].addEventListener('click', nextStep);

function nextStep() {
    let textInput = document.getElementsByTagName('input')[0].value;
    if (textInput == "") {
        let div = document.createElement('div');
        div.setAttribute('class', 'alert alert-danger');
        div.setAttribute('id', 'warningText');
        div.innerHTML = 'You need to enter a title';
        document.getElementById('content-area').appendChild(div);
    } else {
        if (document.getElementById('warningText')) {
            let delWarning = document.getElementById('warningText');
            delWarning.parentNode.removeChild(delWarning)
        } else {
            let title = document.createElement('div');
            title.setAttribute('class', 'row justify-content-center')
            title.innerHTML = "<h1>" + textInput + "</h1>"
            document.getElementById('content-area').appendChild(title);
            document.getElementsByTagName('h1')[0].innerText = 'Ingredients' 
            document.getElementsByTagName('p')[4].innerText = "Type your Ingredients and hit enter one by one. When you are done inputting all the ingredients that are present in your recipe, click the 'Next' button at the bottom."
            }

        }
    }