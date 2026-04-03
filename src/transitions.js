// transitions.js — Scroll-reveal & page entrance animations

/**
 * Initialize IntersectionObserver-based scroll reveal.
 * Elements with [data-reveal] or [data-reveal-group] will animate
 * in when they enter the viewport. Fires ONCE per element.
 */
export function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal], [data-reveal-group]')
  if (!els.length) return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target) // fire only once
      }
    })
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  })

  els.forEach(el => observer.observe(el))
}

/**
 * Animate elements already in viewport on load (above the fold).
 */
export function revealAboveFold() {
  const els = document.querySelectorAll('[data-reveal], [data-reveal-group]')
  const vp = window.innerHeight

  els.forEach(el => {
    const rect = el.getBoundingClientRect()
    if (rect.top < vp - 60) {
      el.classList.add('visible')
    }
  })
}

/**
 * Stagger-reveal a list of elements manually (e.g. after era switch)
 */
export function staggerReveal(selector, baseDelay = 0, step = 80) {
  const els = document.querySelectorAll(selector)
  els.forEach((el, i) => {
    el.style.transitionDelay = `${baseDelay + i * step}ms`
    el.classList.add('visible')
  })
}

/**
 * Number counter animation for stat sections.
 * Usage: <span data-count="10000" data-suffix="+">0</span>
 */
export function initCounters() {
  const counters = document.querySelectorAll('[data-count]')
  if (!counters.length) return

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      const el = entry.target
      const target = +el.dataset.count
      const suffix = el.dataset.suffix || ''
      const prefix = el.dataset.prefix || ''
      const duration = 2000
      const start = performance.now()

      function update(now) {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        // Ease-out
        const eased = 1 - Math.pow(1 - progress, 3)
        const value = Math.floor(eased * target)
        el.textContent = prefix + value.toLocaleString() + suffix
        if (progress < 1) requestAnimationFrame(update)
      }

      requestAnimationFrame(update)
      obs.unobserve(el)
    })
  }, { threshold: 0.5 })

  counters.forEach(el => obs.observe(el))
}

/**
 * Smooth active nav link highlighting based on scroll position.
 */
export function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]')
  const links = Array.from(document.querySelectorAll(
    'header nav a[href^="#"], nav[role="navigation"] a[href^="#"], aside a[href^="#"]'
  )).filter((link) => {
    const href = link.getAttribute('href') || ''
    return href.startsWith('#') && href !== '#main-content' && href !== '#' && document.querySelector(href)
  })
  if (!sections.length || !links.length) return

  const ratios = new Map()
  const sectionList = Array.from(sections)

  function setActive(activeId) {
    links.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${activeId}`
      link.classList.toggle('active', isActive)
      if (isActive) {
        link.setAttribute('aria-current', 'location')
      } else {
        link.removeAttribute('aria-current')
      }

      if (link.closest('.chr-nav-links')) {
        link.style.color = isActive ? 'var(--color-primary)' : ''
      }
    })
  }

  function pickFallbackSection() {
    const activationLine = window.innerHeight * 0.35
    let fallbackId = sectionList[0].id

    sectionList.forEach((section) => {
      if (section.getBoundingClientRect().top <= activationLine) {
        fallbackId = section.id
      }
    })

    return fallbackId
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
    })

    let bestId = null
    let bestRatio = 0

    sectionList.forEach((section) => {
      const ratio = ratios.get(section.id) || 0
      if (ratio > bestRatio) {
        bestRatio = ratio
        bestId = section.id
      }
    })

    setActive(bestId || pickFallbackSection())
  }, {
    threshold: [0, 0.15, 0.35, 0.55, 0.75],
    rootMargin: '-15% 0px -35% 0px',
  })

  sectionList.forEach((section) => {
    ratios.set(section.id, 0)
    obs.observe(section)
  })

  setActive(pickFallbackSection())
}

/**
 * FAQ accordion with keyboard support.
 */
export function initFAQ() {
  const items = document.querySelectorAll('.chr-faq-trigger')

  items.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true'
      // Close all
      items.forEach(t => {
        t.setAttribute('aria-expanded', 'false')
        t.nextElementSibling?.classList.remove('open')
      })
      // Open current if was closed
      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true')
        trigger.nextElementSibling?.classList.add('open')
      }
    })

    // Keyboard support
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        trigger.click()
      }
      if (e.key === 'Escape') {
        trigger.setAttribute('aria-expanded', 'false')
        trigger.nextElementSibling?.classList.remove('open')
      }
    })
  })
}

/**
 * Mobile nav toggle
 */
export function initMobileNav() {
  const toggle = document.querySelector('.chr-nav-toggle')
  const links = document.querySelector('.chr-nav-links')
  if (!toggle || !links) return

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open')
    toggle.setAttribute('aria-expanded', isOpen.toString())
    toggle.querySelectorAll('span').forEach((s, i) => {
      if (isOpen) {
        if (i === 0) s.style.transform = 'rotate(45deg) translate(5px, 5px)'
        if (i === 1) s.style.opacity = '0'
        if (i === 2) s.style.transform = 'rotate(-45deg) translate(5px, -5px)'
      } else {
        s.style.transform = ''
        s.style.opacity = ''
      }
    })
  })

  // Close nav when a link is clicked
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open')
      toggle.setAttribute('aria-expanded', 'false')
    })
  })
}
