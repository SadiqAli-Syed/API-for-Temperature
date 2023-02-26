const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');
const key = "5cfae089c18cc67764a8ca61cd761aba";
var city = "London";
var api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;


app.use(bodyParser.urlencoded({ extended:true}));

app.get("/", (req, resp) => {
    console.log("Request1 Received");
    resp.sendFile(__dirname + "/weather.html");
})

app.post("/", (req, res) => {
    city = req.body.cityName;
    api = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key;
    https.get(api, (response)=>{
        response.on("data", (data)=>{
            const data1 = JSON.parse(data);
            const temp = data1.main.temp;
            const iconId = data1.weather[0].icon;
            const html = `
                 <html style='text-align:center;background-color:antiquewhite;font-size:2rem'>
                    <h1 style='color:#FF0000;margin:2px auto;' >
                        The Temperature is `+temp+`Celcius
                    </h1>
                 </html>`;
            const icon = `
                <html style='text-align:center;background-color:antiquewhite;font-size:2rem'>
                    <img style='margin:35vh auto 0;' src='https://openweathermap.org/img/wn/${iconId}@2x.png'>
                </html>`;
            res.write(icon);
            res.write(html);
            console.log(`Temperature in ${city} is ${temp}`)
            res.send();
        })
    })
})

app.listen(3000, () => {
    console.log("Started on port 3000");

}    )