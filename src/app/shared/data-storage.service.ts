import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';

@Injectable()
export class DataStorageService{
    constructor(private http: Http,
                private recipeService: RecipeService,
                private slService: ShoppingListService){}

    storeRecipes(){
        return this.http.put('https://recipe-book-d43b8.firebaseio.com/recipes.json', this.recipeService.getRecipes());
    }

    fetchRecipes(){
        this.http.get('https://recipe-book-d43b8.firebaseio.com/recipes.json')
        .pipe(
            map(
                (response: Response) => {
                const recipes: Recipe[] = response.json();
                for (const recipe of recipes){
                    if (!recipe.ingredients){
                        console.log(recipe);
                        recipe.ingredients = [];
                    }
                }
                return recipes;
            }
            )
        )
        .subscribe(
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        );
    }

    storeShoppingList(){
        return this.http.put('https://recipe-book-d43b8.firebaseio.com/shopping-list.json', this.slService.getIngredients());
    }

    fetchShoppingList(){
        this.http.get('https://recipe-book-d43b8.firebaseio.com/shopping-list.json').pipe(
            map(
                (response: Response) => {
                    let ingredients: Ingredient[] = response.json();
                    if (!ingredients){
                        ingredients = [];
                    }
                    return ingredients;
                }
            )
        ).subscribe(
            (ingredients: Ingredient[]) => {
                this.slService.setIngredients(ingredients);
            }
        );
    }
}
