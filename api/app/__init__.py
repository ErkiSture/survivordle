from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import random
from datetime import date
import json
import os

import os
import json

# Get the directory where this file (__init__.py) lives
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Build the path to survivors.json (adjust ".." as needed to reach the root)
file_path = os.path.join(BASE_DIR, "..", "survivors.json")


def create_app():
  app = Flask(__name__, static_folder="../../client/dist", static_url_path="/")
  CORS(app)

  # app.config.from_mapping(
  #   DEBUG = True
  # )

  @app.route('/', defaults={'path': ''})
  def serve(path):
      # If the file exists (like /static/js/main.js), serve it
      if path != "" and os.path.exists(app.static_folder + '/' + path):
          return send_from_directory(app.static_folder, path)
      # Otherwise, return index.html (React handles the route)
      else:
          return send_from_directory(app.static_folder, 'index.html')
  
  @app.route("/daily_survivor")
  def daily_survivor():
    """Returns the name and stats of today's survivor"""

    with open(file_path, "r") as f:
      survivors = json.load(f)

    today = date.today()
    seed = int(today.strftime("%Y%m%d"))
    rng = random.Random(seed)
    name = rng.choice(list(survivors.keys()))
    
    return jsonify({"name": name, "stats": survivors[name]}), 200
  
  @app.route("/get_survivor_stats/<name>")
  def get_survivor_stats(name):
    """Takes a name and returns the stats for that survivor"""

    with open(file_path, "r") as f:
      survivors = json.load(f)

    if name not in survivors:
      return jsonify({"error": "survivor not found"}), 404 

    return jsonify(survivors[name])
  
  @app.route("/get_all_survivors")
  def get_all_survivors():
    """Returns a list of all survivor names"""
  
    with open(file_path, "r", encoding="utf-8") as f:
      survivors = json.load(f)

    return jsonify(list(survivors.keys())), 200
  
  return app