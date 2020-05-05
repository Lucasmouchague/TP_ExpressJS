var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const db = require('./models');
const methodOverride = require('method-override');
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/html_page/');
app.set('view engine', 'html');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.get("/Users/add", function(req, res)
{
	res.render('add_user.html', {root: __dirname});
});
app.get("/Users/delete", function(req, res)
{
	res.render('delete_user.html', {root: __dirname});
});
app.get('/sessions', function(req, res)
{
	res.render('sessions_login.html', {root: __dirname});
});
app.get("/cve/delete", function(req, res)
{
	res.render('delete_id.html', {root: __dirname});
});
app.get("/cve/edit", function(req, res)
{
	res.render('edit_id.html', {root: __dirname});
});

app.get('/', function(req, res){
	res.redirect('/cve')
});

app.post("/cve", function(req, res) 
{
	let name = req.body.name
	let type = req.body.type
	let score = req.body.score
	let description = req.body.description
	return db.Faille.create({ name, type, score, description })
		.then((failles) => res.send(failles))
		.catch((err) => {
			console.log(res.status(400).send(err))
			console.log('There is an error creating cve, with name = '+name+', type ='+type+', score = '+score+', description = '+description+'. ')
			return res.status(400).send(err)
		})
});


app.get("/cve/add", function(req, res) 
{
		res.render('add.html', { root: __dirname });
});

app.get('/cve/:id', (req, res) => {
	const id = parseInt(req.params.id)
   	return db.Faille.findByPk(id)
    	.then((failles) => res.send(failles))
    	.catch((err) => {
      		console.log('There was an error querying failles', JSON.stringify(err))
      		return res.send(err)
    	});
});

app.post("/delete/cve", function(req, res) 
{
	const id = parseInt(req.body.id)
   	return db.Faille.findByPk(id)
		.then((failles) => failles.destroy())
		.then(() => res.send({ id }))
    	.catch((err) => {
      		console.log('Error deleting cve whith id = '+id+' ', JSON.stringify(err))
      		return res.send(err)
    	});
});

app.delete('/deleteCve/:id', (req, res) => {
	const id = parseInt(req.params.id)
   	return db.Faille.findByPk(id)
		.then((failles) => failles.destroy())
		.then(() => res.send({ id }))
    	.catch((err) => {
      		console.log('Error deleting cve whith id = '+id+' ', JSON.stringify(err))
      		return res.send(err)
    	});
});

app.patch('/editCve/:id', (req, res) => {
	const id = parseInt(req.params.id)
	return db.Faille.findByPk(id)
	.then((failles) => {
		const { name, type, score, description } = req.body
		return failles.update({ name, type, score, description })
		.then(() => res.send(failles))
		.catch((err) => {
			console.log("Error while updating cve score with id = "+id+" ", JSON.stringify(err))
			res.status(400).send(err)
		})
	})
});

app.get('/cve', (req, res) => {
	header = req.headers['accept']
	if (header == 'application/json')
	{
		return db.Faille.findAll()
		.then((failles) => res.send(failles))
		.catch((err) => {
		  console.log('There was an error querying cve', JSON.stringify(err))
		  return res.send(err)
		});
	} else {
		res.render('display.html', { root: __dirname });
	}
});

app.post("/edit/cve", function(req, res) 
  {
	const id = parseInt(req.body.id)
	return db.Faille.findByPk(id)
	.then((failles) => {
		const { name, type, score, description } = req.body
		return failles.update({ name, type, score, description })
		.then(() => res.send(failles))
		.catch((err) => {
			console.log("Error while updating cve score with id = "+id+" ", JSON.stringify(err))
			res.status(400).send(err)
		})
	})
});

app.post("/addUsers", function(req, res) 
{
	let name = req.body.name
	let clearpassword = req.body.password
	const salt = bcrypt.genSaltSync(saltRounds);
	const password = bcrypt.hashSync(clearpassword, salt);
	console.log(password)
	return db.User.create({ name, password })
		.then((users) => res.send(users))
		.catch((err) => {
			console.log(res.status(400).send(err))
			console.log('There is an error creating cve, with name = '+name+', type ='+hash+'', JSON.stringify(err))
			return res.status(400).send(err)
		})
});

app.delete('/delUsers/:id', (req, res) => {
	const id = parseInt(req.params.id)
   	return db.User.findByPk(id)
		.then((users) => users.destroy())
		.then(() => res.send({ id }))
    	.catch((err) => {
      		console.log('Error deleting user whith id = '+id+' ', JSON.stringify(err))
      		return res.send(err)
    	});
});

app.get('/Users', (req, res) => {
	header = req.headers['accept']
	if (header == 'application/json') {
		return db.User.findAll()
		.then((users) => res.send(users))
		.catch((err) => {
		  console.log('There was an error querying user', JSON.stringify(err))
		  return res.send(err)
		})
	} else {
		res.render('display_user.html', { root: __dirname });
	}	

});








//const authTokens = {};

//app.post('/login', (req, res) => {
 //   const { email, password } = req.body;
//    const hashedPassword = getHashedPassword(password);

//    const user = users.find(u => {
  //      return u.email === email && hashedPassword === u.password
//    });

//    if (user) {
//        const authToken = generateAuthToken();

//        authTokens[authToken] = user;

//        res.cookie('AuthToken', authToken);

//        res.redirect('/protected');
//    } else {
//        res.render('login', {
//            message: 'Invalid username or password',
//            messageClass: 'alert-danger'
//        });
//    }
//});
// app.post('/Users', function(req, res)
// {
// 	let name =  req.body.name
// 	let userpassword =  req.body.password

// 	new User({ name: name}).fecth().then(function(found){
// 		if (found){
// 			console.log("username found")

// 			bcrypt.compare(userpassword, found.get('password'), function(err, res){
// 				if (res){
// 					req.session.regenerate(function(){
// 						console.log('password match')
// 						Response.redirect('/cve')
// 						req.session.found = found.name;
// 					});
// 				} else {
// 					console.log("password did not match")
// 					Response.redirect('/sessions')
// 				}
// 			})
// 		} else {
// 			console.log("password did not match")
// 			Response.redirect('/sessions')
// 		}
// 	})
// });


app.use(function(req, res) 
{
	res.send("404 not found");
});

var server = app.listen(3000, function () {
    console.log("app running on port ", server.address().port);
});
