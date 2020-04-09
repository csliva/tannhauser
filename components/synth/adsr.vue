<template lang="html">
  <div class="adsr">
    <div class="asdr__range">
      A: <input v-model.number="value.attack" type="range" min="0.01" max="2" step="0.001">
      {{ value.attack }}
      <synth-select v-model="value.attackCurve" :options="filterOpts.curves" :name="name + '-attack-curve' " />
    </div>
    <div class="asdr__range">
      D: <input v-model.number="value.decay" type="range" min="0.01" max="1" step="0.001" >
      {{ value.decay }}
      <synth-select v-model="value.decayCurve" :options="filterOpts.curvesAlt" :name="name + '-decay-curve' " />
    </div>
    <div class="asdr__range">
      S: <input v-model.number="value.sustain" type="range" min="0" max="1" step="0.001" >
      {{ value.sustain }}
    </div>
    <div class="asdr__range">
      R: <input v-model.number="value.release" type="range" min="0.1" max="4" step="0.001" >
      {{ value.release }}
      <synth-select v-model="value.releaseCurve" :options="filterOpts.curves" :name="name + '-release-curve' " />
    </div>
  </div>
</template>

<script>
  import SynthSelect from './Select.vue'
  export default {
    components: { SynthSelect },
    props: ['value', 'name'],
    data(){
      return {
        msg: 'ASDR Loaded',
        filterOpts: {
          curves: ['linear', 'exponential', 'sine', 'cosine', 'bounce', 'ripple', 'step'],
          curvesAlt: ['linear', 'exponential']
        }
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
  .adsr
    display: block
    border: solid 1px orange
</style>
