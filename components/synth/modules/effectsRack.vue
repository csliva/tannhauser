<template lang="html">
  <div class="effects" v-if="value">
    <nav class="effects__tabs">
      <button v-for="e in rackId" @click="toggleFx(e)"
      class="effects__tab" :class="{ 'effects__tab--active': e === active, 'effects__tab--on': rack[e].on }">
        {{ rack[e].niceName }}
      </button>
    </nav>
    <div class="effects__section">
      <!-- <component v-for="e in rackId" v-model="value" :is="rack[e].comp"
      :show="active === e" :rack="rack[e]" /> -->
      <effect-chorus v-model="value" :show="active === 'chorus'" :rack="rack.chorus" />
      <effect-phaser v-model="value" :show="active === 'phaser'" :rack="rack.phaser" />
      <effect-reverb v-model="value" :show="active === 'reverb'" :rack="rack.reverb" />
      <effect-distortion v-model="value" :show="active === 'distortion'" :rack="rack.distortion" />
      <effect-bitcrusher v-model="value" :show="active === 'bitcrusher'" :rack="rack.bitcrusher" />
      <effect-vibrato v-model="value" :show="active === 'vibrato'" :rack="rack.vibrato" />
      <effect-freeverb v-model="value" :show="active === 'freeverb'" :rack="rack.freeverb" />
      <effect-pingpong v-model="value" :show="active === 'pingpong'" :rack="rack.pingpong" />
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
        rackId: ['chorus', 'phaser', 'reverb',  'distortion', 'bitcrusher', 'vibrato', 'freeverb', 'pingpong'],
        active: 'chorus',
        rack: {
          chorus: { niceName: 'Chorus', on: false, comp: 'EffectChorus' },
          phaser: { niceName: 'Phaser', on: false, comp: 'EffectPhaser'  },
          reverb: { niceName: 'Reverb', on: false, comp: 'EffectReverb'  },
          distortion: { niceName: 'Distortion', on: false, comp: 'EffectDistortion'  },
          bitcrusher: { niceName: 'Bit Crusher', on: false, comp: 'EffectBitcrusher'  },
          vibrato: { niceName: 'Vibrato', on: false, comp: 'EffectVibrato'  },
          freeverb: { niceName: 'Freeverb', on: false, comp: 'EffectFreeverb'  },
          pingpong: { niceName: 'Ping Pong Delay', on: false, comp: 'EffectPingpong'  }
        }
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
      font-size: 0
    &__tab
      position: relative
      z-index: 1
      font-size: 11px
      font-weight: 700
      display: inline-block
      border: 0
      border: solid 1px #ddd
      border-bottom: 0
      border-top-left-radius: 6px
      border-top-right-radius: 6px
      padding: $blh/4
      background-color: #eee
      color: #555
      &--active
        z-index: 100
        background-color: #fff
        color: 999
      &--on
        color: blue
      &:focus
        outline: 0
    &__section
      display: block
      background: #fff
      border: solid 1px #eee
</style>
