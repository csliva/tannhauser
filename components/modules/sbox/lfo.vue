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
      <!-- <cell cols="2" gap="sm">
        <ctrl-select v-if="cnxSelected" v-model="cnxSelected" :props="cnxTargets" type="pill" />
        <ctrl-select v-model="cnxSelectedParam" :props="getCnxParams" type="pill" />
      </cell>
      <cell>
        {{ cnxSelected.title +' - '+cnxSelectedParam }}
      </cell> -->
      <cell cols="3" >
        <ctrl-btn @click="settings._oscillator.state === 'stopped' ? settings._oscillator.start() : settings._oscillator.stop() "
          :text="(settings.state == 'started' ? 'Stop' : 'Start')"
          :type="(settings.state == 'started' ? 'danger' : 'success')"
          toggle="true" />
        <ctrl-btn @click="toggleDebug()" type="danger" text="Debug" toggle="true" />
      </cell>
      <div v-if="debug.active" :class="cssEl('debug')">
        <small>{{ settings.uid }}</small>
        <div>{{ debugData }}</div>
        <ctrl-btn @click="log(settings)" type="danger" text="Log" />
      </div>
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
        //,
        // Track Target Selections
        // cnxSelected: this.targets[0],
        // cnxSelectedParam: false,
        // cnxOscParams: {
        //   options: ['frequency', 'detune', 'partialCount'],
        //   niceOptions: ['Freq', 'Detune', 'Partial #']
        // },
        // cnxLfoParams: {
        //   options: ['amplitude', 'frequency'],
        //   niceOptions: ['Amp', 'Freq']
        // }
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
      cnxTargets () {
        // returns name and ids of modules
        // if(this.targets.length){
        //   return {
        //     options: this.targets,
        //     niceOptions: this.targets.map(t => t.title)
        //   }
        // }
      },
      getCnxParams () {
        if (this.cnxSelected.category === 'oscillator') {
          return this.cnxOscParams
        } else if (this.cnxSelected.category === 'lfo') {
          return this.cnxLfoParams
        } else {
          return false
        }
      }
    }
  }
</script>
