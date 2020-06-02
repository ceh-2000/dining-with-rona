#ACCEPTS AS INPUT: location or Zip
#   examples: 'ArlingtonVA' or '22203'
#OUTPUTS: a multiline string of restaurants and addresses and unique place_id, seperated by \n
#   line example: '('Chipotle Mexican Grill', '4300 Wilson Blvd #100, Arlington, VA 22203, United States', 'ChIJ8dkQlSS0t4kRlq3s2uoBzaA')'

import sys

# ----------- read input buffer ----------- #
# this taked stdin and converts it to a string
#inp =  "".join(map(chr, sys.stdin.buffer.read())).split('*')
inp = input().split('*')
input_string = inp[0]
if len(inp) == 2:
    np = inp[1]
else:
    np = None

# print('---- START LOG FROM PYTHON ----')
# print(input_string)

# Python program to get a set of
# places according to your search
# query using Google Places API

# importing required modules
import requests, json, time

# enter your api key here
api_key = 'AIzaSyB9P34J_5kAWsc4gc3aU_6Z6AiquirqgWo'

# url variable store url
url = "https://maps.googleapis.com/maps/api/place/textsearch/json?"

# The text string on which to search
question = input_string
query =  "restaurants near " + question

# get method of requests module
# return response object
if np is None:
    r = requests.get(url + 'query=' + query + '&key=' + api_key)
else:
    r = requests.get(url + 'pagetoken=' + np + '&key=' + api_key)

# json method of response object convert
#  json format data into python format data
x = r.json()

# print(type(x))
if 'next_page_token' in x:
    np = x['next_page_token']
else:
    np = None

# now x contains list of nested dictionaries
# we know dictionary contain key value pair
# store the value of result key in variable y
y = x['results']

return_list = []
# keep looping upto length of y
for i in range(len(y)):
    # Print value corresponding to the
    # 'name' key at the ith index of y
    return_list.append((y[i]['name'], y[i]['formatted_address'], y[i]['place_id']))

print(len(return_list))

return_string = ';'.join([str(x) for x in return_list])
return_string += '~' + str(np)

# print('---- END LOG FROM PYTHON   ----')

sys.stdout.write(return_string)

#1. LINK TO SITE
#2. SCRIPT THAT SEARCHES BY RESTAURANT NAME AND ZIP CODE
