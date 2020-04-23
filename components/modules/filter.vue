<template lang="html">
  <div class="module" v-if="settings" :class="{ 'module--hidden' : !active}" >
    <header class="module__header">
      <h2 class="module__title">{{ settings.moduleId || title }}</h2>
      <small class="module__category">{{ type }} Module</small>
    </header>
    <main class="module__main">
      <section class="module__section module__section--quad">
        <ctrl-select v-if="settings.type" v-model="settings.type" :props="params.type" />
        <ctrl-select v-if="settings.rolloff" v-model="settings.rolloff" :props="params.rolloff" />
      </section>
      <section class="module__section module__section--dual">
        <div class="module__col">
          <ctrl-range v-if="settings.frequency" v-model="settings.frequency.value" :props="params.freq" />
          <ctrl-range v-if="settings.Q" v-model="settings.Q.value" :props="params.q" />
        </div>
        <div class="module__col">
          Additional params...
        </div>

      </section>
      <div v-if="debug" class="module__debug">
        <span>Debug...</span>
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
  import CtrlRange from '../controls/range.vue'
  import CtrlSelect from '../controls/select.vue'
  export default {
    extends: Module,
    components: { CtrlRange, CtrlSelect },
    data () {
      return {
        title: 'Filter',
        type: 'filter',
        params: {
          freq: {
            label: 'Frequency',
            min: '20', max: '4000', step: '1',
            units: 'hz', dec: '0'
          },
          q: {
            label: 'Quality',
            min: '0.0', max: '10.0', step: '0.1',
            units: '', dec: '1'
          },
          type: {
            label: 'Filter Type',
            options: ['lowpass','highpass','bandpass','lowshelf','highshelf','notch','allpass','peaking']
          },
          rolloff: {
            label: 'Rolloff',
            options: ['-12', '-24', '-48', '-96']
          }
        }
      }
    },
    mounted: function() {
      this.settings = new Tone.Filter()
      this.settings.moduleId = this.title +'#'+this.id
      this.settings.category = this.type
    }
  }
</script>
