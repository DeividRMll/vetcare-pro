// Appointments Module

// Data Store (LocalStorage Mock)
let appointmentsData = JSON.parse(localStorage.getItem('vet_appointments')) || [];

// Elements
const form = document.getElementById('appointment-form');
const list = document.getElementById('appointments-list');
const dashboardList = document.getElementById('upcoming-dashboard-appointments');

// Initial Render
renderAppointments();

// Event Listener for Form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newAppointment = {
        id: Date.now(),
        owner: document.getElementById('apt-owner').value,
        pet: document.getElementById('apt-pet').value,
        date: document.getElementById('apt-date').value,
        time: document.getElementById('apt-time').value,
        reason: document.getElementById('apt-reason').value,
        status: 'pending' // pending, done
    };

    appointmentsData.push(newAppointment);
    saveData();
    renderAppointments();
    form.reset();
    
    // Update Dashboard if visible
    window.dispatchEvent(new Event('updateDashboard'));
    window.dispatchEvent(new Event('dataChanged'));
});

// Save to LocalStorage
function saveData() {
    // Sort logic by date/time
    appointmentsData.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
    localStorage.setItem('vet_appointments', JSON.stringify(appointmentsData));
}

// Render logic
function renderAppointments() {
    list.innerHTML = '';
    
    if(appointmentsData.length === 0) {
        list.innerHTML = '<p class="text-muted" style="padding:1rem">No hay citas programadas.</p>';
        return;
    }

    appointmentsData.forEach(apt => {
        const isUrgent = apt.reason.toLowerCase().includes('cirugía');
        const li = document.createElement('li');
        if(isUrgent) li.classList.add('urgent');

        li.innerHTML = `
            <div class="agenda-info">
                <h4>${apt.pet} <span style="font-weight: normal; font-size: 0.8rem">(${apt.owner})</span></h4>
                <p>${apt.reason}</p>
            </div>
            <div style="text-align: right;">
                <div class="agenda-time"><i class='bx bx-time'></i> ${apt.time}</div>
                <div style="font-size: 0.75rem; color: #94A3B8;">${apt.date}</div>
            </div>
        `;
        list.appendChild(li);
    });
}

// Listen to Dashboard update to sync its widget
window.addEventListener('updateDashboard', () => {
    if(!dashboardList) return;
    dashboardList.innerHTML = '';
    let upcoming;
    
    if(window.appState?.currentRole === 'owner') {
        const ownerAppointments = appointmentsData.filter(apt => apt.owner === window.appState.currentUser);
        upcoming = ownerAppointments.slice(0, 3);
    } else {
        upcoming = appointmentsData.slice(0, 3);
    }
    
    if(upcoming.length === 0) {
        dashboardList.innerHTML = '<p style="font-size: 0.9rem; color: var(--text-muted)">No hay citas próximas</p>';
        return;
    }

    upcoming.forEach(apt => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="agenda-info">
                <h4>${apt.pet}</h4>
                <p>${apt.reason}</p>
            </div>
            <div class="agenda-time">${apt.time}</div>
        `;
        dashboardList.appendChild(li);
    });
});
