from flask import Flask, jsonify, send_from_directory, render_template
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

  app = Flask(__name__)
  PROD = os.getenv("FLASK_ENV") == "production"

  if PROD:
    print("PROD TRUE")
    app = Flask(__name__, static_folder="../../client/dist", static_url_path="/")

    @app.route("/")
    def server():
      return app.send_static_file("index.html")
    
  else:
    print("PROD FALSE")
    app = Flask(__name__)

  @app.route("/api/daily_survivor")
  def daily_survivor():
    with open(file_path, "r") as f:
      survivors = json.load(f)
    today = date.today()
    seed = int(today.strftime("%Y%m%d"))
    rng = random.Random(seed)
    name = rng.choice(list(survivors.keys()))
    
    return jsonify({"name": name, "stats": survivors[name]}), 200
  
  @app.route("/api/get_survivor_stats/<name>")
  def get_survivor_stats(name):
    """Takes a name and returns the stats for that survivor"""

    with open(file_path, "r") as f:
      survivors = json.load(f)

    if name not in survivors:
      return jsonify({"error": "survivor not found"}), 404 

    return jsonify(survivors[name])
  
  @app.route("/api/get_all_survivors")
  def get_all_survivors():
    """Returns a list of all survivor names"""
  
    with open(file_path, "r", encoding="utf-8") as f:
      survivors = json.load(f)

    return jsonify(list(survivors.keys())), 200
  
  @app.route("/test")
  def home():
    return app.send_static_file("index.html")
  
  return app


