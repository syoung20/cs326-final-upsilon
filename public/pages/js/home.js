document.getElementsByTagName('button')[0].addEventListener('click', nextStep); 

function nextStep() {
    let textInput = document.getElementsByTagName('input')[0].value;
    if (textInput == "") {
        let div = document.createElement('div');
        div.setAttribute('class', 'alert alert-danger');
        div.setAttribute('id', 'warningText');
        div.innerHTML = 'Enter something to Searh';
        document.getElementById('search').appendChild(div);
    } else {
        if (document.getElementById('warningText')) {
            let delWarning = document.getElementById('warningText');
            delWarning.parentNode.removeChild(delWarning)
        } else {
            let title = document.createElement('div');
            title.setAttribute('class', 'row justify-content-center results')
            title.innerHTML = document.getElementById('fillerC').innerHTML
            document.getElementById('search').appendChild(title);
            }

        }
}