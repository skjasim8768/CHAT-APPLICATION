const socket = io(); // Connect to the server using Socket.IO

const form = document.getElementById('chat-form');
const input = document.getElementById('m');
const messages = document.getElementById('messages');

let myId = null;

socket.on('connect', () => {
  myId = socket.id;
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', {
      id: myId,
      text: input.value
    });
    input.value = '';
  }
});


socket.on('chat message', function (msg) {
  const item = document.createElement('li');
  item.classList.add('message');

  if (msg.id === myId) {
    item.classList.add('sent');
  } else {
    item.classList.add('received');
  }

  item.textContent = msg.text;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight; // always scroll to bottom
});