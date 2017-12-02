import { doctor, ApplicationModule } from './../js/doctor.js';

let displayError = function(message, code) {
  $("#errors").append(`<h1 class="oops">😓</h1><h1>Oh dear! Looks like we hit ${code}!</h1><h4>In other words, ${message}.`)
}
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
      <h3>${doctor.lastName}, ${doctor.firstName}</h3>
      <div class="doctor-details display-details">
        <p class="bio">${doctor.bio}</p>
        ${practiceString}
      </div>
      </div>`);
    });
  } else {
    $("#search").empty();
    $("#search").append(`<div class="oops"><h1>😓</h1><p>No luck with that search! Maybe try rewording your ailment, or checking your entered doctor's name...<p></div>`);
  }
  $(".doctor-info").click(function(){
    // $("#recent").append(`<p>${$(this).find("h3").html()}</p>`);
    // console.log("is this click working!")

    $(this).find(".doctor-details").toggleClass("display-details");
  });

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

    let userAilment = $("#userAilment").val();
    let userDr = $("#userDr").val();
    // "Alisun Bonville";


    // empty result page before getting more
    $("#search").empty();
    let newSearch = applicationModule.getDoctors(userAilment, userDr, displayData);
    allSearches.push(newSearch);
  });

});
