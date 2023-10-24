import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { io } from "socket.io-client";
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { faTerminal } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret,faCode,faTerminal)
const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)
app.config.globalProperties.state = {userToken:''}

// const socket = io("http://localhost:3000");
// socket.on("connect", () => {
    
//   console.log("Client Connected !!!! ");
// });

app.use(router).mount('#app')
