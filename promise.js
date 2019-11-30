function delay(t){
    return new Promise(function(resolve){
      return setTimeout(resolve, t)
    });
  }
  function logHi(){
    console.log('hi');
  }
  delay(1000).then(logHi);