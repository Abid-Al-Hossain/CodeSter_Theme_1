import './style.css'
import './customizer.js'

function showDemoToast(message) {
  let toast = document.getElementById('chr-demo-toast')
  if (!toast) {
    toast = document.createElement('div')
    toast.id = 'chr-demo-toast'
    toast.className = 'chr-demo-toast'
    toast.setAttribute('role', 'status')
    toast.setAttribute('aria-live', 'polite')
    document.body.appendChild(toast)
  }

  toast.textContent = message
  toast.classList.add('visible')

  window.clearTimeout(showDemoToast.timeoutId)
  showDemoToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove('visible')
  }, 2200)
}

function initDemoActions() {
  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      showDemoToast(link.dataset.demoMessage || 'Demo action only')
    })
  })

  document.querySelectorAll('form:not([action]), form[action=""], form[action="#"]').forEach((form) => {
    form.setAttribute('data-demo-form', 'true')
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      showDemoToast(form.dataset.demoMessage || 'Demo form submitted')
    })
  })
}

function initCurrentDate() {
  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  document.querySelectorAll('[data-current-date]').forEach((node) => {
    node.textContent = formatter.format(new Date())
  })
}

function initCountdowns() {
  document.querySelectorAll('[data-countdown]').forEach((countdown) => {
    const offsetDays = Number(countdown.dataset.launchOffsetDays || '120')
    const targetTime = Date.now() + (offsetDays * 24 * 60 * 60 * 1000)
    const daysNode = countdown.querySelector('[data-countdown-days]')
    const hoursNode = countdown.querySelector('[data-countdown-hours]')
    const minsNode = countdown.querySelector('[data-countdown-mins]')
    const secsNode = countdown.querySelector('[data-countdown-secs]')

    const tick = () => {
      const diff = Math.max(0, targetTime - Date.now())
      const days = Math.floor(diff / 86400000)
      const hours = Math.floor((diff % 86400000) / 3600000)
      const mins = Math.floor((diff % 3600000) / 60000)
      const secs = Math.floor((diff % 60000) / 1000)

      if (daysNode) daysNode.textContent = String(days).padStart(2, '0')
      if (hoursNode) hoursNode.textContent = String(hours).padStart(2, '0')
      if (minsNode) minsNode.textContent = String(mins).padStart(2, '0')
      if (secsNode) secsNode.textContent = String(secs).padStart(2, '0')
    }

    tick()
    window.setInterval(tick, 1000)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initDemoActions()
  initCurrentDate()
  initCountdowns()
})
