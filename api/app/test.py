import requests


names = [
  "Dwight Fairfield",
  "Meg Thomas",
  "Claudette Morel",
  "Jake Park",
  "Nea Karlsson",
  "Laurie Strode",
  "Ace Visconti",
  "Bill Overbeck",
  "Feng Min",
  "David King",
  "Quentin Smith",
  "David Tapp",
  "Kate Denson",
  "Adam Francis",
  "Jeff Johansen",
  "Jane Romero",
  "Ash Williams",
  "Nancy Wheeler",
  "Steve Harrington",
  "Yui Kimura",
  "Zarina Kassir",
  "Cheryl Mason",
  "Felix Richter",
  "Élodie Rakoto",
  "Yun-Jin Lee",
  "Jill Valentine",
  "Leon Scott Kennedy",
  "Mikaela Reid",
  "Jonah Vasquez",
  "Yoichi Asakawa",
  "Haddie Kaur",
  "Ada Wong",
  "Rebecca Chambers",
  "Vittorio Toscano",
  "Thalita Lyra",
  "Renato Lyra",
  "Gabriel Soma",
  "Nicolas Cage",
  "Ellen Ripley",
  "Alan Wake",
  "Sable Ward",
  "Aestri Yazar & Baermar Uraz",
  "Lara Croft",
  "Trevor Belmont",
  "Taurie Cain",
  "Rick Grimes",
  "Michonne Grimes",
  "Vee Boonyasak"
]


def run_tests():
  response = requests.get(f"http://localhost:5000/get_survivor_stats/test")
  assert response.status_code == 404

  response = requests.get(f"http://localhost:5000/get_survivor_stats/Meg Thomas")
  assert response.status_code == 200

  response = requests.get(f"http://localhost:5000/daily_survivor")
  response = response.json()
  assert "name" in response
  assert "stats" in response
  assert response['name'] in names

  response = requests.get(f"http://localhost:5000/get_all_survivors")
  response = response.json()
  assert set(response) == set(names)

  print("All tests passed")


if __name__ == "__main__":
  run_tests()
