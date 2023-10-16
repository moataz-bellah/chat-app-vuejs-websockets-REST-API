<template>
	<div class="chat-panel">
   
    <div class="friends" ref="messageRef">
      <h3>Friends</h3>
      <font-awesome-icon icon="terminal" style="color: #ee1717;" />
      <font-awesome-icon icon="fa-solid fa-terminal" />
      <font-awesome-icon icon="fa-solid fa-user-secret" />
      <font-awesome-icon icon="fa-solid fa-code" />
         <div class="inner">
          <div v-for="friend in friends" :key="friend._id" class="friend">
                <router-link :to="{name:'Chat',params:{userId:friend._id,friendName:friend.name}}">
                    {{friend.name}}
           </router-link> 
           <Chat />
          </div>
         </div>          
    </div> 
    <div class="message-area">
        <h3>AREA</h3>
        <div class="messaging-panel">
          <font-awesome-icon class="bom" icon="fa-solid fa-terminal" size="lg" />
           <input type="text" placeholder="text">
        </div>
    </div> 
  </div>
</template>
<script>
import {ref} from 'vue';
import Chat from '../components/Chat.vue';
const friends = ref([]);
export default {
    setup(){
        return {friends};
    },
  mounted(){
    console.log("ssssssssssssssssssssss");
    fetch("http://localhost:3000/chat/friends",{
      headers:{
          Authorization:"Bearer " + this.state.userToken
        }
    }).then(res=>{
      return res.json()
    }).then(data=>{
        friends.value = data.friends;
        console.log(data)
    }).catch(err=>{
      console.log(err)
    });

  },
  
}
	
</script>
<style>

#app{
  background-image: url('../images/fsociety_background.jpg');
	background-size: cover;
	height: 100vh;
}
.chat-panel{
  display: flex;
  padding: 20px;
  height: 100%;
  overflow: hidden;
}
.chat-panel .message-area{
  flex-basis: 70%;
  position: relative;
  flex-direction: column;
  height: 100%;
}
.chat-panel .message-area .bom{
  color: white;
  position: absolute;
  left:0;
  bottom: 12px;
}
.chat-panel .message-area .messaging-panel{
  position: absolute;
  bottom: 70px;
  width:100%;
}
.chat-panel .message-area .messaging-panel i{
  color:green;
  font-size: 20px;
  background-color: green;
  
}
.chat-panel .message-area .messaging-panel input{
  padding: 20px 30px;
  background-color: transparent;
  caret-color: green;
  border: none;
  color:green;
  border-bottom: 0.5px solid white;
}
.chat-panel .message-area .messaging-panel input::placeholder{
  font-size: 16px;
  font-family: 'Rubik', sans-serif;
  color:green;
}
.chat-panel .friends{
  height: 100%;
  flex-basis: 30%;
  flex-direction: column;
  overflow-y: scroll;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-right: 30px;

}
.chat-panel .friends .inner .friend a{
  text-decoration: none;
  color:white;
  font-weight: bold;
}
.chat-panel .friends .inner .friend a:hover{
  color:green;
}
.chat-panel .inner{
  padding: 10px;
}


</style>