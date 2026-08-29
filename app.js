const doctors = {
  Dermatology: [
    { name: 'Dr. Anika Mehra', experience: '9 years experience', location: 'Arera Colony, Bhopal', schedule: 'Mon–Sat · 10:00 AM–1:00 PM', appointment: 'Clinic booking' },
    { name: 'Dr. Riya Shah', experience: '7 years experience', location: 'MP Nagar, Bhopal', schedule: 'Tue–Sun · 4:00 PM–7:00 PM', appointment: 'Phone booking' },
  ],
  Cardiology: [{ name: 'Dr. Rohan Iyer', experience: '15 years experience', location: 'Shahpura, Bhopal', schedule: 'Mon & Fri · 9:00 AM–11:00 AM', appointment: 'Hospital booking' }],
  'General Medicine': [{ name: 'Dr. Minal Desai', experience: '11 years experience', location: 'Kolar Road, Bhopal', schedule: 'Mon–Sat · 11:00 AM–2:00 PM', appointment: 'Clinic booking' }],
}

const results = document.querySelector('#results')
const speciality = document.querySelector('#speciality')
const helperText = document.querySelector('#helperText')
const profileDialog = document.querySelector('#profileDialog')
const guidanceDialog = document.querySelector('#guidanceDialog')

function renderResults() {
  const selected = speciality.value
  const profiles = doctors[selected]
  helperText.textContent = `${profiles.length} ${selected.toLowerCase()} profile${profiles.length > 1 ? 's' : ''} in Bhopal`
  results.innerHTML = profiles.map((doctor, index) => `<article class="doctor-card"><p class="tag">${selected.toUpperCase()}</p><h3>${doctor.name}</h3><p>${doctor.experience}</p><p>⌖ ${doctor.location}</p><button class="profile-button" type="button" data-profile="${selected}:${index}">View profile →</button></article>`).join('')
}

document.querySelector('#searchForm').addEventListener('submit', (event) => { event.preventDefault(); renderResults() })
results.addEventListener('click', (event) => {
  const button = event.target.closest('[data-profile]')
  if (!button) return
  const [selected, index] = button.dataset.profile.split(':')
  const doctor = doctors[selected][index]
  document.querySelector('#profileContent').innerHTML = `<p class="eyebrow">${selected.toUpperCase()} • BHOPAL</p><h2>${doctor.name}</h2><p>${doctor.experience} · Profile information shown for prototype demonstration.</p><div class="detail-list"><p><strong>Practice</strong>${doctor.location}</p><p><strong>Schedule</strong>${doctor.schedule}</p><p><strong>Appointment</strong>${doctor.appointment}</p></div>`
  profileDialog.showModal()
})
document.querySelector('#guidanceButton').addEventListener('click', () => guidanceDialog.showModal())
document.querySelector('#closeDialog').addEventListener('click', () => profileDialog.close())
document.querySelector('#closeGuidance').addEventListener('click', () => guidanceDialog.close())
document.querySelector('#chooseDermatology').addEventListener('click', () => { speciality.value = 'Dermatology'; guidanceDialog.close(); renderResults(); document.querySelector('#discover').scrollIntoView({ behavior: 'smooth' }) })

// ponytail: fixed in-memory demo data; replace with an API only when persistence is needed.
console.assert(Object.keys(doctors).length === 3, 'Prototype doctor data is missing.')
