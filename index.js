const express = require('express');

const app = express();

app.get("/", function(req,res) {
    res.send("hello there");
})

let numberofrequests = 0;
function calculateRrequests(req,res, next) {
    numberofrequests++;
    console.log(numberofrequests);
    next();
}

function userMiddleware(req,res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    if(username != "admin" && password != "admin"){
        res.status(401).send("unauthroized");
    } else{
        next();   //for control to reach next route or middleaware
    }
}

function kidneyMiddleware(req,res,next) {
    const username = req.headers.username;  //its important t0 define username and password inside middlewares
    const password = req.headers.password;
    if(username != "admin" && password != "admin") {
        res.status(401).json({
            mssg: "unaithorized"
        })
    }else {
        next();
    }
}

app.use(userMiddleware); //this will make it use in every route irrespective of weather we define or not
app.use(kidneyMiddleware); //app.use takes middleware are input
app.use(express.json()) //Using express.json() middleware is essential for applications that handle JSON data, as it allows you to easily access and manipulate the JSON payload in incoming requests.

app.get("/health-checkup", kidneyMiddleware, calculateRrequests , function(req,res) {
    //do something with kidneys here,
    res.send("your health is being monitered");
})

app.get("/kidney-checkup", function(req,res) {
    res.send("your kidney is being checked")
})

app.listen(3000);