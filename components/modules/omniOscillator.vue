<template lang="html">
  <div class="module" v-if="settings">
    <h2>
      {{ title }}
      <i>{{ id }}</i>
      <button @click="settings.mute = !settings.mute">
        {{ settings.mute ? 'Un-Mute' : 'Mute' }}
      </button>
    </h2>
    <p v-if="settings.frequency">
      Tone:
      {{ settings.frequency.value | toNote }}
      ({{ settings.frequency.value | round }}hz)
    </p>
    <p>
      Type:
      <select v-model="settings.baseType">
        <option>sine</option>
        <option>square</option>
        <option>triangle</option>
        <option>sawtooth</option>
      </select>
    </p>
    <p v-if="settings.detune">
      Detune: <input v-model="settings.detune.value" type="range" min="-100" max="100" step="1" > {{ settings.detune.value }}
    </p>
    <p>
      Status:
      <span class="module__state">{{ settings.state }}</span>
    </p>
    <p>
      <button @click="log(settings)">Log Settings</button>
    </p>
  </div>
</template>

<script>
  import Tone from 'tone'
  import Module from './_module.vue'
  export default {
    extends: Module,
    data () {
      return {
        title: 'OmniOscillator',
        type: 'oscillator'
      }
    },
    computed: {
      // $store
      noteFreq () {
        return this.$store.state.synth.piano.freq
      }
    },
    mounted: function() {
      this.settings = new Tone.OmniOscillator({ frequency: this.noteFreq })
      this.settings.moduleId = this.title +'#'+this.id
      this.settings.category = this.type
    },
    watch: {
      noteFreq (){
        this.settings.frequency.value = this.noteFreq
      }
    },
    filters: {
       toNote(value) {
         if (!value) return ''
         return Tone.Frequency(value).toNote()
       },
       round(value){
         if (!value) return ''
         return value.toFixed(0)
       }
    }
  }
</script>
