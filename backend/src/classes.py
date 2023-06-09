"""
classes.py
Contains definitions for all the classes used in the project.
Get functions are included for each attribute to ensure that attributes aren't
accessed out of the class
This includes: DataStore, User, Recipe, Step, Ingredient, MealPlan
"""

import pickle
import hashlib
import jwt
from random import randint
import os

"""
DataStore
Main class used for storing data and maintaining state information
"""
class DataStore:
    # Constructor - runs whenever the server is started
    def __init__(self):
        self.users = []
        self.recipes = []
        self.ingredients = []
        self.private_key = str(randint(0, 9999999999))
        # Unpickle files to preserve state across server startup and shutdown
        self.pickle_dir = "pickle/"
        os.makedirs(self.pickle_dir, exist_ok=True)

        if os.path.exists(self.pickle_dir + "users.pickle"):
            self.unpickle_users_list()

        if os.path.exists(self.pickle_dir + "recipes.pickle"):
            self.unpickle_recipes_list()

        if os.path.exists(self.pickle_dir + "ingredients.pickle"):
            self.unpickle_ingredients_list()

        # Ensures future ids are unique
        self.set_highest_user_id()
        self.set_highest_recipe_id()
        self.set_highest_ingredient_id()

    # ADD FUNCTIONS
    def add_user(self, user):
        self.users.append(user)
        self.pickle_users_list()

    def add_recipe(self, recipe):
        self.recipes.append(recipe)
        self.pickle_recipes_list()

    def add_ingredient(self, ingredient):
        if not self.get_ingredient_by_name(ingredient.get_name()):
            self.ingredients.append(ingredient)
        self.pickle_ingredients_list()

    def remove_recipe(self, recipe):
        self.recipes.remove(recipe)
        self.pickle_recipes_list()

    # GET FUNCTIONS
    def get_users_list(self):
        return self.users

    def get_recipes_list(self):
        return self.recipes

    def get_ingredients_list(self):
        return self.ingredients

    def get_private_key(self):
        return self.private_key

    def get_user_by_email(self, email):
        for user in self.users:
            if email == user.get_email():
                return user
        return None

    def get_user_by_id(self, user_id):
        for user in self.users:
            if user_id == user.get_user_id():
                return user

    def get_user_by_token(self, token):
        for user in self.users:
            if token in user.get_tokens():
                return user
        return None

    def get_ingredient_by_name(self, name):
        for ingredient in self.ingredients:
            if ingredient.name == name:
                return ingredient
        return None

    def get_recipe_by_id(self, recipe_id):
        for recipe in self.recipes:
            if recipe.get_recipe_id() == recipe_id:
                return recipe
        return None

    def get_recipe_by_title(self, title):
        for recipe in self.recipes:
            if recipe.get_title() == title:
                return recipe
        return None

    # SET FUNCTIONS
    def set_users_list(self, users_list):
        self.users = users_list
        self.pickle_users_list()

    def set_recipes_list(self, recipes_list):
        self.recipes = recipes_list
        self.pickle_recipes_list()

    def set_ingredients_list(self, ingredients_list):
        self.ingredients = ingredients_list
        self.pickle_ingredients_list()

    def set_highest_user_id(self):
        self.highest_user_id = 0
        for user in self.get_users_list():
            self.highest_user_id = max(self.highest_user_id, user.get_user_id())

    def set_highest_recipe_id(self):
        self.highest_recipe_id = 0
        for recipe in self.get_recipes_list():
            self.highest_recipe_id = max(self.highest_recipe_id, recipe.get_recipe_id())

    def set_highest_ingredient_id(self):
        self.highest_ingredient_id = 0
        for ingredient in self.get_ingredients_list():
            self.highest_ingredient_id = max(self.highest_ingredient_id, ingredient.get_ingredient_id())

    # GENERATE FUNCTIONS
    def generate_user_id(self):
        self.highest_user_id += 1
        return self.highest_user_id

    def generate_recipe_id(self):
        self.highest_recipe_id += 1
        return self.highest_recipe_id

    def generate_ingredient_id(self):
        self.highest_ingredient_id += 1
        return self.highest_ingredient_id

    # Creates a JWT to authenticate users
    def generate_user_token(self, email):
        user = data_store.get_user_by_email(email)
        tokens = len(user.get_tokens())
        token = jwt.encode({"email": email, "tokens": tokens}, self.private_key)
        return token

    # Passwords are encrypted before being stored
    def generate_password(self, password):
        hash_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
        return hash_password

    # PICKLE FUNCTIONS
    # Saves data in files to preserve state, called whenever data is changed
    def pickle_users_list(self):
        with open(self.pickle_dir + "users.pickle", "wb") as f:
            pickle.dump(self.users, f)

    def pickle_recipes_list(self):
        with open(self.pickle_dir + "recipes.pickle", "wb") as f:
            pickle.dump(self.recipes, f)

    def pickle_ingredients_list(self):
        with open(self.pickle_dir + "ingredients.pickle", "wb") as f:
            pickle.dump(self.ingredients, f)

    def unpickle_users_list(self):
        with open(self.pickle_dir + "users.pickle", "rb") as f:
            self.set_users_list(pickle.load(f))

    def unpickle_recipes_list(self):
        with open(self.pickle_dir + "recipes.pickle", "rb") as f:
            self.set_recipes_list(pickle.load(f))

    def unpickle_ingredients_list(self):
        with open(self.pickle_dir + "ingredients.pickle", "rb") as f:
            self.set_ingredients_list(pickle.load(f))



"""
User
Stores user details

email               - string
password            - string
first_name          - string
last_name           - string
image               - string (with image data)
user_id             - int
tokens              - list of JWTs
favourites          - list of Recipes
created_recipes     - list of Recipes
meal_plan           - list of MealPlans
reset_code          - string
saved_ingredients   - list of dictionaries of ingredient sets
tag_line            - string
description         - string
"""
class User:
    def __init__(self, email, password, first_name, last_name, image=None):
        self.email = email
        self.password = data_store.generate_password(password)
        self.first_name = first_name
        self.last_name = last_name
        self.image = image
        self.user_id = data_store.generate_user_id()
        self.tokens = []
        self.favourites = []
        self.created_recipes = []
        self.meal_plan = []
        self.reset_code = None
        self.saved_ingredients = []
        self.tag_line = ""
        self.description = ""
        self.set_highest_meal_plan_id()

    # GET FUNCTIONS
    def get_email(self):
        return self.email

    def get_first_name(self):
        return self.first_name

    def get_last_name(self):
        return self.last_name

    def get_full_name(self):
        return self.first_name + " " + self.last_name

    def get_password(self):
        return self.password

    def get_user_id(self):
        return self.user_id

    def get_tokens(self):
        return self.tokens

    def get_favourites(self):
        return self.favourites

    def get_reset_code(self):
        return self.reset_code

    def get_created_recipes(self):
        return self.created_recipes

    def get_meal_plan(self, meal_plan_id):
        for plan in self.meal_plan:
            if plan.id == meal_plan_id:
                return plan
        return None

    def set_highest_meal_plan_id(self):
        self.highest_meal_plan_id = 0
        for plan in self.get_all_plan():
            self.highest_meal_plan_id = max(self.highest_meal_plan_id, plan.get_id())

    def get_highest_meal_plan_id(self):
        return self.highest_meal_plan_id

    def generate_meal_plan_id(self):
        self.highest_meal_plan_id += 1
        return self.highest_meal_plan_id

    def get_certain_ingredient_set(self,name_of_ingredients_set):
        for ingredient_list in self.saved_ingredients:
            if ingredient_list['name'] == name_of_ingredients_set:
                return ingredient_list
        return None

    def get_all_saved_ingredient(self):
        return self.saved_ingredients

    def get_favourite_recipe(self, recipe_id):
        for recipe in self.favourites:
            if recipe.get_recipe_id() == recipe_id:
                return recipe
        return None

    def get_all_plan(self):
        return self.meal_plan

    # SET FUNCTIONS
    def set_email(self, email):
        self.email = email
        data_store.pickle_users_list()

    def set_name(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name
        data_store.pickle_users_list()

    def set_password(self, password):
        self.password = data_store.generate_password(password)
        data_store.pickle_users_list()

    def set_tokens(self, tokens):
        self.tokens = tokens
        data_store.pickle_users_list()

    def set_reset_code(self, reset_code):
        self.reset_code = reset_code
        data_store.pickle_users_list()

    def set_image(self, image):
        self.image = image
        data_store.pickle_users_list()

    def set_tag_line(self, tag_line):
        self.tag_line = tag_line
        data_store.pickle_users_list()

    def set_description(self, description):
        self.description = description
        data_store.pickle_users_list()

    def add_new_recipe(self, recipe):
        self.created_recipes.append(recipe)
        data_store.pickle_users_list()

    def add_favourite_recipe(self, recipe):
        self.favourites.append(recipe)
        data_store.pickle_users_list()

    def remove_favourite_recipe(self, recipe):
        self.favourites.remove(recipe)
        data_store.pickle_users_list()

    def add_created_recipe(self, recipe):
        self.created_recipes.append(recipe)
        data_store.pickle_users_list()

    def remove_created_recipe(self, recipe):
        self.created_recipes.remove(recipe)
        data_store.pickle_users_list()

    def add_meal_plan(self, meal_plan):
        self.meal_plan.append(meal_plan)
        data_store.pickle_users_list()

    def remove_meal_plan(self, meal_plan):
        self.meal_plan.remove(meal_plan)
        data_store.pickle_users_list()

    def reset_meal_plan(self):
        self.meal_plan.clear()
        data_store.pickle_users_list()

    def remove_ingredient_set(self, ingredient_set):
        self.saved_ingredients.remove(ingredient_set)
        data_store.pickle_users_list()

    def save_certain_ingredients(self, ingredients):
        self.saved_ingredients.append(ingredients)
        data_store.pickle_users_list()

    def reset_ingredients(self):
        self.saved_ingredients = []
        data_store.pickle_users_list()

    # TOKEN FUNCTIONS
    def add_token(self, token):
        self.tokens.append(token)
        data_store.pickle_users_list()

    def remove_token(self, token):
        self.tokens.remove(token)
        data_store.pickle_users_list()

    def to_dict(self):
        return {
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'user_id': self.user_id,
            'favourites': [recipe.to_short_dict() for recipe in self.get_favourites()],
            'created_recipes': [recipe.to_short_dict() for recipe in self.get_created_recipes()],
            'image': self.image,
            'tag_line': self.tag_line,
            'description': self.description
        }
"""
Recipe
Stores recipe information

title               - string
creator_id          - int
ingredients         - list of Ingredients
steps               - list of Steps
time                - float (minutes)
servings            - int
difficulty          - int (1-5)
nutrition_facts     - list of int [Calories, fat, carbs, protein]
tags                - list of string
image               - string (with image data)
recipe_id           - int
"""
class Recipe:
    def __init__(self, title, creator_id, ingredients, steps, time, servings,
                difficulty, nutrition_facts, tags, image):
        self.title = title
        self.creator_id = creator_id
        self.ingredients = ingredients
        self.steps = steps
        self.time = time
        self.servings = servings
        self.difficulty = difficulty
        self.nutrition_facts = nutrition_facts
        self.tags = tags
        self.image = image
        self.recipe_id = data_store.generate_recipe_id()

    # GET FUNCTIONS
    def get_title(self):
        return self.title

    def get_creator_id(self):
        return self.creator_id

    def get_ingredients(self):
        return self.ingredients

    def get_steps(self):
        return self.steps

    def get_time(self):
        return self.time

    def get_servings(self):
        return self.servings

    def get_difficulty(self):
        return self.difficulty

    def get_image(self):
        return self.image

    def get_nutrition_facts(self):
        return self.nutrition_facts

    def get_tags(self):
        return self.tags

    def get_recipe_id(self):
        return self.recipe_id

    #SET FUNCTIONS
    def set_title(self, title):
        self.title = title
        data_store.pickle_recipes_list()

    def set_creator_id(self, creator_id):
        self.creator_id = creator_id
        data_store.pickle_recipes_list()

    def set_image(self, file):
        self.image = file
        data_store.pickle_recipes_list()

    def set_time(self, time):
        self.time = time
        data_store.pickle_recipes_list()

    def set_servings(self, serve):
        self.servings = serve
        data_store.pickle_recipes_list()

    def set_difficulty(self, difficulty):
        self.difficulty = difficulty
        data_store.pickle_recipes_list()

    def set_ingredients(self, ingredients):
        self.ingredients = ingredients
        data_store.pickle_recipes_list()

    def set_steps(self, steps):
        self.steps = steps
        data_store.pickle_recipes_list()

    #ADD FUNCTIONS
    def add_tag(self, tag):
        self.tags.append(tag)
        data_store.pickle_recipes_list()

    def add_ingredient(self, ingredient):
        self.ingredients.append(ingredient)
        data_store.pickle_recipes_list()

    #REMOVE FUNCTIONS
    def rmv_tag(self, string):
        self.tags.remove(string)
        data_store.pickle_recipes_list()

    def rmv_ingredient(self, ingredient):
        self.ingredient.remove(ingredient)
        data_store.pickle_recipes_list()

    def to_dict(self):
        return {
            'title': self.title,
            'ingredients': [ingredient.to_dict() for ingredient in self.ingredients],
            'creator_id': self.creator_id,
            'steps': [step.to_dict() for step in self.steps],
            'time': self.time,
            'servings': self.servings,
            'difficulty': self.difficulty,
            'nutrition_facts': self.nutrition_facts,
            'tags': self.tags,
            'recipe_id': self.recipe_id,
            'image': self.image
        }

    def to_short_dict(self):
        return {
            'title': self.title,
            'difficulty': self.difficulty,
            'time': self.time,
            'calories': self.nutrition_facts[0],
            'image': self.image,
            'recipe_id': self.recipe_id,
            'num_ingredients':len(self.ingredients)
        }
"""
Step
Stores information on a step in a recipe

instruction - string
time        - float
"""
class Step:
    def __init__(self, instruction, time=0):
        self.instruction = instruction
        self.time = time

    # GET FUNCTIONS
    def get_instruction(self):
        return self.instruction

    def get_time(self):
        return self.time

    # SET FUNCTIONS
    def set_instruction(self, instruction):
        self.instruction = instruction

    def set_time(self, time):
        self.time = time

    def to_dict(self):
        return {
            'instruction': self.instruction,
            'time': self.time
        }

"""
Ingredient
Stores ingredient information

name            - string
quantity        - float
units           - string
categories      - string
ingredient_id   - int
searches        - int
"""
class Ingredient:
    def __init__(self, name, quantity=None, units=None, categories=[],
                 ingredient_id=-1):
        self.name = name
        self.quantity = quantity
        self.units = units
        self.categories = categories
        self.ingredient_id = ingredient_id
        self.searches = 0
        if self.ingredient_id == -1:
            self.ingredient_id = data_store.generate_ingredient_id()

    def get_name(self):
        return self.name

    def get_categories(self):
        return self.categories

    def get_ingredient_id(self):
        return self.ingredient_id

    def get_searches(self):
        return self.searches

    def set_searches(self, value):
        self.searches = value
        data_store.pickle_ingredients_list()

    def add_nutrition_fact(self,nutrition_fact):
        self.nutrition_fact = nutrition_fact

    def add_searches(self, value):
        self.searches += value

    def to_dict(self):
        return {
            'name': self.name,
            'quantity': self.quantity,
            'units': self.units,
            'categories': self.categories,
            'ingredient_id': self.ingredient_id
        }

    def to_short_dict(self):
        return {
            'name': self.name,
            'searches': self.searches
        }

"""
MealPlan
Stores information for meal plans containing a recipe for each meal of the day.
Each day contains a meal for breakfast, lunch and dinner

name    - int
day1-7  - list of Recipes [breakfast, lunch, dinner]
id      - int
"""
class MealPlan:
    def __init__(self, name, day1, day2, day3, day4, day5, day6, day7, id):
        self.name = name
        self.day1 = day1
        self.day2 = day2
        self.day3 = day3
        self.day4 = day4
        self.day5 = day5
        self.day6 = day6
        self.day7 = day7
        self.id = -1

    def get_name(self):
        return self.name

    def get_id(self):
        return self.id

    def get_day1(self):
        return self.day1

    def get_day2(self):
        return self.day2

    def get_day3(self):
        return self.day3

    def get_day4(self):
        return self.day4

    def get_day5(self):
        return self.day5

    def get_day6(self):
        return self.day6

    def get_day7(self):
        return self.day7

    def to_dict(self):
        return {
            'name': self.name,
            'day1': [rec.to_short_dict() if rec else None for rec in self.day1],
            'day2': [rec.to_short_dict() if rec else None for rec in self.day2],
            'day3': [rec.to_short_dict() if rec else None for rec in self.day3],
            'day4': [rec.to_short_dict() if rec else None for rec in self.day4],
            'day5': [rec.to_short_dict() if rec else None for rec in self.day5],
            'day6': [rec.to_short_dict() if rec else None for rec in self.day6],
            'day7': [rec.to_short_dict() if rec else None for rec in self.day7]
        }

    def set_id(self,id):
        self.id = id

# Allows data_store to be used from other files
global data_store
data_store = DataStore()


global tag_store
tag_store ={"MealType":["Breakfast","Lunch","Dinner","Dessert","Drinks","Snacks And Appetizer","Side Dishes"],
"Diet":["Dairy-Free","Gluten-Free","Healthy","Low Carb", "Vegan","Vegetarian"],
"Seasonal":["Spring","Summer","Fall","Winter"],
"Method":["Air Fryer", "Baking", "BBQ", "Canning and Preserving", "Casseroles", "Deep Frying","Dutch Oven", "Griddle", "Microwave", "One Pot", "Pressure Cookie","Sheet Pan Dinners","Skillet","Slow Cookie","Smoker","Sous Vide", "Stir-fry"],
"Time":["Easy Recipes", "Quick Recipes", "Freezer Meals", "Meal Prep"],
"Cuisines":["BRAZILIAN","BRITISH","CUBAN","CHINESE","ETHIOPIAN","FRENCH","GERMAN","GREEK","INDIAN","IRISH","ITALIAN","JAMAICAN","JAPANESE","KOREAN","MEXICAN","POLISH","PORTUGUESE","PUERTO RICAN","SPANISH","THAI","US REGIONAL","VIETNAMESE"]}
