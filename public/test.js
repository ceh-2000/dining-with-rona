function refresh(callback){
            console.log("Hello")
            callback();
        }
        
        function reset_1(){
            console.log("bye")
        }
        
        function reset_2(){
            console.log("bye")
        }
        
        function reload(){
            refresh(reset_1);
        }
        
        function reload2(){
            refresh(reset_2);
        }
        
reload()
reload2()