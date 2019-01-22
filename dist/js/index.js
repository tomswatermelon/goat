"use strict";

var example = new ExampleModule();
var example2 = new ExampleVendor();
console.log('Hi There!');
Vue.component('component', {
  props: ['message'],
  template: "\n    <pre id=\"comp\">{{message}}</pre>\n    "
});
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello World!'
  },
  mounted: function mounted() {
    console.log('App Mounted');
  }
});