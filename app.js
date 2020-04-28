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
//routes(app);

app.get("/cve/add", function(req, res) 
{
	header = req.headers['accept']
	if (header == 'application/json') 
	{
		res.redirect('/cve')
	} else {
		res.render('add.html', { root: __dirname });
	}
});
app.get("/cve/delete", function(req, res)
{
	res.render('delete_id.html', {root: __dirname});
});
app.get("/cve/edit", function(req, res)
{
	res.render('edit_id.html', {root: __dirname});
});

//delete with web in /cve/delete using the id of the cve
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
	return db.Faille.findAll()
	  .then((failles) => res.send(failles))
	  .catch((err) => {
		console.log('There was an error querying cve', JSON.stringify(err))
		return res.send(err)
	  });
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




app.post("/cve", function(req, res) 
{
	let name = req.body.name
	let type = req.body.type
	let score = req.body.score
	let description = req.body.description
	//const { name, type, score, description } = req.body
	return db.Faille.create({ name, type, score, description })
		.then((failles) => res.send(failles))
		.catch((err) => {
			console.log(res.status(400).send(err))
			console.log('There is an error creating cve, with name = '+name+', type ='+type+', score = '+score+', description = '+description+'. ')
			return res.status(400).send(err)
		})
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
// delete with method delete with postmant
app.delete('/cve/delete/:id', (req, res) => {
	const id = parseInt(req.params.id)
   	return db.Faille.findByPk(id)
		.then((failles) => failles.destroy())
		.then(() => res.send({ id }))
    	.catch((err) => {
      		console.log('Error deleting cve whith id = '+id+' ', JSON.stringify(err))
      		return res.send(err)
    	});
});

app.patch('/cve/edit/:id', (req, res) => {
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



app.use(function(req, res) 
{
	res.send("404 not found");
});


var server = app.listen(3000, function () {
    console.log("app running on port ", server.address().port);
});
