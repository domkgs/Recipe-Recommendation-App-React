import requests
from src import config
from json import dumps, loads

# Contains wrapper functions for calling endpoints for testing

def register_user(email, password, confirm_password, first_name, last_name):
    data = {'email': email,
            'password': password,
            'confirm_password': confirm_password,
            'first_name': first_name,
            'last_name': last_name}

    resp = requests.post(config.url + "user/register", data=dumps(data))

    if resp.status_code == 200:
        user_id = loads(resp.text).get('user_id')
        token = loads(resp.text).get('token')
        return user_id, token
    else:
        error_code = loads(resp.text).get('code')
        error_message = loads(resp.text).get('message')
        return error_code, error_message

def login(email, password):
    data = {'email': email,
            'password': password}

    resp = requests.post(config.url + "user/login", data=dumps(data))

    if resp.status_code == 200:
        user_id = loads(resp.text).get('user_id')
        token = loads(resp.text).get('token')
        return user_id, token
    else:
        error_code = loads(resp.text).get('code')
        error_message = loads(resp.text).get('message')
        return error_code, error_message

def logout(token):
    data = {'token': token}

    resp = requests.post(config.url + "user/logout", data=dumps(data))

    if resp.status_code == 200:
        return {}
    else:
        error_code = loads(resp.text).get('code')
        error_message = loads(resp.text).get('message')
        return error_code, error_message

def create_recipe(title, ingredients, steps, time, servings, difficulty,
               nutrition_facts, tags):
    data = {'title': title,
            'ingredients': ingredients,
            'steps': steps,
            'time': time,
            'servings': servings,
            'difficulty': difficulty,
            'nutrition_facts': nutrition_facts,
            'tags': tags}

    resp = requests.post(config.url + "recipe/create", data=dumps(data))

    if resp.status_code == 200:
        recipe_id = loads(resp.text).get('recipe_id')
        title = loads(resp.text).get('title')
        return recipe_id, title
    else:
        error_code = loads(resp.text).get('code')
        error_message = loads(resp.text).get('message')
        return error_code, error_message

def get_recipe_details(recipe_id):
    data = {'recipe_id': recipe_id}

    resp = requests.get(config.url + "recipe/details", data=dumps(data))

    return loads(resp.text)

def search_recipes(ingredients_list, filters):
    data = {
        'ingredients_list': ingredients_list,
        'filters': filters}

    resp = requests.post(config.url + "recipe/search", data=dumps(data))

    return loads(resp.text)


def forgot_password(email):
    data = {'email': email}

    resp = requests.post(config.url + "user/forgot/password", data=dumps(data))

    if resp.status_code == 200:
        return {}
    else:
        error_code = loads(resp.text).get('code')
        error_message = loads(resp.text).get('message')
        return error_code, error_message

def reset_password(email, reset_code, password, confirm_password):
    data = {'email': email,
            'reset_code': reset_code,
            'password': password,
            'confirm_password': confirm_password}

    resp = requests.post(config.url + "user/reset/password", data=dumps(data))

    if resp.status_code == 200:
        return {}
    else:
        error_code = loads(resp.text).get('code')
        error_message = loads(resp.text).get('message')
        return error_code, error_message

def list_ingredients():
    resp = requests.get(config.url + "ingredients/list")

    if resp.status_code == 200:
        return loads(resp.text)
    else:
        error_code = loads(resp.text).get('code')
        error_message = loads(resp.text).get('message')
        return error_code, error_message

def list_ingredients_v2():
    resp = requests.get(config.url + "ingredients/list/v2")
    if resp.status_code == 200:
        return loads(resp.text)
    else:
        error_code = loads(resp.text).get('code')
        error_message = loads(resp.text).get('message')
        return error_code, error_message

def create_meal_plan(name, creator_id, ingredients, filters):
    data = {'name': name,
            'creator_id': creator_id,
            'ingredients': ingredients,
            'filters': filters}
    resp = requests.post(config.url + "meal_plan/create", data=dumps(data))

    if resp.status_code == 200:
        meal_plan = loads(resp.text).get('meal_plan')
        name = loads(resp.text).get('name')
        return [name, meal_plan]
    else:
        error_code = loads(resp.text).get('code')
        error_message = loads(resp.text).get('message')
        return error_code, error_message

def create_own_plan(name, creator_id, recipe_ids):
    data = {'name': name,
            'creator_id': creator_id,
            'recipe_ids': recipe_ids
            }
    resp = requests.post(config.url + "meal_plan/own", data=dumps(data))

    if resp.status_code == 200:
        return loads(resp.text)
    else:
        error_code = loads(resp.text).get('code')
        error_message = loads(resp.text).get('message')
        return error_code, error_message

def get_meal_plan_details(creator_id, meal_plan_id):
    data = {'creator_id':creator_id, 'meal_plan_id': meal_plan_id}

    resp = requests.get(config.url + "meal_plan/details", data=dumps(data))

    return loads(resp.text)



def save_ingredients_set(name, user_id, ingredients_list):

    data = {'name': name,
            'user_id': user_id,
            'ingredients_list': ingredients_list,
            }
    resp = requests.post(config.url + "ingredients/save", data=dumps(data))

    if resp.status_code == 200:
        name = loads(resp.text).get('name')
        user_id = loads(resp.text).get('user_id')
        ingredients_list = loads(resp.text).get('ingredients_list')
        return [name]

def add_favourite_recipe(user_id, recipe_id):
    data = {'user_id': user_id,
            'recipe_id': recipe_id}

    resp = requests.post(config.url + "user/favourites/add", data=dumps(data))

    if resp.status_code == 200:
        return loads(resp.text)

    else:
        error_code = loads(resp.text).get('code')
        error_message = loads(resp.text).get('message')
        return error_code, error_message



    name = loads(resp.text).get('name')
    return [name]

def get_certain_ingredients_set(name, user_id):

    data = {'name':name, 'user_id': user_id}

    resp = requests.get(config.url + "ingredients/load/saved", data=dumps(data))

    return loads(resp.text)

def remove_favourite_recipe(user_id, recipe_id):
    data = {'user_id': user_id,
            'recipe_id': recipe_id}

    resp = requests.post(config.url + "user/favourites/remove", data=dumps(data))

    if resp.status_code == 200:
        return loads(resp.text)
    else:
        error_code = loads(resp.text).get('code')
        error_message = loads(resp.text).get('message')
        return error_code, error_message

def get_favourite_recipes(user_id):
    data = {'user_id': user_id}

    resp = requests.get(config.url + "user/favourites/get", data=dumps(data))

    if resp.status_code == 200:
        return loads(resp.text)
    else:
        error_code = loads(resp.text).get('code')
        error_message = loads(resp.text).get('message')
        return error_code, error_message


def get_user_profile(user_id):
    data = {'user_id': user_id}

    resp = requests.get(config.url + "user/profile", data=dumps(data))

    if resp.status_code == 200:
        return loads(resp.text)
    else:
        error_code = loads(resp.text).get('code')
        error_message = loads(resp.text).get('message')
        return error_code, error_message

def set_tag_line(user_id, tag_line):
    data = {'user_id': user_id,
            'tag_line': tag_line}

    resp = requests.put(config.url + "user/set/tag_line", data=dumps(data))

    if resp.status_code == 200:
        return loads(resp.text)
    else:
        error_code = loads(resp.text).get('code')
        error_message = loads(resp.text).get('message')
        return error_code, error_message

def set_description(user_id, description):
    data = {'user_id': user_id,
            'description': description}

    resp = requests.put(config.url + "user/set/description", data=dumps(data))

    if resp.status_code == 200:
        return loads(resp.text)
    else:
        error_code = loads(resp.text).get('code')
        error_message = loads(resp.text).get('message')
        return error_code, error_message

def remove_meal_plan(creator_id, meal_plan_id):
    data = {'creator_id': creator_id,
            'meal_plan_id': meal_plan_id}

    resp = requests.post(config.url + "meal_plan/remove", data=dumps(data))

    if resp.status_code == 200:
        return loads(resp.text)
    else:
        error_code = loads(resp.text).get('code')
        error_message = loads(resp.text).get('message')
        return error_code, error_message

def get_all_sets(user_id):
    data = {'user_id': user_id}

    resp = requests.get(config.url + "ingredients/get/all/sets", data=dumps(data))

    if resp.status_code == 200:
        return loads(resp.text)
    else:
        error_code = loads(resp.text).get('code')
        error_message = loads(resp.text).get('message')
        return error_code, error_message
