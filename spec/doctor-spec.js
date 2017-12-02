import { formatPhone} from './../js/doctor.js';

describe("formatPhone", function() {
  // let testAppMod;
  // beforeEach(function(){
  //   testAppMod = new ApplicationModule();
  // });

  it("formatPhone will turn a string into phone number", function(){
    let num = "1234567890";
    num = formatPhone(num);
    expect(num).toEqual("(123) 456-7890");
  });
});
