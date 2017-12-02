import { doctor, ApplicationModule } from './../js/doctor.js';

let displayError = function(message, code) {
  $("#errors").append(`<h1>😰 <em>Oh dear!</em></h1><h1>Looks like we hit <span class="urgent">${code}</span>!</h1><h2>In other words: ${message}.</h2>`);
  $("#errors").css("padding", "30px");
};
let displayData = function(doctors) {
  if (doctors.length !== 0){
    let practiceString = "";
    doctors.forEach(function(doctor){
      doctor.practices.forEach(function(practice){
        let practiceWeb = "";
        if (practice.hasOwnProperty("website")){
          practiceWeb = practice.website;
        }
        practiceString += `<div class="practice">
                            <h4>${practice.name}</h4>
                            <p>Accepting new patients: ${practice.acceptsNewPatients}</p>
                            <p>${practice.streetAddress}</p>
                            <p>${practice.city}, ${practice.state} ${practice.zip}</p>
                            <p>${practice.phone}</p>
                            <p><a href="${practiceWeb}">${practiceWeb}</a></p>
                          </div>`;
      });
      $("#search").append(`
        <div class="doctor-info">
          <h3><div class="plus">+</div></h3> <span class="doctor-name">${doctor.lastName}, ${doctor.firstName}</span>
          <div class="doctor-details display-details">
            <p class="bio">${doctor.bio}</p>
            <div class="all-practices">
              ${practiceString}
            </div>
          </div>
        </div>`);

    });
  } else {
    $("#search").append(`<div class="oops"><h1>😓</h1><p>No luck with that search! Maybe try rewording your ailment, or checking your entered doctor's name...<p></div>`);
  }
  $("#search").css("width", 450);

  $(".doctor-info").click(function(){
    $(this).find(".doctor-details").toggleClass("display-details");
    if($(this).find(".plus").hasClass("plus-rotate") === true){
      $(this).find(".plus").removeClass("plus-rotate");
      $("#recent").append(`<p>${$(this).find(".doctor-name").html()}</p>`);
      console.log("added rotate");
    } else {
      $(this).find(".plus").addClass("plus-rotate");
      console.log("removed rotate");
    }
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
    $("#search").css("width", 0);
    $("#errors").css("padding", 0);


    let userAilment = $("#userAilment").val();
    let userDr = $("#userDr").val();
    // "Alisun Bonville";


    // empty result page before getting more
    $("#search").empty();
    let newSearch = applicationModule.getDoctors(userAilment, userDr, displayData, displayError);
    allSearches.push(newSearch);
  });

});
