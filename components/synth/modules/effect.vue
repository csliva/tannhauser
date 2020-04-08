<template lang="html">
  <div class="effect" :class="{ 'effect--show': show }" >
    <header class="effect__header">
      <h2 class="effect__title">{{ rack.niceName ? rack.niceName : 'Effect' }}</h2>
      <button @click="toggle" class="effect__toggle" :class="{ 'effect__toggle--on': active }" >
        {{ active ? 'On' : 'Off' }}
      </button>
      <button @click="log(settings)">Log settings</button>
    </header>
    <div class="effect__main">
      <component :is="'Effect'+rack.compName" v-model="settings" />
    </div>
  </div>
</template>

<script>
  // Utilities
  import General from '../utils/general.vue'
  // Modules
  import Module from './_module.vue'
  import EffectChorus from '../effects/chorus.vue'
  import EffectPhaser from '../effects/phaser.vue'
  import EffectReverb from '../effects/reverb.vue'
  import EffectDistortion from '../effects/distortion.vue'
  import EffectBitcrusher from '../effects/bitcrusher.vue'
  import EffectVibrato from '../effects/vibrato.vue'
  import EffectFreeverb from '../effects/freeverb.vue'
  import EffectPingpong from '../effects/pingpong.vue'
  export default {
    extends: Module,
    mixins: [ General ],
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
    props: ['show', 'rack'],
    data() {
      return {
        active: false,
        settings: {}
      }
    },
    methods: {
      on: function(){
        this.value = this.value.connect(this.settings)
        this.active = true
        this.rack.on = true
      },
      off: function(){
        this.value = this.value.disconnect(this.settings)
        this.active = false
        this.rack.on = false
      },
      toggle: function() {
        if(!this.active) { this.on() }
        else { this.off() }
      }
    },
    watch: {
      rack() {
        this.$emit('input', this.rack)
      }
    }
  }
</script>

  <style lang="sass">
    .effect
      display: none
      padding: 0
      &--show
        display: block
      &__toggle
        &--on
          background: blue
          color: #fff
      &__header
        padding: $blh/2 $blh/2 0 $blh/2
      &__title
        margin-bottom: $blh/2
      &__body
        display: grid
        grid-template-columns: 1fr 1fr
      &__col
        display: block
        padding: $blh/2
      &__param
        display: block
        margin-bottom: $blh/4
  </style>
