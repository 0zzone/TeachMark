// Imports
const http = require('http');
require('dotenv').config();
const port = 3000;
const EcoleDirecte = require("node-ecole-directe");
const ecole = new EcoleDirecte.Session();
const express = require('express')
var bodyParser = require('body-parser');
var session = require('express-session');


const mysql = require('mysql');
// Create a connection to a DataBase
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ED',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});
db.connect((err) => {
    if(err) throw err;
    console.log('MySQL connected ...');
});

// Create an express app
const app = express();


// EJS
app.set('views', './views');
app.set('view engine', 'ejs');


// Middleweres
app.use(express.urlencoded({ extended: true }));
app.use(session({secret: 'ssshhhhh', saveUninitialized: true, resave: true}));
app.use(express.static(__dirname + '/public'));


// Functions
async function getNotes(username, mdp){
  const compte = await ecole.connexion(username, mdp);
  const notes = await compte.fetchNotes();
  return notes;
}

async function getEmploiDuTemps(username, mdp){
  const compte = await ecole.connexion(username, mdp);
  const emploiDuTemps = await compte.fetchEmploiDuTemps();
  return emploiDuTemps;
}



// Roots
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/connexion', async (req, res) => {
  if(req.session.compte){
    const notes = await getNotes(req.session.compte.data.identifiant, req.session.mdp);
    var last = notes.notes.length - 1;
    res.render('index', {username:req.session.compte.data.identifiant, mdp:req.session.mdp, lastNote:notes.notes[last]});
  }
  else{
    res.render('connect', {error: ''});
  }
})

app.all('/index', async (req, res) => {
  if(req.session.compte){
    const notes = await getNotes(req.session.compte.data.identifiant, req.session.mdp);
    var last = notes.notes.length - 1;
    res.render('index', {username:req.session.compte.data.identifiant, mdp:req.session.mdp, lastNote:notes.notes[last]});
  }
  else{
    var username = req.body.nom;
    var mdp = req.body.mdp;
    req.session.username = username;
    req.session.mdp = mdp;
    try {
      const compte = await ecole.connexion(username, mdp);
      const notes = await getNotes(username, mdp);
      var last = notes.notes.length - 1;
      res.render('index', {compte:compte, lastNote:notes.notes[last]});
    }
    catch(err) {
      if(username == undefined || mdp == undefined){
        res.render('connect', {error: ''})
      }
      else{
        res.render('connect', {error: "Identifiant ou mot de passe incorrect"});
      }
    }
  }
});


app.get('/deconnexion', (req, res) => {
  if(req.session.compte || req.session.mdp){
    req.session.destroy();
    res.redirect('/connexion');
  }
  else{
    res.redirect('/connexion');
  }
});


app.get('/vote', async (req, res) => {
  var tab = [];
  var username = req.session.username;
  var mdp = req.session.mdp;
  const notes = await getNotes(username, mdp);
  notes.periodes[0].ensembleMatieres.disciplines.forEach(element =>
    element.professeurs.forEach(el =>
      tab.push(el.nom)
    )
  );
  res.render('vote', {liste: tab})
});

app.all('/valider', (req, res) => {
  var value = req.body.vote;
  var prof = req.body.prof;
  
  let deja = `SELECT * FROM vote WHERE prof = '${prof}'`;
  let query = db.query(deja, (err, result) => {
    console.log(result);
    if(err) throw err;

    if(result == ''){
      let data_insert = {prof: prof, note: value};
      let insert = 'INSERT INTO vote SET ?';
      let query = db.query(insert, data_insert, (err, result) => {
        if(err) throw err;
      });
    }
    else{

      let get_value = `SELECT * FROM all_vote WHERE prof = '${prof}'`;
      let get_query = db.query(get_value, (err, result) => {
        console.log(result[0].note);
      });



      let update = `UPDATE vote SET note = '${value}' WHERE prof = '${prof}'`;
      let query = db.query(update, (err, result) => {
        if(err) throw err;
      });
    }

  });

  res.redirect('/vote');
});

// Listening
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})