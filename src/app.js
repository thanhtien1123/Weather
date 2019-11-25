const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors());
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

let projectData = [];

//GET routes
app.get('/all', (req, res) => {
    res.send(projectData);
})

//POST routes
app.post('/addWeather', (req, res) => {  
    newEntry = {
        name: req.body.name,
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }  
    projectData.push(newEntry);
    res.send(projectData);
})

app.listen(3000, () => {
    console.log('Server is started');
    
})