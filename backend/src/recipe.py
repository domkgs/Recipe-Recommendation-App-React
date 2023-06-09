"""
recipe.py
Contains functions for recipe creation, search and details
"""

from src.classes import data_store, Recipe, Step, Ingredient
from werkzeug.exceptions import BadRequest, Forbidden


# Creates a new recipe and stores it inside of data_store
def recipe_create(title, creator_id, ingredients, steps, time, servings,
                  difficulty, nutrition_facts, tags, image):
    if len(title) == 0 or len(ingredients) == 0 or len(steps) == 0:
        raise BadRequest("Missing required parameters")

    creator = data_store.get_user_by_id(creator_id)
    if not creator:
        raise Forbidden("Creator id invalid")

    # Turns each ingredient into an Ingredient object
    new_ingredients = []
    for ingredient in ingredients:
        quantity = ingredient.get('quantity')
        units = ingredient.get('units')
        name = ingredient.get('name')
        template = data_store.get_ingredient_by_name(name)
        new_ingredients.append(
        Ingredient(name, float(quantity), units, template.get_categories(),
                   template.get_ingredient_id()))

    # Turns each step into a Step object
    new_steps = [Step(step.get('instruction'), float(step.get('time'))) for step in steps]

    new_recipe = Recipe(title, creator_id, new_ingredients, new_steps, float(time),
                        int(servings), int(difficulty), nutrition_facts, tags, image)

    data_store.add_recipe(new_recipe)
    creator.add_created_recipe(new_recipe)

    return {
        'recipe_id': new_recipe.get_recipe_id(),
        'title': new_recipe.get_title()
    }

# Returns all the details of a recipe given its id
def recipe_details(recipe_id):
    recipe = data_store.get_recipe_by_id(recipe_id)
    if not recipe:
        raise BadRequest("Invalid recipe id")

    return recipe.to_dict()

# Given a list of ingredients and filters, returns all recipes that can be
# made with the given ingredients or recipes with most of the ingredients
def recipe_search(ingredients_list, filters):
    if len(ingredients_list) == 0:
        raise BadRequest("No ingredients were inputted")
    increment_search(ingredients_list)
    ingredients_set = set(ingredients_list)
    filters_set = set(filters)
    valid_recipes = []
    close_recipes = []
    diff_number = 4
    for recipe in data_store.get_recipes_list():
        recipe_ingredients = {ing.get_name() for ing in recipe.get_ingredients()}
        common_ingredients = ingredients_set.intersection(recipe_ingredients)
        missing_ingredients = recipe_ingredients.difference(ingredients_set)

        common_tags = filters_set.intersection(recipe.get_tags())
        if (len(common_tags) == len(filters_set) and \
           len(recipe_ingredients) - len(common_ingredients) < diff_number and len(recipe_ingredients) >= diff_number) or \
           (len(common_tags) == len(filters_set) and \
              len(common_ingredients) > 0 and len(recipe_ingredients) < diff_number):
            recipe_dict = recipe.to_short_dict()
            if len(missing_ingredients) == 0:
                valid_recipes.append(recipe_dict)
            recipe_dict['missing_ingredients'] = list(missing_ingredients)
            close_recipes.append(recipe_dict)

    close_recipes = sorted(close_recipes, key=lambda x: (len(x['missing_ingredients']), -x['num_ingredients'], x['title']))
    return {
        'recipes': valid_recipes,
        'close_recipes': close_recipes
    }

# Adds 1 to the search counter for each ingredient
def increment_search(ingredients_list):
    for ingredient_name in ingredients_list:
        ingredient = data_store.get_ingredient_by_name(ingredient_name)
        ingredient.add_searches(1)
    data_store.pickle_ingredients_list()
    return
