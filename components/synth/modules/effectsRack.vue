<template lang="html">
  <div class="effects" v-if="value">
    <nav class="effects__tabs">
      <p>Active: {{ active ? active : 'None' }}</p>
      <button v-for="e in rack" @click="toggleFx(e)">{{ e }}</button>
    </nav>
    <div class="effects__section">
      <effect-chorus v-model="value" :show="active === 'chorus'" />
      <effect-phaser v-model="value" :show="active === 'phaser'" />
      <effect-reverb v-model="value" :show="active === 'reverb'" />
      <effect-distortion v-model="value" :show="active === 'distortion'" />
      <effect-bitcrusher v-model="value" :show="active === 'bitcrusher'" />
      <effect-vibrato v-model="value" :show="active === 'vibrato'" />
      <effect-freeverb v-model="value" :show="active === 'freeverb'" />
      <effect-pingpong v-model="value" :show="active === 'pingpong'" />
    </div>
  </div>
</template>

<script>
  // import Tone from 'tone'
  import EffectChorus from '../effects/chorus.vue'
  import EffectPhaser from '../effects/phaser.vue'
  import EffectReverb from '../effects/reverb.vue'
  import EffectDistortion from '../effects/distortion.vue'
  import EffectBitcrusher from '../effects/bitcrusher.vue'
  import EffectVibrato from '../effects/vibrato.vue'
  import EffectFreeverb from '../effects/freeverb.vue'
  import EffectPingpong from '../effects/pingpong.vue'
  export default {
    components: {
      EffectChorus,
      EffectPhaser,
      EffectReverb,
      EffectDistortion,
      EffectBitcrusher,
      EffectVibrato,
      EffectFreeverb,
      EffectPingpong
    },
    props: ['value'],
    data(){
      return {
        msg: 'Effects Rack Loaded',
        rack: ['chorus', 'reverb', 'phaser', 'distortion', 'bitcrusher', 'vibrato', 'freeverb', 'pingpong'],
        active: 'chorus'
      }
    },
    methods: {
      toggleFx: function(fx) {
        this.active = fx
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
  .effects
    display: block
    &__tabs
      margin-bottom: $blh/2
    &__section
      display: block
</style>
