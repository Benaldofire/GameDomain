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
const searchRouter = require('./routes/search');
const platformsRouter = require('./routes/platforms');
const gamesRouter = require('./routes/games');

//---------implement mongoose--------
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', ()=>console.log('connected to Mongoose'))

//---------using routes----------
app.use('/', indexRouter);
app.use('/popular', indexRouter);
app.use('/deleteAll', indexRouter);
app.use('/fetchData', indexRouter);
app.use('/fetch', indexRouter);
app.use('/search', searchRouter);
app.use('/platform', platformsRouter);
app.use('/platform/games/filter', platformsRouter);
app.use('/platform/all/genre', platformsRouter);
app.use('/games', gamesRouter);

//process.env.PORT will be for when we deploy it. Server will tell us what server it's listening to. 
const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port: ${port}` ));

