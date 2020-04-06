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
        <div class="effect__param" v-if="settings.depth">
          Depth:
          <input v-model="settings.depth" type="range" min="0.00" max="1.00" step="0.01" />
          {{ settings.depth }}
        </div>
        <div class="effect__param" v-if="settings.type">
          Type:
          <synth-select v-model="settings.type" :options="oscTypes" />
        </div>
      </div>
      <div class="effect__col">
        <div class="effect__param" v-if="settings.frequency">
          Freq:
          <input v-model="settings.frequency.value" type="range" min="0.0" max="10.0" step="0.1" />
          {{ settings.frequency.value }}
        </div>
        <div class="effect__param">
          Spread:
          <input v-model.number="settings.spread" type="range" min="0" max="180" step="1" />
          {{ settings.spread | round(0) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Tone from 'tone'
  import EffectTemplate from './_effect.vue'
  export default {
    extends: EffectTemplate,
    data(){
      return {
        settings: new Tone.Chorus().toMaster(),
        oscTypes: ['sine', ' square', 'triangle', 'sawtooth']
      }
    }
  }
</script>
