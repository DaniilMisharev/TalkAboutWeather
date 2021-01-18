const wsChat = new WebSocket('ws://localhost:8080');

wsChat.onopen = () => {
  console.log('Welcome');
};

const chat = document.getElementById('chat-messages');
wsChat.onmessage = (message) => {
  chat.innerHTML += message.data;
};

const form = document.querySelector('.chatForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const messageText = form.message.value;
  wsChat.send(messageText);
  form.message.value = '';
});

wsChat.onclose = () => {
  console.log(chat.innerHTML += 'Bye!');
}