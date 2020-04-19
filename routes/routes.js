var appRouter = function (app) {
    app.get("/", function(req, res) 
    {
        res.redirect("/todos");
    });
    app.get("/todos", function(req, res) 
    {
    	res.status(200).send("todos list");
    });
    app.get('/todos/:todold', (req, res, next) => {
  		console.log('-> GET /todos/:todold (todold : ' + req.params.todold +')')
  		var todold = req.params.todold;
  		db.all('SELECT * from tp WHERE rowid = '+ todold +'' ).then((todos) => {
			res.send(todos)
  			next()
		})
	})
    app.delete('/todos/:todold', (req, res, next) => {
  		console.log('-> GET /todos/:todold (todold : ' + req.params.todold +')')
  		var todold = req.params.todold;
  		db.all('DELETE * from tp WHERE rowid = '+ todold +'' ).then((todos) => {
			res.send(todos)
  			next()
		})
	})
    app.use(function(req, res) 
    {
    	res.send("404 not found");
	});

}

module.exports = appRouter;