<template>
  <div class="piano">
    <p>{{ title }}</p>
    <div class="piano__octave">
      <select v-model="octave">
        <option v-for="o in 6">{{ o }}</option>
      </select>
    </div>
    <div class="piano__keyboard">
      <button v-for="k in keys" :key="k.val" v-on:click="playnote(k.val+octave, '8n')">{{ k.val+octave }}</button>
    </div>
  </div>
</template>

<style lang="sass">
  .piano
    background: #fff
    color: #666
    padding: $blh
    &__octave
      display: block
    &__keyboard
      display: block
</style>

<script>
import Tone from 'tone';
if (process.client) {
  var synth = new Tone.Synth().toMaster()
}
export default {
  name: 'piano',
    data () {
      return {
        title: "Kyle's Piano (WIP)",
        octave: 4,
        keys: [
          { val: 'C', color: 'white', key: 9},
          { val: 'C#', color: 'black', key: 49},
          { val: 'D', color: 'white', key: 81},
          { val: 'D#', color: 'black', key: 50},
          { val: 'E', color: 'white', key: 87},
          { val: 'F', color: 'white', key: 69},
          { val: 'F#', color: 'black', key: 52},
          { val: 'G', color: 'white', key: 82},
          { val: 'G#', color: 'black', key: 53},
          { val: 'A', color: 'white', key: 84},
          { val: 'A#', color: 'black', key: 54},
          { val: 'B', color: 'white', key: 89},
          { val: 'B#', color: 'black', key: 85}
        ]
      }
    },
  methods: {
    playnote: function (note, time) {
      synth.triggerAttackRelease(note, time)
    },
    handleKey: (e, that) => {
      console.log(e.keyCode)
      that.keys.map(note => {
        // check if keypress matches a note
        if (note.key === e.keyCode){
          synth.triggerAttackRelease(note.val+that.octave, '8n')
        }
      })
    }
  },
  mounted: function () {
    window.addEventListener("keydown", e => {
      e.preventDefault()
      this.handleKey(e, this)
    });
  },
}
</script>