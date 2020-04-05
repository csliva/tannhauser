<template lang="html">
  <div class="select">
    <select v-model.lazy="value" :name="name">
      <option v-for="o in options">{{ o }}</option>
    </select>
  </div>
</template>

<script>
  export default {
    props: ['value', 'options', 'name'],
    data() {
      return {
        msg: 'Select Loaded'
      }
    },
    watch: {
      value() {
        this.$emit('input', this.value);
      }
    }
  }
</script>

<style lang="sass">
  .select
    display: inline-block
</style>
