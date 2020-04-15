<template lang="html">
  <div class="synth">

    <div class="synth__rack">

      <header class="synth__header">
        <div class="synth__#">
          <h1>{{ synthTitle }}</h1>
          <input
          @input="updateSynthTitle($event.target.value)"
          @focus="setSynthPiano(false)"
          @blur="setSynthPiano(true)"
          :value="synthTitle" />
          <button @click="log(synth)">Log Synth</button>
          <button @click="log(modules)">Log All Modules</button>
        </div>
      </header>

      <div class="synth__section">
        <select v-model="newRoute.source">
          <option value="">Select Source</option>
          <option v-for="m in modules" v-if="m.obj" :value="m.obj">{{ m.obj.moduleId }}</option>
        </select>
        <select v-model="newRoute.sink">
          <option value="">Select Sink</option>
          <option value="Master">Master</option>
          <option v-for="m in modules" v-if="m.obj" :value="m.obj">{{ m.obj.moduleId }}</option>
        </select>
        <button @click="createRoute(newRoute.source, newRoute.sink)">Route Connection</button>
      </div>

      <div class="synth__section">
        <ul class="routes">
          <li v-for="r in routes" class="routes__item">
            {{ r.source.name }} => {{ r.sink.name }}
          </li>
        </ul>
      </div>

      <!-- Modules -->
      <div class="synth__row">
        <component v-for="m in modules" :is="m.type" :id="m.id" v-model="m.obj" :key="m.id" />
        <div class="synth__add">
          <h3>Add New Module</h3>
          <button @click="initModule('OmniOscillator')">Init Osc</button>
          <button @click="initModule('FilterModule')">Init Filt</button>
          <button @click="">Init Env</button>
        </div>

      </div>

    </div>

    <piano />

  </div>
</template>

<script>
  import Tone from 'tone'
  import Piano from './piano.vue'
  import OmniOscillator from './modules/omniOscillator.vue'
  import AmpEnvelope from './modules/ampEnvelope.vue'
  import FilterModule from './modules/filter.vue'
  export default {
    components: {
      Piano,
      OmniOscillator,
      AmpEnvelope,
      FilterModule
    },
    data () {
      return {
        synth: false,
        modules: [],
        newRoute: {
          source: '',
          sink: ''
        },
        routes: []
      }
    },
    computed: {
      // $store
      synthTitle () {
        return this.$store.state.synth.title
      }
    },
    methods: {
      // $store
      updateSynthTitle: function (value) {
        this.$store.commit('synth/updateTitle', value)
      },
      setSynthPiano: function (value) {
        this.$store.commit('synth/setPiano', value)
      },
      // local
      log: function(data) {
        console.log(data)
      },
      initModule: function(type, obj) {
        this.modules.push({ id: this.modules.length + 1, type: type, obj: obj || null })
      },
      // routing...
      createRoute: function(source, sink){
        if(!source || !sink) {
          alert('Select Source and Sink')
        } else {
          if(sink === 'Master'){
            source.toMaster()
            this.routes.push({
                source: { name: source.moduleId, module: source },
                sink: { name: 'Master', module: Tone.Master }
              })
          } else {
            source.connect(sink)
            this.routes.push({
              source: { name: source.moduleId, module: source },
              sink: { name: sink.moduleId, module: sink }
            })
          }
          if(source.category === 'oscillator'){
            source.start()
          }
          this.newRoute.source = ''
          this.newRoute.sink = ''
        }
      }
    },
    mounted: function () {
      this.initModule('AmpEnvelope')
      this.initModule('OmniOscillator')
      // this.initModule('FilterModule')
    }
  }
</script>


<style lang="sass">
  // Synth
  .synth
    min-height: 100vh
    padding-bottom: $blh * 6
    &__status
      padding-top: $blh/2
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
      margin-bottom: $blh/2
    &__row
      display: grid
      grid-template-columns: 1fr 1fr 1fr 1fr
      grid-gap: $blh/2
      margin-bottom: $blh/2
    &__add
      background: #fafafa
      border: dotted 2px #ddd
      font-size: 16px
      font-weight: 700
      color: #999
      text-align: center
      padding: $blh
      h3
        margin-bottom: $blh/2
      &:hover
        background: #eee
        border-color: #ccc
        cursor: pointer
        color: #666

  .routes
    display: block
    font-size: 12px
    padding: 0
    margin: 0
    &__item
      display: block
      margin-bottom: $blh/4
      &:last-child
        margin: 0

</style>
