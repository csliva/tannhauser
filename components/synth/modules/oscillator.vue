<template lang="html">
  <div class="module" v-if="value">
    <h3>Oscillator</h3>
    <div class="param">
      {{ value.type }}
    </div>
    <div class="param">
      <synth-select v-model="value.baseType" :options="opts.oscTypes" />
      <!-- <synth-select v-model="value.sourceType" :options="opts.oscSrc" name="synth-osc-source" /> -->
    </div>
    <div class="param">
      Partials:
      <input v-model.number="value.partialCount" type="range" min="0" max="32" step="1" >
      {{ value.partialCount }}
    </div>
    <div class="param">
      Detune:
      <input v-model.number="value.detune.value" type="range" min="0" max="100" step="1">
      {{ value.detune.value }}
    </div>
    <div class="param">
      Phase:
      <input v-model.number="value.phase" type="range" min="0" max="360" step="1" >
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
          oscSrc: ['oscillator', 'am', 'fm', 'fat', 'pulse', 'pwm']
        }
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
