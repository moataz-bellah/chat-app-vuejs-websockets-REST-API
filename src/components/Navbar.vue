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
        localStorage.setItem('TOKEN','')
      }
    }
}
</script>