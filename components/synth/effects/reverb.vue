<template lang="html">
  <effect-wrap v-model="value" :class="{ 'effect--show': show }" :rack="rack" :settings="settings">
      <div class="effect__col">
        <div class="effect__param" v-if="settings.wet">
          Dry/Wet:
          <input v-model="settings.wet.value" type="range" min="0.01" max="1.00" step="0.01" />
          {{ settings.wet.value }}
        </div>
        <div class="effect__param" v-if="settings.preDelay">
          Pre-Delay:
          <input v-model="settings.preDelay" type="range" min="0.01" max="1" step="0.01" />
          {{ settings.preDelay }}
        </div>
      </div>
      <div class="effect__col">
        <div class="effect__param" v-if="settings.decay">
          Decay:
          <input v-model="settings.decay" @change="generate(updated)" type="range" min="0.1" max="4.0" step="0.1" />
          {{ settings.decay }}
        </div>
      </div>
  </effect-wrap>
</template>

<script>
  import Tone from 'tone'
  import EffectTemplate from './_effect.vue'
  export default {
    extends: EffectTemplate,
    data() {
      return {
        settings: new Tone.Reverb().toMaster(),
        defaults: { decay: 4, preDelay: 0.10 }
      }
    },
    mounted: function() {
      this.generate(this.defaults)
    },
    computed: {
      updated: function(){
        let d = Number(this.settings.decay)
        let pD = Number(this.settings.preDelay)
        return { decay: d, preDelay: pD }
      }
    },
    methods: {
      generate: function(opts){
        let on = this.rack.on
        let reverb = new Tone.Reverb(opts).toMaster()
        if(on){ this.off() }
        reverb.generate().then(() => {
        	this.settings = reverb
          if(on){ this.on() }
        })
      }
    }
  }
</script>
