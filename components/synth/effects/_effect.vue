<script>
  import SynthSelect from '../controls/select.vue'
  export default {
    components: { SynthSelect },
    props: ['value'],
    data(){
      return {}
    },
    methods: {
      log: function(data) {
        console.log(data)
      }
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
