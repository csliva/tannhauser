<template lang="html">
  <div class="module" v-if="settings" :class="{ 'module--hidden' : !active}" >
    <header class="module__header">
      <h2 class="module__title">{{ settings.moduleId || title }}</h2>
      <small class="module__category">{{ type }} Module</small>
    </header>
    <main class="module__main">
      <section class="module__section module__section--test">
        <div class="module__col">
          <ctrl-range v-if="settings.attack" v-model="settings.attack" :props="adsr.a" />
          <ctrl-range v-if="settings.decay" v-model="settings.decay" :props="adsr.d" />
          <ctrl-range v-if="settings.sustain" v-model="settings.sustain" :props="adsr.s" />
          <ctrl-range v-if="settings.release" v-model="settings.release" :props="adsr.r" />
        </div>
        <div class="module__col">
        <ctrl-dial v-if="dialAlt.value" v-model="dialAlt.value" :props="dialAlt.props" />
        </div>
        <div class="module__col">
          <ctrl-dial v-if="dial.value" v-model="dial.value" :props="dial.props" />
        </div>
      </section>
      <div v-if="debug" class="module__debug">
        <span>A: {{ atkTriggered }}</span>
        <span>R: {{ relTriggered }}</span>
      </div>
    </main>
    <footer class="module__footer">
      <button class="module__toggle" @click="log(settings)">Log</button>
      <button class="module__toggle module__toggle--warning" @click="debug = !debug">Debug</button>
    </footer>
  </div>
</template>

<script>
  import Tone from 'tone'
  import Module from './_module.vue'
  import CtrlButton from '../controls/button.vue'
  import CtrlRange from '../controls/range.vue'
  import CtrlDial from '../controls/dial.vue'
  export default {
    extends: Module,
    components: { CtrlButton, CtrlRange, CtrlDial },
    data () {
      return {
        title: 'AmpEnv',
        type: 'envelope',
        adsr: {
          a: {
            label: 'Attack',
            min: '0.00', max: '2.00', step: '0.01',
            units: 'sec', dec: '2'
          },
          d: {
            label: 'Decay',
            min: '0.00', max: '2.00', step: '0.01',
            units: 'sec', dec: '2'
          },
          s: {
            label: 'Sustain',
            min: '0.01', max: '2.00', step: '0.01',
            units: 'sec', dec: '2'
          },
          r: {
            label: 'Release',
            min: '0.01', max: '4.00', step: '0.01',
            units: 'sec', dec: '2'
          }
        },
        // Dial Sample
        dial: {
          value: '46',
          props: {
            label: 'Position',
            min: '0', max: '180', step: '1',
            units: 'deg', dec: '0', type: ''
          }
        },
        dialAlt: {
          value: '120',
          props: {
            label: 'Rotation',
            min: '0', max: '180', step: '1',
            units: 'deg', dec: '0', type: 'alt'
          }
        }
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
