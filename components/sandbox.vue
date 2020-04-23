<template lang="html">
  <div class="sandbox">
    <div class="sandbox__inner">

      <h2>Sandbox</h2>

      <module-osc />
      <module-lfo />

      <cell>
        <cell cols="3">
          <cell cols="4" grid="sm">
            <cell v-if="false">
              <ctrl-dial v-if="getMaster.volume" v-model="getMaster.volume.value" :props="volProps" />
            </cell>
          </cell>
        </cell>
        <cell cols="3">
          <cell cols="4" grid="sm">
            <ctrl-btn text="Init Osc" @click="initOsc()" />
            <ctrl-btn type="success" text="Start All" @click="toggleAll(oscs, true)" />
            <ctrl-btn type="warning" text="Stop All" @click="toggleAll(oscs, false)" />
            <ctrl-btn text="Log" @click="log(oscs)" />
          </cell>
        </cell>
        <cell cols="4">
          <cell v-for="(o, i) in oscs" type="group" :key="o.mId">
            <h4 v-if="o.title" class="cell__title">{{ o.title }}</h4>
            <cell cols="2">
              <ctrl-select v-if="o.baseType" v-model="o.baseType" :props="oscProps" type="pill" />
              <cell type="wip">Note Frq</cell>
            </cell>
            <cell cols="4">
              <ctrl-dial v-if="o.frequency" v-model="o.frequency.value" :props="freqProps" />
              <ctrl-dial v-if="o.detune" v-model="o.detune.value" :props="oscDetuneProps" />
              <ctrl-dial v-model="o.partialCount" :props="oscPartialProps" />
              <ctrl-dial v-if="o.volume" v-model="o.volume.value" :props="volProps" />
            </cell>
            <cell cols="3" >
              <ctrl-btn @click="o.state === 'stopped' ? o.start() : o.stop() "
                :text="(o.state == 'started' ? 'Stop' : 'Start')"
                :type="(o.state == 'started' ? 'danger' : 'success')" />
              <ctrl-btn text="Connect" @click="o.toMaster()" />
              <ctrl-btn text="Log" @click="log(o)" />
            </cell>
          </cell>
        </cell>

        <cell cols="3">
          <cell cols="4">
            <ctrl-btn @click="initLfo()" text="Init LFO" />
            <ctrl-btn @click="toggleAll(lfos, true)" text="Start All" type="success" />
            <ctrl-btn @click="toggleAll(lfos, false)" text="Stop All" type="warning" />
            <ctrl-btn @click="log(cnxTargets)" text="Log" />
          </cell>
        </cell>

        <cell cols="4">
          <cell v-for="(l, i) in lfos" type="group" :key="l.mId">
            <cell>
              <h4 v-if="l.title" class="cell__title">{{ l.title }}</h4>
              <cell cols="2">
                <ctrl-select v-if="l._oscillator.baseType" v-model="l._oscillator.baseType" :props="oscProps" type="pill" />
                <cell type="wip">Note Frq</cell>
              </cell>
              <cell cols="4">
                <ctrl-dial v-if="l.amplitude" v-model="l.amplitude.value" :props="lfoProps.amp" />
                <ctrl-dial v-if="l._oscillator.frequency" v-model="l._oscillator.frequency.value" :props="lfoProps.freq" />
                <ctrl-dial v-if="l._oscillator.detune" v-model="l._oscillator.detune.value" :props="oscDetuneProps" />
                <ctrl-dial v-model="l._oscillator.partialCount" :props="oscPartialProps" />
              </cell>
              <cell cols="3">
                <ctrl-select :props="cnxTargets" type="pill" />
                <ctrl-select :props="oscModProps" type="pill" />
                <ctrl-btn @click="" text="Connect" />
              </cell>
              <cell v-if="l.cnx.o">
                <span v-for="(o, i) in l.cnx.o">{{ o.title ? o.title : 'No Title' }}</span>
              </cell>
              <cell v-else>Not Connected</cell>
            </cell>
            <cell cols="3" >
              <ctrl-btn @click="l._oscillator.state === 'stopped' ? l._oscillator.start() : l._oscillator.stop() "
                :text="(l.state == 'started' ? 'Stop' : 'Start')"
                :type="(l.state == 'started' ? 'danger' : 'success')" />
              <ctrl-btn @click="log(l)" type="warning" text="Log" />
            </cell>
          </cell>
        </cell>

      </cell>

    </div>
  </div>
</template>

<script>
  // Tone JS
  import Tone from 'tone'
  // Interfaces
  import Piano from './piano.vue'
  // Controls
  import CtrlCheck from './controls/check.vue'
  import CtrlSelect from './controls/select.vue'
  import CtrlRange from './controls/range.vue'
  import CtrlBtn from './controls/btn.vue'
  import CtrlDial from './controls/dial.vue'
  // Displays
  import Cell from './displays/cell.vue'

  // Sbox Modules
  import ModuleOsc from './modules/sbox/osc.vue'
  import ModuleLfo from './modules/sbox/lfo.vue'
  // Helpers
  export default {
    components: {
      Piano,
      ModuleOsc, ModuleLfo,
      CtrlCheck, CtrlSelect, CtrlRange, CtrlBtn, CtrlDial,
      Cell
    },
    data() {
      return {
        // OSC
        oscs: [],
        freqProps: {
          label: 'Freq',
          min: '20', max: '6000',
          step: '1', units: 'hz', dec: '0',
          reset: true
        },
        oscProps: {
          value: 'sine',
          label: 'Waveform',
          options: ['sine','triangle','square','sawtooth']
        },
        oscDetuneProps: {
          label: 'Detune',
          min: '-100', max: '100',
          steps: '1', units: 'cents',
          reset: true
        },
        oscPartialProps: {
          label: 'Partials',
          min: '0', max: '32',
          steps: '1', units: '',
          reset: true
        },
        volProps: {
          label: 'Volume',
          min: '-12', max: '12', step: '1',
          units: 'db', dec: '0', type: 'abs', reset: true
        },
        // LFOs
        lfos: [],
        lfoProps: {
          amp: {
            value: false,
            label: 'Amplitude',
            min: '0.00', max: '1.00', step: '0.01',
            units: '', dec: '2', reset: true
          },
          freq: {
            value: false,
            label: 'Frequency',
            min: '0.1', max: '20.0', step: '0.1',
            units: 'hz', dec: '1', reset: true
          }
        },
        // mod props
        oscModProps: {
          options: ['frequency', 'detune', 'volume', 'partialCount'],
          niceOptions: ['Freq', 'Detune', 'Vol', 'Partial Count']
        },
        lfoModProps: {
          options: ['frequency', 'amplitude'],
          niceOptions: ['Freq', 'Amp']
        },
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
      cnxTargets () {
        // returns name and ids of modules
        return {
          options: this.getModules.map(t => t.mId),
          niceOptions: this.getModules.map(t => t.title)
        }
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
      log(data) {
        console.log(data)
      },
      alert(data) {
        alert(data)
      },
      // local
      toggleAll(target, start) {
        if(!target) { return false }
        for(let i = 0; i < target.length; i++) {
          if(start){ target[i].start() }
          else { target[i].stop() }
        }
      },
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
        this.getModules.filter(t => t.mId === id)
      },
      getModuleCat (cat) {
        this.getModules.filter(t => t.catategory === cat)
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
      this.initOsc()
      // init lfos
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
