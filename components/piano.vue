<template lang="html">
  <div class="piano">
    <header class="piano__header">
      <b>Piano Status:</b>
      <button @click="setSynthPiano(!pianoActive)" class="piano__status" :class="{ 'piano__status--idle' : !pianoActive }">
      {{ pianoActive ? 'Active' : 'Idle' }}
    </button>
    <b>Octave: </b><span>{{ octave }}</span> 
    </header>
    <div class="piano__keyboard">
      <button class="piano__octave piano__octave--down" @click="octaveChange(octave -1)">Down</button>
      <div class="piano__roll">
        <button v-for="k in keys"
          class="piano__key"
          :class="{'piano__key--active': k.active, 'piano__key--black': k.color === 'black'}"
          :data-key-code="k.key"
          :key="k.val"
          @mousedown="noteAttack(k)"
          @mouseup="noteRelease(k)" >
            {{ k.val + octave }}
        </button>
      </div>
      <button class="piano__octave piano__octave--up" @click="octaveChange(octave +1)">Up</button>
    </div>
  </div>
</template>

<script>
  // Tone JS
  import Tone from 'tone'
  export default {
    data(){
      return {
        octave: 4,
        keys: [
          { val: 'C',   color: 'white', key: "TAB" , active: false },
          { val: 'C#',  color: 'black', key: "ONE", active: false },
          { val: 'D',   color: 'white', key: "Q", active: false },
          { val: 'D#',  color: 'black', key: "TWO", active: false },
          { val: 'E',   color: 'white', key: "W", active: false },
          { val: 'F',   color: 'white', key: "E", active: false },
          { val: 'F#',  color: 'black', key: "FOUR", active: false },
          { val: 'G',   color: 'white', key: "R", active: false },
          { val: 'G#',  color: 'black', key: "FIVE", active: false },
          { val: 'A',   color: 'white', key: "T", active: false },
          { val: 'A#',  color: 'black', key: "SIX", active: false },
          { val: 'B',   color: 'white', key: "Y", active: false }
        ]
      }
    },
    computed: {
      // $store
      pianoActive: function () {
        return this.$store.state.synth.piano.active
      }
    },
    methods: {
      // $store
      setSynthPiano: function (value) {
        this.$store.commit('synth/setPiano', value)
      },
      setFreq: function (value) {
        this.$store.commit('synth/setPianoFreq', value)
      },
      trigEnvAttack: function (value) {
        this.$store.commit('synth/triggerAttack', value)
      },
      trigEnvRelease: function (value) {
        this.$store.commit('synth/triggerRelease', value)
      },
      // local
      noteAttack: function (note) {
        let freq = Tone.Frequency(note.val + this.octave).toFrequency()
        this.setFreq(freq)
        this.trigEnvRelease(false)
        this.trigEnvAttack(true)
        note.active = true
      },
      noteRelease: function (note) {
        this.trigEnvRelease(true)
        this.trigEnvAttack(false)
        note.active = false
      },
      handleKeyDown: (e, that) => {
        that.keys.map(note => {
          if (note.key === e.keyCode && note.active === false){
            that.noteAttack(note)
          }
        })
      },
      handleKeyUp: (e, that) => {
        that.keys.map(note => {
          if (note.key === e.keyCode && note.active === true){
            that.noteRelease(note)
          }
        })
      },
      octaveChange: function (o) {
        if(o <= 8 && o >= 0) {
          this.octave = o
        }
      }
    },
    mounted: function(){
      var kd = require('keydrown')
      this.keys.map(note => {
        kd[note.key].down(() => {
          this.noteAttack(note)
        })
        kd[note.key].up(() => {
          this.noteRelease(note)
        })
      })
      kd.run(function () {
        kd.tick();
      });
    }
  }
</script>

<style lang="sass">
  .piano
    @include boxShadow()
    position: fixed
    bottom: $blh
    left: $blh
    width: auto
    display: inline-block
    background: lighten(clr('indigo'), 5%)
    color: #fff
    padding: $blh/2
    &__header
      margin-bottom: $blh/2
    &__status
      background: transparent
      border: 0
      font-weight: 700
      display: inline-block
      padding: 0 $blh/2
      color: clr('mint')
      &--idle
        color: clr('pink')
      &:focus
        outline: 0
    &__keyboard
      position: relative
      display: block
      padding: 0 $blh*2
      background-color: clr('indigo')
    &__roll
      display: block
      font-size: 0
    &__octave
      position: absolute
      top: 0
      width: $blh*2
      height: 100%
      background: clr('indigo')
      color: #fff
      border: 0
      &--down
        left: 0
      &--up
        right: 0
    &__key
      font-size: 11px
      text-align: center
      position: relative
      display: inline-block
      appearance: none
      border: 0
      border-radius: 0
      padding: $blh 0
      z-index: 0
      width: $blh*1.5
      border-right: solid 1px #ddd
      &:last-child
        border: 0
      &--black
        background-color: #ddd
      &--active
        background-color: clr('blue')
      &:focus
        z-index: 10
</style>
