import { doctor, ApplicationModule } from './../js/doctor.js';

let displayData = function(doctors) {
  if (doctors.length !== 0){
    let practiceString = "";
    doctors.forEach(function(doctor){
      doctor.practices.forEach(function(practice){
        let practiceWeb = "";
        if (practice.hasOwnProperty("website")){
          practiceWeb = practice.website;
        }
        practiceString += `<div class="practice"><h4>${practice.name}</h4><p>Accepting new patients: ${practice.acceptsNewPatients}</p><p>${practice.streetAddress}</p><p>${practice.city}, ${practice.state} ${practice.zip}</p><p>${practice.phone}</p><p><a href="${practiceWeb}">${practiceWeb}</a></div>`;
      });
      $("#search").append(`<div class="doctor-info">
      <span class="dr-name"><h3>${doctor.lastName}, ${doctor.firstName}</h3></span>
      <div class="doctor-details">
        <p>${doctor.bio}</p>
        ${practiceString}
      </div>
      </div>`);
    });
  }
  console.log(doctors);
};

///////////////////
//when page loads//
///////////////////
$(document).ready(function(){

  let allSearches = [];
  let applicationModule = new ApplicationModule();
  applicationModule.testmethod();

  // enter form
  $("#dr-search").submit(function(event){
    event.preventDefault();

    let userAilment =
    "menstrual cramps";
    // $("#userAilment").val();
    let userDr =
    "Alisun Bonville";
    // $("#userDr").val();

    let newSearch = applicationModule.getDoctors(userAilment, userDr, displayData);
    allSearches.push(newSearch);
  });

});
