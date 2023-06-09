"""
recipe_routes.py
Contains the Flask routes for functions related to recipe creation and search
"""

from flask import Blueprint, request
from json import dumps, loads
from src.classes import data_store
from src.recipe import recipe_create, recipe_details, recipe_search

recipe_bp = Blueprint("recipe", __name__, url_prefix = "/recipe")

@recipe_bp.route("/create", methods=['POST'])
def create():
    request_data = request.get_json(force=True)

    title = request_data.get('title')
    creator_id = request_data.get('creator_id')
    ingredients = request_data.get('ingredients')
    steps = request_data.get('steps')
    time = request_data.get('time')
    servings = request_data.get('servings')
    difficulty = request_data.get('difficulty')
    nutrition_facts = request_data.get('nutrition_facts')
    tags = request_data.get('tags')
    image = request_data.get('image')

    details = recipe_create(title, creator_id, ingredients, steps, time,
                            servings, difficulty, nutrition_facts, tags, image)

    return dumps(details)

@recipe_bp.route("/details", methods=['POST'])
def details():
    request_data = request.get_json(force=True)

    recipe_id = int(request_data.get('recipe_id'))

    details = recipe_details(recipe_id)

    return dumps(details)

@recipe_bp.route("/search", methods=['POST'])
def search():
    request_data = request.get_json(force=True)

    ingredients_list = request_data.get('ingredients_list')
    filters = request_data.get('filters')

    details = recipe_search(ingredients_list, filters)

    return dumps(details)
