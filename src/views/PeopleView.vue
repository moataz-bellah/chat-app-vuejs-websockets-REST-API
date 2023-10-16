<template>
	<div class="panel">
		<h2>People you may know  </h2>
    
    <div class="friends" ref="messageRef">
         <div class="inner">
          <div v-for="p in people" :key="p._id" class="friend">
                
                    {{p.name}}
                
                    
                    <div class="addFriend">
                        <a class="add" href="#">add</a>
                    </div> 
               
          </div>
         </div>          
    </div>  
  </div>
</template>
<script>
import {ref} from 'vue';
const people = ref([]);
export default {
    setup(){
        return {people};
    },
  mounted(){
    console.log("ssssssssssssssssssssss");
    fetch("http://localhost:3000/chat/people",{
      headers:{
          Authorization:"Bearer " + this.state.userToken
        }
    }).then(res=>{
      return res.json()
    }).then(data=>{
        console.log(data)
        people.value = data.people;
    }).catch(err=>{
      console.log(err)
    });

  },
  
}

</script>
<style scoped>
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
.friends{
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

.friend{
  text-align: left;
  display: flex;
  flex-direction: row;
  margin-bottom: 6px;
  border: 1px solid black;
  padding:5px;
  border-radius: 4px;
}
.addFriend a{
    float: right;
    display: inline;

    
}

.addFriend button{
    
    font-size: small;
    position:sticky;
    
    color:blue;
    cursor: pointer;

}
</style>