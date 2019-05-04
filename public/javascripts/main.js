document.addEventListener('DOMContentLoaded', function (event) {
  // animated backgrounds
  const headBackground = new AnimatedBackground('Head')
  headBackground.events()

  // handles section navigation
  // to use apply class 'nav-btn' and data attr 'data-nav-ref="<ID>"'
  const navs = document.querySelectorAll('.nav-btn')
  navs.forEach(function (ele) {
    ele.addEventListener('click', function (btn) {
      const ref = this.getAttribute('data-nav-ref')
      console.log(ref)
      document.getElementById(ref).scrollIntoView({
        behavior: 'smooth'
      })
    })
  })
})
