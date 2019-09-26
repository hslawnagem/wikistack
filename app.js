const PORT = 1338;

const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout");
const models = require('./models'); 
const path = require('path');

const app = express();

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());


app.use(morgan("dev"));
app.use(express.static(path.join(__dirname , "/public")));
app.use('/wiki', wikiRouter);
app.use('/users',userRouter);

/***************************************************/
//app.get("/users", (req, res) => {
//  res.redirect('/user');
//})

/***************************************************/
app.get("/", (req, res) => {
  res.redirect('/wiki');
})

/***************************************************/
const init = async()=>{
  await models.db.sync({force:true});
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  })
}

init();