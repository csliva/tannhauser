<template lang="html">
  <div class="module" v-if="value">
    <div class="module__param">
      {{ value.type }}
    </div>
    <div class="module__param">
      <synth-select v-model="value.baseType" :options="opts.oscTypes" name="synth-osc-type" />
      <!-- <synth-select v-model="value.sourceType" :options="opts.oscSrc" name="synth-osc-source" /> -->
    </div>
    <div class="module__param">
      Partials:
      <input v-model.number="value.partialCount" type="range" min="0" max="32" step="1" >
      {{ value.partialCount }}
    </div>
    <div class="module__param">
      Detune:
      <input v-model.number="value.detune.value" type="range" min="0" max="100" step="1">
      {{ value.detune.value }}
    </div>
    <div class="module__param">
      Phase:
      <input name="synth-oscillator-phase"
      v-model.number="value.phase"
      type="range" min="0" max="360" step="1" >
      {{ value.phase | round }}
    </div>
  </div>
</template>

<script>
  import SynthSelect from '../Select.vue'
  export default {
    components: { SynthSelect },
    props: ['value'],
    data(){
      return {
        msg: 'Omni Oscillator Loaded',
        opts: {
          oscTypes: ['sine', ' square', 'triangle', 'sawtooth'],
          oscSrc: ['oscillator', 'am', 'fm', 'fat', 'pulse', 'pwm'],
          oscPartials: []
        }
      }
    },
    mounted: function() {
      // populate partials in data
      for(let i = 0; i <= 32; i++){
        this.opts.oscPartials.push(i)
      }
    },
    filters: {
      round: function(value, decimal){
        return value.toFixed(decimal)
      }
    },
    watch: {
      value() {
        this.$emit('input', this.value)
      }
    }
  }
</script>

<style lang="sass">
  .module
    display: block
    &__param
      display: block
      margin-bottom: $blh/4
</style>
