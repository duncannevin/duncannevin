const express = require('express')
const router = express.Router()

const commonContent = {
  title: 'Duncan Nevin'
}

const topContent = {
  heading: commonContent.title,
  subHeading: 'Full stack developer. <span class="pink-font">Thinker</span>. Problem solver.'
}

const middleContent = {}

const bottomContent = {}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', assembleContent())
})

function assembleContent () {
  return Object.assign(commonContent, topContent, middleContent, bottomContent)
}

module.exports = router
