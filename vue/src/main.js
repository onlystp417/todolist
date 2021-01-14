import { createApp } from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret, faPlus, faCheck, faStar, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUserSecret);
library.add(faPlus);
library.add(faCheck);
library.add(faStar);
library.add(faPen);
library.add(faTimes);

// import '@fortawesome/fontawesome-free/js/all.js';
// import "@fortawesome/fontawesome-free";
import './assets/scss/main.scss';

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app');

