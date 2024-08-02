import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
import router from "./router";
import "vue-progressive-image/dist/style.css"; 
import "./assets/style/tailwind.css";
import "./assets/style/tailwindCustomClass.css"
import "./assets/style/main.scss";
import vueDebounce from "vue-debounce";

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import AxiosAdapter from "../src/services/http/AxiosAdapter";
import HotelApi from "../src/services/api/HotelService";

const axiosClient = new AxiosAdapter();

const hotelApi = new HotelApi(axiosClient, "http://localhost:3000");

const pinia = createPinia()
const app = createApp(App);
app
  .use(router)
  .use(pinia)
  .provide("hotelApi", hotelApi)
  .directive("debounce", vueDebounce({ lock: true }))
  .component('VueDatePicker', VueDatePicker)
  .mount("#app");
