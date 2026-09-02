const doctors = [
  { name: 'Dr. Anika Mehra', speciality: 'Dermatology', city: 'Bhopal, Madhya Pradesh', experience: '9 years experience', qualification: 'MBBS, MD Dermatology', clinic: '12, 74 Bungalows, Arera Colony, Bhopal, Madhya Pradesh 462003', hospital: 'Lakeview Multispeciality Hospital, 45 Link Road, Bhopal 462016', clinicSchedule: 'Mon–Sat · 10:00 AM–1:00 PM', hospitalSchedule: 'Wednesday · 4:00 PM–6:00 PM', appointment: 'Clinic booking, Phone booking', verification: 'Verified · last checked 26 Aug 2026' },
  { name: 'Dr. Rohan Iyer', speciality: 'Cardiology', city: 'Bhopal, Madhya Pradesh', experience: '15 years experience', qualification: 'MBBS, MD Medicine, DM Cardiology', clinic: '18, E-7, Arera Colony, Bhopal, Madhya Pradesh 462016', hospital: 'Bhopal Heart Centre, Shahpura, Bhopal 462016', clinicSchedule: 'Tue & Thu · 5:00 PM–7:00 PM', hospitalSchedule: 'Mon & Fri · 9:00 AM–11:00 AM', appointment: 'Hospital booking, Phone booking', verification: 'Verified · last checked 24 Aug 2026' },
  { name: 'Dr. Kavya Sharma', speciality: 'General Medicine', city: 'Bhopal, Madhya Pradesh', experience: '11 years experience', qualification: 'MBBS, MD General Medicine', clinic: '9, Kolar Road, Chuna Bhatti, Bhopal, Madhya Pradesh 462016', hospital: 'No hospital affiliation listed', clinicSchedule: 'Mon–Sat · 11:00 AM–2:00 PM', hospitalSchedule: 'Not listed', appointment: 'Clinic booking', verification: 'Needs review · last checked 20 Aug 2026' },
  { name: 'Dr. Nisha Verma', speciality: 'Cardiology', city: 'Indore, Madhya Pradesh', experience: '12 years experience', qualification: 'MBBS, MD Medicine, DNB Cardiology', clinic: '301, Sapna Sangeeta Road, Indore, Madhya Pradesh 452001', hospital: 'Vijay Nagar Heart Hospital, Indore 452010', clinicSchedule: 'Tue–Sat · 3:00 PM–6:00 PM', hospitalSchedule: 'Monday · 10:00 AM–12:00 PM', appointment: 'Hospital booking, Phone booking', verification: 'Verified · last checked 25 Aug 2026' },
  { name: 'Dr. Arjun Kulkarni', speciality: 'Orthopedics', city: 'Pune, Maharashtra', experience: '14 years experience', qualification: 'MBBS, MS Orthopedics', clinic: '22, Karve Road, Kothrud, Pune, Maharashtra 411038', hospital: 'Deccan Orthopedic Hospital, Erandwane, Pune 411004', clinicSchedule: 'Mon–Sat · 5:00 PM–8:00 PM', hospitalSchedule: 'Wednesday & Saturday · 9:00 AM–12:00 PM', appointment: 'Clinic booking, Hospital booking', verification: 'Verified · last checked 23 Aug 2026' },
  { name: 'Dr. Meera Joshi', speciality: 'Dermatology', city: 'Pune, Maharashtra', experience: '8 years experience', qualification: 'MBBS, MD Dermatology', clinic: '6, Baner Road, Baner, Pune, Maharashtra 411045', hospital: 'No hospital affiliation listed', clinicSchedule: 'Tue–Sun · 10:00 AM–2:00 PM', hospitalSchedule: 'Not listed', appointment: 'Clinic booking, Phone booking', verification: 'Pending · last checked 18 Aug 2026' },
]

const adminViews = {
  Doctors: '<h4>Doctor management</h4><p>Add or edit doctor profiles, photos, qualifications, appointment options, and separate clinic or hospital schedules.</p><div class="admin-list"><div><b>Dr. Anika Mehra</b><span>Dermatology · Bhopal</span><em>Edit profile</em></div><div><b>Dr. Rohan Iyer</b><span>Cardiology · Bhopal</span><em>Edit profile</em></div></div>',
  Facilities: '<h4>Clinics & hospitals</h4><p>Manage practice addresses, contact details, and the facilities linked to each doctor profile.</p><div class="admin-list"><div><b>Lakeview Multispeciality Hospital</b><span>Bhopal</span><em>Manage</em></div><div><b>Bhopal Heart Centre</b><span>Bhopal</span><em>Manage</em></div></div>',
  Specialities: '<h4>Specialities</h4><p>Create or update the discovery categories available to patients.</p><div class="admin-list"><div><b>Dermatology</b><span>Active category</span><em>Edit</em></div><div><b>Cardiology</b><span>Active category</span><em>Edit</em></div></div>',
  Verification: '<h4>Verification queue</h4><p>Review profile details, record sources checked, and update the public verification status.</p><div class="admin-list"><div><b>Dr. Kavya Sharma</b><span>Needs review</span><em>Review</em></div><div><b>Dr. Meera Joshi</b><span>Pending</span><em>Review</em></div></div>',
  Feedback: '<h4>Patient feedback</h4><p>View or remove feedback submitted through the public experience.</p><div class="admin-list"><div><b>Doctor experience</b><span>★★★★★ · Bhopal</span><em>View / delete</em></div><div><b>mediTrust feedback</b><span>★★★★☆ · Pune</span><em>View / delete</em></div></div>',
  Corrections: '<h4>Correction reports</h4><p>Review public reports about profile details and update their status after checking the information.</p><div class="admin-list"><div><b>Schedule correction</b><span>Dr. Kavya Sharma</span><em>Review</em></div></div>',
}

const results = document.querySelector('#results')
const city = document.querySelector('#city')
const speciality = document.querySelector('#speciality')
const helperText = document.querySelector('#helperText')
const profileDialog = document.querySelector('#profileDialog')
const guidanceDialog = document.querySelector('#guidanceDialog')
const toast = document.querySelector('#toast')

function showToast(message) { toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2600) }
function renderResults() {
  const profiles = doctors.filter((doctor) => doctor.city === city.value && doctor.speciality === speciality.value)
  helperText.textContent = profiles.length ? `${profiles.length} ${speciality.value.toLowerCase()} profile${profiles.length > 1 ? 's' : ''} in ${city.value.split(',')[0]}` : `No ${speciality.value.toLowerCase()} profiles are in this prototype city yet. Try another speciality.`
  results.innerHTML = profiles.map((doctor) => `<article class="doctor-card"><p class="tag">${doctor.speciality.toUpperCase()} · ${doctor.verification.split(' ·')[0].toUpperCase()}</p><h3>${doctor.name}</h3><p>${doctor.experience}</p><p>⌖ ${doctor.clinic}</p><button class="profile-button" type="button" data-profile="${doctors.indexOf(doctor)}">View profile →</button></article>`).join('')
}
function openProfile(doctor) {
  document.querySelector('#profileContent').innerHTML = `<p class="eyebrow">${doctor.speciality.toUpperCase()} · ${doctor.city.toUpperCase()}</p><h2>${doctor.name}</h2><p>${doctor.qualification} · ${doctor.experience}</p><div class="detail-list"><p><strong>Verification</strong>${doctor.verification}</p><p><strong>Clinic address</strong>${doctor.clinic}</p><p><strong>Clinic schedule</strong>${doctor.clinicSchedule}</p><p><strong>Hospital</strong>${doctor.hospital}</p><p><strong>Hospital schedule</strong>${doctor.hospitalSchedule}</p><p><strong>Appointment</strong>${doctor.appointment}</p></div><div class="profile-actions"><button class="profile-button" data-action="Call clinic">Call clinic</button><button class="profile-button" data-action="Directions">Directions</button><button class="profile-button" data-action="Copied address">Copy address</button><button class="profile-button" data-action="Correction report opened">Report incorrect information</button></div>`
  profileDialog.showModal()
}
function renderAdminView(name) { document.querySelector('#adminPanel').innerHTML = adminViews[name] }

document.querySelector('#searchForm').addEventListener('submit', (event) => { event.preventDefault(); renderResults() })
results.addEventListener('click', (event) => { const button = event.target.closest('[data-profile]'); if (button) openProfile(doctors[button.dataset.profile]) })
document.querySelector('#profileContent').addEventListener('click', (event) => { const button = event.target.closest('[data-action]'); if (button) showToast(`${button.dataset.action} — preview only`) })
document.querySelector('#guidanceButton').addEventListener('click', () => guidanceDialog.showModal())
document.querySelector('#closeDialog').addEventListener('click', () => profileDialog.close())
document.querySelector('#closeGuidance').addEventListener('click', () => guidanceDialog.close())
document.querySelector('#chooseDermatology').addEventListener('click', () => { city.value = 'Bhopal, Madhya Pradesh'; speciality.value = 'Dermatology'; guidanceDialog.close(); renderResults(); document.querySelector('#discover').scrollIntoView({ behavior: 'smooth' }) })
document.querySelector('#feedbackForm').addEventListener('submit', (event) => { event.preventDefault(); event.currentTarget.reset(); document.querySelector('#feedbackMessage').textContent = 'Thank you — this feedback is shown as submitted in the prototype.' })
document.querySelector('#openAdmin').addEventListener('click', () => { const dashboard = document.querySelector('#adminDashboard'); dashboard.hidden = false; renderAdminView('Doctors'); dashboard.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) })
document.querySelector('.admin-tabs').addEventListener('click', (event) => { const button = event.target.closest('[data-admin-tab]'); if (!button) return; document.querySelectorAll('[data-admin-tab]').forEach((tab) => tab.classList.toggle('active', tab === button)); renderAdminView(button.dataset.adminTab) })

// ponytail: static in-memory data powers the demo; use an API only when the bootcamp requires saved changes.
console.assert(doctors.length === 6 && Object.keys(adminViews).length === 6, 'Prototype data is incomplete.')
