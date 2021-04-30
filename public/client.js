const socket = io()

let name

let textarea = document.querySelector('#textarea')

let messageArea=document.querySelector('.message-area')

do{
    name=prompt("Please enter you name")
}while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key ==='Enter'){
        sendMessage(e.target.value)
    }
    
})

function sendMessage(msg){
    let obj ={
        user:name,
        message:msg.trim(),
    }
    //Append

    appendMessage(obj,'outgoing')

    textarea.value=''
    scrollToBottom()
    // send to server

    socket.emit('message',obj)

}

function appendMessage(obj,type){

    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup=`
    
    <h4> ${obj.user} </h4>
    <p> ${obj.message}</p>
    `

    mainDiv.innerHTML=markup

    messageArea.appendChild(mainDiv)
}

// Reci eve message from server

socket.on('message',(message)=>{
    console.log(message)
    appendMessage(message,'incoming')
    scrollToBottom()
})


function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}