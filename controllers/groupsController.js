const { Groups } = require('../models')

const getGroupBySlug = async (req, res) => {
  const slug = req.params.slug
  try {
    const group = await Groups.findOne({
      where: {
        slug: slug
      }
    })

    return res.status(200).send({
      name: group.name,
      description: group.description,
      homepage: group.homepage
    })
  } catch (err) {
    return res.status(404).send({ message: 'Group not found' })
  }
}

module.exports = {
  getGroupBySlug
}
