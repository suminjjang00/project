const express = require('express');
const app = express();
const handlebars = require('express-handlebars').create({defaultLayout:'main'});
const fortune = require('./lib/fortune.js');
const path=require('path');
const body_parser = require('body-parser');

var weather = require('./lib/weather.js');

app.engine('handlebars',handlebars.engine);
// app.set('views',path.join(__dirname,'views'));
app.set('view engine','handlebars');
app.set('port',process.env.PORT ||10117);

app.use(express.static(__dirname+'/public'));

app.use((request,response,next)=>{
  response.locals.showTest=app.get('env') !== 'production' && request.query.test === '1';
  next();
});
//  *---------------------------------------------------------------------------
// partial test ..
// function getWeatherData(){
//   return {
//     locations: [
//       {
//       name:'Portland',
//       forecastUrl:'http://www.wunderground.com/US/OR/Protland.html',
//       iconUrl:'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
//       weather:'Overcast',
//       temp:'54.1 F(12.3 C)',
//     },
//     {
//       name:'sumins',
//       forecastUrl:'http://www.wunderground.com/US/OR/Bend.html',
//       iconUrl:'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
//       weather:'Sogood!',
//       temp:'100.1 F(120.3 C)',
//     },
//     {
//       name:'Manzanita',
//       forecastUrl:'http://www.wunderground.com/US/OR/Manzanita.html',
//       iconUrl:'http://icons-ak.wxug.com/i/c/k/rain.gif',
//       weather:'FUCK!',
//       temp:'55.0 F(12.8C)',
//     },
//   ],
// };
// }
// *--------------------------------------------------------------------
// 1단계 뷰 렌더링. 해당 뷰(데이터라고 생각하면 됨)는 weather.handlebars..에 존재.
// weather.js에서 wehater.handlebars쪽으로 데이터를 넘기고 weather뷰는
// home.handlebar레이어에 장착된다고 해석하면 된다.
// response.locals 응답객체의 locals.partias프로퍼티, 즉 전역프로퍼티로 뷰를 가져옴.
// 그리고 가져온 뷰를 전역으로 렌더링시킴... (원하는 페이지에가서 {{>weather}}입력.)
app.use(function(request,response,next){
    if(!response.locals.partias)response.locals.partias={};
    response.locals.partias.weatherContext=weather.getWeatherData;
    next();
});
// *-----------------------------------------------------------------
// ajax or xml data check..
// app.post('/process-contact',function(request,response){
//   response.render('process-contact',{
//     name:request.body.name,
//     age:request.body.age
//   });
//   try{
//     return response.xhr?response.render({sucess:true}):response.redirect(303,'/process-contact');
//   }catch(ex){
//     return response.xhr?response.render({error:'database error'}) : response.redirect(303,'/database-error');
//   }
// });
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
// app.get('/greeting',function(request,response){
//   response.render('about',{
//     message:'hi welcome',
//     style:request.query.style,
//     userid:request.cookie.userid,
//     username:request.session.username,
//   });
// });
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
