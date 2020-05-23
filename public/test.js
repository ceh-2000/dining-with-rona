#!/usr/bin/nodejs

// -- NOTE - THIS IS A STAND-ALONE DEMO SCRIPT !!!!!!!!!!!!!!!!!!!!  //
//  IF YOU RUN THIS AS A SERVER, ...IT... ...WILL... ...FAIL..       //

//  to use this demo call:
//  $node test.js

//  when you are happy with the way it works, WEAVE it back into your server 
//  copy-pasting into a server does not make sense and guarantees brokenness


// load package - we'll use this for python
var child_process = require('child_process')

var path  = require('path');


// the python executable. This can be a path to a venv, or whatever version of python you care
python_exe = 'python3';

// the python file you will use. 
//  - I use path.join to create the full path to the file.  
pythonFile = path.join(__dirname, 'get_restaurants.py');

// This is the data that will be passed to python. 
//  - The values of the key 'input' will be parsed by stdin in python.
//    Therefore, in this design paradigm, you must have a key named 'input', 
//    AND all of your data must reside underneath it.
feed_dict = { input: '22152' };

// spawn the (python) child process syncronously
//  - child_process has many multiple ways to call system processes, the most common are
//    spawn and exec. the main difference between these two are:
//       spawn returns a stream -- and exec returns a buffer.
py = child_process.spawnSync(python_exe, [pythonFile], feed_dict );

// the py object we just created contains tons of information about the executed python 
//   process. Among the data we get back at this point are the contents of stdout.
//   This is how you extract the contents of sys.stdout
py_response = py['stdout'].toString();

// log the response 
console.log(py_response)