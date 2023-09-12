const User = require("../models/user1model");
const bcrypt = require("bcrypt");
const accountSid = 'AC207ba92746d7116f121d9965b4fa5801';
const authToken = '34889948a5868ad83cfed6da065ee2c5';
const client = require('twilio')(accountSid, authToken);
const firebase = require("firebase");
const firebaseConfig = {
  apiKey: "AIzaSyCSlqQ06cI_hPuH1Q333GI2DHUAPeRA2CQ",
  authDomain: "phone-authenticaion.firebaseapp.com",
  projectId: "phone-authenticaion",
  storageBucket: "phone-authenticaion.appspot.com",
  messagingSenderId: "931981291072",
  appId: "1:931981291072:web:1521d6e03b5832703b39a5",
  measurementId: "G-R9W01N281H"
};
firebase.initializeApp(firebaseConfig);
const sendotp=(cuntrycode , phoneno) => {

    const otrespnce= client.verify
    .services('VAc3cf7ace6fa8da8b463986e99ff98090')
    .verifications.create({
      to:`${cuntrycode}${phoneno}`,
      channel:'sms'
    });



}
const auth = firebase.auth();
const sendotp1=(cuntrycode , phoneno) => {

  auth.sendSignInLinkToPhoneNumber(cuntrycode+phoneno, actionCodeSettings)
  .then(function() {
    console.log(phoneno);
  })
  .catch(function(error) {
    console.log(error);
  });
}

module.exports.register = async (req, res, next) => {
  try {
  
    const { cnic, phoneno,password} = req.body;
    console.log(phoneno);
    const cnic_pic1=req.files['cnic_pic1'][0].path;
    const cnic_pic2=req.files['cnic_pic2'][0].path;
    console.log(cnic_pic1);
    console.log(cnic_pic2);

    const phonenoCheck = await User.findOne({ phoneno });
    const cnicCheck = await User.findOne({ cnic });

    if (phonenoCheck)
      return res.json({ msg: "phoneno already used", status: false });
      if (cnicCheck)
      return res.json({ msg: "cnicCheck already used", status: false });
     
   
    const user = await User.create({
        cnic,
      phoneno,
      password,
      cnic_pic1,
      cnic_pic2,

    });
    sendotp1('+92',phoneno.substring(1))

    return res.json({msg: "Account Registor", status: true, user });
  } catch (ex) {
    next(ex);
  }
};

