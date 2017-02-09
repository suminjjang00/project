fconst express = require('express');
const app = express();
const handlebars = require('express-handlebars').create({defaultLayout:'main'});
const fortune = require('./lib/fortune.js');
const path=require('path');

app.engine('handlebars',handlebars.engine);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','handlebars');
app.set('port',process.env.PORT ||10117);

app.use(express.static(__dirname+'/public'));

app.use((request,response,next)=>{
  response.locals.showTest=app.get('env') !== 'production' && request.query.test === '1';
  next();
});

app.get('/',(request,response)=>{
  response.render('home');
});
app.get('/headers',(request,response)=>{
  response.set('Content-Type','text/html');
  var headers = ''
  for(name in request.headers) headers += name +':'+request.headers[name]+'\n';
  response.send(headers);
  query = request.query;
  console.log(query);
  // response.send(request.cookie.id);
});
app.get('/about',(request,response)=>{
  response.render('about',{
    fortune:fortune.getFortune(),
    pageTestScript: '/qa/tests-about.js'
  });
});
app.get('/tours/hood-river',(request,response)=>{
  response.render('tours/hood-river');
});
app.get('/tours/request-group-rate',(request,response)=>{
  response.render('tours/request-group-rate');
});

app.use((request,response,next)=>{
  // response.type('text/plain');
  // response.status(400);
  response.status(404);
  response.render('404');
});

app.use((request,response,next)=>{
  response.status(500);
  reponse.render('500');
});
app.listen(app.get('port'),()=>{
    console.log('starting on the server...'+app.get('port')+' press control + c to terminate');
});
