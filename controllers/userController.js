const { Users, UserProfiles, UserInsights, Topics } = require('../models')

const getUserByUsername = async (req, res) => {
  const username = req.params.username
  try {
    const user = await Users.findOne({
      where: { username: username },
      include: [{ model: UserProfiles }]
    })

    return res.status(200).json({
      email: user.email,
      name: user.name,
      username: user.username,
      avatar_url: user.avatar_url,
      profile: {
        job: user.UserProfile.job,
        description: user.UserProfile.description
      }
    })
  } catch (err) {
    return res.status(500).json({ error: 'User not found' })
  }
}

const getUserInsightsByUsername = async (req, res) => {
  const username = req.params.username

  const insight = await UserInsights.findAll({
    include: [
      { model: Users, where: { username: username } },
      { model: Topics }
    ]
  })

  const countLanguage = await UserInsights.findAndCountAll({
    where: { user_id: insight[0].user_id },
    include: [{ model: Topics, where: { type: 'language' } }]
  })

  const countFramework = await UserInsights.findAndCountAll({
    where: { user_id: insight[0].user_id },
    include: [{ model: Topics, where: { type: 'framework' } }]
  })

  return res.status(200).send({
    data: {
      countLanguage: countLanguage.count,
      countFramework: countFramework.count,
      insight: insight
    }
  })
}

module.exports = {
  getUserByUsername,
  getUserInsightsByUsername
}
