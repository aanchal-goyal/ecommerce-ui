document.addEventListener("DOMContentLoaded", () => {
    const chatBtn = document.getElementById("chatbot-btn");
    const chatbot = document.getElementById("chatbot");
    const closeChat = document.getElementById("close-chat");
    const sendBtn = document.getElementById("send-btn");
    const chatInput = document.getElementById("chat-input");
    const chatBody = document.getElementById("chat-body");
  
    chatBtn.onclick = () => chatbot.style.display = "flex";
    closeChat.onclick = () => chatbot.style.display = "none";
  
    sendBtn.onclick = sendMessage;
  
    function sendMessage() {
      const text = chatInput.value.trim();
      if (!text) return;
  
      addMessage("You", text);
      respond(text.toLowerCase());
      chatInput.value = "";
    }
  
    function addMessage(sender, text) {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${sender}:</strong> ${text}`;
      chatBody.appendChild(div);
    }
  
    function respond(text) {
      let reply = "Ask about shoes, phones, headphones, or cart.";
  
      if (text.includes("hi")) reply = "Hello 👋";
      else if (text.includes("shoes")) reply = "We have running, casual, and sports shoes.";
  
      setTimeout(() => addMessage("Bot", reply), 300);
    }
});
  