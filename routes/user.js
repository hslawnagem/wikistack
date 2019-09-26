const express = require('express');
const userRouter = express.Router();
const {Page} = require('../models');
const {User} = require('../models');
const {userList} = require('../views');
const {addPage} = require('../views');
const {wikipage} = require('../views');
const {main} = require('../views');
const {userPages}= require('../views');
/******************************************************/
userRouter.get('/', async (req,res,next)=>{
    try{
        let result = await User.findAll();
        console.log(result);
        res.send(userList(result));

    }
    catch(error){
        next(error)}
});


module.exports=userRouter;