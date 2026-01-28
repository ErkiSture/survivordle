import json


def test_daily_survivor(client):
  response = client.get("/api/daily_survivor")
  assert response.status_code == 200

  survivor = response.json
  assert "stats" in survivor
  assert "name" in survivor
  
  assert "gender" in survivor['stats']
  assert "hair" in survivor['stats']
  assert "origin" in survivor['stats']
  assert "licensed" in survivor['stats']
  assert "release" in survivor['stats']


def test_get_survivor(client):
  response = client.get("/api/get_survivor_stats/Dwight Fairfield")
  assert response.status_code == 200

  survivor = response.json
  assert "gender" in survivor
  assert "hair" in survivor
  assert "origin" in survivor
  assert "licensed" in survivor
  assert "release" in survivor


def test_get_nonexistens_survivor(client):
  response = client.get("/api/get_survivor_stats/finns_inte")
  assert response.status_code == 404


def test_get_all_survivors(client):
  response = client.get("/api/get_all_survivors")
  assert response.status_code == 200

  survivor_list = response.json
  assert 'Steve Harrington' in survivor_list
  assert 'Dwight Fairfield' in survivor_list
  assert 'Aestri Yazar & Baermar Uraz' in survivor_list
  assert 'Vee Boonyasak' in survivor_list
  assert 'Ash Williams' in survivor_list