<template lang="html">
  <div class="piano">
    <div class="piano__octave">
      <button @click="octaveChange(octave -1)">Down</button>
      <label>Octave: {{ octave }}</label>
      <button @click="octaveChange(octave +1)">Up</button>
    </div>
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
  </div>
</template>

<script>
  import Tone from 'tone'
  export default {
    props: ['value'],
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
          { val: 'B',   color: 'white', key: 89, active: false },
          { val: 'B#',  color: 'black', key: 85, active: false }
        ]
      }
    },
    methods: {
      noteAttack: function (note) {
        this.value.triggerAttack(note.val + this.octave)
        note.active = true
      },
      noteRelease: function (note) {
        this.value.triggerRelease()
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
        e.preventDefault()
        this.handleKeyDown(e, this)
      });
      window.addEventListener("keyup", e => {
        this.handleKeyUp(e, this)
      });
    }
  }
</script>

<style lang="sass">
  .piano
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    display: block
    background: #fff
    padding: $blh/2
    border-top: solid 1px #ddd
    &__octave
      display: block
      margin-bottom: $blh/2
    &__roll
      display: block
      font-size: 0
    &__key
      font-size: 11px
      position: relative
      display: inline-block
      appearance: none
      border-radius: 0
      padding: $blh ($blh/4)
      z-index: 0
      &--black
        background-color: #ddd
      &--active
        background-color: #fdff72
      &:focus
        z-index: 10
</style>
