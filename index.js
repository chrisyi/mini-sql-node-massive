var massive = require('massive');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controller = require('./controller');
var connectionString = "postgres://cy@localhost/sandbox";


var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

var app = express()
massive(connectionString).then(function (dbInstance) {
    app.set('db', dbInstance);

    // dbInstance.new_plane().then(function (err, planes) {
    //     console.log(err, "planes added");
    // })

    dbInstance.get_planes().then(function (err, planes) {
        console.log(err, planes)
    })
})

app.get('/api/planes', controller.getPlanes);

// added in controller.js but w/o exports.getPlanes
// app.get('/api/stuff', function (req, res) {
//     var dbInstance = req.app.get('db');

//     dbInstance.get_stuff().then(stuff => {
//         res.status(200).json(stuff);
//     })
// })

app.listen('3000', function () {
    console.log("Successfully listening on : 3000")
})

