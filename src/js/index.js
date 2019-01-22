var example = new ExampleModule();
var example2 = new ExampleVendor();

console.log('Hi There!');

Vue.component('component',{
    props: ['message'],
    template: `
    <pre id="comp">{{message}}</pre>
    `
});

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello World!'
    },
    mounted: function(){
        console.log('App Mounted');
    }
});