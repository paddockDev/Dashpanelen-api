const { Users, UserProfiles, UserInsights } = require('../models')

const addUserInsight = async (req, res) => {
  const userId = req.userId
  const { name, state, is_interested } = req.body
  try {
    await UserInsights.create({
      user_id: userId,
      name: name,
      state: state,
      is_interested: is_interested
    })
  } catch (err) {
    return res.status(500).json({ error: 'User not found' })
  }
}

const getUser = async (req, res) => {
  const userId = req.userId
  try {
    const user = await Users.findOne({
      where: {
        id: userId
      },
      include: [UserProfiles]
    })
    return res.status(200).send({
      email: user.email,
      name: user.name,
      username: user.username,
      avatar_url: user.avatar_url,
      profile: {
        lang: user.UserProfile.lang,
        job: user.UserProfile.job,
        description: user.UserProfile.description
      }
    })
  } catch (err) {
    return res.status(500).json({ error: 'User not found' })
  }
}

const getUserInsights = async (req, res) => {
  const userId = req.userId
  try {
    const insight = await UserInsights.findAll({
      include: [{ model: Users, where: { id: userId } }]
    })

    return res.status(200).send({
      data: insight
    })
  } catch (err) {
    return res.status(500).json({ error: 'User not found' })
  }
}

const updateUser = async (req, res) => {
  const userId = req.userId
  const { name, username, lang, job, description } = req.body

  try {
    await Users.update({
      name: name,
      username: username,
    }, {
      where: { id: userId }
    })

    await UserProfiles.update({
      lang: lang,
      job: job,
      description: description
    }, {
      where: { user_id: userId }
    })

    return res.status(200).json({ message: 'User was successfully updated' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const updateUserInsight = async (req, res) => {
  const userId = req.userId

  const data = req.body

  try {
    await data.data.map((topic) => {
      UserInsights.update({ name: topic.name, state: topic.state, is_interested: topic.is_interested }, { where: { user_id: userId, id: topic.id } })
    })

    return res.status(200).send({
      message: 'Topics have been updated'
    })
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

module.exports = {
  addUserInsight,
  getUser,
  getUserInsights,
  updateUser,
  updateUserInsight
}
