
// CHAT ROOM CLIENT SIDE SOCKET COMMUNICATION.

const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')
const leaveButton = document.getElementById('leave-btn')

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true 
})


leaveButton.onclick=function (){
  connectionTerminated()
  
}
const socket = io()

socket.emit('joinRoom', {username, room})

socket.on('roomUsers',({room, users})=>{
  outputRoomName(room)
  outputUsers(users)
})

socket.on('message',message=>{
  outputMessage(message)
  chatMessages.scrollTop = chatMessages.scrollHeight

})

chatForm.addEventListener('submit',e=>{
  e.preventDefault()

  const msg = e.target.elements.msg.value
  socket.emit('chatMessage',msg)

  e.target.elements.msg.value = ""
  e.target.elements.msg.focus()
})

function outputMessage(message){
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `<p class="meta"> ${message.username} <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>`;
  document.querySelector('.chat-messages').appendChild(div)
}


function connectionTerminated(){

  socket.close()

  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `<p class="text">
      Connection terminated. Redirecting to the main page in 2 seconds...
    </p>`;
  document.querySelector('.chat-messages').appendChild(div)
  setTimeout(()=>{
      window.location.replace("/");
  },2000)

}
function outputRoomName(room){
  roomName.innerText = room;
}

function outputUsers(users){
  userList.innerHTML = `${users.map(user=> `<li>${user.username}</li>`).join('')}`
  // userList.innerHTML = "<li>test</li>".join()
}

