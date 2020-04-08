<template lang="html">
  <div v-if="settings" class="effect__body">
    <div class="effect__col">
      <div class="effect__param" v-if="settings.wet">
        Dry/Wet:
        <input v-model="settings.wet.value" type="range" min="0.00" max="1.00" step="0.01" />
        {{ settings.wet.value }}
      </div>
      <div class="effect__param" v-if="settings.octaves">
        Octaves:
        <input v-model="settings.octaves" type="range" min="-8" max="8" step="1" />
        {{ settings.octaves }}
      </div>
      <div class="effect__param" v-if="settings.Q">
        Q:
        <input v-model="settings.Q.value" type="range" min="1" :max="settings.Q.maxVal" step="0.1" />
        {{ settings.Q.value }}
      </div>
    </div>
    <div class="effect__col">
      <div class="effect__param" v-if="settings.frequency">
        Freq:
        <input v-model="settings.frequency.value" type="range" min="0" :max="settings.frequency.maxVal" step="0.1" />
        {{ settings.frequency.value }}
      </div>
      <div class="effect__param" v-if="settings.baseFrequency">
        Base Freq:
        <input v-model="settings.baseFrequency" type="range" min="0" max="1000" step="1" />
        {{ settings.baseFrequency }}
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
        settings: new Tone.Phaser().toMaster()
      }
    }
  }
</script>
