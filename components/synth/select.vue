<template lang="html">
  <div class="select">
    <select v-model.lazy="val" :name="name" class="select__input">
      <option v-for="o in options">{{ o }}</option>
    </select>
  </div>
</template>

<script>
  export default {
    props: ['value', 'options', 'name'],
    data() {
      return {
        msg: 'Select Loaded',
        val: ''
      }
    },
    mounted: function(){
      this.val = this.value
    },
    watch: {
      val() {
        this.$emit('input', this.val)
      }
    }
  }
</script>

<style lang="sass">
  .select
    display: inline-block
</style>
