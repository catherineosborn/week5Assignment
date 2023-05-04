class Ingredient {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
    }

    describe() {
        return `${this.amount} of ${this.name}`;
    }
}

class Recipe {
    constructor(name) {
        this.name = name;
        this.ingredients = [];
    }

    addIngredient(ingredient) {
        if (ingredient instanceof Ingredient) {
            this.ingredients.push(ingredient);
        } else {
            throw new Error(`You can only add an instance of Ingredient. Argument is not an ingredient: ${ingredient}`);
        }
    }
    describe() {
        return `${this.name} has ${this.ingredients.length} ingredients.`;
    }
}

class Menu {
    constructor() {
        this.recipes = [];
        this.selectedRecipe = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createRecipe();
                    break;
                case '2':
                    this.viewRecipe();
                    break;
                case '3':
                    this.deleteRecipe();
                    break;
                case '4' :
                    this.displayRecipes();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt (`
        0) Exit
        1) Create a new recipe
        2) View a recipe
        3) Delete a recipe
        4) Display all recipes
        `);
    }

    showRecipeMenuOptions(recipeInfo) {
        return prompt (`
        0) Back
        1) Add a new ingredient
        2) Delete an ingredient
        ---------------------
        ${recipeInfo}
        `);
    }

    displayRecipes() {
        let recipeString = '';
        for (let i = 0; i < this.recipes.length; i++) {
            recipeString += i+ ') ' + this.recipes[i].name + '\n';
        }
        alert(recipeString);
    }

    createRecipe() {
        let name = prompt ("Enter name for new recipe:");
        this.recipes.push(new Recipe(name));
    }

    viewRecipe() {
        let index = prompt("Enter the index of the recipe that you want to view:");
        if (index> -1 && index < this.recipes.length) {
            this.selectedRecipe = this.recipes[index];
            let description = 'Recipe Name: ' + this.selectedRecipe.name + '\n';
            description += ' ' + this.selectedRecipe.describe() + '\n';
            for (let i = 0; i < this.selectedRecipe.ingredients.length; i++) {
                description += i + ') ' + this.selectedRecipe.ingredients[i].describe() +'\n';
            }
            let selection1 = this.showRecipeMenuOptions(description);
            switch(selection1) {
                case '1' :
                this.createIngredient();
                break;
                case '2' :
                this.deleteIngredient();
            }
        }
    }

    deleteRecipe() {
        let index = prompt('Enter the index of the recipe that you wish to delete: ');
        if (index > -1 && index < this.recipes.length) {
            this.recipes.splice(index,1);
        }
    }

    createIngredient() {
        let name = prompt('Enter new ingredient: ');
        let amount = prompt('Enter amount of new ingredient: ');
        this.selectedRecipe.ingredients.push(new Ingredient(name, amount));
    }

    deleteIngredient() {
        let index = prompt('Enter the index of the ingredient that you wish to delete: ');
        if (index > -1 && index < this.selectedRecipe.ingredients.length) {
            this.selectedRecipe.ingredients.splice(index,1);
        }
    }
}

let menu = new Menu();
menu.start();