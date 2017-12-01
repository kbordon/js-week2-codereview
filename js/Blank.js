var apiKey = require('./../.env').apiKey;

export class Blank{
  constructor() {

  }

  blankMethod(){

  }
}


export class ApplicationModule{
  constructor(){}

  testmethod(){
    console.log(apiKey);
  }

  // getData(userInput, displayData) {
  //   $.get('your api url?' + userInput + apiKey)
  //     .then(function(results) {
  //       displayData(results);
  //     })
  //     .fail(function() {
  //       console.log(`Something went wrong.`);
  //     });
  // }
}
