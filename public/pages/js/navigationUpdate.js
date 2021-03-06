// check to see if the user is logged in 
var user_id = localStorage.getItem('user_id');
//user_id = "tinsae"
if (user_id == null) {
    //user is not logged in
    //append this 
    //    <li class="nav-item justify-content-end">
    //                          <a class="nav-link" href="login.html">Login</a>
    //                </li>
    var login = document.createElement('li');
    login.setAttribute('class', "nav-item justify-content-end");
    var loginLink = document.createElement('a');
    loginLink.setAttribute('class', "nav-link");
    loginLink.setAttribute('href', 'login.html');
    loginLink.innerText = 'Login';
    login.appendChild(loginLink);
    document.getElementById('navItems').appendChild(login);
}
if (user_id != null) {
    //create a recipe
    var creatR = document.createElement('li');
    creatR.setAttribute('class', "nav-item justify-content-end");
    var creatRLink = document.createElement('a');
    creatRLink.setAttribute('class', "nav-link");
    creatRLink.setAttribute('href', 'create_recipe.html');
    creatRLink.innerText = 'Create A Recipe';
    creatR.appendChild(creatRLink);
    document.getElementById('navItems').appendChild(creatR);
    //my account
    var myAccount = document.createElement('li');
    myAccount.setAttribute('class', "nav-item justify-content-end");
    var myAccountLink = document.createElement('a');
    myAccountLink.setAttribute('class', "nav-link");
    myAccountLink.setAttribute('href', 'account.html');
    myAccountLink.innerText = 'My Account';
    myAccount.appendChild(myAccountLink);
    document.getElementById('navItems').appendChild(myAccount);
    var logout = document.createElement('li');
    logout.setAttribute('class', 'nav-item');
    var buttonl = document.createElement('button');
    buttonl.setAttribute('type', 'button');
    buttonl.setAttribute('class', 'btn btn-outline-danger');
    buttonl.setAttribute('style', 'border: none');
    buttonl.setAttribute('id', 'leaveUs');
    buttonl.innerText = "Log Out";
    logout.appendChild(buttonl);
    document.getElementById('navItems').appendChild(logout);
    document.getElementById('leaveUs').addEventListener('click', function () {
        localStorage.clear();
        window.location.href = './index.html';
    });
}
