<template>
	<div class="chat-panel">
   
    <div class="friends" ref="messageRef">
      <h3>Friends</h3>
         <div class="inner">
          <div class="friends-section">
            <div v-for="friend in friends" :key="friend._id" class="friend">
                <div class="image">
                  <img src="../images/pp.jpg" alt="">
                </div>
                <div @click.self="clickMe(friend._id,friend.name)" class="friendDiv">
                  {{friend.name}}
                  <p>HEllo Darlene i need to talk to you now!!</p>  
                </div> 
          </div>
          </div>
          <h3>Rooms</h3>
          <div class="rooms-section">
            <div v-for="room in rooms" :key="room._id" class="friend">
                <div class="image">
                  <img src="../images/pp.jpg" alt="">
                </div>
                <div @click.self="joinRoom(room._id,room.name)" class="friendDiv">
                  {{room.name}}
                  <p>HEllo Darlene i need to talk to you now!!</p>  
                </div> 
                
          </div>
          </div>
          
         </div>          
    </div>
     
    <div class="message-area">
      <div v-if="showChat">
                <Chat :userId="currentId" :friendName="currentName" />
              </div>
    </div> 
  </div>
</template>
<script>
import {ref} from 'vue';
import Chat from '../components/Chat.vue';
// import socket from '@/socket';
import socket from '../socket';
const friends = ref([]);
const rooms = ref([]);
socket.on('userJoined',msg=>{
    console.log(msg);
});
export default {
  components:{Chat},
    setup(){
        return {friends,rooms};
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

    fetch("http://localhost:3000/chat/rooms",{
      headers:{
          Authorization:"Bearer " + this.state.userToken
        }
    }).then(res=>{
      return res.json()
    }).then(data=>{
        rooms.value = data.rooms;
        console.log(data);
    }).catch(err=>{
      console.log(err)
    });


  },
  data(){
    return {
      showChat:false,
      currentId:'',
      currentName:'',
    }
  },
  methods:{
    clickMe(id,name){
      console.log("YES YOU CLICKED ME!!!!!");
      console.log(id);
      console.log(name);
      this.showChat = !this.showChat;
      this.currentId = id;
      this.currentName = name;
    },
    joinRoom(roomId,roomName){  
    socket.emit('joinRoom',{roomId,roomName,userId:this.state.myUserId});

  }
  },
  
}
	
</script>
<style>

#app{
  background-image: url('../images/fsociety_background.jpg');
	background-size: cover;
	height: 100vh;
  overflow: hidden;
  
  
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
/* .chat-panel .message-area .messaging-panel{
  position: absolute;
  bottom: -132px;
  width:100%;
} */
.chat-panel .message-area form{
  position: absolute;
  bottom: 69px;
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
  font-size:20px;
}
.chat-panel .message-area .messaging-panel input::placeholder{
  font-size: 20px;
  font-family: 'Rubik', sans-serif;
  color:green;
}
.chat-panel .friends{
  height: 100%;
  flex-basis: 30%;
  flex-direction: column;
  overflow-y: scroll;
  /* border-top-left-radius: 5px;
  border-top-right-radius: 5px; */
  margin-right: 30px;
  border-right: 1px solid white;
}
.chat-panel .friends .inner .friends-section{
  height: 400px;
  overflow-y: scroll;
}
.chat-panel .friends .inner .rooms-section{
  height: 400px;
  overflow-y: scroll;
}
.chat-panel .friends .friend{
  text-align: left;
  padding: 10px;
  /* border-bottom:0.6px solid white ; */
  display: flex;
  align-items: center;
}
.chat-panel .friends .friend .image{
  height: 100px;
  width:100px;
  margin-right: 20px;
  margin-top: 0;
  margin-bottom: 0;
}
.chat-panel .friends .friend .image img{
  height: 100%;
  width: 100%;
  border-radius: 50%;
  
}
.chat-panel .friends .inner .friend a{
  text-decoration: none;
  color:white;
  font-weight: bold;
}

.friendDiv{
  margin: 0;
  font-size: 20px;
  
}
.friendDiv p{
  font-size: 14px;
  color:white;
  padding-top: 10px;
}
.friendDiv:hover{
  cursor: pointer;
}
.chat-panel .friends .inner .friend a:hover{
  color:green;
}
.chat-panel .inner{
  padding: 10px;
}


</style>