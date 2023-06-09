"""
meal_plan.py
Contains functions related to the weekly meal planner
"""

from src.classes import data_store, User, Recipe, MealPlan
from werkzeug.exceptions import BadRequest, Forbidden
from src.recipe import recipe_search
import random

# meal_plan_create:
# list of ingredients, and list of filters(filters except brekfast lunch dinner)
# it will put them in recipe search function and
# create a 7 day meal plan(3 meals each day)
# if no meal is found it will return None,
# returns day1-day7
# day 1 is a list of dictionary which contains
#'title', 'difficulty','time','calories','image','recipe_id'
# also a list of recipe ids [21 integers, will be -2 if no recipe ]
def meal_plan_create(ingredients, filters):
    if len(ingredients) == 0:
        raise BadRequest("Missing required parameters")

    new = []
    new_ids = []


    brek1 = recipe_search(ingredients, filters + ["Breakfast"])['close_recipes']
    lunch1 = recipe_search(ingredients, filters + ["Lunch"])['close_recipes']
    dinner1 = recipe_search(ingredients, filters + ["Dinner"])['close_recipes']
    for i in range(0,7):
        b = random.choice(brek1) if brek1 else None
        bid = b["recipe_id"] if brek1 else int(-2)

        l = random.choice(lunch1) if lunch1 else None
        lid = l["recipe_id"] if lunch1 else int(-2)

        d = random.choice(dinner1) if dinner1 else None
        did = d["recipe_id"] if dinner1 else int(-2)

        new.append([b,l,d])

        new_ids.append(bid)
        new_ids.append(lid)
        new_ids.append(did)

    return {
        'day1' : new[0],
        'day2' : new[1],
        'day3' : new[2],
        'day4' : new[3],
        'day5' : new[4],
        'day6' : new[5],
        'day7' : new[6],
        'recipe_ids' :new_ids
    }

#[ingredients names]
#[filters]
#time = Breakfast or Lunch or Dinner
#acts like an refresh
#can only be used when meal plan is not saved
def change_meal_plan_cell(ingredients, filters, time, cell_id, recipe_ids):
    if len(ingredients) == 0:
        raise BadRequest("Missing required parameters")

    temp = []
    for filt in filters:
        temp.append(filt)
    temp.append(time)
    temp = list(dict.fromkeys(temp))

    new = recipe_search(ingredients, temp)['close_recipes']
    if new:
        n = random.choice(new)
        n1 = data_store.get_recipe_by_id(n["recipe_id"])
    else:
        raise BadRequest("No recipes can be found with inputted ingredients")

    recipe_ids[cell_id] = n1.get_recipe_id()
    return {
        'recipe' : n1.to_short_dict(),
        'recipe_ids' :recipe_ids
    }



#def change_meal_plan_cell_to_fav(creator_id):
def change_to_fav(cell_id, creator_id, recipe_ids, fav_recipe_id):
    creator = data_store.get_user_by_id(creator_id)
    if not creator:
        raise Forbidden("Creator id invalid")

    new_rec = creator.get_favourite_recipe(fav_recipe_id)

    recipe_ids[cell_id] = new_rec.get_recipe_id()

    return {
        'fav_recipe': new_rec.to_short_dict(),
        'recipe_ids' : recipe_ids
    }


# Takes in creator_id and meal_plan_id
# returns the meal_plan details
def meal_plan_details(creator_id, meal_plan_id):
    creator = data_store.get_user_by_id(creator_id)
    meal_plan = creator.get_meal_plan(meal_plan_id)
    if meal_plan is None:
        raise BadRequest("Invalid meal plan")
    return meal_plan.to_dict()


# recipe_ids = [21 integers for day1-day7 brek/lunch/dinner in order]
# if not inputted recipe for that cell please give an integer like, -1
# also used to save created meal plan
# once meal plan is created it can not be edited again
def create_own_meal_plan(name, creator_id, recipe_ids):
    if len(recipe_ids) == 0:
        raise BadRequest("Missing required parameters")

    creator = data_store.get_user_by_id(creator_id)
    if not creator:
        raise Forbidden("Creator id invalid")

    new = [data_store.get_recipe_by_id(recipe_id) for recipe_id in recipe_ids]
    total = []
    for i in range(0, len(new), 3):
        brek = new[i]
        lunch = new[i + 1]
        dinner = new [i + 2]
        total.append([brek, lunch, dinner])

    new_plan = MealPlan(name,total[0],total[1],total[2],total[3],total[4],total[5],total[6],-1)
    meal_plan_id = creator.generate_meal_plan_id()
    new_plan.set_id(meal_plan_id)
    creator.add_meal_plan(new_plan)
    creator.set_highest_meal_plan_id()
    return {
        'name': new_plan.get_name(),
        'meal_plan' : new_plan.to_dict(),
        'meal_plan_id': meal_plan_id,
    }

# Deletes a user's meal plan
def delete_meal_plan(creator_id, meal_plan_id):
    creator = data_store.get_user_by_id(creator_id)
    if not creator:
        raise Forbidden("Creator id invalid")

    meal_plan = creator.get_meal_plan(meal_plan_id)
    if not meal_plan:
        raise BadRequest("User does not have a meal plan with that id")

    creator.remove_meal_plan(meal_plan)
    return {}

# Returns all of a user's meal plans
def get_all_meal_plans(user_id):
    user = data_store.get_user_by_id(user_id)
    if not user:
        raise Forbidden("No user with that id")

    meal_plans = user.get_all_plan()

    return {'meal_plans': meal_plans}
