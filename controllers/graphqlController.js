const { UserServices } = require('../models')
const { graphql } = require('@octokit/graphql')
const { createOAuthUserAuth } = require('@octokit/auth-oauth-user')

const getIssues = async (req, res) => {
  const token = await UserServices.findOne({
    where: { user_id: req.userId }
  })

  const auth = createOAuthUserAuth({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    clientType: 'oauth-app',
    token: token.provider_token
  })

  const graphqlWithAuth = graphql.defaults({
    request: {
      hook: auth.hook,
    },
  })

  const issues = await graphqlWithAuth(
    `
    {
      viewer {
        issues(first: 10, states: OPEN) {
          edges {
            node {
              id
              title
              url
            }
          }
        }
      }
    }
  `
  )

  res.status(200).send({
    data: issues
  })
}

const getAuthenticatedUser = async (req, res) => {
  const token = await UserServices.findOne({
    where: { user_id: req.userId }
  })

  const auth = createOAuthUserAuth({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    clientType: 'oauth-app',
    token: token.provider_token
  })

  const graphqlWithAuth = graphql.defaults({
    request: {
      hook: auth.hook,
    },
  })

  const me = await graphqlWithAuth(
    `
    {
      viewer {
        login
        avatarUrl
        url
      }
    }
  `
  )

  res.status(200).send({
    data: me
  })
}

module.exports = {
  getIssues,
  getAuthenticatedUser
}
