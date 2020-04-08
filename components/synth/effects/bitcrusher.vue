<template lang="html">
  <div v-if="settings" class="effect__body">
    <div class="effect__col">
      <div class="effect__param" v-if="settings.wet">
        Dry/Wet:
        <input v-model="settings.wet.value" type="range" min="0.00" max="1.00" step="0.01" />
        {{ settings.wet.value }}
      </div>
    </div>
    <div class="effect__col">
      <div class="effect__param" v-if="settings.bits">
        Bits:
        <input v-model="settings.bits" type="range" min="1" max="8" step="1" />
        {{ settings.bits }}
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
        settings: new Tone.BitCrusher().toMaster()
      }
    }
  }
</script>
