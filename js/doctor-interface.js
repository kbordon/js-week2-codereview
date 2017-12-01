import { doctor, ApplicationModule } from './../js/doctor.js';

let displayData = function(response) {
  console.log(response);
};

///////////////////
//when page loads//
///////////////////
$(document).ready(function(){

  let applicationModule = new ApplicationModule();
  applicationModule.testmethod();

  // enter form
  $("#dr-search").submit(function(event){
    event.preventDefault();

    let userAilment = "menstrual cramps";
    // $("#userAilment").val();
    let userDr = "Alisun Bonville";
    //$("#userDr").val();

    applicationModule.getDoctors(userAilment, userDr, displayData);
  });

});
