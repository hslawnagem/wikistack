const express = require('express');
const wikiRouter = express.Router();
const {Page} = require('../models');
const {User} = require('../models');
const {addPage} = require('../views');
const {wikipage} = require('../views');
const {main} = require('../views');
const {userPages}= require('../views');
//const user = require('/user');
/******************************************************/
wikiRouter.get('/', async (req,res,next)=>{
    //res.send('got to GET /wiki/');

    try{
        let result = await Page.findAll();
        res.send(main(result));

    }
    catch(error){
        next(error)}
});
/******************************************************/
wikiRouter.post('/',async (req,res,next)=>{
    const page = new Page({
        title: req.body.title,
        content: req.body.contenttext
      });
      try {

        const user_arr = await User.findOrCreate({
            where:{
                name:req.body.authorname,
                email:req.body.authoremail
            }
        })
        const instance = user_arr[0];
        const wasCreated = user_arr[1];

        page.setAuthor(instance);
        await page.save();
        res.redirect(page.slug);
      } 
      catch (error) 
      { 
          next(error) 
    }
});
/******************************************************/
wikiRouter.get('/add',(req,res,next)=>{
    res.send(addPage());
});
/******************************************************/
//wikiRouter.get('/users',(req,res,next)=>{
//    res.send("foo");
//});
/******************************************************/
wikiRouter.get('/:slug', async (req, res, next) => {
    try{
    const result = await Page.findAll({
        where: {
            slug: req.params.slug
        }
    })
    res.send(wikipage(result, "Megan Walsh"));
}
catch (error){
    next(error);
}
  });
/******************************************************/
module.exports =wikiRouter;
