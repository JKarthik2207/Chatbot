// Function to append messages to the chat container
function appendMessage(sender, message) {
    const chatContainer = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerText = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;  // Auto-scroll to the bottom
}

// Function to send user message and get AI response
async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();

    if (message === '') {
        return;  // Do not send an empty message
    }

    appendMessage('user', message);
    userInput.value = '';

    try {
        // Send user message to the backend
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Display AI response
        appendMessage('ai', data.response);
    } catch (error) {
        appendMessage('ai', 'Sorry, there was an error processing your request.');
        console.error('Error:', error);
    }

    // Clear the input field after sending
    
}

// Function to toggle chatbox visibility
function toggleChat() {
    const chatWrapper = document.getElementById('chatWrapper');
    chatWrapper.style.display = chatWrapper.style.display === 'flex' ? 'none' : 'flex';
}

// Event listeners for chat icon and close button
document.addEventListener('DOMContentLoaded', () => {
    const chatIcon = document.getElementById('chat-icon');
    const closeChat = document.getElementById('close-chat');

    chatIcon.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);
});
