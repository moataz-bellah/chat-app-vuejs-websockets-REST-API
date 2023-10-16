<template>
    <div class="panel">
       <h3> {{ $route.params.friendName }} </h3> 
        <div class="messages" ref="messageRef">
             <div class="inner">
               <div v-for="(message,index) in messages" :key="index" class="message">
                  <div v-if="message.sender === userId" class="user-self">
                    {{$route.params.friendName}}:
                  </div>
                  <div v-else class="user-them"> 
                    You: 
                     
                  </div>
                        {{message.text}}
               </div>
             </div>          
        </div>
    <form>
               <input v-model="text">
               <button @click.prevent="sendMessage(text)">+</button>
             </form>  
      </div>	
    </template>
    <script>
    // import { io } from "socket.io-client";
    import {ref,onMounted,nextTick} from 'vue';
    import socket from '../socket';
    const text = ref('');
    const messages = ref([]);
    const messageRef = ref(null);
    
        
    //socket.join('chatroom');
    // socket.on('chatroom',(data)=>{
    //   console.log("SUIIIIIIIIIIIIIIIIIIIIIIIII");
    // })
    // socket.on("send-message", (data) => {
    //     console.log("Client Connected !!!! ", data);
    //     messages.value.push(data.message);
    // });
    
    socket.on("private message", ({ message, from }) => {
      console.log("MEEESAAGE ",from);
      console.log("IDDD ",message);
          messages.value.push({text:message,sender:from});
    });
    export default {
        props:['userId','friendName'],
        
        setup(){
            return {text,messages,messageRef}
        },
      mounted(){
        console.log("SOSOSOSOSOSOSOS");
        console.log("SOCKET  ",socket.id);
        console.log("USERID ",socket.auth.userId);
        // console.log("USERTOKEN  ==>  ",this.state.userToken);
        // console.log("RECIEVERID  --> ",this.userId);
    
        fetch("http://localhost:3000/chat/messages",{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer " + this.state.userToken
            },
            body:JSON.stringify({
              recieverId:this.userId
            })
          }).then(res=>{
            return res.json()
          }).then(response=>{
              console.log("RETURNED MESSAGES  ====>  ")
              console.log(response)
              messages.value = response.messages
          }).catch(err=>{
            console.log(err);
          });
    
      },
        methods:{	
            sendMessage:async function(message){
    //       const URL = "http://localhost:3000";
    //       const socket = io(URL, { autoConnect: false });
    //       socket.auth = { userId:this.state.myUserId };
    //       socket.connect();
          
          console.log("ffffffffffffffffffffffffffffffffffffffffffffffffffffff",this.state.myUserId);
                console.log(socket.id);
          socket.emit("private message", {
            message,
          to: this.userId,
          from:this.state.myUserId
        });
    
    
    
    
    
    
          // fetch("http://localhost:3000/chat/send",{
          //   method:"POST",
          //   headers:{
          //     "Content-Type":"application/json",
          //     Authorization:"Bearer " + this.state.userToken
          //   },
          //   body:JSON.stringify({
          //     message:message2,
          //     recieverId:this.userId
          //   })
          // }).then(res=>{
          //   return res.json()
          // }).then(response=>{
          //     console.log("SENT MESSAGE ___ ")
          //     console.log(response)
          // }).catch(err=>{
          //   console.log(err);
          // });
          
                messages.value.push({text:message,sender:this.state.myUserId});
                await nextTick();
                messageRef.value.scrollTop = messageRef.value.scrollHeight;
                text.value = ''
            }
        }
    }
    
    
    // TO DO  meesageRef.value.scrollTop = messageRef.value.scrollHeight
    
    </script>
    
    <style>
        .panel{
      display: flex;
      flex-direction: column;
      padding: 20px;
      margin: 0 auto;
      max-width: 300px;
      height: 300px;
      background: rgba(255,255,255,0.7);
      box-shadow: 0 8px 32px 0 rgba(31,38,135,0.37);
      border-radius: 10px;
      border: 1px solid rgba(188,255,255,0.18);
    }
    .messages{
      height: 100%;
      width: 100%;
      overflow-y: scroll;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      background-color: white;
    }
    .inner{
      padding: 10px;
    }
    
    .message{
      text-align: left;
      display: flex;
      margin-bottom: 6px;
    }
    .user-self{
      color: green;
    }
    .user-them{
      color:red;
    }
    form{
      position: relative;
      display: flex;
    }
    input{
      width: 100%;
      border:none;
      height: 20px;
      padding: 8px;
      border-top: 1px solid #999;
      border-radius: 0px;
      outline: none;
    }
    
    </style>