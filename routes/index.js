const express = require('express')
const router = express.Router()
const HandleBars = require('hbs')

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
    new TechnicalSkill('Scala', 80),
    new TechnicalSkill('Javascript', 80),
    new TechnicalSkill('CSS', 80),
    new TechnicalSkill('Sass', 70),
    new TechnicalSkill('HTML', 90),
    new TechnicalSkill('VueJS', 80),
    new TechnicalSkill('JQuery', 80),
    new TechnicalSkill('Play!', 80),
    new TechnicalSkill('Akka', 65),
    new TechnicalSkill('NodeJS', 80),
    new TechnicalSkill('ExpressJS', 80),
    new TechnicalSkill('MongoDB', 60),
    new TechnicalSkill('MySql', 55),
    new TechnicalSkill('Git', 95),
    new TechnicalSkill('GitHub', 95),
    new TechnicalSkill('Vim', 65),
    new TechnicalSkill('Linux', 75),
    new TechnicalSkill('TypeScript', 75)
  ],
  about: `
    Hello, meet Duncan. He is a creative individual with a massive amount of technical knowledge. You will find his ability
    to understand and use the best technology an asset to your organization.
  `
}, new Header('About', ''))

const testimonials = Object.assign({
  list: [
    new Testimonial('Jack Couch, CEO DeepIntel Solutions LLC', `
        Duncan is a pleasure to work with. He is extremely motivated, hardworking and productive.
      He writes more usable code per day than any developer with his years of experience ever hired by DeepIntel.
      He is not afraid to tackle the most difficult problem available and stick with it until he has a design
      that solves the problem well, usually elegantly. I have no doubt that he will be an asset to any company
      lucky enough to work with him.
    `)
  ]
}, new Header('Testimonials', ''))

const projects = Object.assign({}, new Header('Projects', ''))

const contact = Object.assign({}, new Header('Contact', ''))

HandleBars.registerHelper('splitEvenly', function (array) {
  const mid = Math.abs(Math.ceil(array.length / 2))
  return [array.slice(0, mid), array.slice(mid)]
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', assembleContent())
})

function assembleContent () {
  const content = { common, home, about, projects, testimonials, contact }
  return Object.assign(content, createNavs(content))
}

function createNavs (content) {
  return {navs: Object.keys(content).slice(1).map(n => n[0].toUpperCase() + n.slice(1))}
}

module.exports = router
