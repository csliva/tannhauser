<template lang="html">
  <div class="new-module" v-if="value">
    <cell type="group-success">
      <h4 v-if="settings.title" class="cell__title">{{ settings.title }}</h4>
      <cell cols="2">
        <ctrl-select v-if="settings._oscillator.baseType" v-model="settings._oscillator.baseType" :props="oscProps" type="pill" />
        <cell type="wip">Note Frq</cell>
      </cell>
      <cell cols="4">
        <ctrl-dial v-if="settings.amplitude" v-model="settings.amplitude.value" :props="lfoProps.amp" />
        <ctrl-dial v-if="settings._oscillator.frequency" v-model="settings._oscillator.frequency.value" :props="lfoProps.freq" />
        <ctrl-dial v-if="settings._oscillator.detune" v-model="settings._oscillator.detune.value" :props="oscDetuneProps" />
        <ctrl-dial v-model="settings._oscillator.partialCount" :props="oscPartialProps" />
      </cell>
      <cell cols="3" >
        <ctrl-btn @click="settings._oscillator.state === 'stopped' ? settings._oscillator.start() : settings._oscillator.stop() "
          :text="(settings.state == 'started' ? 'Stop' : 'Start')"
          :type="(settings.state == 'started' ? 'danger' : 'success')"
          toggle="true" />
        <ctrl-btn @click="toggleDebug()" type="danger" text="Debug" toggle="true" />
      </cell>
      <cell v-if="debug.active" type="well">
        {{ debugData }}
      </cell>

      <!--
        <cell cols="3">
          <ctrl-select :props="cnxTargets" type="pill" />
          <ctrl-select :props="oscModProps" type="pill" />
          <ctrl-btn @click="" text="Connect" />
        </cell>
        <cell v-if="settings.cnx.o">
          <span v-for="(o, i) in l.cnx.o">{{ o.title ? o.title : 'No Title' }}</span>
        </cell>
        <cell v-else>Not Connected</cell>
      -->

    </cell>
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
    computed: {
      debugData () {
        let s = this.settings
        let data = 'LFO Amp: '+s.amplitude.value
        data += ', LFO Freq: '+s._oscillator.frequency.value
        data += ', '+' LFO Detune: '+s._oscillator.detune.value
        return data
      }
    }
  }
</script>
