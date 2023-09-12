const User = require("../models/usercomplains");
const User1 = require("../models/user1model");
const useruploads= require("../models/uploadscomplains");
module.exports.registercomplain = async (req, res, next) => {
    try {
    
      const {cnic,type,subtype,place_posting,unit,district,date,time,details} = req.body;
      console.log(cnic);

      const cnicCheck = await User1.findOne({ cnic });

        if (cnicCheck)
       {
     
      const user = await User.create({
          cnic,
          type,
          subtype,
          place_posting,
          unit,
          district,
          date,
          time,
          details,
  
      });
      const files = req.files;

        // Save file paths to the database
        const savedFiles = await useruploads.create(
            files.map((file) => ({
              id: user.id,
                path: file.path,
            }))
        );
      
      

  
      return res.json({msg: "Complain Registor", status: true, user,savedFiles });
          }
          else
          {
            return res.json({ msg: "cnic not register", status: false });
          }
    } catch (ex) {
      next(ex);
    }
  };