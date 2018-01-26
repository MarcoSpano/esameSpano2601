
const express = require('express'),
    bodyParser = require('body-parser');
const checker = require('./checker');

const app = express();
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 5000));

// a useless function that returns a fixed object. you can use it, if you want, for testing purposes
app.get('/count',function (req, res) {
    res.json({count: 5})
})

app.get('/check',function (req, res) {
    res.json(checker.check("http://localhost:5000/count","",{count: 5},200));
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
