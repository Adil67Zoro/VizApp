const express = require('express')
const app = express();
const cors = require('cors')
const mysql = require('mysql');
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.use(cors());

const chessdb = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'Supernatural67%',
  database        : 'chessboard',
  multipleStatements: true // Enable multiple statements
});

const sudokudb = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'Supernatural67%',
    database        : 'sudoku',
    multipleStatements: true // Enable multiple statements
  });

const saltRounds = 10;
const chessBoards = ["4x4", "5x5", "6x6", "7x7", "8x8"]
const sudokuBoards = ["4x4", "6x6", "8x8", "10x10"]

app.post('/signup', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if(err){
            res.status(418).send("Couldn't hash the password")
        } else{
            chessdb.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], (err, result) => {
                if(err){
                    res.status(418).send("Couldn't register the user ")
                }
                else{
                    res.send({username: username})
                }
            })
        }
    })
})

app.post('/signin', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    chessdb.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
        if(err){
            res.status(418).send(err.message)
        } else if(result.length < 1){
            res.status(418).send("Username doesn't match")
        } else{
            bcrypt.compare(password, result[0].password, (err, match) => {
                if (match){
                    res.send({username})
                }
                if(!match){
                    res.status(418).send("password doesn't match")
                }
            })
        }
    })
})

chessBoards.forEach(size => {
    app.get(`/chess/PathToPosition/${size}/:level`, (req, res) => {
        const level = req.params.level;
        chessdb.query(
          `SELECT * FROM p2p_${size}_${level}_initial; SELECT * FROM p2p_${size}_${level}_final;`,
          (err, result) => {
            if (err) {
              res.status(418).send('An error occurred');
            } else if (result) {
              res.send(result);
            }
          }
        );
    });

    app.get(`/chess/RecreatePosition/${size}/:level`, (req, res) => {
        const level = req.params.level;
        chessdb.query(
          `SELECT * FROM rp_${size}_${level}`,
          (err, result) => {
            if (err) {
              res.status(418).send('An error occurred');
            } else if (result) {
              res.send(result);
            }
          }
        );
    });
})

sudokuBoards.forEach(size => {
  app.get(`/sudoku/RecreatePosition/${size}/:level`, (req, res) => {
    const level = req.params.level;
    sudokudb.query(
      `SELECT * FROM rp_sudoku_${size}_${level}`,
      (err, result) => {
        if (err) {
          res.status(418).send('An error occurred');
        } else if (result) {
          res.send(result);
        }
      }
    );
});

    app.get(`/sudoku/Classic/${size}/:level`, (req, res) => {
        const level = req.params.level;
        sudokudb.query(
          `SELECT * FROM classic_sudoku_${size}_${level}`,
          (err, result) => {
            if (err) {
              res.status(418).send('An error occurred');
            } else if (result) {
              res.send(result);
            }
          }
        );
    });
})


app.listen(8080, () => {
    console.log('server listening on port 8080')
})