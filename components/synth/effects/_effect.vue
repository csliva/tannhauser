<script>
  // import Tone from 'tone'
  import SynthSelect from '../Select.vue'
  import EffectWrap from './partials/wrap.vue'
  export default {
    components: { SynthSelect, EffectWrap },
    props: ['value', 'show', 'rack'],
    data(){
      return {
        settings: {}
      }
    },
    methods: {
      log: function(data) {
        console.log(data)
      },
      on: function(){
        this.value = this.value.connect(this.settings)
        this.rack.on = true
      },
      off: function(){
        this.value = this.value.disconnect(this.settings)
        this.rack.on = false
      },
    },
    filters: {
      round: function(value, decimal){
        return value.toFixed(decimal)
      }
    },
    watch: {
      value() {
        this.$emit('input', this.value)
      },
      rack() {
        this.$emit('input', this.rack)
      }
    }
  }
</script>

<style lang="sass">
  .effect
    display: none
    padding: $blh/2
    &--show
      display: block
    &__param
      margin-bottom: $blh/2
    &__header
      margin-bottom: $blh/2
      vertical-align: top
    &__title
      display: inline-block
      margin-right: $blh/2
    &__body
      display: grid
      grid-template-columns: 1fr 1fr
      grid-gap: $blh/2
    &__col
      display: block
    &__toggle
      &--on
        background: blue
        color: #fff
</style>
