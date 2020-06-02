// var mysql = require('mysql');
// //create a connection pool
// sqlParams = {
//   connectionLimit : 10,
//   user            : 'site_dining-with',
//   password        : 'EjwTnQN9QghPf6UYUBvwShnk',
//   host            : 'mysql1.csl.tjhsst.edu',
//   port            : 3306,
//   database        : 'site_dining-with-rona'
// }
// var pool  = mysql.createPool(sqlParams);


// function doHomework(subject, callback) {
//     var my_list = ['ChIJjVqBaYFStokR3zBYXXvgqmA']
//     pool.query('SELECT restaurant_id, average_rating FROM ratings WHERE restaurant_id = ?',my_list[0], function (error, results, fields) {
//         if (error) throw error;
            
//         var return_ratings_count = results.length;
//         var return_avg_rating = 0
        
//         if(return_ratings_count > 0){
//                     //iterate through the results to get comments and average rating
//             var sum = 0
//             for(let c = 0; c<results.length; c++){
//                 sum += results[c].average_rating;
//             }
//             return_avg_rating = sum/return_ratings_count;
//         }
//         console.log(return_avg_rating);
    
//         pool.end();
//         callback(return_avg_rating);

//     });  
// }
// function alertFinished(input_text){
//   return input_text;
// }

// function my_function(){
//     return doHomework('math', alertFinished);
// }

// console.log(my_function());

var dict = {
  "x": 0,
  "y": 0,
  "z": 0,
  "a": 5,
  "b": 7,
  "c": 11,
  "d": 17,
  "t": 3
};

// Create items array
var items = Object.keys(dict).map(function(key) {
  return [key, dict[key]];
});

// Sort the array based on the second element
items.sort(function(first, second) {
  return second[1] - first[1];
});

// Create a new array with only the first 5 items
console.log(items.slice(0, dict.length));

