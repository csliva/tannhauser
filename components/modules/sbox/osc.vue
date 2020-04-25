<template lang="html">
  <div class="new-module" v-if="value">
    <cell type="group">
      <h4 v-if="settings.title" class="cell__title">{{ settings.title }}</h4>
      <cell cols="2">
        <ctrl-select v-if="settings.baseType" v-model="settings.baseType" :props="oscProps" type="pill" />
        <cell type="wip">Note: {{ hzToNote }}</cell>
      </cell>
      <cell cols="4">
        <ctrl-dial v-if="settings.frequency" v-model="settings.frequency.value" :props="freqProps" />
        <ctrl-dial v-if="settings.detune" v-model="settings.detune.value" :props="oscDetuneProps" />
        <ctrl-dial v-model="settings.partialCount" :props="oscPartialProps" />
        <ctrl-dial v-if="settings.volume" v-model="settings.volume.value" :props="volProps" />
      </cell>
      <cell cols="3" >
        <ctrl-btn @click="settings.state === 'stopped' ? settings.start() : settings.stop() "
          :text="(settings.state == 'started' ? 'Stop' : 'Start')"
          :type="(settings.state == 'started' ? 'danger' : 'success')"
          toggle="true" />
        <ctrl-btn text="Connect" @click="settings.toMaster()" toggle="true" />
        <ctrl-btn @click="toggleDebug()" type="danger" text="Debug" toggle="true" />
      </cell>
      <cell v-if="debug.active" type="debug">
        {{ debugData }}
        <ctrl-btn @click="log(settings)" type="danger" text="Log" />
      </cell>
    </cell>
  </div>
</template>

<script>
  // Tone JS
  import Tone from 'tone'
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
        }
      }
    },
    methods: {
      noteToHz (hz) {
        // return Tone.Frequency(hz).toFrequency()
      }
    },
    computed: {
      debugData () {
        let s = this.settings
        let data = 'Freq: '+s.frequency.value
        data += ', '+' Detune: '+s.detune.value
        return data
      },
      hzToNote () {
        return Tone.Frequency(this.settings.frequency.value).toNote()
      }
    }
  }
</script>
