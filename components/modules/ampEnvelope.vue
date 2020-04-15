<template lang="html">
  <div class="module" v-if="settings">
    <h2>
      {{ title }}
      <i>{{ id }}</i>
    </h2>
    <p>
      A: <input v-model="settings.attack" type="range" min="0.1" max="2.0" step="0.1" > {{ settings.attack }} <br>
      D: <input v-model="settings.decay" type="range" min="0.1" max="2.0" step="0.1" > {{ settings.decay }} <br>
      S: <input v-model="settings.sustain" type="range" min="0.1" max="1.0" step="0.1" > {{ settings.sustain }} <br>
      R: <input v-model="settings.release" type="range" min="0.1" max="4.0" step="0.1" > {{ settings.release }}
    </p>
    <p>
      <button @click="log(settings)">Log Settings</button>
    </p>
    <p>
      Atk: {{ atkTriggered }}, Rel: {{ relTriggered }}
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
        title: 'AmpEnv',
        type: 'envelope'
      }
    },
    computed: {
      // $store
      atkTriggered: function () {
        return this.$store.state.synth.piano.trigA
      },
      relTriggered: function () {
        return this.$store.state.synth.piano.trigR
      }
    },
    watch: {
      atkTriggered(b) {
        if(b){ this.settings.triggerAttack() }
      },
      relTriggered(b) {
        if(b){ this.settings.triggerRelease() }
      }
    },
    mounted: function () {
      this.settings = new Tone.AmplitudeEnvelope()
      this.settings.moduleId = this.title +'#'+this.id
      this.settings.category = this.type
    }
  }
</script>
