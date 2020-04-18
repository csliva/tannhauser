<template lang="html">
  <div class="piano">
    <header class="piano__header">
      <b>Piano Status:</b>
      <button @click="setSynthPiano(!pianoActive)" class="piano__status" :class="{ 'piano__status--idle' : !pianoActive }">
      {{ pianoActive ? 'Active' : 'Idle' }}
    </button>
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
          { val: 'C',   color: 'white', key: 9 , active: false },
          { val: 'C#',  color: 'black', key: 49, active: false },
          { val: 'D',   color: 'white', key: 81, active: false },
          { val: 'D#',  color: 'black', key: 50, active: false },
          { val: 'E',   color: 'white', key: 87, active: false },
          { val: 'F',   color: 'white', key: 69, active: false },
          { val: 'F#',  color: 'black', key: 52, active: false },
          { val: 'G',   color: 'white', key: 82, active: false },
          { val: 'G#',  color: 'black', key: 53, active: false },
          { val: 'A',   color: 'white', key: 84, active: false },
          { val: 'A#',  color: 'black', key: 54, active: false },
          { val: 'B',   color: 'white', key: 89, active: false }
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
      // bind keys to piano
      window.addEventListener("keydown", e => {
        if(this.pianoActive){
          e.preventDefault()
          this.handleKeyDown(e, this)
        }
      });
      window.addEventListener("keyup", e => {
        if(this.pianoActive){
          this.handleKeyUp(e, this)
        }
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
