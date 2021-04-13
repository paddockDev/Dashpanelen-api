const { graphql } = require('@octokit/graphql')

const getIssues = async (req, res) => {
  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${process.env.PERSONAL_TOKEN}`
    }
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
  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${process.env.PERSONAL_TOKEN}`
    }
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
