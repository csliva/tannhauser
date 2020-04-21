<template lang="html">
  <div class="module" :class="{ 'module--hidden' : !active}" >
    <header class="module__header">
      <h2 class="module__title">{{ title }}</h2>
      <small class="module__category">Master Output</small>
    </header>
    <main class="module__main">

      <cell gap="md" type="parent">

        <cell cols="2" gap="lg">
          <cell >
            <disp-graph v-model="combinedAdsr" />
          </cell>
          <cell cols="4">
            <cell>
              <ctrl-dial v-if="dial.value" v-model="dial.value" :props="dial.props" />
            </cell>
            <cell>
              <ctrl-dial v-if="dial2.value" v-model="dial2.value" :props="dial2.props" />
            </cell>
            <cell>
              <ctrl-dial v-if="dial3.value" v-model="dial3.value" :props="dial3.props" />
            </cell>
            <cell>
              <ctrl-dial v-if="dial4.value" v-model="dial4.value" :props="dial4.props" />
            </cell>
          </cell>
        </cell>

        <cell cols="2" gap="lg">
          <cell cols="4" type="group-success" gap="sm" title="ADSR Envelope">
            <cell gap="xs">
              <ctrl-dial v-if="adsr.a.value" v-model="adsr.a.value" :props="adsr.a" />
              <ctrl-select v-if="adsr.aCurve.value" v-model="adsr.aCurve.value" :props="adsr.aCurve" />
            </cell>
            <cell gap="xs">
              <ctrl-dial v-if="adsr.d.value" v-model="adsr.d.value" :props="adsr.d" />
              <ctrl-select v-if="adsr.dCurve.value" v-model="adsr.dCurve.value" :props="adsr.dCurve" />
            </cell>
            <cell gap="xs">
              <ctrl-dial v-if="adsr.s.value" v-model="adsr.s.value" :props="adsr.s" />
            </cell>
            <cell gap="xs">
              <ctrl-dial v-if="adsr.r.value" v-model="adsr.r.value" :props="adsr.r" />
              <ctrl-select v-if="adsr.rCurve.value" v-model="adsr.rCurve.value" :props="adsr.rCurve" />
            </cell>
          </cell>
          <cell>
            <cell cols="2">
              <cell>
                <ctrl-select v-if="selects.wave.value" v-model="selects.wave.value" :props="selects.wave" type="pill"/>
              </cell>
              <cell>
                <ctrl-select v-if="selects.wave.value" v-model="selects.wave.value" :props="selects.wave" type="pill,alt"/>
              </cell>
            </cell>
            <cell cols="2">
              <cell>
                <ctrl-select v-if="selects.wave.value" v-model="selects.wave.value" :props="selects.wave" type="well" />
              </cell>
              <cell>
                <ctrl-select v-if="selects.wave.value" v-model="selects.wave.value" :props="selects.wave" type="well" />
              </cell>
            </cell>
          </cell>
        </cell>

        <cell cols="2" gap="lg">
          <cell cols="2">
            <cell type="test">Param</cell>
            <cell type="test">Param</cell>
          </cell>
          <cell cols="4" gap="na">
            <cell type="test">Param</cell>
            <cell type="test">Param</cell>
            <cell type="test">Param</cell>
            <cell type="test">Param</cell>
          </cell>
        </cell>

        <cell cols="2" gap="lg">
          <cell cols="2-6">
            <cell type="test">Param</cell>
            <cell type="test">Param</cell>
          </cell>
          <cell cols="5-3">
            <cell type="test">Param</cell>
            <cell type="test">Param</cell>
          </cell>
        </cell>

      </cell>


    </main>
    <footer class="module__footer">
      <button class="module__toggle" @click="log(settings)">Log</button>
      <button class="module__toggle module__toggle--warning" @click="debug = !debug">Debug</button>
    </footer>
  </div>
</template>

<script>
  import Tone from 'tone'
  // Module...
  import Module from './_module.vue'
  // Controls
  import CtrlButton from '../controls/button.vue'
  import CtrlRange from '../controls/range.vue'
  import CtrlSelect from '../controls/select.vue'
  import CtrlDial from '../controls/dial.vue'
  // Displays
  import Cell from '../displays/cell.vue'
  import DispGraph from '../displays/adsrGraph.vue'
  export default {
    extends: Module,
    components: { CtrlButton, CtrlRange, CtrlSelect, CtrlDial, Cell, DispGraph },
    data () {
      return {
        title: 'Master',
        // Dial Sample
        dials: {},
        dial: {
          value: '50',
          props: {
            label: 'Normal',
            min: '0', max: '100', step: '1',
            units: '', dec: '0', type: '', reset: true
          }
        },
        dial2: {
          value: '120',
          props: {
            label: 'Rotation',
            min: '0', max: '180', step: '1',
            units: 'deg', dec: '0', type: 'alt', reset: true
          }
        },
        dial3: {
          value: '1.15',
          props: {
            label: 'Time',
            min: '0.01', max: '4.00', step: '0.01',
            units: 'sec', dec: '2', type: '', reset: true
          }
        },
        dial4: {
          value: '0',
          props: {
            label: 'Gain',
            min: '-12', max: '12', step: '1',
            units: 'db', dec: '0', type: 'abs', reset: true
          }
        },
        // adsr Sample
        adsr: {
          a: {
            value: '0.03',
            label: 'Attack',
            min: '0.01', max: '2.00', step: '0.01',
            units: 'sec', dec: '2'
          },
          aCurve: {
            value: 'linear',
            options: ['linear', 'exponential', 'sine', 'cosine', 'bounce', 'ripple', 'step'],
            niceOptions: ['Linear', 'Exp.', 'Sine', 'Cosine', 'Bounce', 'Ripple', 'Step']
          },
          d: {
            value: '0.16',
            label: 'Decay',
            min: '0.01', max: '2.00', step: '0.01',
            units: 'sec', dec: '2'
          },
          dCurve: {
            value: 'exponential',
            options: ['linear', 'exponential'],
            niceOptions: ['Linear', 'Exp.']
          },
          s: {
            value: '0.65',
            label: 'Sustain',
            min: '0.01', max: '1.00', step: '0.01',
            units: 'nr%', dec: '2'
          },
          r: {
            value: '0.85',
            label: 'Release',
            min: '0.01', max: '4.00', step: '0.01',
            units: 'sec', dec: '2'
          },
          rCurve: {
            value: 'exponential',
            options: ['linear', 'exponential', 'sine', 'cosine', 'bounce', 'ripple', 'step'],
            niceOptions: ['Linear', 'Exp.', 'Sine', 'Cosine', 'Bounce', 'Ripple', 'Step']
          }
        },
        selects: {
          wave: {
            value: 'sine',
            label: 'Wave Type',
            options: ['sine','triangle','square','sawtooth'],
            niceOptions: ['Sine','Triangle','Square','Sawtooth']
          }
        }
      }
    },
    computed: {
      combinedAdsr () {
        let a = this.adsr.a,
            d = this.adsr.d,
            s = this.adsr.s,
            r = this.adsr.r
        return {
          a: a.value, aMin: a.min, aMax: a.max,
          d: d.value, dMin: d.min, dMax: d.max,
          s: s.value, sMin: s.min, sMax: s.max,
          r: r.value, rMin: r.min, rMax: r.max
        }
      }
    },
    mounted: function() {
      // mounted Stuff
    }
  }
</script>
