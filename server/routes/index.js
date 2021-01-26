const express = require('express')
const router = express.Router()
const cors = require('cors')
const { QueryTypes } = require('sequelize');

const { Stocks, database } = require('../lib/database')
const db = require('../sequelize/models')

console.log('dirname: ' + __dirname)
console.log("db: " + db);

router.get('/hello', (req, res) => {
  res.json(`${req.path} says hellooooo!`)
})

router.post('/stocks', cors(), async (req, res, next) => {
  // db
  //   .any('select * from hello')
  //   .then(data => {
  //     res.json(`${req.path} fetched ${JSON.stringify(data)} from the database`)
  //   })
  //   .catch(next)
  console.log('testing api stocks:' + req);
  var userJson = req.body;

  const user = await db.User.create({ userId: userJson.category, role: userJson.stocks[0] });

  console.log(user);

  // Stocks.create({ doc: {category: stockJson.category, stocks: stockJson.stocks} });

  // const categoryDoc = Stocks.findOne({ where: { id: 1 } }).then(doc => console.log(doc));

//   var json = "{category: " + stockJson.category +"}";
//   const categories = await database.query(`insert into stocks
//   (doc)
// values
//   (array['{"sender":"pablo","body":"they are on to us"}']::jsonb[])`, {
//     type: QueryTypes.INSERT
//   });

  // const categories = await database.query("SELECT jsonb_object_keys(doc) FROM stocks;", {
  //   type: QueryTypes.SELECT
  // });

  // .then(doc =>{
  //     "doc.category": {
  //       [Op.eq]: stockJson.category
  //     }
  // });
  //
  // console.log(categories);

  res.send("success");
})

module.exports = router
