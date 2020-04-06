<script>
  import SynthSelect from '../Select.vue'
  export default {
    components: { SynthSelect },
    props: ['value', 'show'],
    data(){
      return {
        name: 'Effect Template',
        active: false,
        settings: {}
      }
    },
    methods: {
      log: function(data){
        console.log(data)
      },
      toggle: function() {
        if(this.settings){
          if(!this.active){
            this.value = this.value.connect(this.settings)
            this.active = true
          } else {
            this.value = this.value.disconnect(this.settings)
            this.active = false
          }
        } else {
          alert('No Settings for: ' + this.name)
        }
      }
    },
    mounted: function() {
      // Do stuff on mount...
    },
    filters: {
      round: function(value, decimal){
        return value.toFixed(decimal)
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
  .effect
    display: none
    border: solid 1px #ddd
    padding: $blh/2
    &--show
      display: block
    &__param
      margin-bottom: $blh/4

</style>
