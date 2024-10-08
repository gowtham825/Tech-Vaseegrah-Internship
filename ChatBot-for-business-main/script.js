const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const framecloseBtn = document.querySelector(".close-framebtn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const inputInitHeight = chatInput.scrollHeight;


window.addEventListener('DOMContentLoaded', (event) => {
  chatInput.focus();

  document.querySelector("form[name='chatInput']").addEventListener("submit", function(e) {
    e.preventDefault(); 
    handleChat(); 
  });
});

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined"><img src="Images/botsmall.png" alt=""></span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi; 
}

function fun(){
  document.getElementById("frame1").style.visibility="visible";
  document.getElementById("frame1").classList.add("style");
}

function remove(){
  document.getElementById("frame1").classList.remove("style");
  document.getElementById("frame1").style.visibility="hidden";
  document.getElementById("frame2").classList.remove("style2");
}

function Setting(){
  document.getElementById("frame2").style.visibility="visible";
  document.getElementById("frame2").classList.add("style2");
}

document.addEventListener('DOMContentLoaded', function() {
  const groupmenu = document.querySelector('.group-menu');
  const frame1 = document.querySelector('.frame1');

  // Toggle menu visibility
  groupmenu.addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent click event from propagating to document
      frame1.style.display = frame1.style.display === 'block' ? 'none' : 'block';
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
      if (!frame1.contains(event.target) && event.target !== groupmenu) {
          frame1.style.display = 'none';
      }
  });

  // Prevent menu from closing when clicking inside the menu
  frame1.addEventListener('click', function(event) {
      event.stopPropagation();
  });
});
function optionClicked(option) {
  console.log('Option clicked:', option);
  const frame1 = document.querySelector('.frame1');
  frame1.style.display = 'none';
  // Add your code to handle the selected option here
}
// function clearChat() {
//   document.getElementById('my-text').value = '';
// }

function clearChat() {
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.innerHTML = ''; // Clear all messages
}

const handleChat = () => {
  userMessage = chatInput.value.trim(); 
  if(!userMessage) return;

  myText.value='';

  chatInput.style.height = `${inputInitHeight}px`;
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);
  
  setTimeout(() => {      
    const incomingChatLi = createChatLi("Typing...", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
}

const generateResponse = (chatElement) => {
  const messageElement = chatElement.querySelector("p");
  fetch("/send-message", {
    method: "POST",
    body: new URLSearchParams({ userInput: userMessage }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
  .then(response => response.json())
  .then(data => {       
    messageElement.textContent = data.message;
    chatInput.value = "";
  }).catch(() => {
    messageElement.classList.add("error");
    messageElement.textContent = "Network Error . Please try again.";
  }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);

chatInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    chatInput.value = '';
  }
});

closeBtn.addEventListener("click", function() {
  document.querySelector(".chatbot").style.display = "none";
});

document.addEventListener('DOMContentLoaded', (event) => {
  // Display the default message with animation when chat is opened
  const defaultMessage = `
      <li class="chat incoming">
          <div class="textimg">
              <img src="Images/textarea img.png" alt="" style="height: 100px; width: 160px;">
              <p style="text-align: center; align-self: center; justify-content: center;">Messages are generated by AI. Some may be inaccurate or inappropriate</p>
          </div>
      </li>
  `;
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.innerHTML = defaultMessage + chatMessages.innerHTML;
});

const myText = document.getElementById("my-text");
const result = document.getElementById("result");
const limit = 30;
const wordCountLimit = 30;


const voiceButton = document.getElementById('voiceButton');
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();

let stopTimeout;

recognition.onresult = function(event) {
  const text = event.results[0][0].transcript;
  document.getElementById('my-text').value = text;
};

voiceButton.addEventListener('click', function() {
  recognition.start();
  
  recognition.onend = function() {
    clearTimeout(stopTimeout);
    stopTimeout = setTimeout(function() {
      recognition.stop();
    }, 3000);
  };
  document.getElementById('my-text').focus();
  

});
function clearChat() {
  document.querySelectorAll('.chat').forEach((message, index) => {
    if (index !== 0) {
      message.remove();
    }
  });
}




// // const chatInputvo = document.getElementById('my-text');
// const voiceButton = document.getElementById('voiceButton');

// // Initialize SpeechRecognition object
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

// // Set recognition properties
// recognition.lang = 'en-US';
// recognition.interimResults = false;

// // Event listener for voice button click
// voiceButton.addEventListener('click', () => {
//     recognition.start();
//     console.log('Voice recognition started...');
//     // Notify user that recording has started
//     const recordingNotification = document.createElement('div');
//     // recordingNotification.textContent = 'Recording...';
//     recordingNotification.classList.add('recording-notification');
//     chatbox.appendChild(recordingNotification);
// });

// // Event listener for speech recognition result
// recognition.onresult = (event) => {
//     const transcript = event.results[0][0].transcript;
//     console.log('Transcript:', transcript);
    
//     // Append transcript to chat input textarea
//     myText.value += transcript;
//     const recordingNotification = document.querySelector('.recording-notification');
//     if (recordingNotification) {
//         recordingNotification.remove();
//     }
//     myText.style.height = 'auto';
//     myText.style.height = chatInput.scrollHeight + 'px';
//     const words = chatInput.value.trim().split(' ');
//     if (words.length > wordCountLimit) {
//         chatInput.value = words.slice(0, wordCountLimit).join(' ');
//     }
// };

const updateWordCount = () => {
  const text = myText.value.trim();
  const words = text.split(/\s+/);
  const wordCount = words.length;
  result.textContent = `${wordCount}/${limit}`;

  if (wordCount > limit) {
    myText.value = words.slice(0, limit).join(" ");
    result.textContent = `${limit}/${limit}`;
  }
};

myText.addEventListener("input", updateWordCount);

chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
  
    result.textContent = `0/${limit}`;
  }
});
function optionClicked(action) {
  const languageOptions = action === 'change Language' ? document.getElementById('change') : null;
  if (languageOptions) {
    if (languageOptions.style.display === 'none') {
      languageOptions.style.display = 'block';
    } else {
      languageOptions.style.display = 'none';
    }
  }
}

