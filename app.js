const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 8000
// const   favicon = require('serve-favicon')

dotenv.config({
  path: './config.env',
})
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(cors())

app.options('*', cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// const nunjucks = require('nunjucks')
// nunjucks.configure('views', {
//   autoescape: true,
//   express: app,
// })

// Route
const imageRoute = require('./routes/imageRoutes')
app.use('/api/v1/image', imageRoute)

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Api for My Unsplash Challenge',
  })
})

// catch 404 and forward to error handler
app.use((req, _res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  err.message =
    'The page ' +
    req.hostname +
    req.originalUrl +
    ' could not be found on this website.'
  next(err)
})

// MongoDB connection
// const DB = process.env.DATABASE_LOCAL
const DB = process.env.DATABASE

// process.env.DATABASE_LOCAL

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((c) => console.log('DATABASE connection successfull'))

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT)
})

/*** Error handlers ***/

// Development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, _req, res, _next) => {
    res.status(err.status || 500)
    return res.json({
      status: 'fail',
      title: 'Error ' + err.status,
      message: err.message,
      error: err,
    })
  })
}

// Production error handler
// no stacktraces leaked to user
app.use((err, _req, res, _next) => {
  res.status(err.status || 500)
  res.render('error', {
    title: 'Error ' + err.status,
    message: err.message,
    error: {},
  })
})

module.exports = app
