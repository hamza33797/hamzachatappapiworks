const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
} = require("../controllers/userController");
const User = require("../models/userModel");

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
router.post("/login", login);
router.post("/register", register);
router.get("/allusers", getAllUsers);
router.post("/setavatar/:phoneno", upload.single('image'), (req, res, next) => {
  try {
    console.log(req.file.path);
    const phoneno = req.params.phoneno;
    console.log(phoneno);
    const filter = { phoneno: phoneno };

// Updated values
const update = {
  $set: {
    isAvatarImageSet: true,
    avatarImage: req.file.path
    // Add more fields to update if needed
  }
};
 User.updateOne(filter, update).then(doc => {
  res.status(200).json({status:"true"
            ,doc
        
        });
 
  // Close the database connection
  
}) .catch(function (err) {
  console.log(err);
});
    // const userId = req.params.id;
    // const avatarImage =req.file.path;
    // const userData =  User.findByIdAndUpdate(
    //   userId,
    //   {
    //     update
    //   },
    //   { new: true }
    // );
    // return res.json({
    //   isSet: userData.isAvatarImageSet,
    //   image: userData.avatarImage,
    // });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
});
router.get("/logout/:id", logOut);

module.exports = router;
