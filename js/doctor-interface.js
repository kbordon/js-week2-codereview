import { ApplicationModule, formatPhone } from './../js/doctor.js';

// If API makes incorrect request, displays error details
let displayError = function(message, code) {
  $("#errors").append(`<h1>😰 <em>Oh dear!</em></h1><h1>Looks like we hit <span class="urgent">${code}</span>!</h1><h2>In other words: ${message}.</h2>`);
  $("#errors").css("padding", "30px");
};

// If API call makes successful request, display data
let displayData = function(doctors) {
  // If returns at least one doctor
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
                            <p>${formatPhone(practice.phone)}</p>
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

  // If no doctors match the search
  } else {
    $("#search").append(`<div class="oops"><h1>😓</h1><p>No luck with that search! Maybe try rewording your ailment, or checking your entered doctor's name...<p></div>`);
  }
  // Adds width to make results visible
  $("#search").css("width", 450);

  // User can click on the names returned by results to view more information
  $(".doctor-info").click(function(){
    // hide or show the details (remove or add the "display-details" class)
    $(this).find(".doctor-details").toggleClass("display-details");
    // TODO this section can be refactored maybe to just toggle, since it no longer is dependent on other code.
    if($(this).find(".plus").hasClass("plus-rotate") === true){
      $(this).find(".plus").removeClass("plus-rotate");
      $(".doctor-info").show();
      // to show recently viewed doctors
      // $("#recent").append(`<p>${$(this).find(".doctor-name").html()}</p>`);
      // console.log("added rotate");
    } else {
      // This will only show one doctors information at a time
      $(".doctor-info").hide();
      $(this).show();
      $(this).find(".plus").addClass("plus-rotate");
      // console.log("removed rotate");
    }
  });

  $(".bio").click(function(){
    console.log("clicked the bio");
  })

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
    // Makes sure both search and error divs are not visible when empty
    $("#search").css("width", 0);
    $("#errors").css("padding", 0);

    // Get form information
    let userAilment = $("#userAilment").val();
    let userDr = $("#userDr").val();


    // Empty results and errors before getting more
    $("#search, #errors").empty();
    let newSearch = applicationModule.getDoctors(userAilment, userDr, displayData, displayError);

    // this is to keep track of searches
    allSearches.push(newSearch);
  });

});
