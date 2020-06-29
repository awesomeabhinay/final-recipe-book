import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{

    recipeChanged = new Subject<Recipe[]>();
    constructor(private slService: ShoppingListService){}
    private recipes: Recipe[] = [
        new Recipe(
            'A test Recipe',
            'This is a simple test',
            'https://www.cscassets.com/recipes/wide_cknew/wide_32.jpg',
            [
                new Ingredient('Aalu', 4),
                new Ingredient('Meat', 2)
            ]
        ),
        new Recipe(
            'A test Recipe2',
            'This is a simple test',
            'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/spaghetti-puttanesca_1.jpg',
            [
                new Ingredient('Mushroom', 2)
            ]
        )
    ];

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addIngredientToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe){
        this.recipes[index] = recipe;
        this.recipeChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}
