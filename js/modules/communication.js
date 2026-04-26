// Communication Module

// Data Store (LocalStorage Mock)
let messagesData = JSON.parse(localStorage.getItem('vet_messages')) || [];

// Elements
const commForm = document.getElementById('communication-form');
const messagesLog = document.getElementById('messages-log');

// Initial Render
renderMessages();

// Event Listener for Form
commForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newMessage = {
        id: Date.now(),
        channel: document.getElementById('comm-channel').value,
        recipient: document.getElementById('comm-recipient').value,
        message: document.getElementById('comm-message').value,
        timestamp: new Date().toISOString(),
        status: 'sent'
    };

    messagesData.push(newMessage);
    saveMessages();
    renderMessages();
    commForm.reset();

    // Update dashboard stats
    window.dispatchEvent(new Event('dataChanged'));
});

// Save to LocalStorage
function saveMessages() {
    localStorage.setItem('vet_messages', JSON.stringify(messagesData));
}

// Render Messages
function renderMessages() {
    messagesLog.innerHTML = '';

    if (messagesData.length === 0) {
        messagesLog.innerHTML = '<p style="padding: 1rem; color: var(--text-muted); text-align: center;">No hay mensajes enviados.</p>';
        return;
    }

    // Sort by timestamp (newest first)
    const sortedMessages = messagesData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    sortedMessages.forEach(msg => {
        const li = document.createElement('li');
        const date = new Date(msg.timestamp).toLocaleDateString('es-ES');
        const time = new Date(msg.timestamp).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

        li.innerHTML = `
            <h4>${msg.recipient} <span style="font-weight: normal; font-size: 0.8rem">(${msg.channel})</span></h4>
            <p>${msg.message}</p>
            <span>${date} ${time}</span>
        `;
        messagesLog.appendChild(li);
    });
}