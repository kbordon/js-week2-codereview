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
      let drResults = [];
      if (body.meta.count !== 0){
        body.data.forEach(function(doctor){
          // get the doctor's name
          let oneDr = {};
          oneDr.lastName = doctor.profile.last_name;
          oneDr.firstName = doctor.profile.first_name;
          // get all of the doctor's practices
          let drPractices = [];
          doctor.practices.forEach(function(practice){
            let onePractice = {};
            onePractice.name = practice.name;
            onePractice.acceptsNewPatients = practice.accepts_new_patients;
            onePractice.streetAddress = practice.visit_address.street;
            if (practice.visit_address.hasOwnProperty("street2")) {
              onePractice.streetAddress += ` ${practice.visit_address.street2}`;
            }
            onePractice.city = practice.visit_address.city;
            onePractice.zip = practice.visit_address.zip;
            drPractices.push(onePractice);

          });
          oneDr.practices = drPractices;

          drResults.push(oneDr);
        });
        // body.data.profile.last_name
        // body.data.profile.first_name
        // body.data.practices.forEach(function(practice){
        //   practice.phones.forEach(function(phone){
        //     if (phone.type === "landline") {
        //       phone.number
        //     }
        //   })
        //   practice.name
        //   practice.accepts_new_patients
        //   practice.visit_address.street
        //   practice.visit_address.street2
        //   practice.visit_address.city
        //   practice.visit_address.zip
        //   if (practice.hasKey("website") === true) {
        //     practice.website
        //   }
        //
        // })
        //
        //
      }
      displayData(drResults);
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
