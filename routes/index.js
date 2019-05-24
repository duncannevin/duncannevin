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

class Project {
  constructor (name, location, description) {
    this.name = name
    this.location = location
    this.description = description
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
    He is a proven leader, dedicated, creative under pressure and a highly skilled full stack developer with a multitude 
    of experience building robust, fault tolerant systems. 
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
    `),
    new Testimonial('Grant BlahaErath, Technical Architect SAP Concur', `
      I have greatly enjoyed working with Duncan over the last couple years. 

      Duncan learns new technologies, software languages and software approaches far faster than most of the engineers I worked with, and loves doing it at the same time. Duncan is also a great communicator and very easy to work with. Duncan also doesn’t shy away from difficult tasks, and is willing to go forward into unknown areas and find solutions. Finally, Duncan is a triple-thread engineer that is comfortable in the three styles of coding: Imperative, Declarative and Actor (asynchronous messaging), while most other engineers are only able to master the imperative approach.

      These things cause me to believe Duncan is one of the rare new engineers that not only show the potential to become a great software engineers, but also become a great software architect. I’m looking forward to seeing where Duncan will go in the future.
    `),
    new Testimonial('Grant BlahaErath, Technical Architect SAP Concur', `
      It's really useful.  While there are tons of great tools to mock REST calls, this is the only tool that makes it 
      easy to mock websocket connections. <br> (Regarding <a class="md-md-font underline" href="http://websocketclient.com" target="_blank">websocketclient.com</a>)
    `)
  ]
}, new Header('Testimonials', ''))

const projects = Object.assign({list: [
  new Project('Websocket Client', 'http://websocketclient.com', 'A browser based websocket client. Your state is saved automatically in real time.'),
  new Project('Loris Editor', 'http://loris-edit.herokuapp.com/', 'A coding collaboration tool. Just share the url with anyone you want to write code with.'),
  new Project('You\'ve Got Bitcoin', 'https://github.com/duncannevin/youvegotbitcoin', 'Send Bitcoin securely to anyone via email. This project is still in development, feel free to contribute!'),
  new Project('Secret Messenger', 'https://github.com/duncannevin/secretmessenger', 'This app was built to demonstrate the ability to share a single flow between many clients. The long term plan for this app is yet to be decided, but it could potentially be used for setting up chat rooms that the server is unaware of.'),
  new Project('Akka Http Quickstart', 'https://github.com/duncannevin/akkahttp-quickstart', 'Akka HTTP seed.'),
  new Project('Conways Game of Life', 'https://github.com/duncannevin/conways-game-of-life', 'This is a great example of a perfect use case of Akka Actors. I eventually want to improve this by adding authentication so that your game can run in the server even if you leave the site.')
]}, new Header('Projects', ''))

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
  const content = { common, home, about, testimonials, projects, contact }
  return Object.assign(content, createNavs(content))
}

function createNavs (content) {
  return {navs: Object.keys(content).slice(1).map(n => n[0].toUpperCase() + n.slice(1))}
}

module.exports = router
