<template lang="html">
  <div class="module" v-if="settings">
    <h2>
      {{ title }}
      <i>{{ id }}</i>
    </h2>
    <p>
      <select v-model="settings.type">
        <option>lowpass</option>
        <option>highpass</option>
        <option>bandpass</option>
        <option>lowshelf</option>
        <option>highshelf</option>
        <option>notch</option>
        <option>allpass</option>
        <option>peaking</option>
      </select>
      <select v-model="settings.rolloff">
        <option>-12</option>
        <option>-24</option>
        <option>-48</option>
        <option>-96</option>
      </select>
    </p>
    <p v-if="settings.frequency">
      Freq: <input v-model="settings.frequency.value" type="range" min="20" max="4000" step="1" >
      {{ settings.frequency.value }}
      <br>
      Q: <input v-model="settings.Q.value" type="range" min="0" max="10" step="1" >
      {{ settings.Q.value }}
    </p>
    <p>
      <button @click="log(settings)">Log Settings</button>
    </p>
  </div>
</template>

<script>
  import Tone from 'tone'
  import Module from './_module.vue'
  export default {
    extends: Module,
    data () {
      return {
        title: 'Filter',
        type: 'filter'
      }
    },
    mounted: function() {
      this.settings = new Tone.Filter()
      this.settings.moduleId = this.title +'#'+this.id
      this.settings.category = this.type
    }
  }
</script>
