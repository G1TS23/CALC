<template>
  <div class="view" :class="{'light' : !dark }">
    <MyCalculator @toggle-dark-mode="dark = !dark"/>
  </div>
</template>

<script>

export default {
  data(){
    return{
      dark: true
    }
  }
}


</script>

<style scoped>

.view{
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: black;
}

.light{
  background-color: white;
}


</style>