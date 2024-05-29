const socket = io("http://localhost:3000");



const getMessageDIV = function (user, msg, time, other = false) {
  return `
  <div class="message flex
  ${other ? "justify-end" : "justify-start"}
  ">
  <div class="
  ${other ? "bg-orange-400" : "bg-green-400"}
  rounded p-2 inline-block">
  <div class="text-sm font-bold">${user}.${time}.</div>
  ${msg}
  </div >
  </div >
  `
}
socket.on("message", (user, msg, time) => {
  console.log(`user ${user} sent ${msg}`);
  messages.innerHTML += getMessageDIV(user, msg, time, true)
  messages.scrollTop = messages.scrollHeight
})

joinBtn.addEventListener("click", (e) => {
  socket.emit("join", userInput.value, roomInput.value)
  joinDiv.style.display = "none"
})

const f1 = function () {
  const user = userInput.value
  const msg = msgInput.value
  const time = ` ${new Date().getHours()}:${new Date().getMinutes()}`
  socket.emit("message", user, msg, time)

  messages.innerHTML += getMessageDIV(user, msg, time)

  messages.scrollTop = messages.scrollHeight
  msgInput.value = ''
  msgInput.focus()
}

sendMsgBtn.addEventListener("click", (e) => { f1() })


msgInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    f1()
  }
})