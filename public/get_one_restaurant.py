#ACCEPTS AS INPUT: the place_id of a restaurant
#   example: 'ChIJ8dkQlSS0t4kRlq3s2uoBzaA'
#OUTPUTS: the website URL for that place_id
#   example: 'https://locations.chipotle.com/va/arlington/2231-crystal-dr?utm_source=google&utm_medium=yext&utm_campaign=yext_listings'

import sys

# ----------- read input buffer ----------- #
# this taked stdin and converts it to a string
place_id =  "".join(map(chr, sys.stdin.buffer.read())).strip()
# place_id = input('Place ID: ').strip()

import requests, json, time

api_key = 'AIzaSyB9P34J_5kAWsc4gc3aU_6Z6AiquirqgWo'

url = "https://maps.googleapis.com/maps/api/place/details/json?"

r = requests.get(url + 'place_id=' + place_id + '&key=' + api_key)

x = r.json()

y = x['result']

return_list = [y['website']]

return_string = ';'.join([str(x) for x in return_list])

sys.stdout.write(return_string + '\n')
