<template>
  <div class="piano">
    <h1 class="piano__title">{{ title }}</h1>
    <div class="piano__synth">
      <div v-if="synth">
        Oscilator
        <select v-model="synth.oscillator.type">
          <option>sine</option>
          <option>square</option>
          <option>triangle</option>
          <option>sawtooth</option>
        </select>
      </div>
      <div v-else>
        <p>No Synth Loaded</p>
      </div>
    </div>
    <div class="piano__octave">
      <select v-model="octave">
        <option v-for="o in 6">{{ o }}</option>
      </select>
    </div>
    <div class="piano__roll">
      <button v-for="k in keys"
      class="piano__key"
      :class="{'piano__key--black': k.color === 'black'}"
      :key="k.val"
      v-on:click="playnote(k.val + octave, '8n')">
        {{ k.val + octave }}
      </button>
    </div>
  </div>
</template>


<style lang="sass">
  .piano
    background: #fff
    color: #666
    padding: $blh
    &__title
      margin-bottom: $blh
    &__octave
      display: block
    &__roll
      display: block
    &__key
      display: inline-block
      appearance: none
      border-radius: 0
      &--black
        background-color: #ddd
    &__synth
      display: block
      border: solid 1px #ddd
      padding: $blh
      margin-bottom: $blh
</style>


<script>
  import Tone from 'tone'
  export default {
    name: 'piano',
    data () {
      return {
        title: "Kyle's Piano (WIP)",
        octave: 4,
        keys: [
          { val: 'C', color: 'white'},
          { val: 'C#', color: 'black'},
          { val: 'D', color: 'white'},
          { val: 'D#', color: 'black'},
          { val: 'E', color: 'white'},
          { val: 'F', color: 'white'},
          { val: 'F#', color: 'black'},
          { val: 'G', color: 'white'},
          { val: 'G#', color: 'black'},
          { val: 'A', color: 'white'},
          { val: 'A#', color: 'black'},
          { val: 'B', color: 'white'},
          { val: 'B#', color: 'black'}
        ],
        synth: false
      }
    },
    mounted: function(){
      this.synth = new Tone.Synth().toMaster()
      console.log(this.synth)
    },
    methods: {
      playnote: function (note, time) {
        this.synth.triggerAttackRelease(note, time)
      }
    }
  }
</script>
