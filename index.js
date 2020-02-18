//use 'require' keyword to get access to the Express library
const express = require('express');
// create an express application
const app = express();

//create a route handler and associated with a given route
app.get('/', (req, res) => {
	res.send({hi: 'there'});
});

app.listen(5000); //localhost:5000 (listen to port 5000)

