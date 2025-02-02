import requests

base_url = 'https://api.github.com/users/'
username = 'adlard07'
response = requests.get(base_url + username)
print(response.json())