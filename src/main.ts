import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import './assets/style/main.scss'

import AxiosAdapter from "../src/services/http/AxiosAdapter";
import HotelApi from "../src/services/api/HotelService";

const axiosClient = new AxiosAdapter();

const hotelApi = new HotelApi(axiosClient, "http://localhost:3000");

const app = createApp(App);
app.use(router).provide("hotelApi", hotelApi).mount("#app");
