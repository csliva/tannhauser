<script>
  export default {
    props: ['value', 'targets'],
    data () {
      return {
        settings: this.value,
        debug: {
          active: false
        }
      }
    },
    mounted: function () {
      // on mounted
    },
    methods: {
      log(data) { console.log(data) },
      alert(data) { alert(data) },
      toggleDebug(){
        this.debug.active = !this.debug.active
      }
    },
    computed: {
      debugData () {
        return 'default data...'
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
