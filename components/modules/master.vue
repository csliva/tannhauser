<template lang="html">
  <div class="module" :class="{ 'module--hidden' : !active}" >
    <header class="module__header">
      <h2 class="module__title">{{ title }}</h2>
      <small class="module__category">Master Output</small>
    </header>
    <main class="module__main">
      Master Parameters and Options
    </main>
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
    mounted: function() {}
  }
</script>
