<template lang="html">
  <div class="module" v-if="settings" :class="{ 'module--hidden' : !active}" >
    <header class="module__header">
      <h2 class="module__title">{{ settings.moduleId || title }}</h2>
      <small class="module__category">{{ type }} Module</small>
    </header>

    <main class="module__main">
      <section class="module__section module__section--oct">
        <div class="module__col">
          <ctrl-dial v-if="settings.attack" v-model="settings.attack" :props="adsr.a" />
        </div>
        <div class="module__col">
          <ctrl-dial v-if="settings.decay" v-model="settings.decay" :props="adsr.d" />
        </div>
        <div class="module__col">
          <ctrl-dial v-if="settings.sustain" v-model="settings.sustain" :props="adsr.s" />
        </div>
        <div class="module__col">
          <ctrl-dial v-if="settings.release" v-model="settings.release" :props="adsr.r" />
        </div>
      </section>

      <section class="module__section module__section--oct">
        <div class="module__col">
          <ctrl-select v-if="settings.attackCurve" v-model="settings.attackCurve" :props="adsr.aCurve" />
        </div>
        <div class="module__col">
          <ctrl-select v-if="settings.decayCurve" v-model="settings.decayCurve" :props="adsr.dCurve" />
        </div>
        <div class="module__col"></div>
        <div class="module__col">
          <ctrl-select v-if="settings.releaseCurve" v-model="settings.releaseCurve" :props="adsr.rCurve" />
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
  // import CtrlButton from '../controls/button.vue'
  import CtrlRange from '../controls/range.vue'
  import CtrlSelect from '../controls/select.vue'
  import CtrlDial from '../controls/dial.vue'
  export default {
    extends: Module,
    components: { CtrlRange, CtrlSelect, CtrlDial },
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
          aCurve: {
            label: 'A-Curve',
            options: ['linear', 'exponential', 'sine', 'cosine', 'bounce', 'ripple', 'step'],
            niceOptions: ['Linear', 'Exp.', 'Sine', 'Cosine', 'Bounce', 'Ripple', 'Step']
          },
          d: {
            label: 'Decay',
            min: '0.00', max: '2.00', step: '0.01',
            units: 'sec', dec: '2'
          },
          dCurve: {
            label: 'D-Curve',
            options: ['linear', 'exponential'],
            niceOptions: ['Linear', 'Exp.']
          },
          s: {
            label: 'Sustain',
            min: '0.01', max: '1.00', step: '0.01',
            units: 'nr%', dec: '2'
          },
          r: {
            label: 'Release',
            min: '0.01', max: '4.00', step: '0.01',
            units: 'sec', dec: '2'
          },
          rCurve: {
            label: 'R-Curve',
            options: ['linear', 'exponential', 'sine', 'cosine', 'bounce', 'ripple', 'step'],
            niceOptions: ['Linear', 'Exp.', 'Sine', 'Cosine', 'Bounce', 'Ripple', 'Step']
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
