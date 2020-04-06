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
        <div class="effect__param" v-if="settings.oversample">
          Oversample:
          <synth-select v-model="settings.oversample" :options="sampleOpts" />
        </div>
      </div>
      <div class="effect__col">
        <div class="effect__param" v-if="settings.distortion">
          Distortion:
          <input v-model="settings.distortion" type="range" min="0.0" max="100.0" step="0.1" />
          {{ settings.distortion }}
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
        settings: new Tone.Distortion().toMaster(),
        sampleOpts: ['none', '2x', '4x']
      }
    }
  }
</script>
