<template lang="html">
  <div v-if="value" class="effect" >
    <header class="effect__header">
      <h2 class="effect__title">{{ rack.niceName }}</h2>
      <button @click="toggle" class="effect__toggle" :class="{ 'effect__toggle--on': rack.on }" >
        {{ rack.on ? 'On' : 'Off' }}
      </button>
      <button @click="log(value)">Log Value</button>
      <button @click="log(settings)">Log settings</button>
    </header>
    <div class="effect__body">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    props: ['rack', 'settings', 'value'],
    data(){
      return {}
    },
    methods: {
      on: function(){
        this.value = this.value.connect(this.settings)
        this.rack.on = true
      },
      off: function(){
        this.value = this.value.disconnect(this.settings)
        this.rack.on = false
      },
      toggle: function() {
        if(!this.rack.on) { this.on() }
        else { this.off() }
      },
      log: function (data){
        console.log(data)
      }
    },
    watch: {
      value() {
        this.$emit('input', this.value)
      },
      rack() {
        this.$emit('input', this.rack)
      }
    }
  }
</script>
