const {
    register,
 
  } = require("../controllers/userController1");
  const {
    registercomplain,
 
  } = require("../controllers/complainscontroller");

  
  const router = require("express").Router();
  const multer = require('multer');
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'profileuploads/'); // Directory where uploaded files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // File name will be the current timestamp + original file name
    }
  });
  const upload = multer({ storage });

   router.post("/userregister",upload.fields(  [{ name: 'cnic_pic1' }, { name: 'cnic_pic2' }]) ,register);
   router.post("/usercomplains",upload.array('uploads') ,registercomplain);
//   router.post("/userregister",upload.fields(  [{ name: 'cnic_pic1' }, { name: 'cnic_pic2' }]) ,function(req,res,next){
  
 
//     const { cnic, phoneno,password} = req.body;
//     console.log(phoneno);
// const cnic_pic1=req.files['cnic_pic1'][0].filename;
//     console.log(cnic_pic1);
//         });

  
  module.exports = router;
  