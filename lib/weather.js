
function getWeatherData(){
  return {
    locations: [
      {
      name:'Portland',
      forecastUrl:'http://www.wunderground.com/US/OR/Protland.html',
      iconUrl:'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
      weather:'Overcast',
      temp:'54.1 F(12.3 C)',
    },
    {
      name:'sumins',
      forecastUrl:'http://www.wunderground.com/US/OR/Bend.html',
      iconUrl:'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
      weather:'Sogood!',
      temp:'100.1 F(120.3 C)',
    },
    {
      name:'Manzanita',
      forecastUrl:'http://www.wunderground.com/US/OR/Manzanita.html',
      iconUrl:'http://icons-ak.wxug.com/i/c/k/rain.gif',
      weather:'FUCK!',
      temp:'55.0 F(12.8C)',
    },
  ],
};
}
module.exports.getWeatherData=getWeatherData();
