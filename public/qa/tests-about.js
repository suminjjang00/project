suite('About page test..'()=>{
  test('page should contain link to contact page',()=>{
    assert($('a[href="/contract"]').length);
  });
});
