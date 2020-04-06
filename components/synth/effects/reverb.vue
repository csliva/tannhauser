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
        <div class="effect__param" v-if="settings.preDelay">
          Pre-Delay:
          <input v-model="settings.preDelay" type="range" min="0.00" max="1" step="0.01" />
          {{ settings.preDelay }}
        </div>
      </div>
      <div class="effect__col">
        <div class="effect__param" v-if="settings.decay">
          Decay:
          <input v-model="settings.decay" type="range" min="0.0" max="100.0" step="0.1" />
          {{ settings.decay }}
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
      return {}
    },
    mounted: function(){
      let reverb = new Tone.Reverb().toMaster()
      reverb.generate().then(() => {
        this.settings = reverb
      })
    }
  }
</script>
