import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService{
    constructor(private http: Http,
                private recipeService: RecipeService,
                private slService: ShoppingListService,
                private authService: AuthService){}

    storeRecipes() {
        const token = this.authService.getToken();
        return this.http.put('https://recipe-book-d43b8.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    fetchRecipes(){
        const token = this.authService.getToken();
        this.http.get('https://recipe-book-d43b8.firebaseio.com/recipes.json?auth=' + token)
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

    storeShoppingList() {
        const token = this.authService.getToken();
        return this.http.put('https://recipe-book-d43b8.firebaseio.com/shopping-list.json?auth=' + token, this.slService.getIngredients());
    }

    fetchShoppingList() {
        const token = this.authService.getToken();
        this.http.get('https://recipe-book-d43b8.firebaseio.com/shopping-list.json?auth=' + token).pipe(
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
