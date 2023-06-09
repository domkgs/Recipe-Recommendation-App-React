"""
user_routes.py
Contains the Flask routes for functions related to user authentication and
profile
"""

from flask import Blueprint, request
from json import dumps, loads
from src.classes import data_store
from src.user import user_register, user_login, user_logout, user_forgot_password, \
    user_reset_password, user_favourites_add, user_favourites_remove, user_favourites_get, \
    user_profile, user_set_tag_line, user_set_description, user_set_image, user_set_name, \
    user_get_created_recipes

user_bp = Blueprint("user", __name__, url_prefix = "/user")

@user_bp.route("/register", methods=['POST'])
def register():
    request_data = request.get_json(force=True)

    email = request_data.get('email')
    password = request_data.get('password')
    confirm_password = request_data.get('confirm_password')
    first_name = request_data.get('first_name')
    last_name = request_data.get('last_name')

    details = user_register(email, password, confirm_password, first_name, last_name)

    return dumps(details)

@user_bp.route("/login", methods=['POST'])
def login():
    request_data = request.get_json(force=True)

    email = request_data.get('email')
    password = request_data.get('password')

    details = user_login(email, password)

    return dumps(details)

@user_bp.route("/logout", methods=['POST'])
def logout():
    request_data = request.get_json(force=True)

    token = request_data.get('token')

    details = user_logout(token)

    return dumps(details)

@user_bp.route("/forgot/password", methods=['POST'])
def forgot_password():
    request_data = request.get_json(force=True)

    email = request_data.get('email')

    details = user_forgot_password(email)

    return dumps(details)


@user_bp.route("/reset/password", methods=['POST'])
def reset_password():
    request_data = request.get_json(force=True)

    email = request_data.get('email')
    reset_code = request_data.get('reset_code')
    password = request_data.get('password')
    confirm_password = request_data.get('confirm_password')

    details = user_reset_password(email, reset_code, password, confirm_password)

    return dumps(details)

@user_bp.route("/favourites/add", methods=['POST'])
def favourites_add():
    request_data = request.get_json(force=True)

    user_id = request_data.get('user_id')
    recipe_id = request_data.get('recipe_id')

    details = user_favourites_add(user_id, recipe_id)

    return dumps(details)

@user_bp.route("/favourites/remove", methods=['POST'])
def favourites_remove():
    request_data = request.get_json(force=True)

    user_id = request_data.get('user_id')
    recipe_id = request_data.get('recipe_id')

    details = user_favourites_remove(user_id, recipe_id)

    return dumps(details)

@user_bp.route("/favourites/get", methods=['GET'])
def favourites_get():
    request_data = request.args

    user_id = int(request_data.get('user_id'))

    details = user_favourites_get(user_id)

    return dumps(details)

@user_bp.route("/profile", methods=['GET'])
def profile():
    request_data = request.args

    user_id = int(request_data.get('user_id'))

    details = user_profile(user_id)

    return dumps(details)

@user_bp.route("/set/image", methods=['PUT'])
def set_image():
    request_data = request.get_json(force=True)

    user_id = request_data.get('user_id')
    image = request_data.get('image')

    details = user_set_image(user_id, image)

    return dumps(details)

@user_bp.route("/set/tag_line", methods=['PUT'])
def set_tag_line():
    request_data = request.get_json(force=True)

    user_id = request_data.get('user_id')
    tag_line = request_data.get('tag_line')

    details = user_set_tag_line(user_id, tag_line)

    return dumps(details)

@user_bp.route("/set/description", methods=['PUT'])
def set_description():
    request_data = request.get_json(force=True)

    user_id = request_data.get('user_id')
    description = request_data.get('description')

    details = user_set_description(user_id, description)

    return dumps(details)

@user_bp.route("/set/name", methods=['PUT'])
def set_name():
    request_data = request.get_json(force=True)

    user_id = request_data.get('user_id')
    first_name = request_data.get('first_name')
    last_name = request_data.get('last_name')

    details = user_set_name(user_id, first_name, last_name)

    return dumps(details)

@user_bp.route("/get/created_recipes", methods=['GET'])
def get_created_recipes():
    request_data = request.args

    user_id = int(request_data.get('user_id'))

    details = user_get_created_recipes(user_id)

    return dumps(details)
