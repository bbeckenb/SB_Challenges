"""
API Requests

Two ways to talk w/ APIs
-Client side reqs (via AJAX)
-Server side reqs
    -Why use server side reqs?
    -Easier for server to store/ process data
        -Ex: have Flask reqs restaurants and store in SQL database
    -Need password to access API
        -If API uses password & we make request in browser JS, people courl learn password from reading JS

pip3 install requests

Going to be learning w/ the iTunes API


.get() and .post() return a Response instance

.text = Text of response

.status_code = Numeric status code (200,404,etc.)

.json() = convert JSON response text to Python dictionary

can send POST req:
-requests.post(url, data, json)
    -supports 2 different ways to send info 
        -data: dictionary of data to send in traditional web from format
        -json: dictionary of data to send as a JSON string
        -Most modern APIs expect to receive JSON, not traditional web form format

API Keys/ Secrets
-Many APIs require 'keys' and 'secrets' similar to username/ passwords
-Many will charge money at certain volumes
-Read documentation BIG TIME

"""

import requests
# term = 'Red Hot Chili Peppers'

# res = requests.get(
#     'https://itunes.apple.com/search', params={'term':term, 'limit':5})

# data = res.json()
# for result in data['results']:
#     print(result['trackName'])
#     print(result['collectionName'])

# data = {
#     'username': 'chickenz',
#     'tweets': ['hello', 'goodbye', 'bock bock!', {'id':1, 'text': 'my first tweet!'}]
# }

# requests.post('https://en27bnye2btkl.x.pipedream.net', json=data)


"""MapQuest free 15,000 API calls per month
My Application’s Keys
Consumer Key	a8yP8c7Fz5011U54sWod8a9Fw8H3NbTx
Consumer Secret	JJHIcTvJYc9bv4q1
Key Issued	Thu, 08/05/2021 - 09:00
Key Expires	Never

NOTE KEEP YOUR KEYS SECRET
make a separate file, store your keys there, import it into your app.py file, 
.gitignore that file
"""

key = 'a8yP8c7Fz5011U54sWod8a9Fw8H3NbTx'

response = requests.get('http://www.mapquestapi.com/geocoding/v1/address', params={'key':key, 'location': 'Denver, CO'})

"""
Can do this in Flask app
Intellexer - sentiment analysis API
Twilio - Text API

API Wrapper Libraries: Language specific pre-built functions to get info you want from APIs

"""