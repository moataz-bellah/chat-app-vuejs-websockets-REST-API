<template>
    <h2>{{ roomName }}</h2>
  <div class="messages" ref="messageRef">
         <div v-for="(message,index) in messages" :key="index" class="message">
            <div v-if="message.sender === userId" class="user-them" :clock="message.sentAt">
              You: {{message.text}}
              <strong>**</strong>
            </div>
            <div v-else class="user-self" :clock="message.sentAt"> 
              Member: {{message.text}}
              <strong>**</strong>
            </div>
       </div>          
  </div>
    <form>
  <div class="messaging-panel">
        <font-awesome-icon class="bom" icon="fa-solid fa-terminal" size="lg" />
         <input type="text" placeholder="text" v-model="text">
         <button @click.prevent="sendMessage(text)">+</button>
        </div>
    </form>
  </template>
  <script>
  
  import {ref,onMounted,nextTick} from 'vue';
  import socket from '../socket';
  const moment = require('moment');
  const text = ref('');
  const messages = ref([]);
  const messageRef = ref(null);
  socket.on("room message", ({ message,roomId,from,sentAt }) => {
        messages.value.push({text:message,roomId:roomId,sender:from,sentAt:sentAt});
  });
  export default {
      props:['roomId','roomName'],
      
      setup(){
          return {messages,messageRef,text}
      },
      data(){
        return {
            userId:localStorage.getItem('myUserId')
        }
      },
    mounted(){
  
  fetch("http://localhost:3000/chat/room-messages",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer " + localStorage.getItem('TOKEN')
      },
      body:JSON.stringify({
        roomId:this.roomId
      })
    }).then(res=>{
      return res.json()
    }).then(response=>{
        messages.value = response.messages
    }).catch(err=>{
      console.log(err);
    });
  
  },
  
  methods:{	
  
  sendMessage:async function(message){
    const date = new Date();
    let hour = date.getHours();
      let minutes = date.getMinutes();
      let night = 'AM';
              
      if(hour>12){
              hour = hour - 12;
              night = 'PM';
      }
              const sentAt = hour.toString() + "." + minutes.toString() + ' ' + night;
        socket.emit("room message", {
            message,
            roomId: this.roomId,
            from:localStorage.getItem('myUserId'),
            sentAt:sentAt
      });
      // text:message,roomId:roomId,sender:from,sentAt:sentAt
    //messages.value.push({text:message,roomId:this.roomId,sender:this.state.myUserId,sentAt:sentAt});
    await nextTick();
    messageRef.value.scrollTop = messageRef.value.scrollHeight;
    text.value = '';
          }
      }
  }
  
  
  // TO DO  meesageRef.value.scrollTop = messageRef.value.scrollHeight
  
  </script>
  
  <style>
  
  
  
  form .messaging-panel{
  display: flex;
  bottom: 70px;
  width:100%;
  }
  form .messaging-panel button{
  position: relative;
  margin-left: 20px;
  background-color: transparent;
  border: none;
  color:white;
  font-size: 30px;
  cursor: pointer;
  top: 10px;
  
  }
  .messages{
  height: 700px;
  background-color: transparent;
  }
  .messages .message{
  padding: 5px;
  position: relative;
  margin-bottom: 58px;
  }
  
  /* .messages .message::before{
  content: "3.34 PM";
  position: absolute;
  bottom: -46px;
  color:white;
  font-size: 14px;
  right:20px;
  } */
  
  .user-self{
  padding: 10px;
  position: absolute;
  margin-bottom:30px;
  width: fit-content;
  border-radius: 15px;
  background-color: white;
  }
  .user-self::before{
  /* content: "3.34 PM"; */
  content: attr(clock);
  position: absolute;
  bottom: -23px;
  color: white;
  font-size: 12px;
  right: -19px;
  }
  .user-self strong{
  position: relative;
  left:5px;
  top:5px;
  font-size: 14px;
  color:rgb(89, 198, 212);
  }
  .user-them{
  padding: 10px;
  width: fit-content;
  position: absolute;
  margin-bottom: 30px;
  right: 5px;
  color:white;
  border-radius: 15px;
  /* background-color: rgb(20, 120, 137); */
  background-color: var(--main-color);
  }
  
  .user-them::before{
  /* content: "3.34 PM"; */
  content: attr(clock);
  position: absolute;
  bottom: -23px;
  color: white;
  font-size: 12px;
  right: 1px;
  }
  .user-them strong{
  position: relative;
  left:5px;
  top:5px;
  font-size: 14px;
  color:rgb(89, 198, 212);
  }
  
  </style>