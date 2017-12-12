# Medic!
### A Doctor Search Application (Asynchrony and APIs Code Review _12.01.2017_)
#### By Kimberly Bordon

## Description
_This is an application that will allow a user to retrieve a list of up to 10 doctors in proximity to Portland, OR. The user can enter their health concern and/or a specific doctor's name, and the app will use Javascript to call an API to retrieve doctors that best match the user's input. If the API's response is successful it will show either a list of doctors, or a message saying none matched the search. If the API does not return a successful response, the page will instead display a brief error message why the request failed._

## Specs
| Behavior | Input Example | Output Example |
|-|-|-|
| The User can enter in a medical issue, such as "back pain", and they will receive a list of doctors in the Portland area. | User enters:<br> "back pain" | Search displays list of doctors |
| The User can enter in a name of a doctor, full or partial, and they will receive a list of the doctors in the Portland area closest to their search. | User enters: "Nick Riviera" | Search displays list of doctors |
| The User can enter in either a medical issue and/or doctor name, and they will receive a list of doctors. | User enters: <br> "Angela Ziegler" <br> "low health points" | Search displays list of doctors |
| The User can enter a medical issue and/or doctor name, and if none are found, then the app will display that information. | User enters: <br> "Zoidberg" | Page shows message: "Sorry, your search returned 0 results. Please adjust your search entries, and try again!" |
| If the User's search results in an error, it will display the error. | User enters a search, and page creates a bad request. | Page shows message: <br> "Error! Please enter a valid search." |
| The User can click on one of the Doctor's names on the result list for more of that doctor's information. | User clicks "Nick Riviera" | Page displays more information in that space: <br> Nick Riviera <br>Accepting new patients: yes<br> A Totally Safe Clinic<br> 44 Bow Street<br>Portland, OR<br>91234<br>1-600-DOCTORB<br>http://doctorb.com<br> IMG*<br>bio* |

### Wishlist
| Behavior | Input | Output |
|-|-|-|
| The app will keep track of doctors that were viewed, and allow the user to click to view that doctors information. | User clicks doctor in recently viewed list. | Page display's doctor's information. |

* **edit:** Doctor's information now displayed by clicking plus sign. ~~At the moment when a doctor's information is displayed, if it is clicked again, it automatically hides the display. Should make it so they click a button specifically to hide the display.~~
* Some of the details are fairly long, there should be a button once you scroll down a certain point that will appear and take you to the top of the page.
* Change request and display to accommodate more than maximum of 10
* Add pictures, if the API doesn't ban us...

## Setup/Install

* Make sure you have [Node](https://nodejs.org/en/download/) and the npm (Node package manager, which should come automatically) installed.
* Go to [this repository page](https://github.com/kbordon/js-week2-codereview), and clone the project.
* Navigate to top level folder of the cloned repository in terminal or powershell, and enter the following commands:
```
$ npm install
$ bower install
```

### ATTENTION: Before you run any code beyond this point, please read the following.

This app uses the BetterDoctor API key which must be stored in an `.env` file in the top level of the repository. When cloned, this repository does _not_ with come with its own `.env` file, and will specifically exclude any from commits in the `.gitignore` file.

* **You must make this file with _your own API key_**, which you can obtain by visiting the [BetterDoctor API](https://developer.betterdoctor.com/) website, and clicking _"Get a free API key"_.
* Fill out their form, and your API key should be listed on the front page or under _My Account > Applications_.
* Then go to the top level of the repository where the `index.html`, `js`, and `css` folders are located, and create a `.env` file.
* In this file, it should like the following below:

**.env**
```
exports.apiKey = << YOUR API KEY >>;
```
* Replace _<< YOUR API KEY >>_ with your newly obtained API key.
* Remember should you make any commits, or push any code afterwards, when you clone it to a different destination, you will have to recreate this file.


#### Testing
* If you would like to add any code to this project, and then test it, you can write your tests in the file `spec/doctor-spec.js`.
* Alternatively, you can create your own test file in the same location as this file, and making sure the filename ends with the extension `-spec.js`.
* In order to run tests, from the top level of the project folder, run this command in terminal: `$ npm test`

#### Running/Production
* To build project, enter the following:
```
$ gulp build
$ gulp serve
```

* To build the project to be production ready, add the production flag to the build command like so:
`$ gulp build --production`


## Known Bugs
There are currently no *known* bugs. (😉)

## Technology Used
* [BetterDoctor API](https://developer.betterdoctor.com/)
* Node
* Bower
* Jasmine
* Karma
* ... and many more packages. In top level of project folder, open `package.json` and `bower.json` in Atom (or your preferred text editor) and look for `"devDependencies"` and `"dependencies"` respectively to see the entire list.
* jQuery
* Speech Bubble styling credit to [Bubbly](https://leaverou.github.io/bubbly/)

## Contact details
_Email Kimberly at [kbordon@gmail.com](mailto:kbordon@gmail.com) for comments, questions, or concerns._
## License
*This software is licensed under the MIT license.*

Copyright © 2017 **Kimberly Bordon**

to refactor the code!
I really liked how you thought to group the practices. It's also awesome that you added a scrollbar to the bio. Once again, you really deserved that golden dino! It's clear that you're considering how you can best implement the prompt before starting to code. Great job!

To clean up your code, you could slim down the code in the then() method by writing a new class for the doctor object that contains a few class methods. For instance, lines 59-84 are responsible for digging out the practices for each doctor. Instead, you could create a method on the Doctor class that would generate a list of practices for a particular doctor, and then call that method on line 59. Ideally, methods should be no more than 10 lines long. This makes our code more readable, because our methods will refer to other methods, which should have descriptive names that clearly indicate the actions they perform. So, when someone reads our code, they should essentially be able to follow the method calls and not read any of the logic and still know what the app is doing. If you refactored your code, your final code could look something like:

promiseDrs.then(function(response){ let body = JSON.parse(response); let drResults = []; if (body.meta.count !== 0){ body.data.forEach(function(doctor){ let newDoctor = new Doctor(doctor); newDoctor.getPractices(); drResults.push(newDoctor); }); } displayData(drResults); return drResults; }, function(error) { let errorBody = JSON.parse(error); console.log(errorBody); displayError(errorBody.meta.message, errorBody.meta.httpstatuscode); }); }
