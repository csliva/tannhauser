<script>
  export default {
    props: ['value', 'id'],
    data () {
      return {
        settings: {}
      }
    },
    methods: {
      log: function(data) {
        console.log(data)
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
  .module
    color: #333
    transition: color 0.3
    border: solid 2px #ccc
    padding: $blh/2
    &--disconnected
      color: #666
      border-color: #eee
    h2
      font-size: 18px
      margin-bottom: $blh/4
      i
        color: #999
        font-style: italic
    &__row
      display: block
      margin-bottom: $blh/4
    &:hover
      border-color: blue
    &--highlight
      border-color: purple
    &__state
      text-transform: capitalize
      font-weight: 700
</style>
