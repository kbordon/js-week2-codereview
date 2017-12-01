# Medic!
## A Doctor Search Application for Epidocus Code Review _(2017.12.01)_
### By Kimberly Bordon

## Description

## Specs
| Behavior | Input | Output |
|-|-|-|
| The User can enter in a medical issue, such as "back pain", and they will receive a list of doctors in the Portland area. | User enters:<br> back pain | Search returns list of doctors by name |
| The User can enter in a name of a doctor, full or partial, and they will receive a list of the doctors in the Portland area closest to their search. | User enters: "Nick Riviera" | Search returns list of doctors by name |
| The User can enter in either a medical issue and/or doctor name, and they will receive a list of doctors. | User enters: <br> "Angela Ziegler" <br> "low health points" | Search returns list of doctors by name. |
| The User can enter a medical issue and/or doctor name, and if none are found, then the app will display that information. | User enters: <br> "Zoidberg" | Page shows message: "Sorry, your search returned 0 results. Please adjust your search entries, and try again!" |
| If the User's search results in an error, it will display the error. | User enters a search, and page creates a bad request. | Page shows message: <br> "Error! Please enter a valid search." |
| The User can click on one of the Doctor's names on the result list for more of that doctor's information. | User clicks "Nick Riviera" | Page displays more information in that space: <br> Nick Riviera <br>Accepting new patients: yes<br> A Totally Safe Clinic<br> 44 Bow Street<br>Portland, OR<br>91234<br>1-600-DOCTORB<br>http://doctorb.com<br> IMG*<br>bio* |
| * The app will keep track of doctors that were viewed, and allow the user to click to view that doctors information. | User clicks doctor in recently viewed list. | Page display's doctor's information. |

## Setup/Install
#### This app uses the BetterDoctor API key which must be stored in an .env file in the top level of the repository.

* **You must make this file with _your own API key_**, which you can obtain by visiting the [BetterDoctor API](https://developer.betterdoctor.com/) website, and clicking _"Get a free API key"_.
* Fill out their form, and your API key should be listed on the front page or under _My Account > Applications_.
* Then go to the top level of the repository where the `index.html`, `js`, and `css` folders are located, and create a `.env` file.
* In this file, it should like the following below:

**.env**
```
exports.apiKey = << YOUR API KEY >>;
```
* Replace _<< YOUR API KEY >>_ with your newly obtained API key.



## Known Bugs
## Technology Used
## Contact details
_Email Kimberly at [kbordon@gmail.com](mailto:kbordon@gmail.com) for comments, questions, or concerns._
## License
_This software is licensed under the MIT license._
