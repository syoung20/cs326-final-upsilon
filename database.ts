class Database {
	faker = require('faker');
	private pgp = require('pg-promise')();

	private uri = "process.env.DB_URI";
	//process.env.DB_URI;
	private dbName: string = "wwidmexm";
	private db: any;


	constructor(dbName: string) {
		this.dbName = dbName;
		this.db = this.pgp(this.uri);
		console.log("db = " + JSON.stringify(this.db));

		(async () => {
			//create users table
			try {
				let result = await this.db.any('CREATE TABLE users (user_id VARCHAR(30) PRIMARY KEY, name VARCHAR(30) NOT NULL, password VARCHAR(100) NOT NULL)');
				console.log('users table succesfully created');
			} catch (e) {
				console.log('users table already created');
			}
			//create recipes table
			try {
				let result = await this.db.any('CREATE TABLE recipes (recipe_id SERIAL PRIMARY KEY, user_id VARCHAR(30) NOT NULL, title VARCHAR (100) NOT NULL, image TEXT, prep_time INT NOT NULL, cook_time INT NOT NULL, servings INT NOT NULL, CONSTRAINT recipes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE)');
				console.log('recipes table successfully created');
			} catch (e) {
				console.log('recipes table already created');
			}
			//create recipebook table
			try {
				let result = await this.db.any('CREATE TABLE recipebook_categories (recipebook_category_id SERIAL PRIMARY KEY, user_id VARCHAR(30) NOT NULL, category VARCHAR(30) NOT NULL, CONSTRAINT recipebook_categories_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE)')
				console.log('recipebook categories table successfully created');
			} catch (e) {
				console.log('recipebook categories table already created');
			}
			//create recipebook category items table
			try {
				let result = await this.db.any('CREATE TABLE recipebook_category_items (recipebook_category_item_id SERIAL PRIMARY KEY, recipebook_category_id INT NOT NULL, recipe_id INT NOT NULL, CONSTRAINT recipebook_category_items_category_id_fkey FOREIGN KEY (recipebook_category_id) REFERENCES recipebook_categories (recipebook_category_id) ON DELETE CASCADE, CONSTRAINT recipebook_category_items_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE)')
				console.log('recipebook category items table successfully created');
			} catch (e) {
				console.log('recipebook category items table already created');
			}
			//create pantry table
			try {
				let result = await this.db.any('CREATE TABLE pantry_categories (pantry_category_id SERIAL PRIMARY KEY, user_id VARCHAR(30) NOT NULL, category VARCHAR(30) NOT NULL, CONSTRAINT pantry_categories_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE)')
				console.log('pantry categories table successfully created');
			} catch (e) {
				console.log('pantry categories table already created');
			}
			//create pantry category items table
			try {
				let result = await this.db.any('CREATE TABLE pantry_category_items (pantry_category_item_id SERIAL PRIMARY KEY, pantry_category_id INT NOT NULL, item VARCHAR(30) NOT NULL, CONSTRAINT pantry_category_items_category_id_fkey FOREIGN KEY (pantry_category_id) REFERENCES pantry_categories (pantry_category_id) ON DELETE CASCADE)')
				console.log('pantry category items table successfully created');
			} catch (e) {
				console.log('pantry category items table already created');
			}
			//create grocery list table
			try {
				let result = await this.db.any('CREATE TABLE grocerylist_categories (grocerylist_category_id SERIAL PRIMARY KEY, user_id VARCHAR(30) NOT NULL, category VARCHAR(30) NOT NULL, CONSTRAINT grocerylist_categories_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE)')
				console.log('grocerylist categories table successfully created');
			} catch (e) {
				console.log('grocerylist categories table already created');
			}
			//create grocery list items table
			try {
				let result = await this.db.any('CREATE TABLE grocerylist_category_items (grocerylist_category_item_id SERIAL PRIMARY KEY, grocerylist_category_id INT NOT NULL, item VARCHAR(30) NOT NULL, CONSTRAINT grocerylist_category_items_category_id_fkey FOREIGN KEY (grocerylist_category_id) REFERENCES grocerylist_categories (grocerylist_category_id) ON DELETE CASCADE)')
				console.log('grocerylist category items table successfully created');
			} catch (e) {
				console.log('grocerylist category items table already created');
			}
			//create ingredient list table
			try {
				let result = await this.db.any('CREATE TABLE ingredients (ingredient_id SERIAL PRIMARY KEY, recipe_id INT NOT NULL, ingredient VARCHAR (100) NOT NULL, order_num INT NOT NULL, CONSTRAINT ingredients_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE)');
				console.log('ingredients table successfully created');
			} catch (e) {
				console.log('ingredients table already created');
			}
			//create instruction list table
			try {
				let result = await this.db.any('CREATE TABLE instructions (instruction_id SERIAL PRIMARY KEY, recipe_id INT NOT NULL, instruction TEXT NOT NULL, order_num INT NOT NULL, CONSTRAINT instructions_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE)');
				console.log('instructions table succesfully created');
			} catch (e) {
				console.log('instructions table already created');
			}
			//create tags table
			try {
				let result = await this.db.any('CREATE TABLE tags (tag_id SERIAL PRIMARY KEY, tag VARCHAR (30) NOT NULL, recipe_id INT NOT NULL, CONSTRAINT tags_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE)');
				console.log('tags table successfully created');
			} catch (e) {
				console.log('tags table already created');
			}
			//insert fake data
			/*
			for (let i : number = 0; i < 10; i++) {
				await this.db.none({text:'INSERT INTO users VALUES ($1, $2, $3)', values: ["test"+i+"@email.com", "test"+i, "password"+i]});
			}
			for (let i : number = 0; i < 50; i++) {
				await this.db.none({text: 'INSERT INTO recipes VALUES (DEFAULT, $1, $2, $3, $4, $5, $6)', values: ["test"+this.faker.random.number({'min': 0, 'max': 9})+"@email.com", this.faker.random.words(), this.faker.random.image(), this.faker.random.number({'min': 0, 'max': 100}), this.faker.random.number({'min': 0, 'max': 100}), this.faker.random.number({'min': 0, 'max': 10})]});
			}
			
			for (let i : number = 0; i < 50; i++) {
				await this.db.none({text: 'INSERT INTO recipebook_categories VALUES (DEFAULT, $1, $2)', values : ["test"+this.faker.random.number({'min': 0, 'max' : 9})+"@email.com", this.faker.random.word()]});
			}
			
			for (let i : number = 0; i < 100; i++) {
				await this.db.none({text: 'INSERT INTO recipebook_category_items VALUES (DEFAULT, $1, $2)', values : [this.faker.random.number({'min': 83, 'max':132}), this.faker.random.number({'min': 51, 'max': 100})]})
			}
	
			for (let i : number = 0; i < 50; i++) {
				await this.db.none({text: 'INSERT INTO pantry_categories VALUES (DEFAULT, $1, $2)', values : ["test"+this.faker.random.number({'min':0, 'max': 9})+"@email.com", this.faker.random.word()]});
			}
	
			for (let i : number = 0; i < 100; i++) {
				await this.db.none({text: 'INSERT INTO pantry_category_items VALUES (DEFAULT, $1, $2)', values : [this.faker.random.number({'min': 1, 'max':50}), this.faker.random.word()]});
			}
			for (let i : number = 0; i < 50; i++) {
				await this.db.none({text: 'INSERT INTO grocerylist_categories VALUES (DEFAULT, $1, $2)', values : ["test"+this.faker.random.number({'min':0, 'max': 9})+"@email.com", this.faker.random.word().slice(0,29)]});
			}
			for (let i : number = 0; i < 100; i++) {
				await this.db.none({text: 'INSERT INTO grocerylist_category_items VALUES (DEFAULT, $1, $2)', values : [this.faker.random.number({'min': 26, 'max':75}), this.faker.random.word().slice(0, 29)]});
			}*/
		})();
	}

	public async getUserData(userId: string): Promise<string | null> {
		console.log("get: userId = " + userId);
		try {
			let result = await this.db.one({ text: "SELECT name FROM users WHERE user_id = $1", values: [userId] });
			let name: string = result["name"];
			console.log(name);
			return name;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	public async loginUser(userId: string): Promise<string | null> {
		console.log("get: userId = " + userId);
		try {
			let result = await this.db.one({ text: "SELECT * FROM users WHERE user_id = $1", values: [userId] });
			return result;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	public async putUserData(userId: string, userName: string, userPswd: string): Promise<string | null> {
		console.log("put: userId = " + userId + ", userName = " + userName + ", userPswd = SECURED");
		try {
			let result = await this.db.one({ text: "INSERT INTO users (user_id, name, password) VALUES ($1, $2, $3) RETURNING user_id", values: [userId, userName, userPswd] });
			console.log(result);
			return result;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	public async putRecipeData(userId: string, title: string, img: string, prep: number, cook: number, servings: number, description: string, instructions: string[], ingredients: string[], quantities: string[]): Promise<number | null> {
		console.log("put: userId = " + userId + ", title: " + title + ", img: " + img.slice(0, 10) + ", prep: " + prep + ", cook: " + cook + ", servings: " + servings);
		try {
			let result = await this.db.one({ text: "INSERT INTO recipes VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING recipe_id", values: [userId, title, img, prep, cook, servings, description] });
			for (let i: number = 0; i < instructions.length; i++) {
				if (instructions[i] != "") {
					await this.db.none({ text: "INSERT INTO instructions VALUES (DEFAULT, $1, $2, $3)", values: [result.recipe_id, instructions[i], (i + 1)] });
				}
			}
			for (let i: number = 0; i < ingredients.length; i++) {
				if (ingredients[i] != "") {
					await this.db.none({ text: "INSERT INTO ingredients VALUES (DEFAULT, $1, $2, $3, $4)", values: [result.recipe_id, ingredients[i], quantities[i], (i + 1)] });
				}
			}
			return result;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	public async getRecipeData(recipeId: number): Promise<object | null> {
		console.log("get: recipeId = " + recipeId);
		try {
			let result = await this.db.one({ text: "SELECT * FROM recipes WHERE recipe_id = $1", values: [recipeId] });
			return result;
		} catch (err) {
			console.log("error getting recipe data")
			return null;
		}
	}

	public async getRecipeIngredients(recipeId: number): Promise<object | null> {
		console.log("get: recipeId = " + recipeId);
		try {
			let result = await this.db.many({ text: "SELECT * FROM ingredients WHERE recipe_id = $1 ORDER BY order_num ASC LIMIT 100", values: [recipeId] });
			return result;
		} catch {
			console.log("error getting recipe ingredients")
			return null;
		}
	}

	public async getRecipeInstructions(recipeId: number): Promise<object | null> {
		console.log("get: recipeId = " + recipeId);
		try {
			let result = await this.db.many({ text: "SELECT (instruction) FROM instructions WHERE recipe_id = $1 ORDER BY order_num ASC LIMIT 100", values: [recipeId] });
			return result;
		} catch {
			console.log("error getting recipe instructions")
			return null;
		}
	}


	public async getRecipebookData(userId: string): Promise<object | null> {
		console.log("get: userId = ");
		try {
			let result = await this.db.any({ text: "SELECT (recipebook_categories.recipebook_category_id, category, image) FROM recipebook_categories LEFT JOIN (SELECT distinct on (recipebook_category_id) recipebook_category_id, recipe_id FROM recipebook_category_items) as distinct_category_items ON recipebook_categories.recipebook_category_id=distinct_category_items.recipebook_category_id LEFT JOIN recipes ON distinct_category_items.recipe_id = recipes.recipe_id WHERE recipebook_categories.user_id = $1", values: [userId] });
			return result;
		} catch (err) {
			console.log("error getting recipebook data");
			return null;
		}
	}

	public async getRecipebookCategoryData(userId, categoryId): Promise<Array<object> | null> {
		try {
			let title: object = await this.db.one({ text: "SELECT (category) FROM recipebook_categories WHERE recipebook_categories.recipebook_category_id = $1", values: [categoryId] });
			let recipes: Array<object> = await this.db.any({ text: "SELECT (recipes.recipe_id, recipes.title, image) FROM recipebook_categories LEFT JOIN recipebook_category_items ON recipebook_category_items.recipebook_category_id = recipebook_categories.recipebook_category_id LEFT JOIN recipes ON recipebook_category_items.recipe_id = recipes.recipe_id WHERE recipebook_categories.recipebook_category_id = $1", values: [categoryId] });
			recipes.unshift(title)
			return recipes;
		} catch (err) {
			console.log("error getting recipebook category data")
			return null;
		}
	}

	public async deleteRecipebookCategory(userId, categoryId): Promise<void> {
		try {
			await this.db.none({ text: "DELETE FROM recipebook_categories WHERE recipebook_categories.recipebook_category_id = $1", values: [categoryId] });
			return;
		} catch (err) {
			console.log("error remove recipebook category");
			return;
		}
	}

	public async addRecipebookCategory(userId, category): Promise<object> {
		try {
			let result: object = await this.db.one({ text: "INSERT INTO recipebook_categories VALUES (DEFAULT, $1, $2) RETURNING recipebook_category_id", values: [userId, category] });
			console.log(JSON.stringify(result));
			return result;
		} catch (err) {
			console.log("error adding category");
		}
	}

	public async removeCategoryRecipe(userId, categoryId, recipeId): Promise<void> {
		try {
			let result: object = await this.db.none({ text: "DELETE FROM recipebook_category_items WHERE recipebook_category_items.recipe_id = $1", values: [recipeId] });
			return;
		} catch (err) {
			console.log("error removing recipe from category");
			return;
		}
	}
	public async getPantryData(userId): Promise<object | null> {
		try {
			let result: object = await this.db.any({ text: "SELECT (pantry_categories.pantry_category_id, pantry_categories.category, pantry_category_items.item) FROM users LEFT JOIN pantry_categories ON users.user_id = pantry_categories.user_id LEFT JOIN pantry_category_items ON pantry_categories.pantry_category_id = pantry_category_items.pantry_category_id WHERE users.user_id = $1", values: [userId] });
			return result;
		} catch (err) {
			console.log("error getting pantry data");
			return null;
		}
	}
	public async getGroceryData(userId): Promise<object | null> {
		try {
			let result: object = await this.db.any({ text: "SELECT (grocerylist_categories.grocerylist_category_id, grocerylist_categories.category, grocerylist_category_items.item) FROM users LEFT JOIN grocerylist_categories ON users.user_id = grocerylist_categories.user_id LEFT JOIN grocerylist_category_items ON grocerylist_categories.grocerylist_category_id = grocerylist_category_items.grocerylist_category_id WHERE users.user_id = $1", values: [userId] });
			return result;
		} catch (err) {
			console.log("error getting grocerylist data");
			return null;
		}
	}

	public async updatePantryTitle(id, title): Promise<void> {
		console.log(id + " " + title);
		try {
			await this.db.none({ text: "UPDATE pantry_categories SET category = $1 WHERE pantry_categories.pantry_category_id = $2", values: [title, id] });
		} catch (err) {
			console.log("unable to update pantry category title");
		}
	}

	public async deletePantryItems(catId): Promise<void> {
		try {
			await this.db.none({ text: "DELETE FROM pantry_category_items WHERE pantry_category_items.pantry_category_id = $1", values: [catId] });
		} catch (err) {
			console.log("unable to remove pantry items");
		}
	}

	public async addPantryItems(catId, items): Promise<void> {
		try {
			for (var i: number = 0; i < items.length; i++) {
				if (items[i] != "") {
					await this.db.none({ text: "INSERT INTO pantry_category_items VALUES (DEFAULT, $1, $2)", values: [catId, items[i]] });
				}
			}
		} catch (err) {
			console.log("unable to add pantry item");
		}
	}

	public async deletePantryCategory(catId): Promise<void> {
		try {
			await this.db.none({ text: "DELETE FROM pantry_categories WHERE pantry_categories.pantry_category_id = $1", values: [catId] });
		} catch (err) {
			console.log("unable to delete pantry category");
		}
	}

	public async addPantryCategory(userId, cat): Promise<object | null> {
		try {
			let result: object = await this.db.one({ text: "INSERT INTO pantry_categories VALUES (DEFAULT, $1, $2) RETURNING pantry_category_id", values: [userId, cat] });
			console.log(result);
			return result;
		} catch (err) {
			console.log("unable to add pantry category");
		}
	}

	public async updateGroceryTitle(id, title): Promise<void> {
		console.log(id + " " + title);
		try {
			await this.db.none({ text: "UPDATE grocerylist_categories SET category = $1 WHERE grocerylist_categories.grocerylist_category_id = $2", values: [title, id] });
		} catch (err) {
			console.log("unable to update grocery list category title");
		}
	}

	public async deleteGroceryItems(catId): Promise<void> {
		try {
			await this.db.none({ text: "DELETE FROM grocerylist_category_items WHERE grocerylist_category_items.grocerylist_category_id = $1", values: [catId] });
		} catch (err) {
			console.log("unable to remove grocery list items");
		}
	}

	public async addGroceryItems(catId, items): Promise<void> {
		try {
			for (var i: number = 0; i < items.length; i++) {
				if (items[i] != "") {
					await this.db.none({ text: "INSERT INTO grocerylist_category_items VALUES (DEFAULT, $1, $2)", values: [catId, items[i]] });
				}
			}
		} catch (err) {
			console.log("unable to add grocery list item");
		}
	}

	public async deleteGroceryCategory(catId): Promise<void> {
		try {
			await this.db.none({ text: "DELETE FROM grocerylist_categories WHERE grocerylist_categories.grocerylist_category_id = $1", values: [catId] });
		} catch (err) {
			console.log("unable to delete grocery list category");
		}
	}

	public async addGroceryCategory(userId, cat): Promise<object | null> {
		try {
			let result: object = await this.db.one({ text: "INSERT INTO grocerylist_categories VALUES (DEFAULT, $1, $2) RETURNING grocerylist_category_id", values: [userId, cat] });
			console.log(result);
			return result;
		} catch (err) {
			console.log("unable to add grocery list category");
			return null;
		}
	}

	public async search(searchQ, ingredientParams, catParams): Promise<object | null> {
		try {

			if (ingredientParams == undefined && catParams == undefined) {
				let result: object = await this.db.any({ text: "SELECT DISTINCT ON (recipes.recipe_id) recipes.recipe_id, recipes.user_id, title, image, prep_time, servings, cook_time FROM recipes LEFT JOIN ingredients ON recipes.recipe_id = ingredients.recipe_id LEFT JOIN recipebook_category_items on recipes.recipe_id = recipebook_category_items.recipe_id LEFT JOIN recipebook_categories on recipebook_category_items.recipebook_category_item_id = recipebook_categories.recipebook_category_id WHERE recipes.title ~* $1 LIMIT 100", values: [searchQ]});
				return result
			}

			//console.log(ingredientParams)
			//console.log(catParams)
			else {
				if (ingredientParams != undefined && catParams != undefined) {

					let ingList = ''

					let catList = ''

					ingredientParams.forEach(element => {

						if (ingList == '') {
							ingList = ingList + element
						}
						else {
							ingList = ingList + ',' + element
						}
					});

					catParams.forEach(element => {
						if (catList == '') {
							catList = catList + element
						}
						else {
							catList = catList + ',' + element
						}
					});

					let result: object = await this.db.any({ text: "SELECT DISTINCT ON (recipes.recipe_id) recipes.recipe_id, recipes.user_id, title, image, prep_time, servings, cook_time FROM recipes LEFT JOIN ingredients ON recipes.recipe_id = ingredients.recipe_id LEFT JOIN recipebook_category_items on recipes.recipe_id = recipebook_category_items.recipe_id LEFT JOIN recipebook_categories on recipebook_category_items.recipebook_category_item_id = recipebook_categories.recipebook_category_id WHERE recipes.title ~* $1 AND recipebook_categories.category in ($2) AND ingredients.ingredient in ($3)", values: [searchQ, catList, ingList] });

					return result
				}

				if (catParams != undefined) {



					let catList = ''



					catParams.forEach(element => {
						if (catList == '') {
							catList = catList + element
						}
						else {
							catList = catList + ',' + element
						}
					});

					let result: object = await this.db.any({ text: "SELECT DISTINCT ON (recipes.recipe_id) recipes.recipe_id, recipes.user_id, title, image, prep_time, servings, cook_time FROM recipes LEFT JOIN ingredients ON recipes.recipe_id = ingredients.recipe_id LEFT JOIN recipebook_category_items on recipes.recipe_id = recipebook_category_items.recipe_id LEFT JOIN recipebook_categories on recipebook_category_items.recipebook_category_item_id = recipebook_categories.recipebook_category_id WHERE recipes.title ~* $1 AND recipebook_categories.category in ($2)", values: [searchQ, catList] });

					return result
				}

				if (ingredientParams != undefined) {

					let ingList = ''


					ingredientParams.forEach(element => {

						if (ingList == '') {
							ingList = ingList + element
						}
						else {
							ingList = ingList + ',' + element
						}
					});

					
					let result: object = await this.db.any({ text: "SELECT DISTINCT ON (recipes.recipe_id) recipes.recipe_id, recipes.user_id, title, image, prep_time, servings, cook_time FROM recipes LEFT JOIN ingredients ON recipes.recipe_id = ingredients.recipe_id LEFT JOIN recipebook_category_items on recipes.recipe_id = recipebook_category_items.recipe_id LEFT JOIN recipebook_categories on recipebook_category_items.recipebook_category_item_id = recipebook_categories.recipebook_category_id WHERE recipes.title ~* $1 AND ingredients.ingredient in ($2)", values: [searchQ, ingList]});
					return result
				}
			
			}




			//let result : object = await this.db.any({text: "SELECT DISTINCT ON (recipes.recipe_id) recipes.recipe_id, recipes.user_id, title, image, prep_time, servings, cook_time FROM recipes LEFT JOIN ingredients ON recipes.recipe_id = ingredients.recipe_id LEFT JOIN recipebook_category_items on recipes.recipe_id = recipebook_category_items.recipe_id LEFT JOIN recipebook_categories on recipebook_category_items.recipebook_category_item_id = recipebook_categories.recipebook_category_id WHERE recipes.title ~* $1 LIMIT 100", values : [searchQ]});
			//return result;
		}
		catch (err) {
			console.log("Unable to perform search")
			console.log(err)
		}
	}



	public async formRecipeSubmit(userId: string, title: string, img: string, prep: number, cook: number, servings: number, discription: string): Promise<number | null> {
		//console.log("put: userId = " + userId + ", title: " + title + ", img: " + img + ", prep: " + prep + ", cook: " + cook + ", servings: " + servings + "description: " + discription);
		try {
			let result = await this.db.any({ text: "INSERT INTO recipes VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING recipe_id", values: [userId, title, img, prep, cook, servings, discription] });
			return result;
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	public async addCategoryRecipe(catId: number, recipeId: number) {
		console.log("input: " + catId + ", " + recipeId);
		try {
			await this.db.none({text: 'INSERT INTO recipebook_category_items VALUES (DEFAULT, $1, $2)', values: [catId,recipeId]});
			return;
		} catch (err) {
			console.log(err);
		}
	}
}

const db = new Database('database');
module.exports = db;