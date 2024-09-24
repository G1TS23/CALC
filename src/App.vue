<template>
  <div class="view" :class="{'light-view' : !dark }">
    <MyCalculator @toggle-dark-mode="changeThemeColor()"/>
  </div>
</template>

<script>

export default {
  data(){
    return{
      dark: true
    }
  }, methods: {
    changeThemeColor(){
      this.dark = !this.dark;
      const themeEl = document.querySelector('head meta[name="theme-color"]');
      const htmlEl = document.querySelector('html');
      this.dark ? themeEl.setAttribute('content', '#000000') : themeEl.setAttribute('content', '#FFFFFF');
      this.dark ? htmlEl.style.backgroundColor = "#000000" : htmlEl.style.backgroundColor = "#FFFFFF";
    }
  }
}


</script>

<style scoped>

.view{
  display: flex;
  /*height: 100vh;*/
  /*align-items: center;*/
  justify-content: center;
  background-color: black;
  transition: all .35s ease-in-out;
}

.light-view{
  background-color: white;
}


</style>