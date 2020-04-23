<script>
  export default {
    props: ['value'],
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
      log(data) {
        console.log(data)
      },
      alert(data) {
        alert(data)
      },
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
  .debug
    padding: $blh/4 $blh/2
    border: dotted 2px clr2('pink', 0.75, 40%)
    color: clr2('pink', 0.5, 50%)
</style>
