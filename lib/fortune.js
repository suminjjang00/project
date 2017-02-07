let fortunecookie = [
  'suminjjang00 hahahahahahahaaaaa',
  'this is test rivres need springs.',
  "do not fear what you don't know..",
  "whenever possible, keep it simple",
  "conquer your fears or they will conquer you."
]
exports.getFortune= function(){
  var idx = Math.floor(Math.random()*fortunecookie.length);
  return fortunecookie[idx];
};
