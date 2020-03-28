<template>
  <div>
    <p class="piano">Piano!</p>
    <button v-on:click="playnote">Play C4</button>
  </div>
</template>

<style lang="sass">
  .piano
    background: #fff
    color: #666
    padding: $blh
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
      name: "Colt"
    }
  },
  methods: {
    playnote: function () {
      synth.triggerAttackRelease('C4', '8n')
    }
  }
}
</script>