<template lang="html">
  <div class="effect" >
    <header class="effect__header">
      <h2 class="effect__title">{{ rack.niceName ? rack.niceName : 'Effect' }}!</h2>
      <button @click="toggle" class="effect__toggle" :class="{ 'effect__toggle--on': rack.on }" >
        {{ rack.on ? 'On' : 'Off' }}
      </button>
      <button @click="log(settings)">Log settings</button>
    </header>
    <div class="effect__body">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    props: ['rack', 'settings'],
    data(){
      return {}
    },
    methods: {
      toggle: function() {
        this.rack.on = !this.rack.on
      },
      log: function (data){
        console.log(data)
      }
    },
    watch: {
      rack() {
        this.$emit('input', this.rack)
      }
    }
  }
</script>
