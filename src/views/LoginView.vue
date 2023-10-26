<template>
	 <Navbar :token="TOKEN" :key="TOKEN"/>
	<div class="container-login">
		<img src="../images/fsociety_logo.png" alt="fsociety_logo">
			<form @submit.prevent="submit" class="frm">
		
		<label>Email</label>
		<input type="email" placeholder="Email" v-model="email">	
		<label>Password</label>
		<input type="password" placeholder="Password" v-model="password">
		<button type="submit" class="login">Login</button>
	</form>	
	</div>
	
</template>
<script>
import socket from '../socket';
import Navbar from '../components/Navbar.vue';
export default{
	components:{Navbar},
	data(){
		return {
			email:'',
			password:'',
			TOKEN:''
	}
	},
	methods:{
		submit(){
			fetch("http://192.168.0.103:3000/auth/login",{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify({
					email:this.email,
					password:this.password
				})
			}).then(res=>{
				return res.json();
			}).then(response=>{
				this.state.userToken = response.token
				this.state.myUserId = response.userId;
				localStorage.setItem('TOKEN',response.token);
				localStorage.setItem('myUserId',response.userId);
				this.TOKEN = response.token;
				socket.auth = {userId:response.userId};
				socket.connect();
				this.$router.push("/friends");
			}).catch(err=>{
				console.log(err);
			});
		}
	}
}
</script>
<style>
#app{
	background-image: url('../images/hello_friend.jpg');
	background-size: cover;
	height: 100vh;
	
}
/* #app::before{
  content:"";
  position: absolute;
  left:0;
  height: 100%;
  width:100%;
  background-color: rgba(0,0,0,70%);
  
} */
.container-login {
	font-family: 'Rubik', sans-serif;
	margin:auto;
	padding: 60px;
	background-color: rgb(85, 87, 83,48%);
	width: 600px;
}
.container-login form{
	display: block;
}
.container-login form input{
	display: block;
	background-color: rgb(85, 87, 83,60%);
	color: white;
	border-color:none;
	border: none;
	padding:20px 20px;
	margin-top: 10px;
	margin-bottom: 10px;
	caret-shape: underscore;
}
.container-login form label{
	font-size:20px;
}
.container-login form .login{
	display: block;
	margin: auto;
	padding:10px 20px;
	background-color: var(--main-color);
	border:none;
	color:white;
	font-size:18px;
	cursor: pointer;

}


</style>