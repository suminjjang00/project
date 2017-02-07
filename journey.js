const express = require('express');
const app = express();
const handlebars = require('express-handlebars').create({defaultLayout:'main'});
const fortune = require('./lib/fortune.js');

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
// app.set('views',process.pwd()+'/views');
app.set('port',process.env.PORT ||10117);

app.use(express.static(__dirname+'/public'));

app.get('/',(request,response)=>{
  response.render('home');
});
app.get('/about',(request,response)=>{
  response.render('about',{fortune:fortune.getFortune()});
});

app.use((request,response,next)=>{
  response.status(404);
  response.render('404')
});

app.use((request,response,next)=>{
  response.status(500);
  reponse.render('500')
});
app.listen(app.get('port'),()=>{
    console.log('starting on the server...'+app.get('port')+' press control + c to terminate');
});
