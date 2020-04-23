<template lang="html">
  <div class="new-module">
    New Osc Module Loaded
  </div>
</template>

<script>
  // import components from '../../controls/_index.js'
  import CtrlDial from '../../controls/dial.vue'
  import CtrlSelect from '../../controls/select.vue'
  import Cell from '../../displays/cell.vue'
  import Module from './_module.vue'
  export default {
    components: { Cell, CtrlDial, CtrlSelect },
    extends: Module
  }
</script>
