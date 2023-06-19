const twilio = require('twilio');
const client = new twilio('AC207ba92746d7116f121d9965b4fa5801', 'fe40e1fd4a5050c85b4cafe7aaf7d3c8');
exports.getverificationcode=(req,res,next)=>
{
//   const accountSid = 'AC23f195c7602d952769d21f69a7c25528';
// const authToken = 'c8849d2ec49df569399839659431afee';
// const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+12708123154',
//      to: '+923379714736'
//    })
//   .then(message => {console.log(message.sid)
//     res.status(200).json({status:"true"
//     ,respon:'Verification code sent to'
// }); 
//   }
//   ).catch(error => {
//     console.error(`Error creating verification: ${error}`);
//     res.status(200).json({status: "false", response: 'Error creating verification'});
// });
 // meyeproapp@11223344
 // Trial: $-3.7668
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const verificationSid = 'VAc3cf7ace6fa8da8b463986e99ff98090';
    console.log(verificationCode);
   // '+923379714736'
    client.verify.services(verificationSid)
      .verifications
      .create({
          to: '+923379714736',
          channel: 'sms',
          ttl: 600 // set TTL to 10 minutes
      })
      .then(verification => {
          console.log(`Verification created: ${verification.sid}`);
                  
                      console.log(verification.code);
            res.status(200).json({status:"true"
                ,respon:'Verification code sent to'
            }); 

        //   client.messages.create({
        //     body: `Your verification code :: ${verificationCode}`,
        //     to: '+923379714736',
        //     from: '+16204104219',
        //   }).then(message => {
        //     console.log(`Verification code sent to ${message.to}`);
        //     res.status(200).json({status:"true"
        //         ,respon:'Verification code sent to'
        //     }); 
        //   }).catch(error => {
        //     console.log(`Error sending verification code: ${error}`);
        //     res.status(200).json({status:"false"
        //     ,respon:'Error sending verification code'
        // }); 
        //   });
      })
      .catch(error => {
          console.error(`Error creating verification: ${error}`);
          res.status(200).json({status: "false", response: 'Error creating verification'});
      });
   
    

    

    
}

exports.getcoderesponse=(req,res,next)=>
{

  
  const verificationSid = 'VA8e6952f32d9cae73472bba017de09dc5';
  // const verificationCode = req.body.otpcode;
  //  // the code entered by the user
  //  const cuntrycode=req.body.cuntrycode;
  //  const phoneno=req.body.phoneno;

   const verificationCode = req.body.code;
   console.log(verificationCode);
   const ss='';
  
   // the code entered by the user
   const cuntrycode='+92';
   const phoneno='3379714736';
   
   client.verify.services(verificationSid)
   .verifications
   .create({
     to: '+923379714736',
     channel: 'sms' // Replace with the channel you want to use (sms, call, or email)
   })
   .then(verification => {
    
     console.log('Verification SID:', verification.sid);
     console.log('Verification SID:', verificationSid);
     client.verify.services(verificationSid)
     .verificationChecks
     .create({ to: '+923379714736', code: verificationCode, verificationSid:verification.sid })
     .then(verification_check => {
      const date_created = new Date(verification_check.date_created);
const now = new Date();
const expiration_time_minutes = 5; // or however long your verification codes are valid for

const elapsed_time_minutes = (now - date_created) / (1000 * 60);


if (!verification_check.valid) {
  console.log("Verification code has expired.");
  res.status(200).json({status:"false"
      ,response:'Invalid verification code.'
  }); 
} else {
  console.log("Verification code is still valid.");
  if(checkVerificationStatus(verification.sid,verificationCode))
{
  console.log(verification_check.status);
  console.log('Verification code approved!');
  res.status(200).json({status:"true"
      ,respon:'Verification code approved!'
  }); 
} else {
  // the verification code is invalid
  console.log('Invalid verification code.');
console.log(verification_check.status);
  res.status(200).json({status:"false"
      ,response:'Invalid verification code.'
  }); 
}
}
console.log(elapsed_time_minutes.toString());
console.log(expiration_time_minutes.toString());


      //  if (verification_check.status === 'approved') {
      //    // the verification code is valid
      //    console.log('Verification code approved!');
      //    res.status(200).json({status:"true"
      //        ,respon:'Verification code approved!'
      //    }); 
      //  } else {
      //    // the verification code is invalid
      //    console.log('Invalid verification code.');
      // console.log(verification_check.status);
      //    res.status(200).json({status:"false"
      //        ,response:'Invalid verification code.'
      //    }); 
      //  }
     })
     .catch(error => {
       console.error(error);
       res.status(200).json({status:"false"
             ,response:'Something went worng',
             error:error
 
         }); 
     });
     // Store the verification SID to use for verification checks later
   })
   .catch(error => {
     console.error(error);
   });
  
 
}
function checkVerificationStatus(verificationSid,verificationCode) {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      client.verify.services(verificationSid)
      .verificationChecks
      .create({ to: '+923379714736', code: verificationCode, verificationSid:verificationSid })
        .then(verification_check => {
          console.log(`Verification check status: ${verification_check.status}`);
          if (verification_check.status === 'approved') {
            clearInterval(interval);
            resolve(false);
          } else if (verification_check.status === 'denied') {
            clearInterval(interval);
            resolve(false);
          }
        })
        .catch(error => {
          clearInterval(interval);
          reject(error);
        });
    }, 5000); // check every 5 seconds
  });
}