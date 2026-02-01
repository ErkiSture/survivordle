from flask import Flask, jsonify, send_from_directory, render_template
from flask_cors import CORS
import random
from datetime import date, timedelta, datetime
import json
import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(BASE_DIR, "..", "survivors.json")


def create_app():

  # load_dotenv()
  PROD = os.getenv("FLASK_ENV") == "production"

  if PROD:
    print('Running production mode')
    app = Flask(__name__, static_folder="../../client/dist", static_url_path="/")

    @app.route("/")
    def server():
      return app.send_static_file("index.html")
    
  else:
    print('Running development mode')
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
  
  @app.route("/api/next_reset")
  def next_reset():
    now = datetime.now()
    tomorrow = (now + timedelta(days=1)).replace(hour=0, minute=0, second=0, microsecond=0)

    return jsonify({"next_reset": tomorrow.isoformat()})

  
  return app


