<template lang="html">
  <div class="select">
    <select :value="value" @input="$emit('input', $event.target.value)" :name="name">
      <option v-for="o in options">{{ o }}</option>
    </select>
  </div>
</template>

<script>
  export default {
    props: ['value', 'options', 'name'],
    data(){
      return {
        msg: 'Select Loaded'
      }
    }
  }
</script>

<style lang="sass">
  .select
    display: inline-block
</style>
