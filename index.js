//use 'require' keyword to get access to the Express library
const express = require('express');
// create an express application
const app = express();

//create a route handler and associated with a given route
app.get('/', (req, res) => {
	res.send({hi: 'there'});
});


//dynamically find which port we should listen to
const PORT = process.env.PORT || 5000;
app.listen(PORT); 

