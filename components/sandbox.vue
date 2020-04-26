<template lang="html">
  <div class="sandbox">
    <div class="sandbox__inner">
      <h2>Sandbox</h2>
      <cell>
        <cell cols="3">
          <cell cols="4">
            <ctrl-btn @click="initOsc()" text="Init Osc" />
            <ctrl-btn @click="log(modules)" text="Log" />
          </cell>
        </cell>
        <cell cols="4">
          <module-osc v-for="(m, i) in modules" v-if="(m.category === 'oscillator')" v-model="modules[i]" :key="m.uid" />
        </cell>
        <cell cols="4">
          <module-lfo v-for="(m, i) in modules" v-if="(m.category === 'lfo')"  v-model="modules[i]" :key="m.uid" />
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
      },
      oscModules () {
        let modules = this.getCatModules('oscillator')
        return modules
      },
      lfoModules () {
        let modules = this.getCatModules('lfo')
        return modules
      },
      // id gen
      setUid () {
        let dt = new Date().getTime()
        let uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          let r = (dt + Math.random()*16)%16 | 0
          dt = Math.floor(dt/16)
          return (c=='x' ? r :(r&0x3|0x8)).toString(16)
        })
        return uid
      }
    },
    // watch: {},
    methods: {
      // dev
      log (data) { console.log(data) },
      alert (data) { alert(data) },
      // get modules: uid, cat
      getModule (uid) {
        if(!uid) { return false }
        let filteredModules = this.modules.filter(m => m.uid === uid)
        return filteredModules[0]
      },
      getCatModules(cat){
        if(!cat) { return false }
        let filteredModules = this.modules.filter(m => m.category === cat)
        return filteredModules
      },
      // local
      initOsc() {
        let osc = new Tone.OmniOscillator({type: 'sine'})
        osc.uid = this.setUid
        osc.title = 'Omni Oscillator'
        osc.category = 'oscillator'
        osc.meter = new Tone.Meter()
        osc.connect(osc.meter)
        this.modules.push(osc)
      },
      initLfo() {
        let lfo = new Tone.LFO()
        lfo.uid = this.setUid
        lfo.title = 'LFO'
        lfo.category = 'lfo'
        lfo.meter = new Tone.Meter()
        lfo.connect(lfo.meter)
        this.modules.push(lfo)
      },
      // routing
      createRoute (source, sink) {
        source.connect(sink)
        let route = { uid: '####'}
        this.routes.push(route)
      },
      destroyRoute () {}
    },
    mounted () {
      // init oscs
      this.initOsc()
      this.initOsc()
      // init lfos
      this.initLfo()
      this.initLfo()
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
