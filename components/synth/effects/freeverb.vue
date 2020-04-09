<template lang="html">
  <effect-wrap v-model="value" :class="{ 'effect--show': show }" :rack="rack" :settings="settings">
      <div class="effect__col">
        <div class="effect__param" v-if="settings.wet">
          Dry/Wet:
          <input v-model="settings.wet.value" type="range" min="0.00" max="1.00" step="0.01" />
          {{ settings.wet.value }}
        </div>
      </div>
      <div class="effect__col">
        <p>roomSize, dampening</p>
      </div>
  </effect-wrap>
</template>

<script>
  import Tone from 'tone'
  import EffectTemplate from './_effect.vue'
  export default {
    extends: EffectTemplate,
    data(){
      return {
        settings: new Tone.Freeverb().toMaster()
      }
    }
  }
</script>
