"""
user.py
Contains functions related to user accounts and authentication
"""

from re import fullmatch
from src.classes import data_store, User
from werkzeug.exceptions import BadRequest, Forbidden
from random import choice
import string, smtplib

# Returns True if the email is valid and is not already in use
def check_email(email):
    regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

    if not fullmatch(regex, email):
        return False

    if data_store.get_user_by_email(email):
        return False
    return True

# Creates a new user if their credentials are valid
def user_register(email, password, confirm_password, first_name, last_name):
    if not check_email(email):
        raise BadRequest(description = "Invalid email")

    if len(first_name) == 0 or len(last_name) == 0:
        raise BadRequest(description = "Invalid name")

    if len(password) == 0:
        raise BadRequest(description = "Invalid password")

    if password != confirm_password:
        raise BadRequest(description = "Passwords do not match")

    new_user = User(email, password, first_name, last_name)
    data_store.add_user(new_user)
    token = data_store.generate_user_token(email)
    new_user.add_token(token)

    return {
        'user_id': new_user.get_user_id(),
        'token': token
    }

# Checks a user's login details and logs them in
def user_login(email, password):
    user = data_store.get_user_by_email(email)
    if not user:
        raise BadRequest(description = "Email not in use")

    if data_store.generate_password(password) != user.get_password():
        raise BadRequest(description = "Incorrect password")

    token = data_store.generate_user_token(email)
    user.add_token(token)

    return {
        'user_id': user.get_user_id(),
        'token': token
    }

# Logs out a user by removing their token
def user_logout(token):
    user = data_store.get_user_by_token(token)

    if not user:
        raise Forbidden(description = "No user with this token")

    user.remove_token(token)

    return {}

# Allows users to request a password reset by getting a code sent to their email
def user_forgot_password(email):
    user = data_store.get_user_by_email(email)
    if not user:
        raise BadRequest(description = "Invalid email")

    user.set_tokens([])
    reset_code = ''.join(choice(string.ascii_uppercase + string.digits) for _ in range(50))
    user.set_reset_code(reset_code)

    our_email = "COMP3900JAIDS@gmail.com"
    our_password = "JA!DSCOMPtest"
    app_password = "dnhkkzajnzdizcpd"

    with smtplib.SMTP("smtp.gmail.com", port=587) as connection:
        connection.starttls()
        connection.login(user=our_email, password=app_password)
        connection.sendmail(
            from_addr=our_email,
            to_addrs=email,
            msg=f"Subject:Password Reset Code\n\n{reset_code}"
        )

    return {}

# Users may use the given reset code to assign themselves a new password
def user_reset_password(email, reset_code, password, confirm_password):
    user = data_store.get_user_by_email(email)
    if not user:
        raise BadRequest(decription = "Invalid email")

    if reset_code != user.get_reset_code():
        raise BadRequest(description = "Incorrect reset code")

    if len(password) == 0:
        raise BadRequest(description = "Invalid password")

    if password != confirm_password:
        raise BadRequest(description = "Passwords do not match")

    user.set_password(password)
    user.set_reset_code(None)
    return {}

# Adds a recipe to a user's list of favourites
def user_favourites_add(user_id, recipe_id):
    user = data_store.get_user_by_id(user_id)
    if not user:
        raise Forbidden("No user with this id")

    recipe = data_store.get_recipe_by_id(recipe_id)
    if not recipe:
        raise BadRequest("No recipe with this id")

    if not user.get_favourite_recipe(recipe_id):
        user.add_favourite_recipe(recipe)

    return {}

# Removes a recipe from a user's list of favourites
def user_favourites_remove(user_id, recipe_id):
    user = data_store.get_user_by_id(user_id)
    if not user:
        raise Forbidden("No user with this id")

    recipe = user.get_favourite_recipe(recipe_id)
    if not recipe:
        raise BadRequest("Recipe not favourited by user")

    user.remove_favourite_recipe(recipe)
    return {}

# Gets a list of the user's favourite recipes
def user_favourites_get(user_id):
    user = data_store.get_user_by_id(user_id)
    if not user:
        raise Forbidden("No user with this id")

    return {
        'favourites': [recipe.to_dict() for recipe in user.get_favourites()]
    }

# Gets the profile of a user given their id
def user_profile(user_id):
    user = data_store.get_user_by_id(user_id)
    if not user:
        raise Forbidden("No user with this id")

    return user.to_dict()

# Changes a user's image
def user_set_image(user_id, image):
    user = data_store.get_user_by_id(user_id)
    if not user:
        raise Forbidden("No user with this id")

    user.set_image(image)

# Changes a user's tag line
def user_set_tag_line(user_id, tag_line):
    user = data_store.get_user_by_id(user_id)
    if not user:
        raise Forbidden("No user with this id")

    if not isinstance(tag_line, str):
        raise BadRequest("tag_line is not a string")

    user.set_tag_line(tag_line)

    return {}

# Changes a user's description
def user_set_description(user_id, description):
    user = data_store.get_user_by_id(user_id)
    if not user:
        raise Forbidden("No user with this id")

    if not isinstance(description, str):
        raise BadRequest("description is not a string")

    user.set_description(description)

    return {}

# Changes a user's first and last name
def user_set_name(user_id, first_name, last_name):
    user = data_store.get_user_by_id(user_id)
    if not user:
        raise Forbidden("No user with this id")

    if (not type(first_name) == str) or (not type(last_name) == str):
        raise BadRequest("Names are not strings")

    if len(first_name) == 0 or len(last_name) == 0:
        raise BadRequest("Invalid name input")

    user.set_name(first_name, last_name)

    return {}

def user_get_created_recipes(user_id):
    user = data_store.get_user_by_id(user_id)
    if not user:
        raise Forbidden("No user with this id")

    return {'created_recipes':
            [recipe.to_dict() for recipe in user.get_created_recipes()]}
