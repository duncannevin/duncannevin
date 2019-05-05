const express = require('express')
const router = express.Router()

class Header {
  constructor (header, subHeader, image) {
    this.header = header || ''
    this.subHeader = subHeader || ''
    this.image = '/images/' + image
  }
}

class TechnicalSkill {
  constructor (name, proficiency) {
    this.name = name
    this.proficiency = proficiency
  }
}

class Testimonial {
  constructor (author, text) {
    this.author = author
    this.text = text
  }
}

const common = {
  title: 'Duncan Nevin'
}

const home = Object.assign({}, new Header(
  common.title,
  'Full stack developer. <span class="pink-font">Thinker</span>. Problem solver.')
)

const about = Object.assign({
  characteristics: [
    new Header('Fault Tolerant', 'Servers built to handle anything the client throws at them.', 'faultTolerant.png'),
    new Header('Responsive', 'Front end built to respond to any device.', 'responsive.png'),
    new Header('Multi Threaded', 'Backend built with Akka Actors allowing for more complex logic that scales.', 'multithreading.png'),
    new Header('Reactive', 'The view layer reacts immediately to server response.', 'reactive.png')
  ],
  technicalSkills: [
    new TechnicalSkill('Scala', 70),
    new TechnicalSkill('Javascript', 90),
    new TechnicalSkill('CSS', 80),
    new TechnicalSkill('Sass', 80),
    new TechnicalSkill('HTML', 90),
    new TechnicalSkill('VueJS', 90),
    new TechnicalSkill('JQuery', 80),
    new TechnicalSkill('Play!', 90),
    new TechnicalSkill('Akka', 65),
    new TechnicalSkill('NodeJS', 90),
    new TechnicalSkill('ExpressJS', 90),
    new TechnicalSkill('MongoDB', 60),
    new TechnicalSkill('MySql', 55),
    new TechnicalSkill('Git', 95),
    new TechnicalSkill('GitHub', 95),
    new TechnicalSkill('Vim', 65),
    new TechnicalSkill('Linux', 75)
  ],
  testimonials: [
    new Testimonial('Jack Couch, CEO DeepIntel Solutions LLC', `
        Duncan is a pleasure to work with. He is extremely motivated, hardworking and productive.
      He writes more usable code per day than any developer with his years of experience ever hired by DeepIntel.
      He is not afraid to tackle the most difficult problem available and stick with it until he has a design
      that solves the problem well, usually elegantly. I have no doubt that he will be an asset to any company
      lucky enough to work with him.
    `)
  ]
}, new Header('About', ''))

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', assembleContent())
})

function assembleContent () {
  const content = { common, home, about }
  return Object.assign(content, createNavs(content))
}

function createNavs (content) {
  return {navs: Object.keys(content).slice(1).map(n => n[0].toUpperCase() + n.slice(1))}
}

module.exports = router
