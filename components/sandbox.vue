<template lang="html">
  <div class="sandbox">
    <div class="sandbox__inner">
      <h2>Sandbox</h2>
      <cell>
        <cell cols="3">
          <cell cols="3">
            <ctrl-btn @click="initModule('osc')" text="Init Osc" />
            <ctrl-btn @click="initModule('lfo')" text="Init LFO" />
            <ctrl-btn @click="log(modules)" text="Log Modules" />
          </cell>
        </cell>
        <cell>
          Routes =>
        </cell>
        <cell cols="3">
          <module-osc v-for="(m, i) in modules" v-if="(m.category === 'osc')" v-model="modules[i]" :key="modules[i].uid" />
        </cell>
        <cell cols="3">
          <module-lfo v-for="(m, i) in modules" v-if="(m.category === 'lfo')" v-model="modules[i]" :key="modules[i].uid" />
        </cell>
      </cell>
    </div>
  </div>
</template>

<script>
  // Tone JS
  import Tone from 'tone'
  // Controls
  import CtrlBtn from './controls/btn.vue'
  // Displays
  import Cell from './displays/cell.vue'
  // Sbox Modules
  import ModuleOsc from './modules/sbox/osc.vue'
  import ModuleLfo from './modules/sbox/lfo.vue'
  // Helpers
  export default {
    components: { ModuleOsc, ModuleLfo, CtrlBtn, Cell },
    data() {
      return {
        modules: [],
        routes: []
      }
    },
    computed: {
      getMaster () {
        return Tone.Master
      }
    },
    // watch: {},
    methods: {
      // dev
      log (data) { console.log(data) },
      alert (data) { alert(data) },
      // id gen
      setUid () {
        let dt = new Date().getTime()
        let uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          let r = (dt + Math.random()*16)%16 | 0
          dt = Math.floor(dt/16)
          return (c=='x' ? r :(r&0x3|0x8)).toString(16)
        })
        return uid
      },
      // get modules: uid || cat
      getModule (uid) {
        if(!uid) { return false }
        let filteredModules = this.modules.filter(m => m.uid === uid)
        return filteredModules[0]
      },
      getCat (cat) {
        if(!cat) { return false }
        let filteredModules = this.modules.filter(m => m.category === cat)
        return filteredModules
      },
      // local
      initModule (type) {
        let module
        switch(type) {
          case 'osc':
            module = new Tone.OmniOscillator({type: 'sine'})
            module.title = 'Omni Oscillator!'
            break;
          case 'lfo':
            module = new Tone.LFO()
            module.title = 'LFO!'
            break;
          default:
            return false
        }
        module.sink = null
        module.category = type
        module.uid = this.setUid()
        module.meter = new Tone.Meter()
        module.meter.uid = this.setUid()
        module.connect(module.meter)
        this.modules.push(module)
      },
      // routing
      createRoute (source, sink) {
        // source.connect(sink)
        // let route = { uid: '####' }
        // this.routes.push(route)
      },
      destroyRoute () {

      }
    },
    mounted () {
      // init oscs
      this.initModule('osc')
      this.initModule('osc')
      // init lfos
      this.initModule('lfo')
      this.initModule('lfo')
    }
  }
</script>

<style lang="sass">
  .sandbox
    display: block
    height: 100vh
    overflow-y: auto
    &__inner
      padding: $blh
      min-height: 100vh
    &__list
      padding: 0
      margin: 0 0 $blh/2
    &__item
      display: inline-block

  // hlt = highlight
  .hlt
    color: clr2('blue', 0, 25%)
    display: inline-block
    padding: 0 $blh/8

</style>
