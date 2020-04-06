<template lang="html">
  <div v-if="value" class="effect" :class="{ 'effect--show': show }">
    <header class="effect__header">
      <h2 class="effect__title">{{ rack.niceName ? rack.niceName : 'Effect' }}</h2>
      <button @click="toggle" class="x" :class="{ 'x--on': active }" >
        {{ active ? 'On' : 'Off' }}
      </button>
      <button @click="log(settings)">Log settings</button>
    </header>
    <div class="effect__body">
      <div class="effect__col">
        <div class="effect__param" v-if="settings.wet">
          Dry/Wet:
          <input v-model="settings.wet.value" type="range" min="0.00" max="1.00" step="0.01" />
          {{ settings.wet.value }}
        </div>
      </div>
      <div class="effect__col"></div>
    </div>
  </div>
</template>

<script>
  import SynthSelect from '../Select.vue'
  export default {
    components: { SynthSelect },
    props: ['value', 'show', 'rack'],
    data(){
      return {
        active: false,
        settings: {}
      }
    },
    methods: {
      log: function(data) {
        console.log(data)
      },
      toggle: function() {
        if(this.settings){
          if(!this.active){
            this.value = this.value.connect(this.settings)
            this.active = true
            this.rack.on = true
          } else {
            this.value = this.value.disconnect(this.settings)
            this.active = false
            this.rack.on = false
          }
        } else {
          this.log('No Settings for: ' + this.rack.niceName)
        }
      }
    },
    mounted: function() {
      // Do stuff on mount...
    },
    filters: {
      round: function(value, decimal){
        return value.toFixed(decimal)
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

<style lang="sass">
  .effect
    display: none
    padding: $blh/2
    &--show
      display: block
    &__param
      margin-bottom: $blh/2
    &__header
      margin-bottom: $blh/2
      vertical-align: top
    &__title
      display: inline-block
      margin-right: $blh/2
    &__body
      display: grid
      grid-template-columns: 1fr 1fr
      grid-gap: $blh/2
    &__col
      display: block
  // temp
  .x
    &--on
      background: blue
      color: #fff
</style>
