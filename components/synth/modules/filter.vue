<template lang="html">
  <div class="module" v-if="value.filter && value.filterEnvelope">
    <div class="module__param">
      <synth-select v-model="value.filter.type" :options="opts.filterTypes" name="synth-filter-type" />
      <synth-select v-model="value.filter.rolloff" :options="opts.filterRolloffs" name="synth-filter-rolloff" />
    </div>
    <div class="module__param">
      Q:
      <input v-model.number="value.filter.Q.value" type="range" min="0" max="10" step="1" >
      {{ value.filter.Q.value }}
    </div>
    <div class="module__param">
      <synth-adsr v-model="value.filterEnvelope" name="synth-filter-env" />
    </div>
    <br>
    <div class="module__param">
      Freq:
      <input v-model.number="value.filterEnvelope.baseFrequency" type="range" min="20" max="4000" step="1" >
      {{ value.filterEnvelope.baseFrequency }}
    </div>
    <div class="module__param">
      Octaves:
      <input v-model.number="value.filterEnvelope.octaves" type="range" min="-8" max="8" step="1" >
      {{ value.filterEnvelope.octaves }}
    </div>
  </div>
</template>

<script>
  import SynthSelect from '../Select.vue'
  import SynthAdsr from '../Adsr.vue'
  export default {
    components: { SynthSelect, SynthAdsr },
    props: ['value'],
    data(){
      return {
        msg: 'Filter Loaded',
        opts: {
          filterTypes: ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'notch', 'allpass', 'peaking'],
          filterRolloffs: ['-12', '-24', '-48', '-96']
        },
        settings: {
          active: true,
          filter: {},
          filterEnvelope: {}
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

<style lang="sass">
  .module
    display: block
    &__param
      display: block
      margin-bottom: $blh/4
</style>
