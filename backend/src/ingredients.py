"""
ingredients.py
Contains functions related to the ingredient list or ingredient sets
"""
from src.classes import data_store, User

# Returns all of the ingredients inside of data_store
def ingredients_list():
    dict = {'all_ingredients': []}
    for ingredient in data_store.get_ingredients_list():
        dict['all_ingredients'].append(ingredient.get_name())
        category = ingredient.get_categories()

        if category in dict:
            dict[category].append(ingredient.get_name())
        else:
            dict[category] = [ingredient.get_name()]

    return dict

# Returns a sorted list of all the ingredients inside of data_store
def ingredients_list_v2():
    dict = {'all_ingredients': []}
    for ingredient in data_store.get_ingredients_list():
        dict['all_ingredients'].append(ingredient.to_short_dict())
        category = ingredient.get_categories()

        if category in dict:
            dict[category].append(ingredient.to_short_dict())
        else:
            dict[category] = [ingredient.to_short_dict()]

    for category in dict:
        dict[category] = sorted(dict[category], key=lambda x: (-x['searches'], x['name']))

    return dict

# Saves an ingredient set to a user's account for future use
def save_ingredients_set(name, user_id, ingredients_list):
    if len(name) == 0 or len(ingredients_list) == 0:
        raise BadRequest("Missing required parameters")

    user = data_store.get_user_by_id(user_id)
    if not user:
        raise Forbidden("User invalid")

    for saved in user.get_all_saved_ingredient():
        if saved['name'] == name:
            raise BadRequest("Ingredient set with same name already exists")
    new = {
        'name': name,
        'ingredients' : ingredients_list
    }

    user.save_certain_ingredients(new)
    return {
        'name': name
    }

# Returns a saved ingredient set by name
def get_certain_ingredients_set(name, user_id):
    user = data_store.get_user_by_id(user_id)
    if not user:
        raise Forbidden("User invalid")

    get_set = user.get_certain_ingredient_set(name)

    return get_set

# Returns all saved ingredient sets
def get_all_ingredients_set(user_id):
    user = data_store.get_user_by_id(user_id)
    if not user:
        raise Forbidden("No user with this id")

    sets = user.get_all_saved_ingredient()
    return {'sets': sets}

# Removes an existing saved ingredient set
def remove_ingredients_set(user_id, name):
    user = data_store.get_user_by_id(user_id)
    if not user:
        raise Forbidden("No user with this id")

    ingredient_set = user.get_certain_ingredient_set(name)
    if not ingredient_set:
        raise BadRequest("User does not have a set with this name")

    user.remove_ingredient_set(ingredient_set)

    return {}
