<template lang="html">
  <div class="sandbox">

    <div class="sandbox__inner">
      <h2>Sandbox</h2>
      <cell>
        <cell cols="3">
          <cell cols="4">
            <button class="btn" @click="initOsc()"><span>Init Osc</span></button>
            <button class="btn btn--success" @click="toggleAll(oscs, true)"><span>Start All</span></button>
            <button class="btn btn--warning" @click="toggleAll(oscs, false)"><span>Stop All</span></button>
            <button class="btn" @click="log(oscs)"><span>Log Oscs</span></button>
          </cell>
        </cell>
        <cell cols="3">
          <cell v-for="(o, i) in oscs" :type="(i % 2 == 1) ? 'group-success' : 'group'" :title="( 'Osc #'+(i+1) )" :key="( 'osc-#'+(i+1) )">
            <cell cols="3">
              <label>Fq:
                <span v-if="o.frequency" class="hlt">{{ o.frequency.value | round }}</span> hz
              </label>
              <ctrl-select v-if="o.baseType" v-model="o.baseType" :props="oscProps" type="pill" />
            </cell>
            <cell cols="4">
              <ctrl-dial v-if="o.frequency" v-model="o.frequency.value" :props="freqProps" />
              <ctrl-dial v-if="o.detune" v-model="o.detune.value" :props="oscDetuneProps" />
              <ctrl-dial v-model="o.partialCount" :props="oscPartialProps" />
              <ctrl-dial v-if="o.volume" v-model="o.volume.value" :props="volProps" />
            </cell>
            <cell cols="4" >
              <button class="btn" :class="{'btn--active btn--danger': o.state == 'started', 'btn--success' : o.state == 'stopped' }"
               @click="o.state === 'stopped' ? o.start() : o.stop() ">
                <span>{{ o.state === 'stopped' ? 'Start' : 'Stop' }}</span>
              </button>
              <button class="btn btn--warning" @click="log(o)">
                <span>Log</span>
              </button>
            </cell>
          </cell>
        </cell>
        <cell cols="3">
          <cell cols="4">
            <button class="btn" @click="initLfo()"><span>Init LFO</span></button>
            <button class="btn btn--success" @click="toggleAll(lfos, true)"><span>Start All</span></button>
            <button class="btn btn--warning" @click="toggleAll(lfos, false)"><span>Stop All</span></button>
            <button class="btn" v-if="lfoProps" @click="log(lfoProps.cnxTargets)"><span>Log</span></button>
          </cell>
        </cell>
        <cell cols="3">
          <cell v-for="(l, i) in lfos" :type="(i % 2 == 0) ? 'group-success' : 'group'" :title="( 'LFO #'+(i+1) )" :key="( 'lfo-#'+(i+1) )">
            <cell>
              <cell cols="3">
                <label>Fq:
                  <span v-if="l.frequency" class="hlt">{{ l.frequency.value }}</span> hz
                </label>
                <ctrl-select v-if="l._oscillator.baseType" v-model="l._oscillator.baseType" :props="oscProps" type="pill" />
              </cell>

              <cell cols="4">
                <ctrl-dial v-if="l.amplitude" v-model="l.amplitude.value" :props="lfoProps.amp" />
                <ctrl-dial v-if="l._oscillator.frequency" v-model="l._oscillator.frequency.value" :props="lfoProps.freq" />
                <ctrl-dial v-if="l._oscillator.detune" v-model="l._oscillator.detune.value" :props="oscDetuneProps" />
                <ctrl-dial v-model="l._oscillator.partialCount" :props="oscPartialProps" />
              </cell>
              <cell cols="5-3">
                <ctrl-select v-model="lfoProps.cnxTargets.value" :props="lfoProps.cnxTargets" type="pill" />
                <button class="btn" @click="cnxModule(l, lfoProps.cnxTargets.value)">
                  <span>Connect Target</span>
                </button>
              </cell>

              <cell>
                <cell>
                  <span v-if="l.cnx.o.length" v-for="(o, i) in l.cnx.o">
                    <span v-if="o">
                      {{ o.title ? o.title : 'No Title' }}
                    </span>
                  </span>
                  <span else >No Connections</span>
                </cell>
              </cell>
            </cell>
            <cell cols="4" >
              <button class="btn" :class="{'btn--active btn--danger': l._oscillator.state == 'started', 'btn--success' : l._oscillator.state == 'stopped' }"
               @click="l._oscillator.state === 'stopped' ? l._oscillator.start() : l._oscillator.stop() ">
                <span>{{ l._oscillator.state === 'stopped' ? 'Start' : 'Stop' }}</span>
              </button>
              <button class="btn btn--warning" @click="log(l)">
                <span>Log</span>
              </button>
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
  // Modules
  import MasterOutput from './modules/master.vue'
  import OmniOscillator from './modules/omniOscillator.vue'
  import AmpEnvelope from './modules/ampEnvelope.vue'
  import FilterModule from './modules/filter.vue'
  // Controls
  import CtrlCheck from './controls/check.vue'
  import CtrlSelect from './controls/select.vue'
  import CtrlRange from './controls/range.vue'
  import CtrlButton from './controls/button.vue'
  import CtrlDial from './controls/dial.vue'
  // Displays
  import Cell from './displays/cell.vue'
  // Helpers
  export default {
    components: {
      Piano,
      MasterOutput, OmniOscillator, AmpEnvelope, FilterModule,
      CtrlCheck, CtrlSelect, CtrlRange, CtrlButton, CtrlDial,
      Cell
    },
    data() {
      return {
        // OSC
        oscs: [],
        freqProps: {
          label: 'Freq',
          min: '20', max: '6000',
          step: '1',units: 'hz',
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
          },
          cnxTargets: {
            options: [],
            niceOptions: []
          }
        }
      }
    },
    watch: {
      oscs() {
        this.getOscParams()
      }
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
        for(let i = 0; i < target.length; i++){
          if(start){ target[i].start() }
          else { target[i].stop() }
        }
        console.log('man i need sleep')
      },
      initOsc(tone) {
        let osc = new Tone.OmniOscillator({
          type: 'sine', frequency: (tone || 'C5')
        })
        osc.title = 'Osc #'+ (this.oscs.length + 1)
        this.oscs.push(osc)
      },
      initLfo() {
        let lfo = new Tone.LFO()
        lfo.title = 'LFO #'+ (this.lfos.length + 1)
        lfo.cnx = {i: [], o: [] }
        this.lfos.push(lfo)
      },
      // build list of parameters
      getOscParams () {
        let params = [], paramTitles = []
        if(this.oscs){
          for(let i = 0; i < this.oscs.length; i++){
            let p = this.oscs[i]
            params.push(p.frequency.value)
            paramTitles.push(p.title+' Frequency')
            params.push(p.detune.value)
            paramTitles.push(p.title+' Detune')
            params.push(p.volume.value)
            paramTitles.push(p.title+' Volume')
          }
          this.lfoProps.cnxTargets.options = params
          this.lfoProps.cnxTargets.niceOptions = paramTitles
          this.lfoProps.cnxTargets.value = this.lfoProps.cnxTargets.options[0]
        }
      },
      cnxModule (outP, inP) {
        outP.connect(inP)
        outP.cnx.o.push(inP)
      }
    },
    mounted () {
      this.initOsc('C5')
      this.initOsc('E5')
      this.initOsc('G5')
      this.initLfo()
      // get param list
      this.getOscParams()
      if(this.oscs.length < 1){
        this.cnxModule(this.oscs[0], Tone.Master)
      }
    },
    filters: {
      round (num) {
        return num.toFixed(0)
      }
    }
  }
</script>

<style lang="sass">
  .sandbox
    display: block
    height: 100vh
    overflow-y: auto
    background-color: clr2('indigo')
    &__inner
      padding: $blh $blh*2
      min-height: 100vh
    &__list
      padding: 0
      margin: 0 0 $blh/2
    &__item
      display: inline-block

  // btn - incorporate or move out of template
  .btn
    @include transition(background-color, color)
    display: block
    position: relative
    z-index: 10
    appearance: none
    -webkit-appearance: none
    background-color: clr2('indigo', 0, 10%)
    border: solid 1px clr2('indigo', 0, 10%)
    border-radius: $blh
    padding: 0 $blh/4
    color: transparentize(#fff, 0.35)
    text-align: center
    font-size: 12px
    text-shadow: 0 0 2px clr2('indigo', 0, 10%)
    line-height: $blh
    span
      position: relative
      z-index: 30
      display: inline-block
      padding-top: 1px
    &:focus
      outline: 0
    &:before,
    &:after
      @include transition(opacity)
      content: ''
      position: absolute
      width: 100%
      height: 100%
      top: 0
      left: 0
      border-radius: $blh
    &:before
      opacity: 0
      z-index: 0
      border: solid 1px clr2('blue', 0, -10%)
      background: linear-gradient(-45deg, clr2('blue', 0.25, -5%), clr2('blue', 0, -10%), clr2('blue', 0.25, -20%))
      @include neuMorphOuter(clr2('indigo', 0.25, 10%), clr2('indigo', 0.25, -10%))
    &:after
      opacity: 1
      z-index: 20
      @include neuMorphInner(clr2('indigo', 0.5, 10%), clr2('indigo', 0.5, -10%))
    &--success
      &:before
        border: solid 1px clr2('mint', 0, -10%)
        background: linear-gradient(-45deg, clr2('mint', 0.25, -5%), clr2('mint', 0, -10%), clr2('mint', 0.25, -20%))
    &--warning
      &:before
        border: solid 1px clr2('orange', 0, -10%)
        background: linear-gradient(-45deg, clr2('orange', 0.25, -5%), clr2('orange', 0, -10%), clr2('orange', 0.25, -20%))
    &--danger
      &:before
        border: solid 1px clr2('pink', 0, -10%)
        background: linear-gradient(-45deg, clr2('pink', 0.25, -5%), clr2('pink', 0, -10%), clr2('pink', 0.25, -20%))
    &:hover,
    &--active
      cursor: pointer
      background-color: transparent
      color: #fff
      &:before
        opacity: 1
      &:after
        opacity: 0
  // hlt = highlight
  .hlt
    color: clr2('mint', 0, 15%)
    display: inline-block
    padding: 0 $blh/8

</style>
