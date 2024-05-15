document.addEventListener('DOMContentLoaded', function() {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');

    sendButton.addEventListener('click', function() {
        const messageText = messageInput.value.trim();
        if (messageText !== '') {
            sendMessage(messageText);
            messageInput.value = '';
        }
    });

    function sendMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.innerText = message;
        messageElement.classList.add('sent'); // Añadir una clase para distinguir mensajes enviados
        chatMessages.appendChild(messageElement);
        scrollToBottom(chatMessages);
    }

    function scrollToBottom(element) {
        element.scrollTop = element.scrollHeight;
    }
});
