<template lang="html">
  <div class="piano" v-if="value">
    <div class="piano__octave">
      <label>Octave:</label>
      <select-input v-model="octave" :options="octaveRange" name="synth-octave" />
      <label>Note Duration:</label>
      <select-input v-model="noteDuration" :options="durationRange" name="synth-duration" />
    </div>
    <div class="piano__roll">
      <button v-for="k in keys"
        class="piano__key"
        :class="{'piano__key--active': k.active, 'piano__key--black': k.color === 'black'}"
        :data-key-code="k.key"
        :key="k.val"
        @click="playNote(k.val + octave, noteDuration)" >
          {{ k.val + octave }}
      </button>
    </div>
  </div>
</template>

<script>
  import Tone from 'tone'
  import SelectInput from './synth/controls/select.vue'
  export default {
    components: { SelectInput },
    props: ['value'],
    data(){
      return {
        msg: 'Piano Loaded',
        octave: 4,
        octaveRange: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        noteDuration: '8n',
        durationRange: ['1n', '2n', '4n', '8n', '16n'],
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
      playNote: function (note, time) {
        this.value.triggerAttackRelease(note, time)
      },
      handleKey: (e, that) => {
        // console.log(e.keyCode)
        that.keys.map(note => {
          // check if keypress matches a note
          if (note.key === e.keyCode){
            that.value.triggerAttackRelease(note.val+that.octave, that.noteDuration)
            note.active = true
            setTimeout(function(){
              note.active = false
            }, 250)
          }
        })
      }
    },
    mounted: function(){
      // bind keys to piano
      window.addEventListener("keydown", e => {
        e.preventDefault()
        this.handleKey(e, this)
      });
    }
  }
</script>

<style lang="sass">
  .piano
    display: block
    background: #fff
    border: solid 1px #ddd
    padding: $blh/2
    &__keyboard
      display: block
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
