var apiKey = require('./../.env').apiKey;

export class doctor{
  constructor() {

  }

  doctorMethod(){

  }
}


export class ApplicationModule{
  constructor(){}

  testmethod(){
    console.log(apiKey);
  }

  getDoctors(userInputQuery = "", userInputName = "", displayData) {
    let query = `${userInputQuery}&`;
    if (userInputQuery === null) {
      query = "";
    }
    let drName = `${userInputQuery}&`;


    let promiseDrs = new Promise(function(resolve, reject){
      let requestDrs = new XMLHttpRequest();
      let urlDrs = ` https://api.betterdoctor.com/2016-03-01/doctors?${drName}location=or-portland&sort=best-match-desc&skip=0&limit=10&user_key=${apiKey}`
    })


    $.get(`` + userInput + apiKey)
      .then(function(results) {
        displayData(results);
      })
      .fail(function() {
        console.log(`Something went wrong.`);
      });
  }
}
