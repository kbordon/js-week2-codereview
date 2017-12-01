import { Blank, ApplicationModule } from './../js/Blank.js';



// function displayData(result) {
  // results.forEach(function(result){
    // $('#sample-list').append(`<li>${result}</li>`);
  // });
// }

///////////////////
//when page loads//
///////////////////
$(document).ready(function(){

  let applicationModule = new ApplicationModule();
  applicationModule.testmethod();

  // applicationModule.getData(userInput,displayData);
});
