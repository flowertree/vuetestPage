<template>
  <div class="container bodys A1" >
   <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'container',
  data() {
        return{
        }
    },
    methods:{
    },
    mounted(){

    },
}
</script>
<style>
  .bodys {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    margin: 0 auto;
  }
  html, body {
    position: relative;
    height: 100%;
  }
  body {
    background: #f1eff6;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-size: 14px;
    color:#000;
    margin: 0;
    padding: 0;
  }

</style>
