const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Smarika124#',
    database: 'CRUD',
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/insert", (req, res) => {
    const name = req.body.name;
    const Class = req.body.Class;

    const sqlInsert = "INSERT INTO entry (name, Class) VALUES (?,?)"
    db.query(sqlInsert, [name, Class], (err, result) => {
        console.log(err);
        console.log("successful")
    });
});

app.get('/api/get', (req, res) => {
    const sqlGet = "SELECT * FROM entry";
    db.query(sqlGet, (err, result) => {
        console.log(err);
        res.send(result)
    });
})

app.delete('/api/delete/:name', (req, res) => {
    const name = req.params.name; //as params is passed in request
    const sqlDelete = "DELETE FROM entry WHERE name = ?; "
    db.query(sqlDelete, name, (err) => {
        console.log(err);
    })
})

app.put('/api/update', (req, res) => {
    const name = req.body.name;
    const Class = req.body.Class;
    const sqlUpdate = "UPDATE entry SET Class=? WHERE name=?"
    db.query(sqlUpdate, [name, Class], (err, result) => {
        console.log(err);
    })
})

app.listen(3001, () => {
    console.log('listening');
});