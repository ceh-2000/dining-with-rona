#!/usr/bin/nodejs


// -------------- load packages -------------- //
var express = require('express')
var path = require('path');
var hbs = require('hbs');
var mysql = require('mysql');
var request = require('request');

//run express
var app = express();

app.use(express.static('views/images')); 


// load package - we'll use this for python
var child_process = require('child_process')


// the python executable. This can be a path to a venv, or whatever version of python you care
python_exe = 'python3';


// -------------- express initialization -------------- //
app.set('port', process.env.PORT || 8080 );

// tell express that the view engine is hbs
app.set('view engine', 'hbs');

// -------------- mysql initialization -------------- //
//create a connection pool
sqlParams = {
  connectionLimit : 1000,
  user            : 'site_dining-with',
  password        : 'EjwTnQN9QghPf6UYUBvwShnk',
  host            : 'mysql1.csl.tjhsst.edu',
  port            : 3306,
  database        : 'site_dining-with-rona'
}
var pool  = mysql.createPool(sqlParams);




// -------------- express 'get' handlers -------------- //


//render main page
app.get('/', function(req, res){
    
    // render the page
    res.render('index');
   

})

app.get('/food', function(req, res){
    
    // render the page
    res.render('food');
   

})


//run the python script to get all nearby restaurants
app.get('/nearby_restaurants', function(req, res){
    var current_zipcode = req.query.zip;
    var current_restaurant = req.query.rest_id;

    if(isZipcode(current_zipcode)){
        pythonFile = path.join(__dirname, 'search_by_name.py');
        feed_dict = { input: (current_restaurant+","+current_zipcode) };
        py = child_process.spawnSync(python_exe, [pythonFile], feed_dict );
        py_response = py['stdout'].toString();
        
        if(py_response.length>0){
            get_ratings(py_response);
        }
        else{
            res.send("");
        }
        
        
    }
    else{
        res.send("Invalid")
    }

    function get_ratings(resp){
        list_one = [];
        dict_three = {};

        list_of_rests = (resp.split(";"));
        nice_format = ""
        for(var h = 0; h < list_of_rests.length; h++){
            cur_rest = (list_of_rests[h]).replace("\"", "'").replace("\"", "'").split("', '");
            my_rest_fancy = []
            for(let r = 0; r < cur_rest.length; r++){
                nice_format+= cur_rest[r].replace("'", "").replace("(", "").replace(")", "").replace("(", "")+"<br>"
                my_rest_fancy.push(cur_rest[r].replace("'", "").replace("(", "").replace(")", "").replace("(", ""))
            }
            list_one.push(my_rest_fancy[2]);
            dict_three[my_rest_fancy[2]] = ((my_rest_fancy[0]+"~"+my_rest_fancy[1]));
            
        }
        
        //FIX THIS SORTING FUNCTIONALITY BITCH
        var my_list = [];
        for(var g = 0; g< list_one.length; g++){
            pool.query('SELECT restaurant_id, average_rating FROM ratings WHERE restaurant_id = ?',list_one[g], function (error, results, fields) {
                if (error) throw error;

                var return_ratings_count = results.length;
                var return_avg_rating = 0

                if(return_ratings_count > 0){
                            //iterate through the results to get comments and average rating
                    var sum = 0
                    for(let c = 0; c<results.length; c++){
                        sum += results[c].average_rating;
                    }
                    return_avg_rating = sum/return_ratings_count;
                    console.log(return_avg_rating)
                    my_list.push(return_avg_rating);

                }
                else{
                    my_list.push(return_avg_rating);
                }

                if(my_list.length === list_one.length){
                    
                    sort_this_hoe(list_one, my_list, dict_three);
                    
                }
                
                

            });  
        }

    }
    
    function sort_this_hoe(list1, list2, dict3){
        var rating_dict = {};
        for(var em = 0; em < list1.length; em++){
            rating_dict[list1[em]] = list2[em];
        }
        
        // Create items array
        var items = Object.keys(rating_dict).map(function(key) {
          return [key, rating_dict[key]];
        });
        
        // Sort the array based on the second element
        items.sort(function(first, second) {
          return second[1] - first[1];
        });
        
        // Create a new array with only the first 5 items
        var final_list = items.slice(0, rating_dict.length);
        
        var final_string = "";
        for(let i = 0; i < final_list.length; i++){
            current_key = final_list[i][0]
            console.log("YO"+final_list[i][1])
            if(i == final_list.length-1){
                final_string += dict3[current_key]+"~"+current_key
            }
            else{
                final_string += dict3[current_key]+"~"+current_key+"`"
            }
        }
        
        console.log(final_string);
        
        res.send(final_string); 
        
    }

    
    
    
    //THIS SCRIPT WOULD ALLOW FOR GETTING MORE RESULTSSSSSS
    // if(isZipcode(current_zipcode) && restaurant_id===""){
    //     pythonFile = path.join(__dirname, 'get_restaurants.py');
    //     feed_dict = { input: input_string };
    //     py = child_process.spawnSync(python_exe, [pythonFile], feed_dict );
    //     py_response = py['stdout'].toString();
    //     console.log(py_response)  
    //     res.send(py_response)
    // }
    // else if(isZipcode(current_zipcode)){
    //     pythonFile = path.join(__dirname, 'search_by_name.py');
    //     feed_dict = { input: (current_restaurant+","+current_zipcode) };
    //     py = child_process.spawnSync(python_exe, [pythonFile], feed_dict );
    //     py_response = py['stdout'].toString();
    //     res.send(py_response)
    // }
    // else{
    //     res.send("Invalid")
    // }
    
})

//run the python script to get a specific resaurant
app.get('/search_name', function(req, res){
    var current_restaurant = req.query.one_rest;
    var current_zipcode = req.query.one_zip;
    
    if(isZipcode(current_zipcode)){
    
        pythonFile = path.join(__dirname, 'search_by_name.py');
        
        feed_dict = { input: (current_restaurant+","+current_zipcode) };
        py = child_process.spawnSync(python_exe, [pythonFile], feed_dict );
        py_response = py['stdout'].toString();
        
        res.send(py_response);
    }
    else{
        res.send("Invalid")
    }
    
})



app.get('/store_rating', function(req, res){
    var restaurant_id = req.query.rest_id;
    var avg_rating = parseFloat(req.query.a_rating);
    var comment = req.query.com;
    
    var params = [restaurant_id, 5, avg_rating, comment]
    
    pool.query('INSERT INTO ratings(restaurant_id, num_of_ratings, average_rating,comments) VALUE (?,?,?,?);', params, function (error, results, fields) {
        if (error) throw error; //error thrown if problem arises
    });  
    
    
    res.send("Done")
    
}); 

app.get('/get_a_restaurant', function(req, res){
    var restaurant_id = req.query.rest_id;
    console.log(restaurant_id);
    var return_string = "";
    
    pool.query('SELECT restaurant_id, average_rating, comments FROM ratings WHERE restaurant_id = ?',restaurant_id, function (error, results, fields) {
        if (error) throw error;
      
        var return_ratings_count = results.length
        var return_avg_rating = 0
        var return_comments = ""
      
        if(return_ratings_count > 0){
            //iterate through the results to get comments and average rating
            var sum = 0
            for(let c = 0; c<results.length; c++){
                sum += results[c].average_rating
                if(results[c].comments!==""){
                    if(c!==(results.length-1)){
                        return_comments += results[c].comments+"~"
                    }
                    else{
                        return_comments += results[c].comments
                    }
                }
            }
            return_avg_rating = sum/return_ratings_count;
            return_string = return_avg_rating+"^"+return_comments;
        }
        else{ 
            //we want to return none if no results are found  
            return_string = "None"
        }
        
      
        res.send(return_string); //send queried info to hbs page

    
    });
    
}); 

app.get('/get_URL', function(req, res){
    var restaurant_id = req.query.r_id;
    
    pythonFile = path.join(__dirname, 'get_one_restaurant.py');
    feed_dict = { input: restaurant_id };
    py = child_process.spawnSync(python_exe, [pythonFile], feed_dict );
    py_response = py['stdout'].toString();
    
    res.send(py_response)
    
}); 


// -------------- additional functions -------------- //

//check if the input is a valid zipcode
function isZipcode(entered){
    if(entered.length==5 && entered.match(/^[0-9]+$/) != null){
        return true
    }
    else{
        return false
    }
}



// -------------- listener -------------- //
// The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});