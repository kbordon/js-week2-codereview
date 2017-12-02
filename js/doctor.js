var apiKey = require('./../.env').apiKey;

export class doctor{
  constructor() {

  }

  doctorMethod(){

  }
}

export function formatPhone(number){
  if(number.length === 10) {
    number = `(${number.substr(0,3)}) ${number.substr(3,3)}-${number.substr(6,4)}`;
  }
  return number;
}


export class ApplicationModule{
  constructor(){}

  testmethod(){
    // console.log("this is a test method in applicationModule");
  }

  getDoctors(userQuery, userDr, displayData, displayError) {
    let promiseDrs = new Promise(function(resolve, reject){
      let requestDrs = new XMLHttpRequest();
      let urlDrs = `https://api.betterdoctor.com/2016-03-01/doctors?name=${userDr}&query=${userQuery}&location=or-portland&sort=best-match-desc&skip=0&limit=10&user_key=${apiKey}`;
      requestDrs.onload = function() {
        if (this.status === 200) {
          resolve(requestDrs.response);
        } else {
          reject(requestDrs.responseText);
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
          // get the doctor's personal details
          let oneDr = {};
          oneDr.lastName = doctor.profile.last_name;
          oneDr.firstName = doctor.profile.first_name;
          oneDr.bio = doctor.profile.bio;
          oneDr.img = doctor.profile.image_url;
          // could be undefined so leave out
          // oneDr.specialty = doctor.specialties.name;
          // oneDr.specialtyDesc = doctor.specialities.description;
          // get all of the doctor's practices
          let drPractices = [];
          doctor.practices.forEach(function(practice){
            let onePractice = {};
            onePractice.name = practice.name;
            if (practice.accepts_new_patients === true) {
              onePractice.acceptsNewPatients = "yes";
            } else {
              onePractice.acceptsNewPatients = "no";
            }
            practice.phones.forEach(function(phone){
              if (phone.type === "landline") {
                onePractice.phone = phone.number;
              }
            });
            onePractice.streetAddress = practice.visit_address.street;
            if (practice.visit_address.hasOwnProperty("street2")) {
              onePractice.streetAddress += ` ${practice.visit_address.street2}`;
            }
            onePractice.city = practice.visit_address.city;
            onePractice.state = practice.visit_address.state;
            onePractice.zip = practice.visit_address.zip;
            if (practice.hasOwnProperty("website") === true){
              onePractice.website = practice.website;
            }
            drPractices.push(onePractice);

          });
          oneDr.practices = drPractices;

          drResults.push(oneDr);
        });
      }
      displayData(drResults);
      return drResults;
    }, function(error) {
      let errorBody = JSON.parse(error);
      console.log(errorBody);
      displayError(errorBody.meta.message, errorBody.meta.http_status_code);
    });


  }
}
