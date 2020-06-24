const express = require('express'),
    path = require('path'),
    fs = require('fs'),
    app = express(),
    bodyParser = require('body-parser');


// app.get('/', (req, res) => {
//     console.log("listening on port 3000!");
//     res.send("Hello from the web server side...")
// });

// app.get('/css/styles.css', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/css/styles.css'));
// });
app.use(bodyParser.urlencoded({ extended: false }));
let dataPath = path.join(__dirname, '../userInfo.json');
let personInfo = []
if (personInfo.length === 0) {
    console.log("hello world");

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) throw err;
        personInfo = JSON.parse(data);
        console.log(personInfo);
      });
}

console.log("server started on port 3000!");

app.use((req, res, next) => {
    console.log(req.url);
    next()
});

app.post('/contact-form', (req, res, next) => {
    let dataPath = path.join(__dirname, '../userInfo.json');
    let person = {
        name: req.body.name,
        email: req.body.email
    }
    personInfo.push(person);
    fs.writeFile(dataPath, JSON.stringify(personInfo), (err) => {
        if (err) throw err;
        console.log("saved the file!");
    });
    res.send("thank you for submitting the form!");
});

app.use(express.static(path.join(__dirname, '../public')));




app.listen(3000);