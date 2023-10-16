<template>
	<h1>{{state.userToken}}</h1>
	<div class="container-signup">
				<form @submit.prevent="submit" class="frm">
		<h2>{{response.message}}</h2>
		<label>Email</label>
			<input type="email" placeholder="Email" v-model="email">	
		<label>Name</label>
		<input type="text" placeholder="name" v-model="name">
		<label>Password</label>
		<input type="password" placeholder="password" v-model="password">
		<button type="submit" class="signup">Signup</button>
	</form>		
	</div>

</template>

<script>
export default {
	name:'SignupView',
	data(){
		return {email:'',
		name:'',
		password:'',
		response:''
	}
},
	methods:{
		submit(){
			fetch("http://localhost:3000/auth/Signup",{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify({
					email:this.email,
					password:this.password,
					name:this.name,
					fiends:[]
				})
			}).then(res=>{
				return res.json()
			}).then(response=>{
					this.response = response
			})
		}
	}
}
</script>
<style scoped>
#app{
	background-image: url('../images/hello_friend.jpg');
	background-size: cover;
	height: 100vh;
}
.container-signup {
	font-family: 'Rubik', sans-serif;
	margin:auto;
	padding: 60px;
	width:600px;
	background-color: rgb(85, 87, 83,48%);
}
.container-signup form{
	display: block;
}
.container-signup form input{
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
.container-signup form label{
	font-size:20px;
}
.container-signup form .signup{
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