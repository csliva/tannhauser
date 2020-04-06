<template lang="html">
  <div class="env" v-if="value">
    <div class="env__param">
      Volume:
      <input v-model.number="value.volume.value" type="range" min="-24" max="24" step="1" >
      {{ value.volume.value | round }}
    </div>
    <div class="env__param">
      <synth-adsr v-model="value.envelope" name="synth-env" />
    </div>
    <div class="env__param">
      Portamento:
      <input v-model.number="value.portamento" type="range" min="0" max="4" step="0.1" >
      {{ value.portamento }}
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
        msg: 'Amp Envelope Loaded',
        opts: {}
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
  .env
    display: block
    &__param
      display: block
      margin-bottom: $blh/4
</style>
