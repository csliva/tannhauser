<script>
  export default {
    props: ['value'],
    data () {
      return {
        settings: this.value,
        cssBlock: 'new-module',
        level: -Infinity,
        debug: {
          active: false
        }
      }
    },
    mounted () {
      setInterval(() => (
        this.setLevel(this.settings.meter)
      ), 250)
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
      },
      // css b-e-m
      cssEl(el, mods){
        return el ? this.cssBlock+'__'+el : false
      },
      // Note <=> Hz
      noteToHz (hz) {
        // return Tone.Frequency(hz).toFrequency(2)
      },
      hzToNote () {
        // return Tone.Frequency(this.settings.frequency.value).toNote()
      },
      // meter level
      setLevel(meter) {
        if(!meter) { return false }
        let level = meter.getLevel()
        this.level = (level >= -24 && level <= 24) ? level.toFixed(2) : -Infinity
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
    },
    filters: {
      round (num, dec) {
        return Number(num).toFixed(dec || 0)
      }
    }
  }
</script>

<style lang="sass">
  .new-module
    display: block
    &__debug
      @include neuMorphInner(clr2('pink', 0.85, -15%), clr2('pink', 0.75, -55%))
      background-color: clr2('pink', 0.80, -25%)
      padding: $blh/4 $blh/2
      border: solid 2px clr2('pink', 0.5, -45%)
      border-radius: $blh
      color: clr2('pink', 0.25, 40%)
      text-shadow: 0 0 4px clr2('indigo', 0, -20%)
      font-size: 12px
      font-family: $ffHead
      margin-top: blh
</style>
