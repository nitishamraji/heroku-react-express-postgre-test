const express = require('express')
const cowsay = require('cowsay')
const cors = require('cors')
var bodyParser = require('body-parser')
require('dotenv').config()
const path = require('path')

// Create the server
const app = express()

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/../client/build')));
} else {
  app.use(express.static(path.join(__dirname, '/../client/public')));
}

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.json());

// const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://nitish-react-express-test-2.herokuapp.com/']
// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log("** Origin of request " + origin)
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       console.log("Origin acceptable")
//       callback(null, true)
//     } else {
//       console.log("Origin rejected")
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

app.use(cors());


app.get('/api/hello', cors(), (req, res, next) => {
  res.send("success");
})

const routes = require('./routes')
app.use('/api', routes)

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '/../client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
} else {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '/../client/public')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/../client/public', 'index.html'));
  });
}

// if (process.env.NODE_ENV === 'production') {
//   // The "catchall" handler: for any request that doesn't
//   // match one above, send back React's index.html file.
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/../client/build/index.html'));
//   });
// } else {
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/../client/public/index.html'));
//   });
// }

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Express running on port ${PORT}`)
})
