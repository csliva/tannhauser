<script>
  export default {
    props: ['value'],
    data () {
      return {
        settings: this.value
      }
    },
    watch: {
      settings () {
        this.$emit('input', this.settings)
      }
    }
  }
</script>

<style lang="sass">
  .new-module
    display: block
</style>
