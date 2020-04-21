var express = require('express');
var path = require('path');
var app = express();
//the port the server should be listening on 
var PORT = process.env.PORT || 5657;
// static home page 
app.use(express.static(path.join(__dirname, 'public/pages')));
//start listening on the port specified
app.listen(PORT, function () { return console.log("Server started on port " + PORT); });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//route to the different pages
app.use('/search', require('./routes/search/search'));
app.use('/account', require('./routes/account/account')); // not sure if the root should be login or signup
app.use('/recipes', require('./routes/recipes/recipes'));
app.use('/users', require('./routes/users/users'));
