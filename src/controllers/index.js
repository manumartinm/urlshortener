const { PrismaClient } = require('@prisma/client')
const validUrl = require('valid-url')
const shortid = require('shortid')

const prisma = new PrismaClient()

const redirectURL = async (req, res) => {
  try {
    const url = await prisma.url.findUnique({ where: { urlCode: req.params.code } })
    if (url) return res.redirect(url.longUrl)
    return res.status(404).json('No URL Found')
  } catch (err) {
    return res.status(500).json('Server Error')
  }
}

const createShortURL = async (req, res) => {
  const baseUrl = process.env.BASE_URL
  const { longUrl } = req.body

  if (!validUrl.isUri(baseUrl)) return res.status(401).json('Invalid base URL')

  const urlCode = shortid.generate()

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await prisma.url.findFirst({ where: { longUrl: req.body.longUrl } })

      if (url) return res.json(url)

      const shortUrl = `${baseUrl}/${urlCode}`

      url = await prisma.url.create({
        data: {
          longUrl,
          shortUrl,
          urlCode,
          createdAt: new Date(),
        },
      })

      return res.json(url)
    } catch (err) {
      return res.status(404).json('Server Error')
    }
  } else {
    return res.status(401).json('Invalid longUrl')
  }
}

const home = (req, res) => {
  res.render('index')
}

module.exports = { createShortURL, redirectURL, home }
