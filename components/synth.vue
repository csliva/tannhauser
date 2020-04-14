<template lang="html">
  <div class="synth">
    <!-- <test-state /> -->
    <div v-if="synth" class="synth__rack">
      <header class="synth__header">
        <h1>Synth Rack</h1>
        <button @click="log(synth)">Log Synth</button>
        <nav class="synth__nav">
          <button @click="initOmniOsc">Init Osc (#{{ oscMods.length }})</button>
          <button @click="initFilter">Init Filter (#{{ filterMods.length }})</button>
          <button @click="initEnv">Init Env (#{{ envMods.length }})</button>
        </nav>
      </header>
      <div class="synth__row" v-if="oscMods.length">
        <div v-for="m in oscMods"
        class="module" :class="{ 'module--highlight': m.highlight, 'module--disconnected': !m.to }"
        @mouseover="highlight(m.to, true)"
        @mouseleave="highlight(m.to, false)" >
          <h2>{{ m.name }} (ID: {{ m.id }})</h2>
          <div class="module__section" v-if="false">
            Status:
            <span class="module__info" :class="{ 'module__info--danger' : m.unit.state === 'stopped' }">
              {{ m.unit.state }}
            </span>
          </div>
          <div class="module__row">
            <label>Type</label>
            <select v-model="m.unit.type">
              <option>sine</option>
              <option>square</option>
              <option>triangle</option>
              <option>sawtooth</option>
            </select>
          </div>
          <div class="module__row">
            Routed:
            <span class="module__info" :class="{ 'module__info--danger' : m.to === false }">
              {{ m.to.name ? m.to.name : 'Not Routed'  }}
            </span>
          </div>
          <span class="module__row">
            <select @change="changeConnection(m, $event.target.value)">
              <option value="false" :selected="m.to ? false : true">
                None
              </option>
              <option v-for="env in envMods" :key="env.id"
              :selected="m.to.id === env.id ? true : false" :value="env.id">
                {{ env.name }}
              </option>
            </select>
          </span>
          <button @click="log(m.unit)">Log Unit</button>
          <button @click="m.unit.mute = !m.unit.mute">{{ m.unit.mute ? 'Un-Mute' : 'Mute'}}</button>
        </div>
      </div>

      <div class="synth__row" v-if="filterMods.length">
        <div v-for="m in filterMods"
        class="module" :class="{ 'module--highlight': m.highlight }" >
          <h2>{{ m.name }} <i>(ID: {{ m.id }})</i></h2>
          <div class="module__row">
            freq: <input type="range" v-model="m.unit.frequency.value" min="20" max="4000" step="1">
            {{ m.unit.frequency.value }}
          </div>
          <div class="module__row" v-if="m.unit.filterEnvelope">
            <div class="">
              a: <input type="range" v-model="m.unit.filterEnvelope.attack" min="0.01" max="2.00" step="0.01">
              {{ m.unit.filterEnvelope.attack }}
            </div>
            <div class="">
              d: <input type="range" v-model="m.unit.filterEnvelope.decay" min="0.01" max="2.00" step="0.01">
              {{ m.unit.filterEnvelope.decay }}
            </div>
            <div class="">
              s: <input type="range" v-model="m.unit.filterEnvelope.sustain" min="0.01" max="1.00" step="0.01">
              {{ m.unit.filterEnvelope.sustain }}
            </div>
            <div class="">
              r: <input type="range" v-model="m.unit.filterEnvelope.release" min="0.01" max="4.00" step="0.01">
              {{ m.unit.filterEnvelope.release }}
            </div>
          </div>
          <div class="module__row">
            Routed:
            <span class="module__info" :class="{ 'module__info--danger' : m.to === false }">
              {{ m.to.name ? m.to.name : 'Not Routed'  }}
            </span>
          </div>

          <span class="module__row">
            <select @change="changeConnection(m, $event.target.value)">
              <option value="false" :selected="m.to ? false : true">
                None
              </option>
              <option v-for="osc in oscMods" :key="osc.id"
              :selected="m.to.id === osc.id ? true : false" :value="osc.id">
                {{ osc.name }}
              </option>
              <option v-for="env in envMods" :key="env.id"
              :selected="m.to.id === env.id ? true : false" :value="env.id">
                {{ env.name }}
              </option>
            </select>
          </span>
          <button @click="log(m.unit)" >Log Unit</button>
        </div>
      </div>

      <div class="synth__row" v-if="envMods.length">
        <div v-for="m in envMods"
        class="module" :class="{ 'module--highlight': m.highlight }" >
          <h2>{{ m.name }} (ID: {{ m.id }})</h2>
          <div class="module__row">
            <div class="">
              a: <input type="range" v-model="m.unit.attack" min="0.01" max="2.00" step="0.01" />
              {{ m.unit.attack }}
            </div>
            <div class="">
              d: <input type="range" v-model="m.unit.decay" min="0.01" max="2.00" step="0.01" />
              {{ m.unit.decay }}
            </div>
            <div class="">
              s: <input type="range" v-model="m.unit.sustain" min="0.01" max="1.00" step="0.01" />
              {{ m.unit.sustain }}
            </div>
            <div class="">
              r: <input type="range" v-model="m.unit.release" min="0.01" max="4.00" step="0.01" />
              {{ m.unit.release }}
            </div>
          </div>
          <button @click="log(m.unit)" >Log Unit</button>
        </div>
      </div>
    </div>
    <div v-else class="synth__error">
      <p>No Synth Loaded...</p>
    </div>
    <piano v-if="synth" v-model="synth" />
  </div>
</template>

<script>
  import Tone from 'tone'
  import Piano from './piano.vue'
  import TestState from './tests/state.vue'
  export default {
    components: { Piano, TestState },
    data () {
      return {
        synth: {},
        modules: [],
        routes: []
      }
    },
    computed: {
      nextOscNum: function (){
        return 0
      },
      // categories
      modCat: function(cat) {
        return this.modules.filter(module => module.category === cat)
      },
      oscMods: function() {
        return this.modules.filter(module => module.category === 'oscillator')
      },
      filterMods: function() {
        return this.modules.filter(module => module.category === 'filter')
      },
      envMods: function() {
        return this.modules.filter(module => module.category === 'envelope')
      },
      destinationMods: function (){
        return this.filterMods.concat(this.envMods)
      },
      modId: function(){
        return this.modules.length ? (this.modules.length + 1) : 1
      }
    },
    methods: {
      log: function(data) {
        console.log(data)
      },
      // Get Module by ID
      getModById: function(id) {
        return this.modules.filter(m => m.id == id)
      },
      // Init Modules
      initOmniOsc: function(){
        let osc = new Tone.OmniOscillator()
        osc.start()
        this.modules.push(
          {
            id: this.modId,
            name: 'OmniOsc '+(this.oscMods.length + 1),
            category: 'oscillator',
            unit: osc,
            to: false,
            highlight: false
          }
        )
      },
      initFilter: function(){
        let filter = new Tone.Filter()
        filter.filterEnvelope = new Tone.FrequencyEnvelope()
        filter.filterEnvelope.connect(filter.frequency)
        this.modules.push(
          {
            id: this.modId,
            name: 'Filter '+ (this.filterMods.length + 1),
            category: 'filter',
            unit: filter,
            to: false,
            highlight: false
          }
        )
      },
      initEnv: function(){
        let env = new Tone.Envelope()
        this.modules.push(
          {
            id: this.modId,
            name: 'Envelope '+ (this.envMods.length + 1),
            category: 'envelope',
            unit: env,
            to: false,
            highlight: false
          }
        )
      },
      // Routing
      connect: function (source, destination) {
        if(destination){
          source.to = destination
          source.unit.connect(destination.unit)
          source.to.highlight = true
        }
      },
      disconnect: function (source) {
        if(source.to){
          source.to.highlight = false
          source.to = false
          source.unit.disconnect(source.to.unit)
        }
      },
      changeConnection: function (source, id) {
        let destination = this.getModById(id)
        if(source.to){ this.disconnect(source) }
        if(id){ this.connect(source, destination[0]) }
      },
      highlight: function(module, state){
        if(module) {
          module.highlight = state
        }
      }
    },
    mounted: function () {
      // Init Synth
      this.synth = new Tone.Synth().toMaster()
      this.modules.push(
        {
          id: this.modId,
          name: 'AmpEnv 1',
          category: 'envelope',
          unit: this.synth.envelope,
          to: this.synth,
          highlight: false
        }
      )
      this.modules.push(
        {
          id: this.modId,
          name: 'OmniOsc 1',
          category: 'oscillator',
          unit: this.synth.oscillator,
          to: this.modules[0],
          highlight: false
        }
      )
      this.initFilter()
    }
  }
</script>


<style lang="sass">
  // Synth
  .synth
    // border: solid 1px red
    min-height: 100vh
    padding-bottom: $blh * 6
    &__rack
      display: block
      position: relative
      padding: $blh
    &__section
      margin-bottom: $blh/2
    &__header
      margin-bottom: $blh/2
      vertical-align: middle
      h1
        vertical-align: middle
        display: inline-block
        margin: 0
        margin-right: $blh/2
      button
        vertical-align: middle
    &__nav
      display: block
      padding-top: $blh/2
    &__row
      display: grid
      grid-template-columns: 1fr 1fr 1fr 1fr
      grid-gap: $blh/2
      margin-bottom: $blh/2

  // Temp
  .module
    color: #333
    border: solid 2px #ccc
    padding: $blh/2
    &--disconnected
      color: #666
      border-color: #eee
    h2
      font-size: 18px
      margin-bottom: $blh/4
    &__row
      display: block
      margin-bottom: $blh/4
    &:hover
      border-color: blue
    &--highlight
      border-color: purple
    &__section
      display: block
      margin-bottom: $blh/4
    &__info
      color: blue
      &--danger
        color: red
</style>
