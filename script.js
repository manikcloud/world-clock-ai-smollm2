function updateClocks() {
    const now = new Date();

    // Local
    updateClock('time-local', 'date-local', now);

    // New York (UTC-5) - Approximation, better to use toLocaleString if timezone support is crucial
    // Using toLocaleString for accurate TZ support
    updateClockTZ('time-ny', 'date-ny', 'America/New_York');

    // London
    updateClockTZ('time-london', 'date-london', 'Europe/London');

    // Tokyo
    updateClockTZ('time-tokyo', 'date-tokyo', 'Asia/Tokyo');

    // UTC
    updateClockTZ('time-utc', 'date-utc', 'UTC');
}

function updateClock(timeId, dateId, dateObj) {
    document.getElementById(timeId).textContent = dateObj.toLocaleTimeString('en-US', { hour12: false });
    document.getElementById(dateId).textContent = dateObj.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

function updateClockTZ(timeId, dateId, timeZone) {
    const optionsTime = { hour12: false, timeZone: timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const optionsDate = { timeZone: timeZone, weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };

    const now = new Date();
    document.getElementById(timeId).textContent = now.toLocaleTimeString('en-US', optionsTime);
    document.getElementById(dateId).textContent = now.toLocaleDateString('en-US', optionsDate);
}

// Chat Logic
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');

async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Add User Message
    addMessage(text, 'user-message');
    chatInput.value = '';

    // Call API
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();

        if (data.response) {
            addMessage(data.response, 'bot-message');
        } else if (data.error) {
            addMessage('Error: ' + data.error, 'bot-message');
        }
    } catch (error) {
        console.error('Error:', error);
        addMessage('Error: Could not reach AI server.', 'bot-message');
    }
}

function addMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', className);
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Update clocks every second
setInterval(updateClocks, 1000);
updateClocks();
