<template>
  <div class="wrap">
    <div class="wrap__inner">
      <synth />
    </div>
  </div>
</template>

<script>
  import Synth from '~/components/Synth.vue'
  export default {
    components: {
      Synth
    }
  }
</script>

<style>

.wrap {
  background: #fff;
  color: #666;
  padding: 30px;
}

.wrap__inner {
  display: block;
  border: solid 1px #ddd;
  background: #fafafa;
  padding: 15px;
  margin-bottom: 30px;
}

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
