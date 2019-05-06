let headBackground

document.addEventListener('DOMContentLoaded', function (event) {
  applyPaddingToSections()
  updateActiveNav()
  startHomeAnimation()
  applyNavs()
  sectionVisibility()
  handleResize()
  fillProgress()
  applyContactEvent()
  showNavbar()
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
  if (windowOT >= aboutOT - (aboutOT / 2)) {
    $navbar.style.top = 0
  } else {
    $navbar.style.top = -(Number($navbar.offsetHeight)).toString() + 'px'
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
    if (windowOT >= section.offsetTop - (section.offsetHeight * 0.2)) return section
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
 * ensures all content is included in each section
 */
function applyPaddingToSections () {
  const $navbar = document.querySelector('.navbar')
  const navbarHeight = $navbar.offsetHeight
  document.getElementById('App').style.paddingBottom = navbarHeight * 2 + 'px'
  document.querySelectorAll('.section').forEach(function (section) {
    section.style.paddingTop = navbarHeight + 'px'
  })
}

/**
 * window resize handler
 */
function handleResize () {
  window.addEventListener('resize', function () {
    headBackground.stopAnimation()
    startHomeAnimation()
    applyPaddingToSections()
  })
}

function fillProgress () {
  const progressBars = document.querySelectorAll('.progress')
  progressBars.forEach(function (progress) {
    const rating = progress.getAttribute('data-per')
    const name = progress.getAttribute('data-name')
    const bar = document.createElement('span')
    bar.classList.add('bar')
    bar.style.width = progress.offsetWidth * Number('0.' + rating.toString()) + 'px'
    bar.append(name)
    progress.append(bar)
  })
}

const spinnerTemplate = `
  <svg version="1.1" baseProfile="tiny" id="Layer_1_copy"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="28px" height="28px"
    viewBox="0 0 28 28" overflow="auto" xml:space="preserve" class="loader">
  <path fill="#F2F2F2" class="trail" d="M20.827,7.024c-2.512-2.512-6.207-3.507-9.646-2.599l0.442,1.668c2.844-0.751,5.904,0.073,7.982,2.152
   c3.231,3.23,3.231,8.487,0.001,11.718c-3.231,3.23-8.487,3.303-11.718,0.073c-1.426-1.427-2.27-3.225-2.404-5.225H3.755
   c0.137,2,1.162,4.694,2.913,6.444c1.951,1.951,4.515,2.891,7.079,2.891s5.128-0.993,7.08-2.944
   C24.731,17.299,24.731,10.929,20.827,7.024z"/>
  <g class="plane">
   <polygon fill="#DDDDDD" points="5.253,7.828 3.692,15.821 5.253,18.461 6.812,15.821 \t"/>
   <g>
    <path fill="#EEEEEE" d="M5.253,7.966c0,0-5.056,8.846-5,8.846c0.055,0,3.935,0,3.935,0L5.253,7.966z"/>
    <path fill="#EEEEEE" d="M5.253,7.968c0,0,5.056,8.845,5,8.845s-3.936,0-3.936,0L5.253,7.968z"/>
   </g>
  </g>
  </svg>
`

function loadSentSpinner () {
  const $form = document.getElementById('contact-form')
  const $spinner = document.createElement('div')
  const inputs = $form.elements
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].readOnly = true
    inputs[i].style.opacity = '0.5'
  }
  $spinner.classList.add('sent-spinner')
  $spinner.innerHTML = spinnerTemplate
  $form.appendChild($spinner)
}

function showSuccess () {
  const $form = document.getElementById('contact-form')
  const success = document.createElement('div')
  success.classList.add('row')
  success.innerHTML = '<p class="md-font green-font">Got it, Thank you!</p>'
  $form.removeChild(document.querySelector('.sent-spinner'))
  const inputs = $form.elements
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].style.display = 'none'
  }
  $form.appendChild(success)
}

function showFailed () {
  const $form = document.getElementById('contact-form')
  const failed = document.createElement('div')
  failed.classList.add('row')
  failed.innerHTML = '<p class="md-font pink-font">Uh oh, try <a class="md-font green-font underline" href="https://www.linkedin.com/in/duncan-nevin-975093a3/" target="_blank">LinkedIn</a> instead.</p>'
  $form.removeChild(document.querySelector('.sent-spinner'))
  const inputs = $form.elements
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].style.display = 'none'
  }
  $form.appendChild(failed)
}

function handleErrors (response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

function sendEmail (evt) {
  evt.preventDefault()
  const $form = this
  const request = {
    from_email: $form.elements.namedItem('from_email').value,
    subject: $form.elements.namedItem('subject').value,
    message: $form.elements.namedItem('message').value
  }
  loadSentSpinner()
  fetch('/email/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then(() => {
      showSuccess()
    })
    .catch(() => {
      showFailed()
    })
}

function applyContactEvent () {
  const $contactForm = document.getElementById('contact-form')
  $contactForm.addEventListener('submit', sendEmail)
}
