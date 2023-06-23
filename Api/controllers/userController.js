const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const Sendbird = require('sendbird');

// Initialize Sendbird with your API token
const APP_ID = 'E5EDE0D3-840E-468E-8C32-7A8472610B3C';

const sendbird = new Sendbird({ appId: APP_ID });

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrectionsss Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
const createUser = async (userId, nickname) => {
  try {
    const user = await sendbird.createUser({ userId, nickname });
    console.log('User created:', user);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
module.exports.register = async (req, res, next) => {
  try {
    const { username, phoneno} = req.body;
    console.log(username);
    console.log(phoneno);
    // const usernameCheck = await User.findOne({ username });
    // if (usernameCheck)
    //   return res.json({ msg: "Username already used", status: false });
    const phonenoCheck = await User.findOne({ phoneno });

    if (phonenoCheck)
      return res.json({ msg: "phoneno already used", status: false });
     
   
    const user = await User.create({
      phoneno,
      username,
    });
    createUser(user._id, user.username);

    return res.json({msg: "Account Registor", status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const { phoneno } = req.body;
    console.log(phoneno );
    User.find({ "phoneno" :  phoneno  })
    .select("phoneno username _id isAvatarImageSet avatarImage")
    .exec()
    .then(doc =>{
        console.log(doc);
        if(doc)
        {
            res.status(200).json({status:"true"
            ,doc
        
        }); 
        }
        else
        {
        res.status(404).json({status:"true"
        ,message:'no data found'});
        }
    })
    .catch(error=>
        {
            console.log(error);
            res.status(200).json({error:error});
        });
    // const users = await User.find({ _id: { $ne: req.params.id } }).select([
    //   "email",
    //   "username",
    //   "avatarImage",
    //   "_id",
    // ]);
    // return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
