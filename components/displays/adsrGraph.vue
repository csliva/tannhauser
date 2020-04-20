<template lang="html">
  <div class="graph">
    <div>
      <svg class="graph__svg" :width="width" :height="height">
        <path :d="path" stroke="#fff" stroke-width="3" fill="none"></path>
      </svg>
    </div>
    <div class="graph__grid">
      <span>{{ aPerc }}% ({{ aPerc / .25 }})</span>
      <span>{{ dPerc }}% ({{ dPerc / .25 }})</span>
      <span>{{ sPerc }}% ({{ sPerc / .25 }})</span>
      <span>{{ rPerc }}% ({{ rPerc / .25 }})</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: [ 'value' ],
    data () {
      return {
        width: 200,
        height: 100,
        path: '',
        attack: this.value.a,
        decay: this.value.d,
        sustain: this.value.s,
        release: this.value.r,
        aMin: this.value.aMin, aMax: this.value.aMax,
        dMin: this.value.dMin, dMax: this.value.dMax,
        sMin: this.value.sMin, sMax: this.value.sMax,
        rMin: this.value.rMin, rMax: this.value.rMax
      }
    },
    mounted() {
      this.draw()
    },
    computed: {
      aPerc(){ return this.getPercent(this.attack, this.aMin, this.aMax) },
      dPerc(){ return this.getPercent(this.decay, this.dMin, this.dMax) },
      sPerc(){ return this.getPercent(this.sustain, this.sMin, this.sMax) },
      rPerc(){ return this.getPercent(this.release, this.rMin, this.rMax) }
    },
    watch: {
      value: function () {
        this.attack = this.value.a
        this.decay = this.value.d
        this.sustain = this.value.s
        this.release = this.value.r
        this.draw()
      }
    },
    methods: {
      getPercent(val, min, max) {
        return Number(((val - min) * 100 ) / (max - min)).toFixed(0)
      },
      draw() {
        const wRatio = (this.width / 4)
        const hRatio = (this.height / 1)
        // coords
  			const paths = []
        let x, y
        x = y = 0
        // attack
        x = (this.attack / this.aMax) * wRatio
        y = 0
        paths.push(`${x} ${y}`)
        // decay
        x += (this.decay / this.dMax) * wRatio
        y = this.height - this.sustain * hRatio
        paths.push(`${x} ${y}`)
        // sustain
        x += 1 * wRatio
        paths.push(`${x} ${y}`)
        // release
        x += (this.release / this.rMax) * wRatio
        y = this.height
        paths.push(`${x} ${y}`)

        this.path = `M0 ${this.height},` + paths.join(',')
      }
    }
  }
</script>

<style lang="sass">
  .graph
    display: block
    padding: $blh/2
    background-color: clr2('indigo', 0, 0%)
    border-radius: $blh/4
    &__svg
      border: solid 1px clr2('blue', 0.5)
    &__grid
      display: grid
      grid-template-columns: repeat(4, 1fr)
</style>
