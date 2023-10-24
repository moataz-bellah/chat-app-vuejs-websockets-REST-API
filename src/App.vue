<template>
  <nav>
    <router-link to="/signup">Signup</router-link> | 
    <router-link to="/login">Login </router-link>  
  </nav>
  <router-view/>
</template>
<script>

</script>
<style>
:root{
  --main-color: #df2d2f;
  --secondary-color:#2c3e50;
  --transparent-color:rgb(15 116 143 / 70%);
  --section-padding:60px;
}
*{
  box-sizing: border-box;
  margin:0;
  padding: 0;   
}
::-webkit-scrollbar {
  width: 2px;
}
::-webkit-scrollbar-thumb {
  background: #888;
}
body{
  font-family: 'Rubik', sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--main-color);
  font-family: 'Rubik', sans-serif;
  
}

nav {
  padding: 30px;
}

nav a {
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  color: white;
}

nav a.router-link-exact-active {
  color: var(--main-color);
}

nav a:hover{
  color:var(--main-color)
}


</style>
