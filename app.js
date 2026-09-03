const doctors = [
  { name:'Dr. Anika Mehra', speciality:'Dermatology', city:'Bhopal, Madhya Pradesh', experience:'9 years experience', clinic:'Arera Colony, Bhopal', schedule:'Mon–Sat · 10:00 AM–1:00 PM', checked:'Checked 26 Aug 2026' },
  { name:'Dr. Rohan Iyer', speciality:'Cardiology', city:'Bhopal, Madhya Pradesh', experience:'15 years experience', clinic:'Shahpura, Bhopal', schedule:'Mon & Fri · 9:00 AM–11:00 AM', checked:'Checked 24 Aug 2026' },
  { name:'Dr. Kavya Sharma', speciality:'General Medicine', city:'Bhopal, Madhya Pradesh', experience:'11 years experience', clinic:'Kolar Road, Bhopal', schedule:'Mon–Sat · 11:00 AM–2:00 PM', checked:'Details updated 20 Aug 2026' },
  { name:'Dr. Nisha Verma', speciality:'Cardiology', city:'Indore, Madhya Pradesh', experience:'12 years experience', clinic:'Sapna Sangeeta Road, Indore', schedule:'Tue–Sat · 3:00 PM–6:00 PM', checked:'Checked 25 Aug 2026' },
  { name:'Dr. Arjun Kulkarni', speciality:'Orthopedics', city:'Pune, Maharashtra', experience:'14 years experience', clinic:'Karve Road, Pune', schedule:'Mon–Sat · 5:00 PM–8:00 PM', checked:'Checked 23 Aug 2026' },
  { name:'Dr. Meera Joshi', speciality:'Dermatology', city:'Pune, Maharashtra', experience:'8 years experience', clinic:'Baner Road, Pune', schedule:'Tue–Sun · 10:00 AM–2:00 PM', checked:'Details updated 18 Aug 2026' },
]

const city = document.querySelector('#city')
const speciality = document.querySelector('#speciality')
const results = document.querySelector('#results')
const helperText = document.querySelector('#helperText')
const dialog = document.querySelector('#profileDialog')
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const scrollTo = (target) => target.scrollIntoView()
const aiMatches = [
  { pattern:/skin|rash|itch|acne/i, speciality:'Dermatology', city:'Bhopal, Madhya Pradesh', message:'Dermatology is a useful category to explore for this concern.' },
  { pattern:/chest|heart|palpitation/i, speciality:'Cardiology', city:'Bhopal, Madhya Pradesh', message:'Cardiology is a useful category to explore for this concern.' },
  { pattern:/joint|bone|knee|back|fracture/i, speciality:'Orthopedics', city:'Pune, Maharashtra', message:'Orthopedics is a useful category to explore for bone, joint, or movement concerns.' },
]

function renderResults() {
  const matches = doctors.filter((doctor) => doctor.city === city.value && doctor.speciality === speciality.value)
  helperText.textContent = matches.length ? `${matches.length} ${speciality.value.toLowerCase()} profile${matches.length > 1 ? 's' : ''} in ${city.value.split(',')[0]}` : `No ${speciality.value.toLowerCase()} profiles are available in this city yet.`
  results.innerHTML = matches.map((doctor) => `<article class="doctor-card"><small>${doctor.speciality.toUpperCase()} · ${doctor.checked.toUpperCase()}</small><h3>${doctor.name}</h3><p>${doctor.experience}</p><p>${doctor.clinic}</p><button type="button" data-profile="${doctors.indexOf(doctor)}">View profile <span>→</span></button></article>`).join('')
}

function openProfile(doctor) {
  document.querySelector('#profileContent').innerHTML = `<p class="eyebrow">${doctor.speciality.toUpperCase()} · ${doctor.city.toUpperCase()}</p><h2>${doctor.name}</h2><p>${doctor.experience}</p><hr><p><b>Practice location</b><br>${doctor.clinic}</p><p><b>Consultation schedule</b><br>${doctor.schedule}</p><p><b>Profile status</b><br>${doctor.checked}</p>`
  dialog.showModal()
}

function guideFor(text) { return aiMatches.find(({ pattern }) => pattern.test(text)) || { speciality:'General Medicine', city:'Bhopal, Madhya Pradesh', message:'General Medicine is a useful starting category for a non-urgent concern.' } }

document.querySelector('#searchForm').addEventListener('submit', (event) => { event.preventDefault(); renderResults() })
results.addEventListener('click', (event) => { const button = event.target.closest('[data-profile]'); if (button) openProfile(doctors[button.dataset.profile]) })
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close())
document.querySelector('#aiGuide').addEventListener('submit', (event) => {
  event.preventDefault()
  const suggestion = guideFor(document.querySelector('#aiConcern').value)
  document.querySelector('#aiResult').innerHTML = `<strong>Suggested category: ${suggestion.speciality}</strong><p>${suggestion.message}</p><button type="button" data-guided-city="${suggestion.city}" data-guided-speciality="${suggestion.speciality}">Explore ${suggestion.speciality} →</button>`
})
document.querySelector('#aiResult').addEventListener('click', (event) => {
  const button = event.target.closest('[data-guided-speciality]')
  if (!button) return
  city.value = button.dataset.guidedCity
  speciality.value = button.dataset.guidedSpeciality
  renderResults()
  scrollTo(document.querySelector('#discover'))
})
document.querySelector('#ctaForm').addEventListener('submit', (event) => { event.preventDefault(); document.querySelector('#ctaMessage').textContent = 'Thank you. We’ll keep you posted.'; event.currentTarget.reset() })
document.querySelector('.menu-toggle').addEventListener('click', (event) => { const open = event.currentTarget.getAttribute('aria-expanded') === 'true'; event.currentTarget.setAttribute('aria-expanded', String(!open)); document.querySelector('#site-nav').classList.toggle('open', !open) })
document.querySelectorAll('[data-scroll]').forEach((button) => button.addEventListener('click', () => scrollTo(document.querySelector(button.dataset.scroll))))
document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener('click', (event) => {
  const target = document.querySelector(link.getAttribute('href'))
  if (!target) return
  event.preventDefault()
  scrollTo(target)
}))
document.querySelectorAll('#site-nav a').forEach((link) => link.addEventListener('click', () => { document.querySelector('#site-nav').classList.remove('open'); document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false') }))

if (!reduceMotion) {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) } }), { threshold:.16 })
  document.querySelectorAll('.reveal').forEach((section) => observer.observe(section))
  const concerns = ['I have an itchy skin rash...', 'My knee hurts after a fall...', 'I have been feeling chest discomfort...']
  const specialities = ['Dermatology', 'Orthopedics', 'Cardiology']
  let index = 0
  setInterval(() => { index = (index + 1) % concerns.length; document.querySelector('#typedConcern').textContent = concerns[index]; document.querySelector('#rotatingSpeciality').textContent = specialities[index] }, 3600)
}

// ponytail: keyword matching only demonstrates the guide; add a backend model only when saved or clinical-grade guidance is required.
console.assert(doctors.length === 6 && aiMatches.length === 3, 'Demo data is incomplete.')
