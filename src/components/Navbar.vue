<template>
    <div v-if="!token">
        <nav>
    <router-link to="/signup">Signup</router-link> | 
    <router-link to="/login">Login </router-link>  
  </nav>
    </div>
    <div v-else>
      <nav>
    <router-link to="/login" @click="logout">Logout</router-link>

  </nav>
    </div>
    
  </template>
<script>

export default{
    props:['token'],
    methods:{
      logout(){
        fetch("http://localhost:3000/auth/logout",{
  
            method:"POST",
            headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer " + localStorage.getItem('TOKEN')
            },
              body:JSON.stringify({
              userId:localStorage.getItem('myUserId')
          })
              }).then(res=>{
                    return res.json()
              }).then(result=>{
                  localStorage.setItem('TOKEN','')
                  localStorage.setItem('myUserId','');
            }).catch(err=>{
                console.log(err);
              });
        
      }
    }
}
</script>