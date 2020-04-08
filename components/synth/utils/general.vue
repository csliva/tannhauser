<script>
  export default {
    methods: {
      log: function(data) {
        console.log('General Utility:')
        console.log(data || 'No Data')
      },
      alert: function(msg) {
        alert(msg || 'No Message')
      }
    }
  }
</script>
