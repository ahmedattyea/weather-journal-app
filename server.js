// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app =express();

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;
const serverInfo = app.listen(port , addData);
function addData(){
    console.log(`server running on port: $(port)`)
}

//get function
app.get('/informations' , sendInfo);
function sendInfo(request , response){
    response.send(projectData);
}

//post function 

app.post('/addInfo' , addInfo)
function addInfo(request , response){
let data = request.body;
console.log(`server is side dataInfo` , data);
projectData = {
    date:request.body.date,
    temp:request.body.temp,
    content:request.body.content
};  
}
