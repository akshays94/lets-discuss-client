<template>
  <div>
    <h5>{{ title }}</h5>
    <hr>
  </div>
</template>

<script>
export default {
  props: [
    'title'
  ]  
}
</script>

<style scoped>
div {
  text-align: left;
}
</style>
