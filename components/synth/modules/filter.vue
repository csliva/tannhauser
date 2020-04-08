<template lang="html">
  <div class="module" v-if="value.filter && value.filterEnvelope">
    <h2 class="module__title">{{ title }}</h2>
    <div class="module__body">
      <div class="param">
        <select-input v-model="value.filter.type" :options="opts.filterTypes" />
        <select-input v-model="value.filter.rolloff" :options="opts.filterRolloffs" />
      </div>
      <div class="param">
        Q:
        <input v-model.number="value.filter.Q.value" type="range" min="0" max="10" step="1" >
        {{ value.filter.Q.value }}
      </div>
      <div class="param">
        <synth-adsr v-model="value.filterEnvelope" name="synth-filter-env" />
      </div>
      <br>
      <div class="param">
        Freq:
        <input v-model.number="value.filterEnvelope.baseFrequency" type="range" min="20" max="4000" step="1" >
        {{ value.filterEnvelope.baseFrequency }}
      </div>
      <div class="param">
        Octaves:
        <input v-model.number="value.filterEnvelope.octaves" type="range" min="-8" max="8" step="1" >
        {{ value.filterEnvelope.octaves }}
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
        title: 'Filter',
        opts: {
          filterTypes: ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'notch', 'allpass', 'peaking'],
          filterRolloffs: ['-12', '-24', '-48', '-96']
        },
        settings: {
          active: true
        }
      }
    }
  }
</script>
