/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let date = d.getDate() + '.'+ (d.getMonth() + 1 )+ '.' + d.getFullYear();

const myUrl = 'http://api.openweathermap.org/data/2.5/weather?units=metric&zip=';
const myApiKey = '&APPID=9cb7b581d8290eb7a3e1e26ae7fdc250';

document.getElementById('generate').addEventListener('click' , showTheData);
function showTheData(e){
    const zipCode = document.getElementById('zip').value;
    const feel = document.getElementById('feelings').value;
    // function to show the weather on website
    showWeather(myUrl,zipCode,myApiKey)
    .then(function(data){
        console.log(data);
        viewData('/addInfo' , {date:date, temp:data.main.temp , content:feel})
        updatedUI();
        
    })
};
const showWeather =async(myUrl ,Zip,myApiKey)=>{
     const response = await fetch (myUrl +Zip +myApiKey)
     try{
         const data = await response.json();
         return data;
     } 
     catch(error){
         console.log("error",error);
     }
}

const viewData = async (url = "", data = {})=>{
    console.log(data);
    const res = await fetch (url,{
        method:"POST",
        credentials:'same-origin',
        headers:{
            'content-Type':'application/json',
        },
        body:JSON.stringify(data)
    })
    try{
        const newInfo = await res.json();
        console.log(newInfo);
        return newInfo;
    }catch(error){
        console.log("error" , error);
    }
}

const  updatedUI = async()=>{
    const request = await fetch('/informations');
    try{
        const allData = await request.json();
        console.log("asd",allData);
        document.getElementById('date').innerHTML = `date:${allData.date}`;
        document.getElementById('temp').innerHTML = `temperature:${allData.temp}`;
        document.getElementById('content').innerHTML = `feel:${allData.content}`;

    }catch(error){
        console.log("error", error);
    }
}