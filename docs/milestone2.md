# API Documentation
## Endpoint Reference

# General Endpoints


### /search
Once the user searches for something, we will make a POST request to this endpoint with the parameters below in the body of the post request.

Parameters:
- term (string): search term
- limit (number): number of recipes returned
- offset (number): index to begin returning recipes
- include (list of strings): ingredients to include
- omit (list of strings): ingredients to not include
- tags (list of strings): tags to search for
Response:
- the server will return a response formatted in JSON



### /login
Sign into user account
### /signup
Create a new user.

### /logout
Log out of current accout.
### /recoverPassword
Revover/ change password.


# Recipe Endpoints

### /recipes/add
Add a recipe. Requires user authentication. Once authenticated, the user will fill out a form that includes all parts of the recipe, and then that will be sent to the server with a post request. 

### /recipes/{recipe id}/read 
View a recipe corresponding to the recipe ID.
### /recipes/{recipe id}/edit
Edit an existing recipe. Requires user authentication.
Parameters: ?
### /recipes/{recipe id}/del
Delete an existing recipe. Requires user authentication.
### /recipes/addgroceries
Edit grocery list (if user is logged in), by adding ingredients from recipe
Parameters:
- ingredients (list of strings) : ingredients to add
### /recipes/saverecipe
Add recipe to a recipe book category (if user is logged in).
Parameters:
- category (string) : recipe book category to add recipe to

## Comment Endpoints

### /recipes/{recipe id}/comments/add
Create a comment on a recipe.
Parameters:
- rating (number) : rating for recipe
- comment (string) : text content of comment
### /recipes/{recipe id}/comments/{comment id}/del
Delete a comment on a recipe. Requires user authentication - recipes can only be deleted by the user that created it.
### /recipes/{recipe id}/comments/{comment id}/edit
Edit a comment on a recipe. Requires user authentication.
- rating (number) : updated rating
- comment (string) : updated comment

# User Endpoints
All require user authentication.

### /users/read
View user account.

Parameters:
- userId (String) : unique username of the user

Response:
- userId (String)
- name (String) : name of user
- categories (Array of objects) : an array of recipe book categories, which are objects made up of category id, category title, and category image
- status (number) : status code

## User Pantry List Endpoints

### /users/pantry/read
Read the pantry data.

Parameters:
- userId (String) : unique username of the user

Response:
- userId (String) : userId from request
- categories (Array of objects) : an array of pantry categories, where each category is an object made up of an id, a title, and an array of food items (Strings).
- status (number) : status code

### /users/pantry/cat/add
Add a category to the pantry.

Parameters:
- userId (String) : unique username
- category (String) : name of category.
Response:
- userId (String) : userId from request
- categoryId (number) : the unique category id
- category (String) : name of category from request
- status (number) : status code

### /users/pantry/cat/del
Delete a category.

Parameters:
- userId (String) : unique username
- categoryId (number) : the category id
Response:
- userId (String) : userId from request
- categoryId (number) : categoryId from request
- status (number) : status code

### /users/pantry/cat/edit
Edit a category. Compares the title and list of ingredients to any existing values, updating the values.

Parameters:
- userId (String) : unique username
- categoryId (number) : the category id
- title (String) : name of category (if changed)
- ingredients (Array of strings) : list of ingredient (if changed)
Response:
- userId (String) : userId from request
- categoryId (number) : the category id from request
- title (String) : the title from request (if changed)
- ingredients (Array of strings) : the array from request (if changed)
- status (number) : status code

## User Grocery List Endpoints

### /users/grocery/read
Read the grocery list data

Parameters:
- userId (String) : unique username of the user
Response:
- userId (String) : userId from request
- categories (Array of objects) : an array of grocery categories, where each category is an object made up of an id, a title, and an array of food items (Strings).
- status (number) : status code

### /users/grocery/cat/add
Add a category to the grocery list.

Parameters:
- userId (String) : unique username
- category (String) : name of category.
Response:
- userId (String) : userId from request
- categoryId (number) : the unique category id
- category (String) : name of category from request
- status (number) : status code

### /users/grocery/cat/del
Delete a category.

Parameters:
- userId (String) : unique username
- categoryId (number) : the category id
Response:
- userId (String) : userId from request
- categoryId (number) : categoryId from request
- status (number) : status code

### /users/grocery/cat/edit
Edit a category. Compares the title and list of ingredients to any existing values, updating the values.

Parameters:
- userId (String) : unique username
- categoryId (number) : the category id
- title (String) : name of category (if changed)
- ingredients (Array of strings) : list of ingredient (if changed)
Response:
- userId (String) : userId from request
- categoryId (number) : the category id from request
- title (String) : the title from request (if changed)
- ingredients (Array of strings) : the array from request (if changed)
- status (number) : status code

## User Recipe Collection Endpoints

### /users/recipebook/read
Read the recipe book data

Parameters:
- userId (String) : unique username of the user
Response:
- userId (String) : userId from request
- categories (Array of objects) : an array of recipe book categories, which are objects made up of category id, category title, and category image
- status (number) : status code

### /users/recipebook/cat/add
Add a category to the recipe book.

Parameters:
- userId (String) : unique username
- category (String) : name of category.
Response:
- userId (String) : userId from request
- categoryId (number) : the unique category id
- category (String) : name of category from request
- status (number) : status code

### /users/recipebook/cat/del
Delete a category.

Parameters:
- userId (String) : unique username
- categoryId (number) : the category id
Response:
- userId (String) : userId from request
- categoryId (number) : categoryId from request
- status (number) : status code

### /users/recipebook/cat/read
View recipes in a category.

Parameters:
- userId (String) : unique username of the user
- categoryId (number) : id of category
Response:
- userId (String) : userId from request
- categoryId (number) : category id from request
- title (String) : title of the category
- recipes (Array of objects) : an array of recipes, where each recipe is an object made up of an id (number), a title (String), and an image url (String)
- status (number) : status code

### /users/recipebook/cat/edit
Delete a recipe from a category.

Parameters:
- userId (String) : unique username of the user
- categoryId (number) : the category id
- recipeId (number) : the recipe id of recipe to delete
Response:
- userId (String) : user id from request
- categoryId (number) : category id from request
- recipeId (number) : recipe id from request
- status (number) : status code