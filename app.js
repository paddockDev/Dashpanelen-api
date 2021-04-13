const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  attachStacktrace: true,
  debug: true,
  environment: process.env.NODE_ENV
})

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const graphqlRouter = require('./routes/graphql')
const groupRouter = require('./routes/groups')
const oauthRouter = require('./routes/oauth')
const meRouter = require('./routes/me')
const userRouter = require('./routes/user')
const topicRouter = require('./routes/topics')

const app = express()

app.use(cors({ exposedHeaders: 'x-access-token' }))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/api', authRouter)
app.use('/api/github', oauthRouter)
app.use('/api/graphql', graphqlRouter)
app.use('/api/groups', groupRouter)
app.use('/api/me', meRouter)
app.use('/api/users', userRouter)
app.use('/api/topics', topicRouter)

module.exports = app
