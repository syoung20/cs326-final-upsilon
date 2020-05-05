
// check to see if the user is logged in 

let user_id = localStorage.getItem('user_id')
//user_id = "tinsae"
if (user_id == null) {
    //user is not logged in
    //append this 
    //    <li class="nav-item justify-content-end">
    //                          <a class="nav-link" href="login.html">Login</a>
    //                </li>
    let login = document.createElement('li')
    login.setAttribute('class', "nav-item justify-content-end")
    let loginLink = document.createElement('a')
    loginLink.setAttribute('class', "nav-link")
    loginLink.setAttribute('href', 'login.html')
    loginLink.innerText = 'Login';
    login.appendChild(loginLink)

    document.getElementById('navItems').appendChild(login)
}

if (user_id != null) {
    //create a recipe
    let creatR = document.createElement('li')
    creatR.setAttribute('class', "nav-item justify-content-end")
    let creatRLink = document.createElement('a')
    creatRLink.setAttribute('class', "nav-link")
    creatRLink.setAttribute('href', 'create_recipe.html')
    creatRLink.innerText = 'Create A Recipe'
    creatR.appendChild(creatRLink)
    document.getElementById('navItems').appendChild(creatR)
    //my account
    let myAccount = document.createElement('li')
    myAccount.setAttribute('class', "nav-item justify-content-end")
    let myAccountLink = document.createElement('a')
    myAccountLink.setAttribute('class', "nav-link")
    myAccountLink.setAttribute('href', 'account.html')
    myAccountLink.innerText = 'My Account'
    myAccount.appendChild(myAccountLink)
    document.getElementById('navItems').appendChild(myAccount)

}

