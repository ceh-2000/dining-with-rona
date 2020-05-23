import sys

# ----------- read input buffer ----------- #
# this taked stdin and converts it to a string
input_string =  "".join(map(chr, sys.stdin.buffer.read())) 

print('---- START LOG FROM PYTHON ----')
print(input_string)

# Python program to get a set of  
# places according to your search  
# query using Google Places API 
  
# importing required modules 
import requests, json 
  
# enter your api key here 
api_key = 'AIzaSyB9P34J_5kAWsc4gc3aU_6Z6AiquirqgWo'
  
# url variable store url 
url = "https://maps.googleapis.com/maps/api/place/textsearch/json?"
  
# The text string on which to search 
question = input_string
query =  "restaurants near "+question

# get method of requests module 
# return response object 
r = requests.get(url + 'query=' + query +
                        '&key=' + api_key) 
  
# json method of response object convert 
#  json format data into python format data 
x = r.json() 
  
# now x contains list of nested dictionaries 
# we know dictionary contain key value pair 
# store the value of result key in variable y 
y = x['results'] 

return_string = ""
# keep looping upto length of y 
for i in range(len(y)): 
      
    # Print value corresponding to the 
    # 'name' key at the ith index of y 
    return_string += y[i]['name']+", "


print('---- END LOG FROM PYTHON   ----')

sys.stdout.write(return_string)



