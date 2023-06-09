"""
meal_plan_routes.py
Contains the Flask routes for functions related to the meal planner
"""

from flask import Blueprint, request
from json import dumps, loads
from src.classes import data_store
from src.meal_plan import meal_plan_create, meal_plan_details, create_own_meal_plan, \
    delete_meal_plan, change_meal_plan_cell,change_to_fav, get_all_meal_plans
meal_plan_bp = Blueprint("meal_plan", __name__, url_prefix = "/meal_plan")

@meal_plan_bp.route("/create", methods=['POST'])
def create():
    request_data = request.get_json(force=True)
    ingredients = request_data.get('ingredients')
    filters = request_data.get('filters')

    details = meal_plan_create(ingredients, filters)

    return dumps(details)

@meal_plan_bp.route("/details", methods=['GET'])
def details():
    request_data = request.get_json(force=True)

    creator_id = int(request_data.get('creator_id'))

    meal_plan_id = int(request_data.get('meal_plan_id'))
    details = meal_plan_details(creator_id, meal_plan_id)
    return dumps(details)

@meal_plan_bp.route("/own", methods=['POST'])
def create_own():
    request_data = request.get_json(force=True)
    name = request_data.get('name')
    creator_id = request_data.get('creator_id')
    recipe_ids = request_data.get('recipe_ids')

    details = create_own_meal_plan(name, creator_id, recipe_ids)

    return dumps(details)

@meal_plan_bp.route("/remove", methods=['POST'])
def remove_selected_meal_plan():
    request_data = request.get_json(force=True)
    creator_id = request_data.get('creator_id')
    meal_plan_id = request_data.get('meal_plan_id')
    details = delete_meal_plan(creator_id, meal_plan_id)

    return dumps(details)


#cell_id from 0-20 the place where the meal is(eg, day2 brek is 3)
#recipe_ids[21 integers, number is -2 if no recipe found]
@meal_plan_bp.route("/change/to/fav", methods=['POST'])
def change_meal_plan_to_fav():
    request_data = request.get_json(force=True)
    cell_id = request_data.get('cell_id')
    creator_id = request_data.get('creator_id')
    recipe_ids = request_data.get('recipe_ids')
    fav_recipe_id = request_data.get('fav_recipe_id')
    details = change_to_fav(cell_id, creator_id, recipe_ids, fav_recipe_id)

    return dumps(details)

@meal_plan_bp.route("/change", methods=['POST'])
def change_meal_plan():
    request_data = request.get_json(force=True)
    ingredients = request_data.get('ingredients')
    filters = request_data.get('filters')
    time = request_data.get('time')
    cell_id = request_data.get('cell_id')
    recipe_ids = request_data.get('recipe_ids')
    details = change_meal_plan_cell(ingredients, filters, time, cell_id, recipe_ids)

    return dumps(details)


@meal_plan_bp.route("get/all", methods=['POST'])
def get_all():
    request_data = request.get_json(force=True)
    
    user_id = request_data.get('user_id')

    details = get_all_meal_plans(user_id)

    return dumps(details)
