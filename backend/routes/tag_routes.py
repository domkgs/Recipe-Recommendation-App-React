"""
tag_routes.py
Contains the Flask route for obtaining the list of recipe tags
"""

from flask import Blueprint, request
from json import dumps, loads
from src.classes import data_store
from src.tag import tag_list

tags_bp = Blueprint("tags", __name__, url_prefix = "/tags")

@tags_bp.route("/list", methods=['GET'])
def list():
    details = tag_list()

    return dumps(details)
