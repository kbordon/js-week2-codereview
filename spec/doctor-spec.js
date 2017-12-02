import { ApplicationModule} from './../js/doctor.js';

describe("ApplicationModule", function() {
  let testAppMod;
  beforeEach(function(){
    testAppMod = new ApplicationModule();
  });

  it("formatPhone will turn a string into phone number", function(){
    let num = "1234567890";
    num = testAppMod.formatPhone(num);
    expect(num).toEqual("(123) 456-7890");
  });
});
