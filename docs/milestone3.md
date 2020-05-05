[APPetizers](https://cs326-final-upsilon.herokuapp.com/)
# Database Documentation

We are using PostgreSQL for our database. The database is made up of the following tables: recipes, ingredients, instructions, users, recipebook_categories, recipebook_category_items, pantry_categories, pantry_category_items, grocerylist_categories, and grocerylist_category_items. The columns and datatypes for each are displayed below, with a few edits<sup>*</sup>.

[Database Schema](mockups/appetizers_schema.pdf)

<sup>*</sup>Edits: we are not using the tags table. The recipes table also has a column named description, which is of datatype TEXT. The image column of recipes is also of type TEXT. In addition, all of the table id's (the primary keys) that are listed as type INT in the diagram are actually of type SERIAL in the Postgres database.

## Descriptions of Columns

### recipes

- recipe_id: a unique identifier for a record in recipes
- user_id: the user who created the recipe
- title: the title of the recipe
- image: the data url of the image uploaded of the recipe
- prep_time: the time it takes to prep ingredients for the recipe
- cook_time: the time spent cooking for a recipe
- servings: the number of servings the recipe makes
- description: a description of the recipe

### ingredients

- ingredient_id: a unique identifier for a record in ingredients (records correlate a recipe with a single ingredient for the recipe)
- recipe_id: the recipe_id that this ingredient record corresponds to
- ingredient: the ingredient of the record that is used in the recipe
- order: the number item it is on the ingredient list of the recipe

### instructions

- instruction_id: a unique identifier for a record in instructions (records correlate a recipe with a single instruction for the recipe)
- recipe_id: the recipe_id that this instruction record corresponds to
- instruction: the instruction of the record that is used in the recipe
- order: the number item it is on the instruction list of the recipe

### users

- user_id: the unique email address that the user registered an account with
- name: the name of the user
- password: the password for the user account

### recipebook_categories

- recipebook_category_id: the unique identifier for a record in the table (a record correlates a user with a single one of their recipebook categories)
- user_id: the user account that has this category record
- category: the name of the category

### recipebook_category_items

- recipebook_category_item_id: the unique identifier for a record in the table (a record correlates a recipebook category with a single recipe in the category)
- recipebook_category_id: the recipebook category that has this recipe
- recipe_id: the recipe that is in this category

### pantry_categories

- pantry_category_id: the unique identifier for a record in the table (a record correlates a user with a single one of their pantry categories)
- user_id: the user account that has this category record
- category: the name of the category

### pantry_category_items

- pantry_category_item_id: the unique identifier for a record in the table (a record correlates a pantry category with a single ingredient in the category)
- pantry_category_id: the pantry category that has this ingredient
- item: the ingredient in the pantry category

### grocerylist_categories

- grocerylist_category_id: the unique identifier for a record in the table (a record correlates a user with a single one of their grocery list categories)
- user_id: the user account that has this category record
- category: the name of the category

### grocerylist_category_items

- grocerylist_category_item_id: the unique identifier for a record in the table (a record correlates a grocery list category with a single ingredient in the category)
- grocerylist_category_id: the grocery list category that contains this grocery list item
- item: the ingredient in the grocery list category

# Division of Labor

- Sarah created the database structure, wrote the database functions called by routes/users/users.js(the database functions needed to provide data for the account.html page), and added the back-end functionality in users.js. 
- Nick wrote some of the functions called by `account.js` in database.ts. He also implemented sign up and login on the website that required implementing the backend functionality in account.js. Also, nick implemented the recipe view page (`recipe.js`) where search results can be viewed individually with much more detail than the homepage - this required implementing the back end functionality in `recipes.ts`
- Tinsae implemented the search functionality on the home page - this required implementing the functionality in the back end to query our SQL database and do appropriate filtering. Tinsae also implemented the Create A Recipe page where users can submit a recipe to get added to the database. 
