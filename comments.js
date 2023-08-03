// Create web server
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')
const app = express()
// Use morgan logger
app.use(morgan('combined'))
// Use body parser
app.use(bodyParser.json())
// Use cors
app.use(cors())
// Require routes
require('./routes')(app)
// Connect to database
sequelize.sync()
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })
  