"""
ingredients_routes.py
Contains the Flask routes for functions related to ingredient lists
"""

from flask import Blueprint, request
from json import dumps, loads
from src.classes import data_store
from src.ingredients import ingredients_list, ingredients_list_v2, \
    save_ingredients_set, get_certain_ingredients_set, get_all_ingredients_set, \
    remove_ingredients_set

ingredients_bp = Blueprint("ingredients", __name__, url_prefix = "/ingredients")

@ingredients_bp.route("/list", methods=['GET'])
def list():
    details = ingredients_list()

    return dumps(details)

@ingredients_bp.route("/list/v2", methods=['GET'])
def list_v2():
    details = ingredients_list_v2()

    return dumps(details)

@ingredients_bp.route("/save", methods=['POST'])
def list_save():
    request_data = request.get_json(force=True)

    name = request_data.get('name')
    user_id = request_data.get('user_id')
    ingredients_list = request_data.get('ingredients_list')
    details = save_ingredients_set(name, user_id, ingredients_list)

    return dumps(details)

@ingredients_bp.route("/load/saved", methods=['GET'])
def list_load_saved():

    request_data = request.get_json(force=True)

    name = request_data.get('name')
    user_id = int(request_data.get('user_id'))
    details = get_certain_ingredients_set(name, user_id)

    return dumps(details)

@ingredients_bp.route("/get/all/sets", methods=['POST'])
def get_all_sets():

    request_data = request.get_json(force=True)

    user_id = int(request_data.get('user_id'))
    details = get_all_ingredients_set(user_id)

    return dumps(details)

@ingredients_bp.route("/remove/set", methods=['POST'])
def remove_set():
    request_data = request.get_json(force=True)

    user_id = int(request_data.get('user_id'))
    name = request_data.get('name')

    details = remove_ingredients_set(user_id, name)

    return dumps(details)
