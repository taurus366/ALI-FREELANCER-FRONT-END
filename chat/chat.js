
// var stompClient = null;
// // const url = 'http://localhost:8080';
// const url = 'http://77.71.76.17:8080';
// function connect() {
//     var socket = new SockJS(url +'/chat');
//     stompClient = Stomp.over(socket);


//     stompClient.connect( function (frame) {
//         // console.log(frame);
//         // console.log(stompClient.ws._transport.url + "--------------------------------------------------");
//         // console.log(stompClient.ws._transport.url.split("/chat/")[1].split("/")[1]);
//         //     let sessionId = stompClient.ws._transport.url.split("/chat/")[1].split("/")[1];

//         // stompClient.subscribe("/topic/messages/1", function (message) {
//         //     console.log("---------------------------------------------");
//         //     console.log('Message received: ' + message.body);
//         //     console.log(message.headers);
//         // });


//         // stompClient.subscribe(stompClient.ws._transport.url.replace("ws://",""), function (message) {
//         //     console.log("---------------------------------------------");
//         //     console.log('Message received: ' + message.body);
//         //     console.log(message.headers);
//         // });
//         // stompClient._transmit( (f) => {
//         //     console.log(f);
//         // })

//         // console.log(window.console.log());

//     },function (error) {
//         console.log(t);
//     });

// }
// function sendMessage(sender,message) {

//     var message = {
//         sender: sender,
//         content: message
//     };
//     stompClient.send("/app/chat", {}, JSON.stringify(message));
// }




var header ;
var chatRoom;
var typeArea;
var btnAdd;
var others;
var emojiBox;
var emojiButton;
var emojis;
var inputText;
var btnSend;
var messageArea;

function scrollToBottom() {
    chatRoom.scrollTop = chatRoom.scrollHeight;
  }


//Content Loaded
window.addEventListener("DOMContentLoaded", (e) => {
     header = document.querySelector("#header");
     chatRoom = document.querySelector("#chat-room");
     typeArea = document.querySelector("#type-area");
     btnAdd = document.querySelector("#button-add");
     others = document.querySelector("#others");
     emojiBox = document.querySelector(".emoji-button .emoji-box");
     emojiButton = document.querySelector(".others .emoji-button");
     emojis = document.querySelectorAll(".emoji-box span");
     inputText = document.querySelector("#inputText");
     btnSend = document.querySelector("#button-send");
     messageArea=document.querySelector(".message.message-right");

   
    //Header onclick event
    // header.addEventListener("click", (e) => {
    //   if (typeArea.classList.contains("d-none")) {
    //     header.style.borderRadius = "20px 20px 0 0";
    //   } else {
    //     header.style.borderRadius = "20px";
    //   }
    //   typeArea.classList.toggle("d-none");
    //   chatRoom.classList.toggle("d-none");
    // });
    header.addEventListener("click", () => {
        typeArea.classList.toggle("d-none");
        chatRoom.classList.toggle("d-none");
      });
      
    //Button Add onclick event
    btnAdd.addEventListener("click", (e) => {
      others.classList.add("others-show");
    });
    //Emoji onclick event
    emojiButton.addEventListener("click", (e) => {
      emojiBox.classList.add("emoji-show");
    });
     //Button Send onclick event
    btnSend.addEventListener("click", (e) => {
      var mess=inputText.value;
      var bubble=document.createElement('div');
      bubble.className+=" bubble bubble-dark";
      bubble.textContent=mess;
      messageArea.appendChild(bubble);
      inputText.value="";
      scrollToBottom();
    //  chatRoom.scrollTop = chatRoom.scrollHeight;
    });
    for (var emoji of emojis) {
      emoji.addEventListener("click", (e) => {
        e.stopPropagation();
        emojiBox.classList.remove("emoji-show");
        others.classList.remove("others-show");
        inputText.value+=e.target.textContent;
      });
    }
  });

  const socket = new SockJS('http://localhost:8080/chat');
  const stompClient = Stomp.over(socket);
  
  stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
  
      stompClient.subscribe('/topic/messages', function (response) {
          console.log(JSON.parse(response.body));
          // Handle incoming chat messages here
      });
  });
  
  function sendChatMessage() {
      const sender = document.getElementById('sender').value;
      const content = document.getElementById('content').value;
  
      const message = {
          sender: sender,
          content: content
      };
  
      stompClient.send('/app/chat', {}, JSON.stringify(message));
  }
  