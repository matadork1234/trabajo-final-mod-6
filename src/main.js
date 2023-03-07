import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router/router';
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash, faEdit, faSave, faCheck, faDollar, faPlus, faX } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash, faEdit, faSave, faCheck, faDollar, faPlus, faX);


const app = createApp(App);

app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueSweetalert2);

app.mount('#app')
