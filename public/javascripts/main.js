let headBackground

document.addEventListener('DOMContentLoaded', function (event) {
  showNavbar()
  updateActiveNav()
  startHomeAnimation()
  applyNavs()
  sectionVisibility()
  handleResize()
})

/**
 * utility for filtering dom element arrays
 */
function filterElements (elements, cb) {
  return Array.prototype.filter.call(elements, cb)
}

/**
 * starts home section animation
 */
function startHomeAnimation () {
  headBackground = new AnimatedBackground('Home')
  headBackground.events()
}

/**
 * shows/hides navbar if below/above about section
 */
function showNavbar () {
  const $navbar = document.querySelector('.navbar')
  const $About = document.getElementById('About')
  const windowOT = window.scrollY
  const aboutOT = $About.offsetTop
  if (windowOT >= aboutOT) {
    $navbar.style.top = 0
  } else {
    $navbar.style.top = -(Number($navbar.offsetHeight) - 3).toString() + 'px'
  }
}

/**
 * track which section is visible
 */
function sectionVisibility () {
  window.addEventListener('scroll', function () {
    showNavbar()
    updateActiveNav()
  })
}

/**
 * updates active navbar nav based on scroll position of the window
 */
function updateActiveNav () {
  const sections = document.querySelectorAll('.section')
  const windowOT = window.scrollY
  const showingId = filterElements(sections, function (section) {
    if (windowOT >= section.offsetTop) return section
  }).pop().id
  document.querySelectorAll('.nav').forEach(function (ele) {
    if (showingId === ele.getAttribute('data-nav-ref')) {
      ele.classList.add('active')
    } else {
      ele.classList.remove('active')
    }
  })
}

/**
 * displays section
 * @param id
 */
function displaySection () {
  const ref = this.getAttribute('data-nav-ref')
  if (ref) {
    document.getElementById(ref).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

/**
 * handles section navigation
 * to use apply class 'nav-btn' and data attr 'data-nav-ref="<ID>"'
 */
function applyNavs () {
  const navs = document.querySelectorAll('.nav')
  navs.forEach(function (ele) {
    ele.addEventListener('click', displaySection)
  })
}

/**
 * window resize handler
 */
function handleResize () {
  window.addEventListener('resize', function () {
    headBackground.stopAnimation()
    startHomeAnimation()
  })
}
