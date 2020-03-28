<template>
  <div>
    <p class="piano">{{ title }}</p>
    <div class="">
      <button v-on:click="playnote('C', '8n')">C</button>
      <button v-on:click="playnote('D', '8n')">D</button>
      <button v-on:click="playnote('E', '8n')">E</button>
    </div>
  </div>
</template>

<style lang="sass">
  .piano
    background: #fff
    color: #666
    padding: $blh
</style>

<script>
  import Tone from 'tone'
  if (process.client) {
    var synth = new Tone.Synth().toMaster()
  }
  export default {
    name: 'piano',
    data () {
      return {
        title: "Kyle's Piano (WIP)"
      }
    },
    methods: {
      playnote: function (note, time) {
        synth.triggerAttackRelease(note, time)
      }
    }
  }
</script>
