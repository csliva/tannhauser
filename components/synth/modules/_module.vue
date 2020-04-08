<script>
  import SelectInput from '../controls/select.vue'
  import SynthAdsr from '../controls/adsr.vue'
  export default {
    components: { SelectInput, SynthAdsr },
    props: ['value'],
    data(){
      return {}
    },
    filters: {
      round: function(value, decimal){
        return value.toFixed(decimal)
      },
      capitalize: function(str){
        return str.charAt(0).toUpperCase() + str.substring(1)
      }
    },
    watch: {
      value() {
        this.$emit('input', this.value)
      }
    }
  }
</script>

<style lang="sass">
  // Module
  .module
    display: block
    background: #fff
    border: solid 1px #ddd
    height: 100%
    &__title
      display: block
      font-weight: 700
      font-size: 14px
      margin: 0
      padding: $blh/2
      border-bottom: solid 1px #ddd
    &__body
      padding: $blh/2
  // Param
  .param
    display: block
    margin-bottom: $blh/4
</style>
