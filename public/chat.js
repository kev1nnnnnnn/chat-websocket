const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

//emit => emiti alguma informação
//on => escutando alguma informação

const usernameDiv = document.getElementById("username");
usernameDiv.innerHTML = `Olá ${username} - você está na sala ${room}`

socket.emit("select_room", {
    username,
    room,
}, messages => {
    messages.forEach(message => createMessage(message));
});


document.getElementById("message_input").addEventListener("keypress", (event) =>{

    if(event.key === "Enter") {
        const message = event.target.value;

        //pega a sala do usuario
        const data = {
            room,
            message,
            username,
        }

        socket.emit("message", data);
        
        event.target.value = "";
    }
});

//escutando o event
socket.on("message", (data) => {
    createMessage(data);
});

function createMessage(data) {

    const messageDiv = document.getElementById("messages");

    messageDiv.innerHTML += `
    <div class="messages" id="messages">
            <div class="new_message">
              <label for="" class="form-label"></label>
              <strong>${data.username}</strong> <span>${data.text} - ${dayjs(data.createdAt).format("DD/MM HH:mm")}</span>
            </div>
          </div>
    `;

}

document.getElementById("logout").addEventListener("click", (event) => {

    window.location.href = "index.html";
});
