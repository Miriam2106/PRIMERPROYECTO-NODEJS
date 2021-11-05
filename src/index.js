// el framework es express, sólo ponemos las configuraciones
const express = require('express');
const morgan = require('morgan');

//Inicializations
const app = express();

//settings
app.set('port', process.env.PORT || 4000);

//middleware 
// a morgan le decimos que estamos en un ambiente de desarrollo
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//intercambio de datos es con json

//routes
app.use(require('./routes/index.js'));
app.use('/products',require('./routes/products.js'));

//starting server
app.listen(app.get('port'), () =>{
    console.log("Server on port", app.get('port'));
});