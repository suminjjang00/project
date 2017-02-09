const Browser=require('zombie');
const assert=require('chai').assert;

var browser;

suite('Cross Page Test',function(){
  setup(function(){
    browser = new Browser();
  });
  test('requesting a group rate from the hood river tour page'+
'shold populate the referrer field',function(done){
  var referrer="http://localhost:10117/tours/hood-river";
  browser.visit(referrer,function(){
    browser.clickLink('.requestGroupRate',function(){
      assert(browser.field('referrer').value===referrer);
      done();
      });
    });
  });
  test('requesting a group rate from the oregon coast tour page should'+
'populate the referrer field',function(done){
  var referrer = 'http://localhost:10117/tours/oregon-coast';
  browser.visit(referrer,function(){
    browser.clickLink('.requestGroupRate',function(){
      assert(browser.field('referrer').value===referrer);
      done();
    });
  });
});
  test('visiting the request group rate page directly should result'+
'in an empty referrer field',function(done){
  browser.visit('http://localhost:10117/tours/request-group-rate',
  function(){
    assert(browser.field('referrer').value ==='');
    done();
  });
});
});
