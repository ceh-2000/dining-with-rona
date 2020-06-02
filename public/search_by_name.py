#ACCEPTS AS INPUT: Restaurant Name + split character + (location or ZIP)
#NOTE: curently, the split character is ','... change the .split() statements if you change this!
#   examples: 'Chipotle, ArlingtonVA' or 'Chipotle, 22203'
#OUTPUTS: a multiline string of restaurants and addresses and unique place_id, seperated by ;
#   line example: '('Chipotle Mexican Grill', '4300 Wilson Blvd #100, Arlington, VA 22203, United States', 'ChIJ8dkQlSS0t4kRlq3s2uoBzaA')'

import sys

# ----------- read input buffer ----------- #
# this taked stdin and converts it to a string
input_string =  "".join(map(chr, sys.stdin.buffer.read())).strip()
# input_string = input('Restaurant name, ZIP: ').strip()

# print('---- START LOG FROM PYTHON ----')
# print("Searched for: "+input_string)

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
name = input_string.split(',')[0].strip()
zip_ = input_string.split(',')[1].strip()
query =  'restaurant ' + name + ' near ' + zip_
# print("Query: "+query)

# get method of requests module
# return response object
r = requests.get(url + 'query=' + query + '&key=' + api_key)

# json method of response object convert
#  json format data into python format data
x = r.json()

# print(x)

np = None

# print(type(x))
# if 'next_page_token' in x:
#     np = x['next_page_token']
# else:
#     np = None

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

while np is not None:
    # print('HELLO!')

    time.sleep(2)

    r = requests.get(url + 'pagetoken=' + np + '&key=' + api_key)
    x = r.json()

    # print(x)

    np = None
    # if 'next_page_token' in x:
    #     np = x['next_page_token']
    # else:
    #     np = None
    # y = x['results']

    for i in range(len(y)):
        # print('h')
        return_list.append((y[i]['name'], y[i]['formatted_address'], y[i]['place_id']))

# print(len(return_list))

return_string = ';'.join([str(x) for x in return_list])

# print('---- END LOG FROM PYTHON   ----~')

sys.stdout.write(return_string + "")
