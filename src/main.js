
//
// export default VuePackage
import App from "./App.vue"
import Vue from "vue"
import $ from "jquery"
console.log(VuePackage, "//////////")



import iView from "iview";
import 'iview/dist/styles/iview.css';
Vue.use(iView);


import {VuePackage} from "./vue-package"
Vue.use(VuePackage)



new Vue({
  el: "#app",
  template: '<App />',
  components: {
    App
  }
})
