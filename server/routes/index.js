const express = require('express')
const router = express.Router()
const cors = require('cors')
const { QueryTypes } = require('sequelize');

const { Stocks, database } = require('../lib/database')
const db = require('../sequelize/models')

router.post('/stocks', cors(), async (req, res, next) => {
  // db
  //   .any('select * from hello')
  //   .then(data => {
  //     res.json(`${req.path} fetched ${JSON.stringify(data)} from the database`)
  //   })
  //   .catch(next)
  // console.log('testing api stocks:' + req);
  // var userJson = req.body;
  //
  // const user = await db.User.create({ userId: userJson.category, role: userJson.stocks[0] });
  //
  // console.log(user);

  // try {
  //   var stocksJson = req.body;
  //   const stocksByCategory = await db.StocksByCategory.findOne()
  //   const category = stocksJson.category;
  //   const stocks = stocksJson.stocks;
  //
  //   if( !stocksByCategory )
  //   {
  //     console.log('no data');
  //     const obj = {};
  //     obj[stocksJson.category]=stocksJson.stocks;
  //     const test = await db.StocksByCategory.create({doc: obj});
  //   } else {
  //     console.log('data exists');
  //     console.log(stocksByCategory.doc);
  //     stocksByCategory.doc[category] = stocks;
  //     console.log(stocksByCategory.doc);
  //     // await stocksByCategory.setDataValue('doc', stocksByCategory.doc);
  //       // stocksByCategory.save({haveChangedJSON: ["doc"]});
  //       stocksByCategory.changed('doc', true);
  //       stocksByCategory.save();
  //   }
  // } catch(e)
  // {
  //   console.log(e);
  // }









  try {
    const supportedStocks = await db.SupportedStocks.findOne()

    if( !supportedStocks )
    {
      console.log('no supportedStocks data');
    } else {
      console.log('data exists');
      console.log(supportedStocks.data.length);
    }
  } catch(e)
  {
    console.log(e);
  }


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
});

router.get('/getSupportedStocks', cors(), async (req, res, next) => {
   console.log('testing getSupportedStocks')
  try {
    const supportedStocks = await db.SupportedStocks.findOne()

    if( !supportedStocks )
    {
      console.log('no supportedStocks data');
    } else {
      console.log('data exists');
      res.send(supportedStocks.data);
    }
  } catch(e)
  {
    console.log(e);
  }
});

module.exports = router
