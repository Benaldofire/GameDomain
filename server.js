//check if we are running in the production environment or not, 
//we only want to load in the variables when we are in production
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require("express");
const app = express();
const expressLayouts = require('express-ejs-layouts');


//views will be coming from
app.set("views", "views"); 
//using ejs template engine
app.set("view engine", "ejs");
//hook up express layout
app.set('layout',"layouts/layout");

app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.use(express.json({limit: '1mb'}));// Used to parse JSON bodies
app.use(express.urlencoded({extended:true}));

//---------importing routes-----------
const indexRouter = require('./routes/index');
const pcRouter = require('./routes/pc');
const psRouter = require('./routes/ps');
const xboxRouter = require('./routes/xbox');

//---------implement mongoose--------
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', ()=>console.log('connected to Mongoose'))

//---------using routes----------
app.use('/', indexRouter);
app.use('/popular', indexRouter);
app.use('/pc', pcRouter); //route will be "pc/.."
app.use('/pc/filter', pcRouter);
app.use('/ps', psRouter);
app.use('/ps/filter', psRouter);
app.use('/xbox', xboxRouter);
app.use('/xbox/filter', xboxRouter);


//process.env.PORT will be for when we deploy it. Server will tell us what server it's listening to. 
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port: ${port}` ));

