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

### /users/{user id}/account
View user account.

## User Pantry List Endpoints

### /users/{user id}/pantry/add
Add a category to the pantry.
Parameters:
- category (string) : name of category, must be unique.
### /users/{user id}/pantry/del
Delete a category.
Parameters:
- category (string) : name of category.
### /users/{user id}/pantry/category id}/add
Add an ingredient to a category.
Parameters:
- ingredient (string) : ingredient to add, must be unique.
### /users/{user id}/pantry/{category id}/del
Delete an ingredient from a category.
Parameters:
- ingredient (string) : ingredient to delete.
### /users/{user id}/pantry/category id}/edit
Edit an ingredient in a category.
Parameters:
- ingredient (string) : ingredient to update.
- new (string) : updated value

## User Grocery List Endpoints

### /users/{user id}/groceries/add
Add a category to the grocery list.
Parameters:
- category (string) : name of category, must be unique.
### /users/{user id}/groceries/del
Delete a category.
Parameters:
- category (string) : name of category.
### /users/{user id}/groceries/{category id}/add
Add an ingredient to a category.
Parameters:
- ingredient (string) : ingredient to add, must be unique.
### /users/{user id}/groceries/{category id}/del
Delete an ingredient from a category.
Parameters:
- ingredient (string) : ingredient to delete.
### /users/{user id}/groceries/{category id}/edit
Edit an ingredient in a category.
Parameters:
- ingredient (string) : ingredient to update.
- new (string) : updated value

## User Recipe Collection Endpoints

### /users/{user id}/recipebook/add
Add a category to the recipe book.
Parameters:
- category (string) : name of category, must be unique.
### /users/{user id}/recipebook/del
Delete a category.
Parameters:
- category (string) : name of category.
### /users/{user id}/recipebook/{category id}/del
Delete a recipe from a category.
Parameters:
- ingredient (string) : recipe to delete.
