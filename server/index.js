const express = require('express')
const cowsay = require('cowsay')
const cors = require('cors')
var bodyParser = require('body-parser')
require('dotenv').config()

// Create the server
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.json());

const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://nitish-react-express-test-2.herokuapp.com/']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

const path = require('path')
// // Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, 'client/build')))
// // Anything that doesn't match the above, send back index.html
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'))
// })

console.log('dir name: ' + __dirname);

// Serve our api route /cow that returns a custom talking text cow
app.get('/api/cow/:say', cors(), async (req, res, next) => {
  try {
    console.log('api cow req:' + req);
    const text = req.params.say
    const moo = cowsay.say({ text })
    res.json({ moo })
  } catch (err) {
    next(err)
  }
})
// Serve our base route that returns a Hello World cow
app.get('/api/cow/', cors(), async (req, res, next) => {
  try {
    console.log('api cow req:' + req);
    const moo = cowsay.say({ text: 'Hello World!' })
    res.json({ moo })
  } catch (err) {
    next(err)
  }
})


app.post('/api/stocks2', cors(), (req, res, next) => {
  // db
  //   .any('select * from hello')
  //   .then(data => {
  //     res.json(`${req.path} fetched ${JSON.stringify(data)} from the database`)
  //   })
  //   .catch(next)
  console.log('testing api stocks:' + req);
  var stockJson = req.body;
  Stocks.insert({ doc: {category: stockJson.category, stocks: [stockJson.stocks]} });
  res.send("success");
})

const routes = require('./routes')
app.use('/api', routes)

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

console.log('connectionString: ' + process.env.DATABASE_URL);

/*
 * Migrate database before listening for requests
 */
//  const Postgrator = require('postgrator')
// const { connectionString } = require('./lib/database')
//
// console.log('connectionString: ' + connectionString);
//
// const postgrator = new Postgrator({
//   migrationDirectory: __dirname + '/postgrator',
//   driver: 'pg',
//   connectionString
// })
//
// postgrator.migrate('max', (err, migrations) => {
//   if (err) {
//     console.error('Database migration failed!')
//     console.error(err)
//     process.exit(1)
//   }
//
//   postgrator.endConnection(() => {
//     console.log('Database migrated successfully.')
//
//     // Choose the port and start the server
//     const PORT = process.env.PORT || 5000
//     app.listen(PORT, () => {
//       console.log(`Mixing it up on port ${PORT}`)
//     })
//
//
//   })
// })

// const { Stocks, database } = require('./lib/database')
//
// database.sync();

// app.get('/api/stocks', (req, res, next) => {
//   // db
//   //   .any('select * from hello')
//   //   .then(data => {
//   //     res.json(`${req.path} fetched ${JSON.stringify(data)} from the database`)
//   //   })
//   //   .catch(next)
//   console.log('testing api stocks');
//   var stockJson = JSON.parse(req.body);
//   Stocks.insert({ doc: {category: stockJson.category, stocks: [stockJson.stocks]} });
//   res.send("success");
// })

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})
