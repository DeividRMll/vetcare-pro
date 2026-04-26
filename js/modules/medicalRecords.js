// Medical Records Module

// Data Store (LocalStorage Mock)
let recordsData = JSON.parse(localStorage.getItem('vet_records')) || [];

// Elements
const recordsTableBody = document.getElementById('records-table-body');
const recordForm = document.getElementById('record-form');
const recordModal = document.getElementById('record-modal');
const btnAddRecord = document.getElementById('btn-add-record');
const searchRecord = document.getElementById('search-record');
const closeModalBtn = document.querySelector('.close-modal');

// State
let editingRecordId = null;

// Initial Render
renderRecords();

// Event Listeners
btnAddRecord.addEventListener('click', () => {
    editingRecordId = null;
    recordForm.reset();
    recordModal.classList.remove('hidden');
    recordModal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
    recordModal.classList.remove('active');
    recordModal.classList.add('hidden');
});

recordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const record = {
        id: editingRecordId || Date.now(),
        pet: document.getElementById('rec-pet').value,
        breed: document.getElementById('rec-breed').value,
        owner: document.getElementById('rec-owner').value,
        weight: document.getElementById('rec-weight').value,
        notes: document.getElementById('rec-notes').value,
        lastVisit: new Date().toISOString().split('T')[0]
    };

    if (editingRecordId) {
        const index = recordsData.findIndex(r => r.id === editingRecordId);
        recordsData[index] = record;
    } else {
        recordsData.push(record);
    }

    saveRecords();
    renderRecords();
    recordModal.classList.remove('active');
    recordModal.classList.add('hidden');
    recordForm.reset();

    // Update dashboard stats
    window.dispatchEvent(new Event('dataChanged'));
});

searchRecord.addEventListener('input', renderRecords);

// Functions
function saveRecords() {
    localStorage.setItem('vet_records', JSON.stringify(recordsData));
}

function renderRecords() {
    const searchTerm = searchRecord.value.toLowerCase();
    const filteredRecords = recordsData.filter(record =>
        record.pet.toLowerCase().includes(searchTerm) ||
        record.owner.toLowerCase().includes(searchTerm) ||
        record.id.toString().includes(searchTerm)
    );

    recordsTableBody.innerHTML = '';

    if (filteredRecords.length === 0) {
        recordsTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">No hay registros médicos.</td></tr>';
        return;
    }

    filteredRecords.forEach(record => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${record.id}</td>
            <td>${record.pet}</td>
            <td>${record.breed}</td>
            <td>${record.owner}</td>
            <td>${record.lastVisit}</td>
            <td>
                <button class="btn-secondary btn-sm" onclick="editRecord(${record.id})">Editar</button>
            </td>
        `;
        recordsTableBody.appendChild(row);
    });
}

function editRecord(id) {
    const record = recordsData.find(r => r.id === id);
    if (!record) return;

    editingRecordId = id;
    document.getElementById('rec-pet').value = record.pet;
    document.getElementById('rec-breed').value = record.breed;
    document.getElementById('rec-owner').value = record.owner;
    document.getElementById('rec-weight').value = record.weight;
    document.getElementById('rec-notes').value = record.notes;

    recordModal.classList.remove('hidden');
    recordModal.classList.add('active');
}

// Make editRecord global for onclick
window.editRecord = editRecord;