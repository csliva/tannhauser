<script>
  export default {
    props: ['value', 'id'],
    data () {
      return {
        debug: false,
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
    @include boxShadow()
    background: lighten(clr('indigo'), 5%)
    color: #fff
    border: solid 2px lighten(clr('indigo'), 5%)
    position: relative
    padding-bottom: $blh*2
    &__header,
    &__main,
    &__footer
      display: block
      padding: $blh/2
      margin: 0
    &__title
      font-size: 16px
      display: block
      margin: 0
    &__category
      font-size: 10px
      text-transform: uppercase
      color: lighten(clr('pink'), 15%)
    &__header
      border-bottom: solid 1px clr('indigo')
    &__footer
      border-top: solid 1px clr('indigo')
      position: absolute
      bottom: 0
      left: 0
      width: 100%
    &__section
      margin-bottom: $blh/2
      &--dual
        display: grid
        grid-template-columns: 1fr 1fr
        grid-gap: $blh/2
    &:hover
      border-color: transparentize(clr('blue'), 0.45)
    &__toggle
      opacity: 0.8
      font-size: 14px
      line-height: $blh
      color: clr('blue')
      background: transparent
      border: 0
      padding: 0 $blh/2 0 0
      cursor: pointer
      &--success
        color: clr('mint')
      &--warning
        color: clr('orange')
      &--danger
        color: clr('pink')
      &:hover
        opacity: 1
    &__debug
      margin-top: $blh
      border: dotted 1px clr('pink')
      padding: $blh/2
      span
        display: inline-block
        margin-right: $blh/4
</style>
