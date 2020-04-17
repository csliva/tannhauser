<template lang="html">
  <div class="module" v-if="settings">
    <header class="module__header" >
      <h2 class="module__title">{{ settings.moduleId || title }}</h2>
      <small class="module__category">{{ type }} Module</small>
    </header>
    <main class="module__main" >
      <section class="module__section" >
        <ctrl-check v-if="settings.baseType" v-model="settings.baseType" :props="params.baseType" />
      </section>
      <section class="module__section" >
        <ctrl-range v-if="settings.detune" v-model="settings.detune.value" :props="params.detune" />
        <ctrl-range v-if="stringPartials" v-model="settings.partialCount" :props="params.partials" />
      </section>
      <div v-if="debug" class="module__debug">
        <span class="module__state">Status: {{ settings.state }}</span>
        <span v-if="settings.frequency">
          Tone:
          {{ settings.frequency.value | toNote }}
          ({{ settings.frequency.value | round }}hz)
        </span>
        <span>
          Mute: {{ settings.mute }}
        </span>
      </div>
    </main>  
    <footer class="module__footer" >
      <button class="module__toggle module__toggle--success" @click="settings.mute = !settings.mute">
        {{ settings.mute ? 'Un-Mute' : 'Mute' }}
      </button>
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
  import CtrlSelect from '../controls/select.vue'
  import CtrlCheck from '../controls/check.vue'
  export default {
    extends: Module,
    components: { CtrlButton, CtrlRange, CtrlSelect, CtrlCheck },
    data () {
      return {
        title: 'OmniOscillator',
        type: 'oscillator',
        params: {
          baseType: {
            label: 'Base Type',
            options: ['sine','triangle','square','sawtooth']
          },
          detune: {
            label: 'Detune',
            min: '-100', max: '100', step: '1',
            units: 'cents', dec: '0'
          },
          partials: {
            label: 'Partials',
            min: '0', max: '32', step: '1',
            units: '', dec: '0'
          }
        }
      }
    },
    computed: {
      // $store
      noteFreq () {
        return this.$store.state.synth.piano.freq
      },
      stringPartials () {
        return Number(this.settings.partialCount).toString(10)
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
