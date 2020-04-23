<template lang="html">
  <div class="sandbox">
    <div class="sandbox__inner">
      <h2>Sandbox</h2>
      <cell>
        <cell cols="3">
          <cell cols="4" grid="sm">
            <ctrl-btn @click="initOsc()" text="Init Osc" />
            <ctrl-btn @click="log(oscs)" text="Log" />
          </cell>
        </cell>
        <cell cols="4" v-if="oscs.length">
          <module-osc v-for="(module, i) in oscs" v-model="oscs[i]" :key="module.mId" />
        </cell>
        <cell cols="3">
          <cell cols="4">
            <ctrl-btn @click="initLfo()" text="Init LFO" />
          </cell>
        </cell>
        <cell cols="4" v-if="lfos.length">
          <module-lfo v-for="(module, i) in lfos" v-model="lfos[i]" :targets="getModulesButId(module.mId)" :key="module.mId" />
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
    components: {
      ModuleOsc, ModuleLfo,
      CtrlBtn,
      Cell
    },
    data() {
      return {
        // OSC
        oscs: [],
        // LFOs
        lfos: [],
        // Routes
        routes: [],
        // utilitities
        meter: false
      }
    },
    computed: {
      getModules () {
        // return all modules
        let modules = []
        modules.push(...this.oscs, ...this.lfos)
        return modules
      },
      getMaster () {
        return Tone.Master
      }
    },
    watch: {
      // watch
    },
    methods: {
      // dev
      log(data) { console.log(data) },
      alert(data) { alert(data) },
      // local
      initOsc(tone) {
        let osc = new Tone.OmniOscillator({
          type: 'sine'
        })
        osc.mId = 'omniOsc#' + (this.oscs.length + 1)
        osc.title = 'Omni Osc #'+ (this.oscs.length + 1)
        osc.category = 'oscillator'
        this.oscs.push(osc)
      },
      initLfo() {
        let lfo = new Tone.LFO()
        lfo.mId = 'lfo#'+ (this.lfos.length + 1)
        lfo.title = 'LFO #'+ (this.lfos.length + 1)
        lfo.category = 'lfo'
        lfo.cnx = {i: [], o: []}
        this.lfos.push(lfo)
      },
      // get modules (id & category)
      getModuleById (id) {
        return this.getModules.filter(t => t.mId === id)
      },
      getModulesButId (id) {
        return this.getModules.filter(t => t.mId != id)
      },
      getModuleCat (cat) {
        return this.getModules.filter(t => t.catategory === cat)
      },
      // routing
      routeSignal (output, input) {

      },
      unmapParam (output, input, param) {

      },
      mapParam (output, input, param) {
        output.connect(input[param]).toMaster()
        output.cnx.o.push({ title: input.title+' '+param, module: input, param: param })
      }
    },
    mounted () {
      // meter
      let meter = new Tone.Meter()
      Tone.Master.connect(meter)
      this.meter = meter
      // init oscs
      this.initOsc()
      this.initOsc()
      // init lfos
      this.initLfo()
      this.initLfo()
    },
    filters: {
      round (num) {
        return Number(num).toFixed(0)
      }
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
