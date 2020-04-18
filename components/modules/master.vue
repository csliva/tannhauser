<template lang="html">
  <div class="module" :class="{ 'module--hidden' : !active}" >
    <header class="module__header">
      <h2 class="module__title">{{ title }}</h2>
      <small class="module__category">Master Output</small>
    </header>
    <main class="module__main">

      <p>Master Stuff...</p>

    </main>
    <footer class="module__footer">
      <button class="module__toggle" @click="log(settings)">Log</button>
      <button class="module__toggle module__toggle--warning" @click="debug = !debug">Debug</button>
    </footer>
  </div>
</template>

<script>
  import Tone from 'tone'
  import Module from './_module.vue'
  import CtrlButton from '../controls/button.vue'
  import CtrlRange from '../controls/range.vue'
  import CtrlSelect from '../controls/select.vue'
  export default {
    extends: Module,
    components: { CtrlButton, CtrlRange, CtrlSelect },
    data () {
      return {
        title: 'Master'
      }
    },
    mounted: function() {
      // mounted Stuff
    }
  }
</script>
