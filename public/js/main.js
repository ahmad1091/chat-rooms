const socket = io("/");
const chatForm = document.getElementById("chat-form");

socket.on("message", (msg) => {
  renderMessage(msg);
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  socket.emit("chatMessage", msg);
});

const renderMessage = (msg) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">Mary <span>9:15pm</span></p>
  <p class="text">
  ${msg}
  </p>`;
  document.querySelector(".chat-messages").appendChild(div);
};
