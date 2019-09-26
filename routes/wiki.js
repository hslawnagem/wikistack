const express = require('express');
const wikiRouter = express.Router();
const {Page} = require('../models');
const {addPage} = require('../views');
//const layout = require('../views/layout');



wikiRouter.get('/',(req,res,next)=>{
    res.send('got to GET /wiki/');
});

wikiRouter.post('/',async (req,res,next)=>{
    const page = new Page({
        title: req.body.title,
        content: req.body.contenttext
      });
    
      // make sure we only redirect *after* our save is complete!
      // note: `.save` returns a promise.
      try {
        await page.save();
        res.redirect('/');
      } 
      catch (error) 
      { 
          next(error) 
    }

});

wikiRouter.get('/add',(req,res,next)=>{
    res.send(addPage());
});


module.exports =wikiRouter;
