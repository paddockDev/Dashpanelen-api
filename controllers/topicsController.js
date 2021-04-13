const { Topics } = require('../models')

const getTopicBySlug = async (req, res) => {
  const slug = req.params.slug
  try {
    const topic = await Topics.findOne({
      where: {
        slug: slug
      }
    })

    return res.status(200).send({
      name: topic.name,
      description: topic.description,
      url: topic.url,
      another_url: topic.another_url,
      creator: topic.creator,
      first_release: topic.first_release,
      type: topic.type,
    })
  } catch (err) {
    return res.status(404).send({ message: 'Topic not found' })
  }
}

module.exports = {
  getTopicBySlug
}
