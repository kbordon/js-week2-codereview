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

  getDoctors(userQuery = "", userDr = "", displayData) {
    let promiseDrs = new Promise(function(resolve, reject){
      let requestDrs = new XMLHttpRequest();
      let urlDrs = `https://api.betterdoctor.com/2016-03-01/doctors?name=${userDr}&query=${userQuery}&location=or-portland&sort=best-match-desc&skip=0&limit=10&user_key=${apiKey}`;
      requestDrs.onload = function(response) {
        if (this.status === 200) {
          resolve(requestDrs.response);
        } else {
          reject(Error(requestDrs.response.meta.message));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promiseDrs.then(function(response){
      body = JSON.parse(response);
      displayData(response);
    }, function(error) {
      displayErrors(error);
    });

    // tutorial for separating logic uses ajax
    // $.get(`` + userInput + apiKey)
    //   .then(function(results) {
    //     displayData(results);
    //   })
    //   .fail(function() {
    //     console.log(`Something went wrong.`);
    //   });
  }
}
