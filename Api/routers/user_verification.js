const express=require('express');

const contoller_user=require('../controllers/user_verification_controller');

const router=express.Router();





router.post('/',contoller_user.getverificationcode);
router.post('/coderesponse',contoller_user.getcoderesponse);
module.exports=router;