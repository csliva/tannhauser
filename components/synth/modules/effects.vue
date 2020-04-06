<template lang="html">
  <div class="effects" v-if="value">
    <button @click="toggleFx('chorus')"
    class="button" :class="{ 'button--active': effects.chorus.active }">
      Chorus
    </button>
    <button @click="toggleFx('reverb')"
    class="button" :class="{ 'button--active': effects.reverb.active }">
      Reverb
    </button>
    <button @click="toggleFx('phaser')"
    class="button" :class="{ 'button--active': effects.phaser.active }">
      Phaser
    </button>
    <button @click="toggleFx('distortion')"
    class="button" :class="{ 'button--active': effects.distortion.active }">
      Distortion
    </button>
    <button @click="toggleFx('bitcrusher')"
    class="button" :class="{ 'button--active': effects.bitcrusher.active }">
      BitCrusher
    </button>
    <button @click="toggleFx('vibrato')"
    class="button" :class="{ 'button--active': effects.vibrato.active }">
      Vibrato
    </button>
    <button @click="toggleFx('freeverb')"
    class="button" :class="{ 'button--active': effects.freeverb.active }">
      Freeverb
    </button>
    <button @click="toggleFx('pingpong')"
    class="button" :class="{ 'button--active': effects.pingpong.active }">
      PingPongDelay
    </button>
  </div>
</template>

<script>
  import Tone from 'tone'
  export default {
    components: {},
    props: ['value'],
    data(){
      return {
        msg: 'Effects Rack Loaded',
        effects: {
          chorus: { active: false, settings: {} },
          reverb: { active: false, settings: {} },
          phaser: { active: false, settings: {} },
          distortion: { active: false, settings: {} },
          bitcrusher: { active: false, settings: {} },
          vibrato: { active: false, settings: {} },
          freeverb: { active: false, settings: {} },
          pingpong: { active: false, settings: {} }
        }
      }
    },
    mounted: function () {
      // populate effects rack
      const fx = this.effects
      fx.chorus.settings = new Tone.Chorus().toMaster()
      fx.phaser.settings = new Tone.Phaser().toMaster()
      fx.distortion.settings = new Tone.Distortion().toMaster()
      fx.bitcrusher.settings = new Tone.BitCrusher().toMaster()
      fx.vibrato.settings = new Tone.Vibrato().toMaster()
      fx.freeverb.settings = new Tone.Freeverb().toMaster()
      fx.pingpong.settings = new Tone.PingPongDelay().toMaster()
      // reverb needs to generate...
      let reverb = new Tone.Reverb().toMaster()
      reverb.generate().then(() => {
  			fx.reverb.settings = reverb
  		});
    },
    methods: {
      toggleFx: function(unit) {
        let fx = this.effects, s = this.value
        if(!fx[unit].active){
          s = s.connect(fx[unit].settings)
          fx[unit].active = true
          console.log(fx[unit].settings)
        } else {
          s = s.disconnect(fx[unit].settings)
          fx[unit].active = false
        }
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
</style>
