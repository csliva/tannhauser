<template lang="html">
  <div v-if="value" class="effect" :class="{ 'effect--show': show }">
    <p>{{ name }}</p>
    <div class="effect__param">
      <button @click="toggle">{{ active ? 'On' : 'Off' }}</button>
    </div>
    <div class="effect__param" v-if="settings.wet">
      Dry/Wet:
      <input v-model="settings.wet.value" type="range" min="0.00" max="1.00" step="0.01" />
      {{ settings.wet.value }}
    </div>
    <button @click="log(value)">Log Synth</button>
    <button @click="log(settings)">Log settings</button>
  </div>
</template>

<script>
  import Tone from 'tone'
  import EffectTemplate from '../modules/effect.vue'
  export default {
    extends: EffectTemplate,
    data(){
      return {
        name: 'Chorus',
        opts: [],
        settings: new Tone.Chorus().toMaster()
      }
    }
  }
</script>
