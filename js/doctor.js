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
    console.log("this is a test method in applicationModule");
  }

  getDoctors(userQuery, userDr, displayData) {
    let promiseDrs = new Promise(function(resolve, reject){
      let requestDrs = new XMLHttpRequest();
      let urlDrs = `https://api.betterdoctor.com/2016-03-01/doctors?name=${userDr}&query=${userQuery}&location=or-portland&sort=best-match-desc&skip=0&limit=10&user_key=${apiKey}`;
      requestDrs.onload = function() {
        if (this.status === 200) {
          resolve(requestDrs.response);
          console.log("did this happen? this is succesful in the onload");
          // the below was successful and should be put into the promises then
          // let reponseDrs = JSON.parse(this.responseText);
          // console.log(reponseDrs);
        } else {
          // console.log(requestDrs.reponse.meta.message);
          reject(Error(requestDrs.response.meta.message));
        }
      };
      requestDrs.open("GET", urlDrs, true);
      requestDrs.send();
    });

    promiseDrs.then(function(response){
      let body = JSON.parse(response);
      displayData(body);
    }, function(error) {
      // displayErrors(error);
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
