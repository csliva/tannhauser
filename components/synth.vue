<template lang="html">
  <div class="synth">

      <header class="synth__header">
          <h1>{{ synthTitle }}</h1>
          <ctrl-btn @click="log(modules)" text="Log All Modules" />
          <ctrl-btn v-if="!routes.length" @click="quickRoute()" text="Quick Route" type="success" />
          <ctrl-btn @click="log(toneMaster)" text="Log Master Module" type="warning" />
          <ctrl-btn @click="setPianoDisplay(displayPiano ? false : true)"
            :text="displayPiano ? 'Hide Piano' : 'Show Piano' "
            :type="displayPiano ? 'danger' : '' " />
      </header>

      <div class="synth__body">
        <aside class="synth__aside">
          <nav class="menu">
            <header class="menu__header">
              <ctrl-btn @click="initModule('OmniOscillator')" text="Init OmniOsc" type="success" />
              <ctrl-btn @click="initModule('FilterModule')" text="Init Filter" type="success" />
              <ctrl-btn @click="initModule('AmpEnvelope')" text="Init AmpEnv" type="success" />
            </header>
            <div class="menu__body">
              <ul class="menu__list">
                <li class="menu__item">
                  <button @click="activeModule = false" class="menu__button" :class="{'menu__button--active' : !activeModule}">
                    <h3>Master</h3>
                    <small>
                      Master Output
                      <span class="cnx cnx--o">Connected</span>
                    </small>
                  </button>
                </li>
                <li v-for="m in modules" v-if="m.obj" class="menu__item">
                  <button v-if="m.obj" @click="activeModule = m"
                  class="menu__button" :class="{'menu__button--active' : activeModule.id === m.id}">
                    <h3>{{ m.obj.moduleId }}</h3>
                    <small>
                      {{ m.obj.category }} Module
                      <span class="cnx" :class="{'cnx--o' : m.cnx.o.length }" >
                        {{ m.cnx.o.length ? 'Connected' : 'Not Connected' }}
                      </span>
                    </small>
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </aside>
        <main class="synth__main">
          <div class="synth__row">
            <!-- Modules -->
            <div class="synth__col">
              <component v-for="m in modules" v-model="m.obj" :active="activeModule && activeModule.id === m.id"
              :is="m.type" :id="m.id" :key="m.id" />
              <!-- Master Module:  -->
              <component v-model="masterModule.obj" :active="!activeModule"
              is="MasterOutput" id="master" key="master" />
            </div>
            <!-- Routes  -->
            <div class="routes">
              <h2 class="routes__title">Routes</h2>
              <select v-model="newRoute.source">
                <option value="">Select Source</option>
                <option v-for="m in modules" v-if="m.obj" :value="m">{{ m.obj.moduleId }}</option>
              </select>
              <select v-model="newRoute.sink">
                <option value="">Select Sink</option>
                <option value="Master">Master</option>
                <option v-for="m in modules" v-if="m.obj" :value="m">{{ m.obj.moduleId }}</option>
              </select>
              <ctrl-btn @click="createRoute(newRoute.source, newRoute.sink)" text="Connect" />
              <ul class="routes__list">
                <li v-for="r in routes" class="routes__item">
                  {{ r.source.name }} => {{ r.sink.name }}
                </li>
              </ul>
            </div>

          </div>

        </main>
      </div> <!-- end .synth__body -->

    <piano v-if="displayPiano" />

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
  import CtrlBtn from './controls/btn.vue'
  import CtrlDial from './controls/dial.vue'
  // Helpers
  export default {
    components: {
      Piano,
      MasterOutput, OmniOscillator, AmpEnvelope, FilterModule,
      CtrlCheck, CtrlSelect, CtrlRange, CtrlBtn, CtrlDial
    },
    data () {
      return {
        masterModule: {
          moduleID: 'MASTER',
          obj: true
        },
        modules: [],
        activeModule: false,
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
      },
      displayPiano () {
        return this.$store.state.synth.piano.display
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
      setPianoDisplay: function (value) {
        this.$store.commit('synth/setDisplayPiano', value)
      },
      // local
      log: function(data) {
        console.log(data)
      },
      alert: function(data) {
        alert(data)
      },
      // init module
      initModule: function(type) {
        this.modules.push({
            id: (this.modules.length + 1),
            type: type,
            obj: {},
            cnx: {
              i: [], o: []
            }
          }
        )
      },
      // routing
      createRoute: function(source, sink) {
        if(!source || !sink) {
          alert('Select Source and Sink')
        } else {
          // Output to Master
          if(sink === 'Master') {
            source.obj.toMaster()
            this.routes.push({
              source: { name: source.obj.moduleId, module: source.obj },
              sink: { name: 'Master', module: Tone.Master }
            })
            source.cnx.o.push(Tone.Master)
          } else {
            // Output to Module
            source.obj.connect(sink.obj)
            this.routes.push({
              source: { name: source.obj.moduleId, module: source.obj },
              sink: { name: sink.obj.moduleId, module: sink.obj }
            })
            source.cnx.o.push(sink)
          }
          if(source.obj.category === 'oscillator'){
            source.obj.start()
          }
          this.newRoute.source = ''
          this.newRoute.sink = ''
        }
      },
      quickRoute: function () {
        this.createRoute(this.modules[0], 'Master')
        this.createRoute(this.modules[1], this.modules[0])
      },
      // load module
      loadModule: function (module) {
        this.activeModule = module
      }
    },
    mounted: function () {
      // create initial modules (ampEnv & omniOsc)
      this.initModule('AmpEnvelope')
      this.initModule('OmniOscillator')
      // this.initModule('FilterModule')
      // set the amp to active
      // this.loadModule(this.modules[0])
    }
  }
</script>


<style lang="sass">
  // Synth
  .synth
    height: 100vh
    padding-bottom: $blh * 6
    color: #fff
    &__body
      height: 100%
      padding: $blh
      display: grid
      grid-template-columns: 1fr 3fr
      grid-gap: $blh
      margin-bottom: 0
    &__main
      display: block
    &__aside
      display: block
      height: 100%
      overflow: hidden
    &__section
      margin-bottom: $blh/2
    &__header
      @include boxShadow()
      padding: $blh/2
      margin-bottom: 0
      vertical-align: middle
      background: clr2('indigo', 0, 5%)
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
      grid-template-columns: 3fr 1fr
      grid-gap: $blh
      margin-bottom: $blh/2
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

  .menu
    display: block
    padding: 0
    margin: 0
    height: 100%
    overflow: hidden
    &__header
      display: block
      margin-bottom: $blh
    &__body
      display: block
      padding: 0
      margin: 0
      height: 100%
      overflow-y: scroll
      padding-bottom: $blh*3.5
    &__list
      display: block
      padding: 0
      margin: 0
      height: auto
    &__item
      display: block
      margin-bottom: $blh/2
    &__button
      @include boxShadow()
      background-color: transparentize(lighten(clr('indigo'), 5%), 0.2)
      display: block
      width: 100%
      padding: $blh/2 $blh
      margin: 0
      border: 0
      color: #fff
      text-align: left
      border: solid 2px transparentize(lighten(clr('indigo'), 5%), 0.2)
      &:hover
        background-color: lighten(clr('indigo'), 10%)
        border-color: clr('blue')
      &:focus
        outline: 0
      &--active
        border-color: clr('mint')
        &:hover
          border-color: clr('mint')
      h3
        font-size: 16px
        margin-bottom: $blh/4
      small
        display: inline-block
        font-size: 10px
        text-transform: uppercase
        color: lighten(clr('indigo'), 45%)
      .cnx
        color: clr('pink')
        margin-left: $blh/2
        font-style: italic
        &--o
          color: clr('mint')

  .routes
    &__title
      font-size: 16px
    &__list
      display: block
      margin: 0
      padding: $blh 0 0 0
    &__item
      @include boxShadow()
      background: lighten(clr('indigo'), 5%)
      display: block
      font-size: 12px
      padding: $blh/2
      margin: 0 0 $blh/2 0
      &:last-child
        margin: 0

</style>
