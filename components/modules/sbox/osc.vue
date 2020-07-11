<template lang="html">
  <div v-if="value" :class="cssBlock" >
    <cell type="group">
      <cell v-if="settings.title" type="title">
        {{ settings.title }}</cell>
      <cell cols="2">
        <ctrl-select v-if="settings.baseType" v-model="settings.baseType" :props="params.oscType" type="pill" />
        <cell v-if="settings.frequency">
          <ctrl-btn :text="hzToNote(settings.frequency.value)" @click="setNoteValue(settings.frequency.value)" />
        </cell>
      </cell>
      <cell cols="4">
        <ctrl-dial v-if="settings.frequency" v-model="settings.frequency.value" :props="params.freq" />
        <ctrl-dial v-if="settings.detune" v-model="settings.detune.value" :props="params.detune" />
        <ctrl-dial v-if="false" v-model="settings.partialCount" :props="params.partialCount" />
        <ctrl-dial v-if="settings.volume" v-model="settings.volume.value" :props="params.vol" />
      </cell>
      <cell cols="3" >
        <ctrl-btn @click="settings.state === 'stopped' ? settings.start() : settings.stop() "
          :text="(settings.state == 'started' ? 'Stop' : 'Start')"
          :type="(settings.state == 'started' ? 'danger' : 'success')"
          toggle="true" />
        <ctrl-btn text="Connect" @click="setSink('Master')" toggle="true" />
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
        // Param Props
        params: {
          freq: {
            label: 'Freq',
            min: '20', max: '6000', step: '0.01',
            units: 'hz', dec: '2', reset: true
          },
          oscType: {
            value: 'sine', label: 'Waveform', options: ['sine','triangle','square','sawtooth']
          },
          detune: {
            label: 'Detune', min: '-100', max: '100', steps: '1', units: 'cents', reset: true
          },
          partialCount: {
            label: 'Partials', min: '0', max: '32', steps: '1', units: '', reset: true
          },
          vol: {
            label: 'Volume', min: '-12', max: '12', step: '1', units: 'db', dec: '0', type: 'abs', reset: true
          }
        }
      }
    },
    // mounted: function () { },
    methods: {
      setNoteValue (note) {
        this.settings.frequency.value = this.noteToHz(note)
      }
    },
    computed: {
      debugData () {
        let s = this.settings
        let data = 'Freq: '+s.frequency.value
        data += ', '+' Detune: '+s.detune.value
        return data
      }
    }
  }
</script>
