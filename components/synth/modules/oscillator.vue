<template lang="html">
  <div class="module" v-if="value">
    <h2 class="module__title">{{ title }}</h2>
    <div class="module__body">
      <div class="param">
        <div class="osc">
          {{ value.baseType | capitalize }}
          {{ value.partialCount ? value.partialCount : '' }}
        </div>
      </div>
      <div class="param">
        <select-input v-model="value.baseType" :options="opts.oscTypes" />
        <!-- <select-input v-model="value.sourceType" :options="opts.oscSrc" name="synth-osc-source" /> -->
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
        <input v-model.number="value.phase"
        type="range" min="0" max="360" step="1" >
        {{ value.phase | round }}
      </div>
    </div>
  </div>
</template>

<script>
  import Module from './_module.vue'
  export default {
    extends: Module,
    data(){
      return {
        title: "OmniOscillator",
        opts: {
          oscTypes: ['sine', ' square', 'triangle', 'sawtooth'],
          oscSrc: ['oscillator', 'am', 'fm', 'fat', 'pulse', 'pwm']
        }
      }
    }
  }
</script>

<style lang="sass">
  .osc
    border: solid 1px #eee
    padding: $blh/2
    font-weight: 700
</style>
