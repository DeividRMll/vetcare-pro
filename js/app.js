// Main App Logic - Navigation and Init

// App state
const appState = {
    currentView: 'dashboard',
    currentRole: 'admin', // 'admin' or 'owner'
    currentUser: 'Dr. Administrador' // For filtering data
};

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const viewSections = document.querySelectorAll('.view-section');

// Navigation Logic (SPA Routing)
function navigate(targetId) {
    if(appState.currentView === targetId) return;
    
    // Update active nav
    navItems.forEach(item => {
        if(item.dataset.target === targetId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Update active view
    viewSections.forEach(section => {
        if(section.id === targetId) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });

    appState.currentView = targetId;

    // Trigger update for active view if modules expose methods
    if(targetId === 'dashboard') {
        window.dispatchEvent(new Event('updateDashboard'));
    } else if(targetId === 'my-appointments') {
        renderOwnerAppointments();
    } else if(targetId === 'my-pets') {
        renderOwnerPets();
    }
}

// Event Listeners for Navigation
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const target = item.dataset.target;
        navigate(target);
    });
});

// Role Selector
const roleSelector = document.getElementById('role-selector');
roleSelector.addEventListener('change', (e) => {
    appState.currentRole = e.target.value;
    appState.currentUser = e.target.value === 'admin' ? 'Dr. Administrador' : 'Juan Pérez'; // Mock owner
    updateNavigationForRole();
    updateUserInfo();
    navigate('dashboard'); // Reset to dashboard
});

// Update Navigation based on Role
function updateNavigationForRole() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.innerHTML = '';

    if (appState.currentRole === 'admin') {
        navMenu.innerHTML = `
            <li class="nav-item active" data-target="dashboard">
                <i class='bx bxs-dashboard'></i>
                <span>Dashboard</span>
            </li>
            <li class="nav-item" data-target="appointments">
                <i class='bx bxs-calendar'></i>
                <span>Citas</span>
            </li>
            <li class="nav-item" data-target="records">
                <i class='bx bxs-file-blank'></i>
                <span>Historial Clínico</span>
            </li>
            <li class="nav-item" data-target="communication">
                <i class='bx bxs-message-rounded-dots'></i>
                <span>Interacción</span>
            </li>
        `;
    } else { // owner
        navMenu.innerHTML = `
            <li class="nav-item active" data-target="dashboard">
                <i class='bx bxs-dashboard'></i>
                <span>Mi Panel</span>
            </li>
            <li class="nav-item" data-target="my-appointments">
                <i class='bx bxs-calendar'></i>
                <span>Mis Citas</span>
            </li>
            <li class="nav-item" data-target="my-pets">
                <i class='bx bxs-dog'></i>
                <span>Mis Mascotas</span>
            </li>
            <li class="nav-item" data-target="communication">
                <i class='bx bxs-message-rounded-dots'></i>
                <span>Mensajes</span>
            </li>
        `;
    }

    // Re-attach event listeners
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const target = item.dataset.target;
            navigate(target);
        });
    });
}

// Update User Info in Sidebar
function updateUserInfo() {
    const userInfo = document.querySelector('.user-info');
    if (appState.currentRole === 'admin') {
        userInfo.innerHTML = `
            <div class="avatar">DA</div>
            <div class="user-details">
                <p class="name">Dr. Administrador</p>
                <p class="role">Clínica Central</p>
            </div>
        `;
    } else {
        userInfo.innerHTML = `
            <div class="avatar">JP</div>
            <div class="user-details">
                <p class="name">Juan Pérez</p>
                <p class="role">Dueño de Mascota</p>
            </div>
        `;
    }
}

// Setup Global Object for cross-module calls (like UI buttons)
window.app = {
    navigate
};
window.appState = appState;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Initial fetch to render dashboard
    updateDashboardStats();
    window.dispatchEvent(new Event('updateDashboard'));
    console.log("VetCare Pro Inicializado - Metodología PMI");
});

// Listen to data changes to update stats
window.addEventListener('dataChanged', updateDashboardStats);

// Owner Views Rendering
function renderOwnerAppointments() {
    const appointmentsData = JSON.parse(localStorage.getItem('vet_appointments')) || [];
    const ownerAppointments = appointmentsData.filter(apt => apt.owner === appState.currentUser);
    
    const list = document.getElementById('owner-appointments-list');
    list.innerHTML = '';
    
    if(ownerAppointments.length === 0) {
        list.innerHTML = '<p class="text-muted" style="padding:1rem">No tienes citas programadas.</p>';
        return;
    }

    ownerAppointments.forEach(apt => {
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

function renderOwnerPets() {
    const recordsData = JSON.parse(localStorage.getItem('vet_records')) || [];
    const ownerPets = recordsData.filter(record => record.owner === appState.currentUser);
    
    const tableBody = document.getElementById('owner-pets-table-body');
    tableBody.innerHTML = '';
    
    if(ownerPets.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: var(--text-muted);">No tienes mascotas registradas.</td></tr>';
        return;
    }

    ownerPets.forEach(pet => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pet.pet}</td>
            <td>${pet.breed}</td>
            <td>${pet.weight} Kg</td>
            <td>${pet.lastVisit}</td>
            <td><span class="badge-status">Activo</span></td>
        `;
        tableBody.appendChild(row);
    });
}

// Dashboard Stats Update
function updateDashboardStats() {
    const appointmentsData = JSON.parse(localStorage.getItem('vet_appointments')) || [];
    const recordsData = JSON.parse(localStorage.getItem('vet_records')) || [];
    const messagesData = JSON.parse(localStorage.getItem('vet_messages')) || [];

    // Citas Hoy
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = appointmentsData.filter(apt => apt.date === today).length;
    document.querySelector('.stat-card:nth-child(1) h2').textContent = todayAppointments;

    // Pacientes Activos
    const uniquePatients = new Set(recordsData.map(r => r.pet)).size;
    document.querySelector('.stat-card:nth-child(2) h2').textContent = uniquePatients;

    // Mensajes Nuevos (últimas 24 horas)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentMessages = messagesData.filter(msg => new Date(msg.timestamp) > yesterday).length;
    document.querySelector('.stat-card:nth-child(3) h2').textContent = recentMessages;
}

// Update Dashboard Content based on Role
function updateDashboardContent() {
    const header = document.querySelector('#dashboard .section-header');
    const stats = document.querySelector('.stats-grid');
    const widgets = document.querySelector('.dashboard-widgets');
    
    if(appState.currentRole === 'admin') {
        header.innerHTML = `
            <div>
                <h1>Resumen General</h1>
                <p>Gestión optimizada de servicios veterinarios caninos (Enfoque PMI)</p>
            </div>
            <button class="btn-primary" onclick="app.navigate('appointments')">
                <i class='bx bx-plus'></i> Nueva Cita
            </button>
        `;
        stats.style.display = 'grid';
        widgets.style.display = 'grid';
    } else {
        header.innerHTML = `
            <div>
                <h1>Mi Panel</h1>
                <p>Información de tus mascotas y citas</p>
            </div>
            <button class="btn-primary" onclick="app.navigate('my-appointments')">
                <i class='bx bx-plus'></i> Agendar Cita
            </button>
        `;
        stats.style.display = 'none';
        widgets.style.display = 'grid';
    }
}
