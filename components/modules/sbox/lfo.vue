<template lang="html">
  <div v-if="value" :class="cssBlock" >
    <cell type="group-success">
      <cell v-if="settings.title" type="title">{{ settings.title }}</cell>
      <cell cols="2">
        <ctrl-select v-if="settings._oscillator.baseType" v-model="settings._oscillator.baseType" :props="oscProps" type="pill" />
        <cell type="wip">Note Frq</cell>
      </cell>
      <cell cols="4">
        <ctrl-dial v-if="sAmp" v-model="sAmp.value" :props="lfoProps.amp" />
        <ctrl-dial v-if="sOFrq" v-model="sOFrq.value" :props="lfoProps.freq" />
        <ctrl-dial v-if="sODetune" v-model="sODetune.value" :props="oscDetuneProps" />
        <ctrl-dial v-model="sOPartCnt" :props="oscPartialProps" />
      </cell>
      <cell cols="3" >
        <ctrl-btn @click="settings._oscillator.state === 'stopped' ? settings._oscillator.start() : settings._oscillator.stop() "
          :text="(settings.state == 'started' ? 'Stop' : 'Start')"
          :type="(settings.state == 'started' ? 'danger' : 'success')"
          toggle="true" />
        <ctrl-btn @click="toggleDebug()" type="danger" text="Debug" toggle="true" />
      </cell>
      <cell cols="2">
        <cell>
          <span v-if="(level == -Infinity)">No signal</span>
          <span v-else >{{ 'Level: '+level }}</span>
        </cell>
        <cell>Sink: {{ sink ? sink : 'None' }}</cell>
      </cell>
    </cell>
    <small>{{ settings.uid }}</small>
    <div v-if="debug.active" :class="cssEl('debug')">
      <small>Meter: {{ settings.meter.uid }}</small>
      <div>{{ debugData }}</div>
      <ctrl-btn @click="log(settings)" type="simple" text="Log to Console" />
    </div>
  </div>
</template>

<script>
  // import components from '../../controls/_index.js'
  import CtrlDial from '../../controls/dial.vue'
  import CtrlSelect from '../../controls/select.vue'
  import CtrlBtn from '../../controls/btn.vue'
  import Cell from '../../displays/cell.vue'
  import Module from './_module.vue'
  export default {
    components: { Cell, CtrlDial, CtrlSelect, CtrlBtn },
    extends: Module,
    data () {
      return {
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
        }
      }
    },
    // mounted () {},
    computed: {
      // Shortcuts
      sAmp () {
        return this.settings.amplitude
      },
      sOFrq () {
        return this.settings._oscillator.frequency
      },
      sODetune () {
        return this.settings._oscillator.detune
      },
      sOPartCnt () {
        return this.settings._oscillator.partialCount
      },
      // Debug
      debugData () {
        let s = this.settings
        let data = 'LFO Amp: '+s.amplitude.value
        data += ', LFO Freq: '+s._oscillator.frequency.value
        data += ', '+' LFO Detune: '+s._oscillator.detune.value
        // data += ', '+' Target: '+this.cnxSelected.title
        return data
      },
      // Connections

    }
  }
</script>
