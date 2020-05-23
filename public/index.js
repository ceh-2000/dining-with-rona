#!/usr/bin/nodejs


// -------------- load packages -------------- //
var express = require('express')
var path = require('path');
var hbs = require('hbs');

var app = express();


// load package - we'll use this for python
var child_process = require('child_process')


// the python executable. This can be a path to a venv, or whatever version of python you care
python_exe = 'python3';


// -------------- express initialization -------------- //
app.set('port', process.env.PORT || 8080 );

// tell express that the view engine is hbs
app.set('view engine', 'hbs');

// -------------- variable definition -------------- //
//CAN ADD STUFF THAT GETS TRACKED LIKE NUMBER OF TOTAL VISITORS :))))))


// -------------- express 'get' handlers -------------- //


//run the python script when page loads to get all nearby restaurants
app.get('/', function(req, res){

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
    
    // render the page
    res.render('index', { list_of_restaurants : py_response} );
   

})


//run the python script to get all nearby restaurants
app.get('/nearby_restaurants', function(req, res){
    var current_zipcode = req.query.zip;
    
        // the python file you will use. 
    //  - I use path.join to create the full path to the file.  
    pythonFile = path.join(__dirname, 'get_restaurants.py');
    
    // This is the data that will be passed to python. 
    //  - The values of the key 'input' will be parsed by stdin in python.
    //    Therefore, in this design paradigm, you must have a key named 'input', 
    //    AND all of your data must reside underneath it.
    feed_dict = { input: current_zipcode };
    
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
    
    
    res.send(py_response)
    
})




// -------------- listener -------------- //
// The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});