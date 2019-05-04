function randomColor (alpha) {
  const colors = ['40, 192, 198', '247, 55, 120']
  return colors[Math.round((Math.random() * (1 - 2) + 1))]
}

function applyAlpha (color, alpha) {
  return 'rgba(' + color + ',' + alpha + ')'
}

function Ball (type = 'random', canvasWidth, canvasHeight) {
  this.x = 0
  this.y = 0
  this.vx = 0
  this.vy = 0
  this.r = 0
  this.alpha = 1
  this.phase = 0
  this.color = [207, 255, 4]
  this.R = 2
  this.type = type
  this.color = randomColor()

  const min = -1
  const max = 1

  if (type === 'random') {
    const pos = randomArrayItem(['top', 'right', 'bottom', 'left'])

    if (pos === 'top') {
      this.x = randomSidePos(canvasWidth)
      this.y = -this.R
      this.vx = getRandomSpeed('top')[0]
      this.vy = getRandomSpeed('top')[1]
      this.r = this.R
      this.alpha = 1
      this.phase = randomNumFrom(0, 10)
    } else if (pos === 'right') {
      this.x = canvasWidth + this.R
      this.y = randomSidePos(canvasHeight)
      this.vx = getRandomSpeed('right')[0]
      this.vy = getRandomSpeed('right')[1]
      this.r = this.R
      this.alpha = 1
      this.phase = randomNumFrom(0, 10)
    } else if (pos === 'bottom') {
      this.x = randomSidePos(canvasWidth)
      this.y = canvasHeight + this.R
      this.vx = getRandomSpeed('bottom')[0]
      this.vy = getRandomSpeed('bottom')[1]
      this.r = this.R
      this.alpha = 1
      this.phase = randomNumFrom(0, 10)
    } else if (pos === 'left') {
      this.x = -this.R
      this.y = randomSidePos(canvasHeight)
      this.vx = getRandomSpeed('left')[0]
      this.vy = getRandomSpeed('left')[1]
      this.r = this.R
      this.alpha = 1
      this.phase = randomNumFrom(0, 10)
    } else {
      console.log(pos + ' is not a valid position')
    }
  }

  function randomArrayItem (arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  function randomNumFrom (min, max) {
    return Math.random() * (max - min) + min
  }

  function randomSidePos (length) {
    return Math.ceil(Math.random() * length)
  }

  function getRandomSpeed (pos) {
    if (pos === 'top') {
      return [randomNumFrom(min, max), randomNumFrom(0.1, max)]
    } else if (pos === 'right') {
      return [randomNumFrom(min, -0.1), randomNumFrom(min, max)]
    } else if (pos === 'bottom') {
      return [randomNumFrom(min, max), randomNumFrom(min, -0.1)]
    } else if (pos === 'left') {
      return [randomNumFrom(0.1, max), randomNumFrom(min, max)]
    } else {
      console.log(pos + ' is not a valid position')
      return [0, 0]
    }
  }

  return this
}

function Balls (canvasHeight, canvasWidth, ctx) {
  this.list = []
  this.alphaF = 0.03

  this.renderBalls = () => {
    this.list.forEach((ball) => {
      if (ball.type === 'random') {
        ctx.fillStyle = applyAlpha(ball.color, 0)
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.R, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.fill()
      }
    })
  }

  this.updateBalls = () => {
    this.list.forEach((ball, index) => {
      ball.x += ball.vx
      ball.y += ball.vy

      if (ball.type === 'mouse' || (ball.x > -(50) && ball.x < (canvasWidth + 50) && ball.y > -(50) && ball.y < (canvasHeight + 50))) {
        this.list[index] = ball
      } else {
        this.list.splice(index, 1)
      }

      // alpha change
      ball.phase += this.alphaF
      ball.alpha = Math.abs(Math.cos(ball.phase))
    })
  }

  // add balls if there a little balls
  this.addBallIfy = () => {
    if (this.list.length < 70) {
      this.list.push(new Ball('random', canvasWidth, canvasHeight))
    }
  }

  this.addBallToPosition = (x, y) => {
    const ball = new Ball('random', canvasWidth, canvasHeight)
    ball.x = x
    ball.y = y
    this.list.push(ball)
  }

  return this
}

function Lines (balls, ctx) {
  const linkLineWidth = 0.8
  const lengthLimit = 250

  // calculate distance between two points
  function distanceBetweenBalls (b1, b2) {
    const deltaX = Math.abs(b1.x - b2.x)
    const deltaY = Math.abs(b1.y - b2.y)

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  }

  this.renderLines = () => {
    let fraction, alpha

    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        fraction = distanceBetweenBalls(balls[i], balls[j]) / lengthLimit

        if (fraction < 1) {
          alpha = (1 - fraction).toString()
          ctx.strokeStyle = applyAlpha(balls[j].color, alpha)
          ctx.lineWidth = linkLineWidth
          ctx.beginPath()
          ctx.moveTo(balls[i].x, balls[i].y)
          ctx.lineTo(balls[j].x, balls[j].y)
          ctx.stroke()
          ctx.closePath()
        }
      }
    }
  }

  return this
}

class AnimatedBackground {
  constructor (id) {
    this.$ele = document.getElementById(id)
    this.createCanvas = this.createCanvas.bind(this)
    this.height = this.$ele.offsetHeight
    this.width = this.$ele.offsetWidth

    this.render = this.render.bind(this)

    this.createCanvas()
  }

  createCanvas () {
    this.canvas = document.createElement('canvas')
    this.canvas.classList.add('animated-background')
    this.canvas.setAttribute('height', this.height)
    this.canvas.setAttribute('width', this.width)
    this.ctx = this.canvas.getContext('2d')
    this.balls = new Balls(this.height, this.width, this.ctx)
    this.lines = new Lines(this.balls.list, this.ctx)
    this.$ele.appendChild(this.canvas)
    this.goMovie()
  }

  events () {
    this.$ele.addEventListener('mouseenter', () => {
      if (!this.balls.list.find(ball => ball.type === 'mouse')) {
        this.balls.list.push(new Ball('mouse', this.width, this.height))
      }
    })
    this.$ele.addEventListener('mousemove', (evt) => {
      const mBall = this.balls.list.find(ball => ball.type === 'mouse') || {x: 0, y: 0}
      mBall.x = evt.pageX
      mBall.y = evt.pageY
    })
    this.$ele.addEventListener('click', (evt) => {
      this.balls.addBallToPosition(evt.offsetX, evt.offsetY)
    })
  }

  render () {
    const dis = this
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.balls.updateBalls()
    this.balls.addBallIfy()
    this.balls.renderBalls()
    this.lines.renderLines()
    window.requestAnimationFrame(dis.render)
  }

  goMovie () {
    const dis = this
    this.balls.addBallIfy()
    window.requestAnimationFrame(dis.render)
  }
}
