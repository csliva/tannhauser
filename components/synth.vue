<template lang="html">
  <div class="synth">

      <header class="synth__header">
        <div class="synth__#">
          <h1>{{ synthTitle }}</h1>
          <input
          @input="updateSynthTitle($event.target.value)"
          @focus="setSynthPiano(false)"
          @blur="setSynthPiano(true)"
          :value="synthTitle" />
          <ctrl-button @click="log(modules)" text="Log All Modules" />
        </div>
      </header>


      <main class="synth__main">
        <!-- Modules -->
        <div class="synth__row">
          <component v-for="m in modules" :is="m.type" :id="m.id" v-model="m.obj" :key="m.id" />
          <div class="synth__add">
            <h3>Add New Module:</h3>
            <ctrl-button @click="initModule('OmniOscillator')" text="Init Osc" type="success" />
            <ctrl-button @click="initModule('FilterModule')" text="Init Filt" type="success" />
            <ctrl-button @click="" text="Init Env" type="success" />
          </div>
        </div>

        <!-- Routes  -->
        <div class="routes">
          <select v-model="newRoute.source">
            <option value="">Select Source</option>
            <option v-for="m in modules" v-if="m.obj" :value="m.obj">{{ m.obj.moduleId }}</option>
          </select>
          <select v-model="newRoute.sink">
            <option value="">Select Sink</option>
            <option value="Master">Master</option>
            <option v-for="m in modules" v-if="m.obj" :value="m.obj">{{ m.obj.moduleId }}</option>
          </select>
          <ctrl-button @click="createRoute(newRoute.source, newRoute.sink)" text="Route Connection" />
          <ctrl-button v-if="!routes.length" @click="testRoute()" text="Init Routes" type="success" />
          <ul class="routes__list">
            <li v-for="r in routes" class="routes__item">
              {{ r.source.name }} => {{ r.sink.name }}
            </li>
          </ul>
        </div>
        <!-- Controls -->
        <div v-if="false" class="synth__row synth__row--alt">
          <div class="synth__area">
            <h3>Sample Buttons: <span :style="{color: testBtn.color }">{{ testBtn.value }}</span> </h3>
            <ctrl-button @click="testBtn = { value: 'Default', color: '#0faff9' }" text="Default" />
            <ctrl-button @click="testBtn = { value: 'Success', color: '#69bfa2' }" text="Success" type="success" />
            <ctrl-button @click="testBtn = { value: 'Warning', color: '#ec583e' }" text="Warning" type="warning" />
            <ctrl-button @click="testBtn = { value: 'Danger', color: '#e72e71' }" text="Danger" type="danger" />
          </div>
          <div class="synth__area">
            <h3>Sample Select</h3>
            <component is="CtrlSelect" />
          </div>
          <div class="synth__area">
            <h3>Sample Range: {{ testRange.value }}</h3>
            <ctrl-range v-model="testRange.value" :props="testRange.props" />

          </div>
          <div class="synth__area">
            <h3>Sample Check</h3>
            <component is="CtrlCheck" />
          </div>

        </div>
      </main>


    <piano />

  </div>
</template>

<script>
  import Tone from 'tone'
  import Piano from './piano.vue'
  // Modules
  import OmniOscillator from './modules/omniOscillator.vue'
  import AmpEnvelope from './modules/ampEnvelope.vue'
  import FilterModule from './modules/filter.vue'
  // Controls
  import CtrlCheck from './controls/check.vue'
  import CtrlSelect from './controls/select.vue'
  import CtrlRange from './controls/range.vue'
  import CtrlButton from './controls/button.vue'
  export default {
    components: {
      Piano,
      OmniOscillator,
      AmpEnvelope,
      FilterModule,
      CtrlCheck,
      CtrlSelect,
      CtrlRange,
      CtrlButton
    },
    data () {
      return {
        modules: [],
        newRoute: {
          source: '',
          sink: ''
        },
        routes: [],
        testBtn: { value: 'None', color: '#fff' },
        testRange: {
          value: 1.5,
          props: {
            label: 'Example #1',
            min: 0.01,
            max: 4.00,
            step: 0.01,
            units: 'deg'
          }
        }
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
      alert: function(data) {
        alert(data)
      },
      // init module
      initModule: function(type, obj) {
        this.modules.push({ id: this.modules.length + 1, type: type, obj: obj || null })
      },
      // routing
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
      },
      testRoute: function() {
        this.createRoute(this.modules[0].obj, 'Master')
        this.createRoute(this.modules[1].obj, this.modules[0].obj)
      }
    },
    mounted: function () {
      this.initModule('AmpEnvelope')
      this.initModule('OmniOscillator')
      this.initModule('FilterModule')
    }
  }
</script>


<style lang="sass">
  // Synth
  .synth
    min-height: 100vh
    padding-bottom: $blh * 6
    background: clr('dblue')
    color: #fff
    &__main
      padding: $blh/2
    &__section
      margin-bottom: $blh/2
    &__header
      @include boxShadow()
      padding: $blh/2
      margin-bottom: $blh/2
      vertical-align: middle
      background: lighten(clr('indigo'), 5%)
      border-bottom: solid 1px clr('pink')
      h1
        vertical-align: middle
        display: inline-block
        margin: 0
        margin-right: $blh/2
      button
        vertical-align: middle
      input
        display: inline-block
        line-height: $blh * 0.8
        height: auto
        padding: 0 $blh/4
        margin-right: $blh/2
    &__nav
      display: block
      padding-top: $blh/2
      margin-bottom: $blh/2
    &__row
      display: grid
      grid-template-columns: 1fr 1fr 1fr 1fr
      grid-gap: $blh/2
      margin-bottom: $blh
      &--alt
        grid-gap: $blh*2
    &__area
      padding: 0
    &__add
      background: clr('indigo')
      border: dotted 2px transparentize(clr('blue'), 0.75)
      font-size: 16px
      font-weight: 700
      color: transparentize(#fff, 0.3)
      text-align: center
      padding: $blh
      h3
        margin-bottom: $blh/2
      &:hover
        @include boxShadow()
        background: lighten(clr('indigo'), 5%)
        border-color: clr('blue')
        color: #fff
        cursor: pointer

  .routes
    @include boxShadow()
    background: lighten(clr('indigo'), 5%)
    display: block
    font-size: 12px
    padding: $blh/2
    margin: 0 0 $blh 0
    &__list
      display: block
      padding: 0
      margin: 0
    &__item
      display: block
      margin-bottom: $blh/4
      &:last-child
        margin: 0

</style>
