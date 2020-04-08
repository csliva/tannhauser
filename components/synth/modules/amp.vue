<template lang="html">
  <div class="module" v-if="value">
    <h2 class="module__title">{{ title }}</h2>
    <div class="module__body">
      <div class="param">
        Volume:
        <input v-model.number="value.volume.value" type="range" min="-24" max="24" step="1" >
        {{ value.volume.value | round }}
      </div>
      <div class="param">
        <synth-adsr v-model="value.envelope" />
      </div>
      <div class="param">
        Portamento:
        <input v-model.number="value.portamento" type="range" min="0" max="4" step="0.1" >
        {{ value.portamento }}
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
        title: "Amplifier",
        defaults: { volume: { value: -16 }
        }
      }
    },
    mounted: function(){
      let v = this.value
      let d = this.defaults
      v.volume.value = d.volume.value
    }
  }
</script>
