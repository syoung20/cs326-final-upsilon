let express = require('express');
let path = require('path');
const app = express();
const exphbs = require('express-handlebars')

//the port the server should be listening on 
const PORT = process.env.PORT || 5657;

// static home page 
app.use(express.static(path.join(__dirname, 'public/pages')));

//start listening on the port specified
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))


//Handlebar middleware 
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//route to the different pages
app.use('/search', require('./routes/search/search'))
app.use('/account', require('./routes/account/account')) // not sure if the root should be login or signup
app.use('/recipes', require('./routes/recipes/recipes')) 
app.use('/users', require('./routes/users/users'))
