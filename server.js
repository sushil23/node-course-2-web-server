const express = require('express');
const fs = require('fs');

var app = express();

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.send({
        name: 'Max',
        likes: [
            'cycling',
            'riding'
        ]
    });
});

app.route('/about')
    .get((req, res) => {
        res.send('About Page');
    });

app.get('/bad', (req, res) => {
    res.send({
        error: 'Bad Request'
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});