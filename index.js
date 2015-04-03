//var express

var express = require('express');
var db = require("./models");
var Hashids = require("hashids"),
    hashids = new Hashids("this is my salt");

// var router = require('./router');

var app = express();


var favoriteFoods = [];

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/shorten", function(req, res) {
  db.user.create({firstName: req.query.q}).then(function(data){

// var encrId = req.query.q;
var encrId = hashids.encode(data.id);
 var locals = {
    mySearchTerm: req.query.q,
    encriptedUrl: req.headers.host+"/"+encrId
  }
  data.set('lastName', encrId).save();
  // console.log("Orig:"+encrID+"new:"+encriptedUrl)

  // locals.otherFoodItems = locals.otherFoodItems.concat(favoriteFoods)
  // locals.otherFoodItems.push(locals.mySearchTerm)
  res.render("shorten", locals);
});
})


app.get("/:hash", function(req, res) {
  db.user.find({where: {lastName: req.params.hash}}).then(function(data){
// var nameArray = data.map(function(u) { return u.firstName});
  res.redirect(data.firstName);
// res.send(nameArray + " crazy thopluuussssss");
  render
  })
//   res.send(req.params.hash + " crazy tho");

});



  db.user.create({firstName: "THISHAPPENED"}).then(function(createdUser) {
  // console.log("this user was just create: ", user.firstName);
  // createdUser.lastName = "Bridgpal"
  // createdUser.save();
  createdUser.set("lastName", "INSIDETHEFUNCTION").save();
  // res.render("someTemplate", {user: user});
});



db.user.findOrCreate({where: {firstName: "SPECIALSPACEMAN"}}).spread(function(foundUser, created) {
  console.log(foundUser.get());
  console.log(created);
}).catch(function(error) {
  console.log("something happened");
  console.log(error);
})

db.user.findAll().then(function(users) {
  // console.log(users[0].get(), users[1].get());
  var nameArray = users.map(function(u) { return u.firstName});
  console.log(nameArray);
})

// db.user.find(9).then(function(user) {
//   console.log(user.get());



// PROMISES:
// .then
// .spread
// .catch
app.listen(process.env.PORT || 3000, function() {
  console.log("server started on port 3000");
});
