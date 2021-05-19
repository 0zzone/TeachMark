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

async function getAllProf(username, mdp, bahut){
  tab = [];
  const notes = await getNotes(username, mdp);
  notes.periodes[0].ensembleMatieres.disciplines.forEach(element =>
    element.professeurs.forEach(el =>
      tab.push(el.nom)
    )
  );
  return tab;
}

// Roots
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/connexion', async (req, res) => {
  if(req.session.username){
    const notes = await getNotes(req.session.username, req.session.mdp);
    const compte = await ecole.connexion(req.session.username, req.session.mdp);
    var last = notes.notes.length - 1;

    let sql = `SELECT * FROM vote`;
    let query = db.query(sql, (err, result) => {
      if(err) throw err;
      res.render('index', {username:req.session.username, mdp:req.session.mdp, lastNote:notes.notes[last], compte:compte, votes:result});
    });
    
  }
  else{
    res.render('connect', {error: ''});
  }
})

app.all('/index', async (req, res) => {
  if(req.session.username){
    const notes = await getNotes(req.session.username, req.session.mdp);
    const compte = await ecole.connexion(req.session.username, req.session.mdp);
    var last = notes.notes.length - 1;

    var arr = await getAllProf(req.session.username, req.session.mdp, req.session.bahut);
    var final = [];

    let all_stm = `SELECT * FROM vote WHERE bahut = '${req.session.bahut}'`;
    let query_stm = db.query(all_stm, (err, result) => {
      if(err) throw err;

      for(var i=0;i<result.length;i++){
        if(arr.indexOf(result[i].prof) != -1){
          final.push(result[i]);
        }
      }
      var long = final.length;
      if(long == 0){
        res.render('index', {username:req.session.username, mdp:req.session.mdp, lastNote:notes.notes[last], compte:compte, votes:null});
      }
      else{
        res.render('index', {username:req.session.username, mdp:req.session.mdp, lastNote:notes.notes[last], compte:compte, votes:final});
      }
    });
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
      req.session.bahut = compte.data.nomEtablissement;
      req.session.identifiant = compte.data.idLogin;

      var arr = await getAllProf(req.session.username, req.session.mdp, req.session.bahut);
      var final = [];

      let all_stm = `SELECT * FROM vote WHERE bahut = '${req.session.bahut}'`;
      let query_stm = db.query(all_stm, (err, result) => {
        if(err) throw err;

        for(var i=0;i<result.length;i++){
          if(arr.indexOf(result[i].prof) != -1){
            final.push(result[i]);
          }
        }
        var long = final.length;
        if(long == 0){
          res.render('index', {username:req.session.username, mdp:req.session.mdp, lastNote:notes.notes[last], compte:compte, votes:null});
        }
        else{
          res.render('index', {username:req.session.username, mdp:req.session.mdp, lastNote:notes.notes[last], compte:compte, votes:final});
        }
      });
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

  for(var i=0; i<notes.periodes[0].ensembleMatieres.disciplines.length; i++){
    for(var k=0; k<notes.periodes[0].ensembleMatieres.disciplines[i].professeurs.length; k++){
      tab.push(
        {
          nom_prof: notes.periodes[0].ensembleMatieres.disciplines[i].professeurs[k].nom,
          valide: true
        }
      );
    }
  }
   
  var arr = [];
  let sql = `SELECT * FROM all_vote WHERE id_eleve = '${req.session.identifiant}'`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;

    for(var m=0;m<result.length; m++){
      for(var x=0; x<tab.length; x++){
        if(tab[x].nom_prof == result[m].prof){
          tab[x].valide = false;
        }
      }
    }
    res.render('vote', {liste: tab})
  });
});



app.all('/valider', (req, res) => {
  var value = req.body.vote;
  var prof = req.body.prof;
  
  let deja = `SELECT * FROM vote WHERE prof = '${prof}' AND bahut = '${req.session.bahut}'`;
  let query = db.query(deja, (err, result) => {
    console.log(result);
    if(err) throw err;

    let data_insert = {prof: prof, note: value, bahut:req.session.bahut, id_eleve:req.session.identifiant};
    let insert = 'INSERT INTO all_vote SET ?';
    let query = db.query(insert, data_insert, (err, result) => {
      if(err) throw err;
    });

    if(result == ''){
      let data_insert = {prof: prof, note: value, bahut:req.session.bahut};
      let insert = 'INSERT INTO vote SET ?';
      let query = db.query(insert, data_insert, (err, result) => {
        if(err) throw err;
      });
    }
    else{
      var somme = 0;
      var nbre = 0;
      let select_all = `SELECT * FROM all_vote WHERE prof = '${prof}' AND bahut = '${req.session.bahut}'`;
      let query_select = db.query(select_all, (err, result) => {
        if(err) throw err;
        for(var i=0; i<result.length; i++){
          somme += result[i].note;
          nbre++;
        }
        var nombre = somme/nbre;
        arrondi = nombre*100;
        arrondi = Math.round(arrondi);
        arrondi = arrondi/100;
        let update = `UPDATE vote SET note = '${arrondi}' WHERE prof = '${prof}' AND bahut = '${req.session.bahut}'`;
        let query_update = db.query(update, (err, result) => {
          if(err) throw err;
        });
      });
    }
  });
  res.redirect('/vote');
});



// Listening
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})