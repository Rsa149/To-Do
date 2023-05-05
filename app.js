const express  = require( "express" );
const mongoose = require( "mongoose" );
const http = require("http");
const fs = require( "fs" );
const app = express(); 
const path = require('path'); // a common localhost test port
const port = 8080; 
const bodyParser = require('body-parser'); // middleware

app.set("view engine", "ejs");

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }));



app.listen (port, () => {
    // template literal
    console.log (`Server is running on http://localhost:${port}`);
    
    
});



// Connect to MongoDB

mongoose.connect( "mongodb://localhost:27017/lab_users", 
                { useNewUrlParser: true, 
                  useUnifiedTopology: true});
        
//Create a schema for task                  
const task_Schema = new mongoose.Schema({
    _id: Number,
    text: String,
    state: String,
    creator: String,
    isTaskClaimed: Boolean,
    claimingUser: String,
    isTaskDone:Boolean,
    isTaskCleared:Boolean
});

//Create a schema for user
const user_Schema = new mongoose.Schema({
       username: String,
       password: String
});

const Task = mongoose.model("Task",task_Schema);       // object for task schema
const User = mongoose.model("User",user_Schema);       // object for user schema

// Now save soem values in task
// const task = new Task({
//     _id : string,
//     text: string,
//     state: string,
//     creator: string,
//     isTaskClaimed: string,
//     claimingUser: string,
//     isTaskDone: string,
//     isTaskCleared: string
// });
// task.save();

// //Now save the user info
// const user = new User({
//     username : string,
//     password :string
// });
// user.save();








    app.get("/greeting", function (req, res) {
        res.render("greeting")
    });
    app.get("/", function (req, res) {
        res.render("index")
    });
    app.get("/todo", function (req, res) {
        res.render("todo")
    });

    // app.post("/", function (req, res{
    //     res.render("todo", {username : req.body["app_email"]})
    // });

    

    app.post("/login", async(req, res) => {
        //res.send("message received");
        console.log(req.body);

        // try {
        //     const user = await User.find();
        //     console.log( user );
        //     res.render( "reviews", { results: results });
        // } catch ( error ) {
        //     console.log( error );
        // }

        // try {
        //     var user_name = await user.find();
        //     var pass_word = 

        //     res.render( "reviews", { results: results });
        // } catch ( error ) {
        //     console.log( error );
        // }
    
        // fs.readFile ( __dirname + "/user.json","utf8", ( err, jsonString ) => {
        //     if ( err ) {
        //         console.log("Error reading file from disk:", err);
        //         return;
        //     }
        //     try {
        //         const users = JSON.parse(jsonString);
        //         var input_username = req.body["app_email"];
        //         var input_password = req.body["password"];
        //         var verified = false;
        //         for(var i = 0; i < users.length; i++) {
        //             var object = users[i];
                    
        //              if((input_username === object.username) && (input_password === object.password ) ){
        //                 verified = true;
        //                 console.log("user verified");
        //                 //res.redirect("/todo");
        //                 res.render("todo",{username : input_username});
        //             }
        //           }  
        //           if(!verified){
        //             console.log("user not verified1");
        //                 res.redirect("/");
                      
        //           }  
        //     } catch ( err ) {
        //         console.log("Error parsing JSON:", err);
        //         res.redirect("/");
        //     }
        // });
    });
//---------------Sign Up -------------------------------


app.post("/signup", (req, res) => {
   
    console.log(req.body);
    var input_username_sign = req.body["inputEmail"];
    var input_password_sign = req.body["inputPassword"];
    var authentication = req.body["authentication"];

    const user =  new User({
        username :  input_username_sign,
        password : input_password_sign
    });

    
    if(user.save()){
        console.log("Data save");
    }
    else{
        console.log("not saves");
    }
    res.render( "todo",{username : input_username_sign} )

});

app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { 
          return next(err); 
      }
      res.redirect('/');
    });
  });