"""
server.py
Runs the server using Flask. Registers HTTP endpoints by using blueprints
defined in the 'routes' files.
"""

import sys
from json import dumps
from flask import Flask, request, send_from_directory
from flask_cors import CORS
from src import config
from src.classes import data_store
from routes.user_routes import user_bp
from routes.recipe_routes import recipe_bp
from routes.ingredients_routes import ingredients_bp
from routes.meal_plan_routes import meal_plan_bp
from routes.tag_routes import tags_bp

def quit_gracefully(*args):
    '''For coverage'''
    exit(0)

def defaultHandler(err):
    response = err.get_response()
    print('response', err, err.get_response())
    response.data = dumps({
        "code": err.code,
        "name": "System Error",
        "message": err.get_description(),
    })
    response.content_type = 'application/json'
    return response

APP = Flask(__name__, static_folder='../static/')
CORS(APP)

APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, defaultHandler)

# Default route
@APP.route("/", methods=['GET'])
def main_addr():
    return dumps("Hello!!")

# Runs the server
if __name__ == "__main__":
    APP.register_blueprint(user_bp)
    APP.register_blueprint(recipe_bp)
    APP.register_blueprint(tags_bp)
    APP.register_blueprint(ingredients_bp)
    APP.register_blueprint(meal_plan_bp)

    APP.run(port=config.port)
