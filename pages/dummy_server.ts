let http = require('http');
let url = require('url');
let express = require('express');

export class MyServer {

    public server = express();
    private port = 8080;
    private router = express.Router();

    constructor() {
	// from https://enable-cors.org/server_expressjs.html
	this.router.use((request, response, next) => {
	    response.header('Content-Type','application/json');
	    response.header('Access-Control-Allow-Origin', '*');
	    response.header('Access-Control-Allow-Headers', '*');
	    next();
	});
	// Serve static pages from a particular path.
    this.server.use('/', express.static('.'));
    this.server.use('/api', this.router);
	this.router.get('/search', this.searchHandler.bind(this));
	this.router.post('/login', this.loginHandler.bind(this));
    this.router.post('/signup', this.signupHandler.bind(this));
    this.router.post('/recipes/add', this.addRecipeHandler.bind(this));
    this.router.get('/recipes/:recipeId/read', this.readRecipeHandler.bind(this));
    this.router.post('/recipes/:recipeId/edit', this.editRecipeHandler.bind(this));
    this.router.post('/recipes/:recipeId/del', this.delRecipeHandler.bind(this));
    this.router.post('/recipes/:recipeId/addgroceries', this.recipeGroceryHandler.bind(this));
    this.router.post('/recipes/:recipeId/saverecipe', this.saveRecipeHandler.bind(this));
    this.router.post('/recipes/:recipeId/comments/add', this.addCommentHandler.bind(this));
    this.router.post('/recipes/:recipeId/comments/:commentId/edit', this.editCommentHandler.bind(this));
    this.router.post('/recipes/:recipeId/comments/:commentId/del', this.delCommentHandler.bind(this));
    this.router.post('/users/:userId/account', this.accountHandler.bind(this));
    this.router.post('/users/:userId/pantry/add', this.addPantryCatHandler.bind(this));
    this.router.post('/users/:userId/pantry/del', this.delPantryCatHandler.bind(this));
    this.router.post('/users/:userId/pantry/:catId/add', this.addPantryItemHandler.bind(this));
    this.router.post('/users/:userId/pantry/:catId/edit', this.editPantryItemHandler.bind(this));
    this.router.post('/users/:userId/pantry/:catId/del', this.delPantryItemHandler.bind(this));
    this.router.post('/users/:userId/groceries/add', this.addGroceryCatHandler.bind(this));
    this.router.post('/users/:userId/groceries/del', this.delGroceryCatHandler.bind(this));
    this.router.post('/users/:userId/groceries/:catId/add', this.addGroceryItemHandler.bind(this));
    this.router.post('/users/:userId/groceries/:catId/edit', this.editGroceryItemHandler.bind(this));
    this.router.post('/users/:userId/groceries/:catId/del', this.delGroceryItemHandler.bind(this));
    this.router.post('/users/:userId/recipebook/add', this.addRecipeCatHandler.bind(this));
    this.router.post('/users/:userId/recipebook/del', this.delRecipeCatHandler.bind(this));
    this.router.post('/users/:userId/recipebook/:catId/read', this.readRecipeCatHandler.bind(this));
    this.router.post('/users/:userId/recipebook/:catId/del', this.remRecipeHandler.bind(this));
    this.router.get('*', async (request, response) => {
		response.send(JSON.stringify({ "result" : "command-not-found" }));
    });
    this.router.post('*', async (request, response) => {
        response.send(JSON.stringify({ "result" : "command-not-found" }))
    })

}
    private async searchHandler(request, response) : Promise<void> {
        response.write("test search handler");
        response.end();
    }
    private async loginHandler(request, response) : Promise<void> {
        response.write("test login handler");
        response.end();
    }
    private async signupHandler(request, response) : Promise<void> {
        response.write("test signup handler");
        response.end();
    }
    private async addRecipeHandler(request, response) : Promise<void> {
        response.write("test add recipe handler");
        response.end();
    }
    private async readRecipeHandler(request, response) : Promise<void> {
        response.write("test read recipe handler");
        response.end();
    }
    private async editRecipeHandler(request, response) : Promise<void> {
        response.write("test edit recipe handler handler");
        response.end();
    }
    private async delRecipeHandler(request, response) : Promise<void> {
        response.write("test del recipe handler");
        response.end();
    }
    private async recipeGroceryHandler(request, response) : Promise<void> {
        response.write("test recipe grocery handler");
        response.end();
    }
    private async saveRecipeHandler(request, response) : Promise<void> {
        response.write("test save recipe handler");
        response.end();
    }
    private async addCommentHandler(request, response) : Promise<void> {
        response.write("test add comment handler");
        response.end();
    }
    private async editCommentHandler(request, response) : Promise<void> {
        response.write("test edit comment handler");
        response.end();
    }
    private async delCommentHandler(request, response) : Promise<void> {
        response.write("test del comment handler");
        response.end();
    }
    private async accountHandler(request, response) : Promise<void> {
        response.write("test account handler");
        response.end();
    }
    private async addPantryCatHandler(request, response) : Promise<void> {
        response.write("test add pantry cat handler");
        response.end();
    }
    private async delPantryCatHandler(request, response) : Promise<void> {
        response.write("test del pantry cat handler");
        response.end();
    }
    private async addPantryItemHandler(request, response) : Promise<void> {
        response.write("test add pantry item handler");
        response.end();
    }
    private async editPantryItemHandler(request, response) : Promise<void> {
        response.write("test edit pantry item handler");
        response.end();
    }
    private async delPantryItemHandler(request, response) : Promise<void> {
        response.write("test del pantry item handler");
        response.end();
    }
    private async addGroceryCatHandler(request, response) : Promise<void> {
        response.write("test add grocery cat handler");
        response.end();
    }
    private async delGroceryCatHandler(request, response) : Promise<void> {
        response.write("test del grocery cat handler");
        response.end();
    }
    private async addGroceryItemHandler(request, response) : Promise<void> {
        response.write("test add grocery item handler");
        response.end();
    }
    private async editGroceryItemHandler(request, response) : Promise<void> {
        response.write("test edit grocery item handler");
        response.end();
    }
    private async delGroceryItemHandler(request, response) : Promise<void> {
        response.write("test del grocery item handler");
        response.end();
    }
    private async addRecipeCatHandler(request, response) : Promise<void> {
        response.write("test add recipe cat handler");
        response.end();
    }
    private async delRecipeCatHandler(request, response) : Promise<void> {
        response.write("test del recipe cat handler");
        response.end();
    }
    private async readRecipeCatHandler(request, response) : Promise<void> {
        response.write("test read recipe cat handler");
        response.end();
    }
    private async remRecipeHandler(request, response) : Promise<void> {
        response.write("test rem recipe handler");
        response.end();
    }
}