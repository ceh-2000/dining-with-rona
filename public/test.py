import json

s = "{'name': 'Arabic', 'dialect': 'Gulf'}"
json_acceptable_string = s.replace("'", "\"")
d = json.loads(json_acceptable_string)

print(type(d))