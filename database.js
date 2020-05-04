var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Database = /** @class */ (function () {
    function Database(dbName) {
        var _this = this;
        this.faker = require('faker');
        this.pgp = require('pg-promise')();
        this.uri = "postgres://wwidmexm:aD7je2Uz9tLDJ5bwe7Fo9qsZChVQmyIo@drona.db.elephantsql.com:5432/wwidmexm";
        this.dbName = "wwidmexm";
        this.dbName = dbName;
        this.db = this.pgp(this.uri);
        console.log("db = " + JSON.stringify(this.db));
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var result, e_1, result, e_2, result, e_3, result, e_4, result, e_5, result, e_6, result, e_7, result, e_8, result, e_9, result, e_10, result, e_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.any('CREATE TABLE users (user_id VARCHAR(30) PRIMARY KEY, name VARCHAR(30) NOT NULL, password VARCHAR(100) NOT NULL)')];
                    case 1:
                        result = _a.sent();
                        console.log('users table succesfully created');
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log('users table already created');
                        return [3 /*break*/, 3];
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.db.any('CREATE TABLE recipes (recipe_id SERIAL PRIMARY KEY, user_id VARCHAR(30) NOT NULL, title VARCHAR (100) NOT NULL, image TEXT, prep_time INT NOT NULL, cook_time INT NOT NULL, servings INT NOT NULL, CONSTRAINT recipes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE)')];
                    case 4:
                        result = _a.sent();
                        console.log('recipes table successfully created');
                        return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        console.log('recipes table already created');
                        return [3 /*break*/, 6];
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.db.any('CREATE TABLE recipebook_categories (recipebook_category_id SERIAL PRIMARY KEY, user_id VARCHAR(30) NOT NULL, category VARCHAR(30) NOT NULL, CONSTRAINT recipebook_categories_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE)')];
                    case 7:
                        result = _a.sent();
                        console.log('recipebook categories table successfully created');
                        return [3 /*break*/, 9];
                    case 8:
                        e_3 = _a.sent();
                        console.log('recipebook categories table already created');
                        return [3 /*break*/, 9];
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, this.db.any('CREATE TABLE recipebook_category_items (recipebook_category_item_id SERIAL PRIMARY KEY, recipebook_category_id INT NOT NULL, recipe_id INT NOT NULL, CONSTRAINT recipebook_category_items_category_id_fkey FOREIGN KEY (recipebook_category_id) REFERENCES recipebook_categories (recipebook_category_id) ON DELETE CASCADE, CONSTRAINT recipebook_category_items_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE)')];
                    case 10:
                        result = _a.sent();
                        console.log('recipebook category items table successfully created');
                        return [3 /*break*/, 12];
                    case 11:
                        e_4 = _a.sent();
                        console.log('recipebook category items table already created');
                        return [3 /*break*/, 12];
                    case 12:
                        _a.trys.push([12, 14, , 15]);
                        return [4 /*yield*/, this.db.any('CREATE TABLE pantry_categories (pantry_category_id SERIAL PRIMARY KEY, user_id VARCHAR(30) NOT NULL, category VARCHAR(30) NOT NULL, CONSTRAINT pantry_categories_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE)')];
                    case 13:
                        result = _a.sent();
                        console.log('pantry categories table successfully created');
                        return [3 /*break*/, 15];
                    case 14:
                        e_5 = _a.sent();
                        console.log('pantry categories table already created');
                        return [3 /*break*/, 15];
                    case 15:
                        _a.trys.push([15, 17, , 18]);
                        return [4 /*yield*/, this.db.any('CREATE TABLE pantry_category_items (pantry_category_item_id SERIAL PRIMARY KEY, pantry_category_id INT NOT NULL, item VARCHAR(30) NOT NULL, CONSTRAINT pantry_category_items_category_id_fkey FOREIGN KEY (pantry_category_id) REFERENCES pantry_categories (pantry_category_id) ON DELETE CASCADE)')];
                    case 16:
                        result = _a.sent();
                        console.log('pantry category items table successfully created');
                        return [3 /*break*/, 18];
                    case 17:
                        e_6 = _a.sent();
                        console.log('pantry category items table already created');
                        return [3 /*break*/, 18];
                    case 18:
                        _a.trys.push([18, 20, , 21]);
                        return [4 /*yield*/, this.db.any('CREATE TABLE grocerylist_categories (grocerylist_category_id SERIAL PRIMARY KEY, user_id VARCHAR(30) NOT NULL, category VARCHAR(30) NOT NULL, CONSTRAINT grocerylist_categories_user_id_fkey FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE)')];
                    case 19:
                        result = _a.sent();
                        console.log('grocerylist categories table successfully created');
                        return [3 /*break*/, 21];
                    case 20:
                        e_7 = _a.sent();
                        console.log('grocerylist categories table already created');
                        return [3 /*break*/, 21];
                    case 21:
                        _a.trys.push([21, 23, , 24]);
                        return [4 /*yield*/, this.db.any('CREATE TABLE grocerylist_category_items (grocerylist_category_item_id SERIAL PRIMARY KEY, grocerylist_category_id INT NOT NULL, item VARCHAR(30) NOT NULL, CONSTRAINT grocerylist_category_items_category_id_fkey FOREIGN KEY (grocerylist_category_id) REFERENCES grocerylist_categories (grocerylist_category_id) ON DELETE CASCADE)')];
                    case 22:
                        result = _a.sent();
                        console.log('grocerylist category items table successfully created');
                        return [3 /*break*/, 24];
                    case 23:
                        e_8 = _a.sent();
                        console.log('grocerylist category items table already created');
                        return [3 /*break*/, 24];
                    case 24:
                        _a.trys.push([24, 26, , 27]);
                        return [4 /*yield*/, this.db.any('CREATE TABLE ingredients (ingredient_id SERIAL PRIMARY KEY, recipe_id INT NOT NULL, ingredient VARCHAR (100) NOT NULL, order_num INT NOT NULL, CONSTRAINT ingredients_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE)')];
                    case 25:
                        result = _a.sent();
                        console.log('ingredients table successfully created');
                        return [3 /*break*/, 27];
                    case 26:
                        e_9 = _a.sent();
                        console.log('ingredients table already created');
                        return [3 /*break*/, 27];
                    case 27:
                        _a.trys.push([27, 29, , 30]);
                        return [4 /*yield*/, this.db.any('CREATE TABLE instructions (instruction_id SERIAL PRIMARY KEY, recipe_id INT NOT NULL, instruction TEXT NOT NULL, order_num INT NOT NULL, CONSTRAINT instructions_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE)')];
                    case 28:
                        result = _a.sent();
                        console.log('instructions table succesfully created');
                        return [3 /*break*/, 30];
                    case 29:
                        e_10 = _a.sent();
                        console.log('instructions table already created');
                        return [3 /*break*/, 30];
                    case 30:
                        _a.trys.push([30, 32, , 33]);
                        return [4 /*yield*/, this.db.any('CREATE TABLE tags (tag_id SERIAL PRIMARY KEY, tag VARCHAR (30) NOT NULL, recipe_id INT NOT NULL, CONSTRAINT tags_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES recipes (recipe_id) ON DELETE CASCADE)')];
                    case 31:
                        result = _a.sent();
                        console.log('tags table successfully created');
                        return [3 /*break*/, 33];
                    case 32:
                        e_11 = _a.sent();
                        console.log('tags table already created');
                        return [3 /*break*/, 33];
                    case 33: return [2 /*return*/];
                }
            });
        }); })();
    }
    Database.prototype.getUserData = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, name_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("get: userId = " + userId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.db.one({ text: "SELECT name FROM users WHERE user_id = $1", values: [userId] })];
                    case 2:
                        result = _a.sent();
                        name_1 = result["name"];
                        console.log(name_1);
                        return [2 /*return*/, name_1];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.loginUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("get: userId = " + userId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.db.one({ text: "SELECT * FROM users WHERE user_id = $1", values: [userId] })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.putUserData = function (userId, userName, userPswd) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("put: userId = " + userId + ", userName = " + userName + ", userPswd = SECURED");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.db.one({ text: "INSERT INTO users (user_id, name, password) VALUES ($1, $2, $3) RETURNING user_id", values: [userId, userName, userPswd] })];
                    case 2:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/, result];
                    case 3:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.putRecipeData = function (userId, title, img, prep, cook, servings, description, instructions, ingredients) {
        return __awaiter(this, void 0, void 0, function () {
            var result, i, i, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("put: userId = " + userId + ", title: " + title + ", img: " + img.slice(0, 10) + ", prep: " + prep + ", cook: " + cook + ", servings: " + servings);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 11, , 12]);
                        return [4 /*yield*/, this.db.one({ text: "INSERT INTO recipes VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING recipe_id", values: [userId, title, img, prep, cook, servings, description] })];
                    case 2:
                        result = _a.sent();
                        console.log(result);
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < instructions.length)) return [3 /*break*/, 6];
                        if (!(instructions[i] != "")) return [3 /*break*/, 5];
                        console.log(i + instructions[i]);
                        return [4 /*yield*/, this.db.none({ text: "INSERT INTO instructions VALUES (DEFAULT, $1, $2, $3)", values: [result.recipe_id, instructions[i], (i + 1)] })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6:
                        i = 0;
                        _a.label = 7;
                    case 7:
                        if (!(i < ingredients.length)) return [3 /*break*/, 10];
                        if (!(ingredients[i] != "")) return [3 /*break*/, 9];
                        console.log(i + ingredients[i]);
                        return [4 /*yield*/, this.db.none({ text: "INSERT INTO ingredients VALUES (DEFAULT, $1, $2, $3)", values: [result.recipe_id, ingredients[i], (i + 1)] })];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        i++;
                        return [3 /*break*/, 7];
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        err_4 = _a.sent();
                        console.log(err_4);
                        return [2 /*return*/, null];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getRecipeData = function (recipeId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("get: recipeId = " + recipeId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.db.one({ text: "SELECT * FROM recipes WHERE recipe_id = $1", values: [recipeId] })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        err_5 = _a.sent();
                        console.log("error getting recipe data");
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getRecipeIngredients = function (recipeId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("get: recipeId = " + recipeId);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.db.many({ text: "SELECT (ingredient) FROM ingredients WHERE recipe_id = $1 ORDER BY order_num ASC LIMIT 100", values: [recipeId] })];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result];
                    case 3:
                        _a = _b.sent();
                        console.log("error getting recipe ingredients");
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getRecipeInstructions = function (recipeId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log("get: recipeId = " + recipeId);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.db.many({ text: "SELECT (instruction) FROM instructions WHERE recipe_id = $1 ORDER BY order_num ASC LIMIT 100", values: [recipeId] })];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, result];
                    case 3:
                        _a = _b.sent();
                        console.log("error getting recipe instructions");
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getRecipebookData = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("get: userId = ");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.db.any({ text: "SELECT (recipebook_categories.recipebook_category_id, category, image) FROM recipebook_categories LEFT JOIN (SELECT distinct on (recipebook_category_id) recipebook_category_id, recipe_id FROM recipebook_category_items) as distinct_category_items ON recipebook_categories.recipebook_category_id=distinct_category_items.recipebook_category_id LEFT JOIN recipes ON distinct_category_items.recipe_id = recipes.recipe_id WHERE recipebook_categories.user_id = $1", values: [userId] })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3:
                        err_6 = _a.sent();
                        console.log("error getting recipebook data");
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getRecipebookCategoryData = function (userId, categoryId) {
        return __awaiter(this, void 0, void 0, function () {
            var title, recipes, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.db.one({ text: "SELECT (category) FROM recipebook_categories WHERE recipebook_categories.recipebook_category_id = $1", values: [categoryId] })];
                    case 1:
                        title = _a.sent();
                        return [4 /*yield*/, this.db.any({ text: "SELECT (recipes.recipe_id, recipes.title, image) FROM recipebook_categories LEFT JOIN recipebook_category_items ON recipebook_category_items.recipebook_category_id = recipebook_categories.recipebook_category_id LEFT JOIN recipes ON recipebook_category_items.recipe_id = recipes.recipe_id WHERE recipebook_categories.recipebook_category_id = $1", values: [categoryId] })];
                    case 2:
                        recipes = _a.sent();
                        recipes.unshift(title);
                        return [2 /*return*/, recipes];
                    case 3:
                        err_7 = _a.sent();
                        console.log("error getting recipebook category data");
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.deleteRecipebookCategory = function (userId, categoryId) {
        return __awaiter(this, void 0, void 0, function () {
            var err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.none({ text: "DELETE FROM recipebook_categories WHERE recipebook_categories.recipebook_category_id = $1", values: [categoryId] })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        err_8 = _a.sent();
                        console.log("error remove recipebook category");
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.addRecipebookCategory = function (userId, category) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.one({ text: "INSERT INTO recipebook_categories VALUES (DEFAULT, $1, $2) RETURNING recipebook_category_id", values: [userId, category] })];
                    case 1:
                        result = _a.sent();
                        console.log(JSON.stringify(result));
                        return [2 /*return*/, result];
                    case 2:
                        err_9 = _a.sent();
                        console.log("error adding category");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.removeCategoryRecipe = function (userId, categoryId, recipeId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.none({ text: "DELETE FROM recipebook_category_items WHERE recipebook_category_items.recipe_id = $1", values: [recipeId] })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/];
                    case 2:
                        err_10 = _a.sent();
                        console.log("error removing recipe from category");
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getPantryData = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.any({ text: "SELECT (pantry_categories.pantry_category_id, pantry_categories.category, pantry_category_items.item) FROM users LEFT JOIN pantry_categories ON users.user_id = pantry_categories.user_id LEFT JOIN pantry_category_items ON pantry_categories.pantry_category_id = pantry_category_items.pantry_category_id WHERE users.user_id = $1", values: [userId] })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        err_11 = _a.sent();
                        console.log("error getting pantry data");
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.getGroceryData = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.any({ text: "SELECT (grocerylist_categories.grocerylist_category_id, grocerylist_categories.category, grocerylist_category_items.item) FROM users LEFT JOIN grocerylist_categories ON users.user_id = grocerylist_categories.user_id LEFT JOIN grocerylist_category_items ON grocerylist_categories.grocerylist_category_id = grocerylist_category_items.grocerylist_category_id WHERE users.user_id = $1", values: [userId] })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        err_12 = _a.sent();
                        console.log("error getting grocerylist data");
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.updatePantryTitle = function (id, title) {
        return __awaiter(this, void 0, void 0, function () {
            var err_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id + " " + title);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.db.none({ text: "UPDATE pantry_categories SET category = $1 WHERE pantry_categories.pantry_category_id = $2", values: [title, id] })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_13 = _a.sent();
                        console.log("unable to update pantry category title");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.deletePantryItems = function (catId) {
        return __awaiter(this, void 0, void 0, function () {
            var err_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.none({ text: "DELETE FROM pantry_category_items WHERE pantry_category_items.pantry_category_id = $1", values: [catId] })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_14 = _a.sent();
                        console.log("unable to remove pantry items");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.addPantryItems = function (catId, items) {
        return __awaiter(this, void 0, void 0, function () {
            var i, err_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < items.length)) return [3 /*break*/, 4];
                        if (!(items[i] != "")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.db.none({ text: "INSERT INTO pantry_category_items VALUES (DEFAULT, $1, $2)", values: [catId, items[i]] })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_15 = _a.sent();
                        console.log("unable to add pantry item");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.deletePantryCategory = function (catId) {
        return __awaiter(this, void 0, void 0, function () {
            var err_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.none({ text: "DELETE FROM pantry_categories WHERE pantry_categories.pantry_category_id = $1", values: [catId] })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_16 = _a.sent();
                        console.log("unable to delete pantry category");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.addPantryCategory = function (userId, cat) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.one({ text: "INSERT INTO pantry_categories VALUES (DEFAULT, $1, $2) RETURNING pantry_category_id", values: [userId, cat] })];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/, result];
                    case 2:
                        err_17 = _a.sent();
                        console.log("unable to add pantry category");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.updateGroceryTitle = function (id, title) {
        return __awaiter(this, void 0, void 0, function () {
            var err_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(id + " " + title);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.db.none({ text: "UPDATE grocerylist_categories SET category = $1 WHERE grocerylist_categories.grocerylist_category_id = $2", values: [title, id] })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_18 = _a.sent();
                        console.log("unable to update grocery list category title");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.deleteGroceryItems = function (catId) {
        return __awaiter(this, void 0, void 0, function () {
            var err_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.none({ text: "DELETE FROM grocerylist_category_items WHERE grocerylist_category_items.grocerylist_category_id = $1", values: [catId] })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_19 = _a.sent();
                        console.log("unable to remove grocery list items");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.addGroceryItems = function (catId, items) {
        return __awaiter(this, void 0, void 0, function () {
            var i, err_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < items.length)) return [3 /*break*/, 4];
                        if (!(items[i] != "")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.db.none({ text: "INSERT INTO grocerylist_category_items VALUES (DEFAULT, $1, $2)", values: [catId, items[i]] })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_20 = _a.sent();
                        console.log("unable to add grocery list item");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.deleteGroceryCategory = function (catId) {
        return __awaiter(this, void 0, void 0, function () {
            var err_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.none({ text: "DELETE FROM grocerylist_categories WHERE grocerylist_categories.grocerylist_category_id = $1", values: [catId] })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_21 = _a.sent();
                        console.log("unable to delete grocery list category");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.addGroceryCategory = function (userId, cat) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.one({ text: "INSERT INTO grocerylist_categories VALUES (DEFAULT, $1, $2) RETURNING grocerylist_category_id", values: [userId, cat] })];
                    case 1:
                        result = _a.sent();
                        console.log(result);
                        return [2 /*return*/, result];
                    case 2:
                        err_22 = _a.sent();
                        console.log("unable to add grocery list category");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Database;
}());
var db = new Database('database');
module.exports = db;
