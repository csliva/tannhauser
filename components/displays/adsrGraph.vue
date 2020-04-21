<template lang="html">
  <div class="graph">
    <div>
      <p>Graph W: {{ width }}, &nbsp; Graph H: {{ height }}</p>
      <svg class="graph__svg" :width="width" :height="height">
        <path :d="path" stroke="#fff" stroke-width="3" fill="none"></path>
      </svg>
    </div>
    <div class="graph__grid">
      <div>
        <div>{{ aPct | fixed }}% </div>
        <div>{{ (aPct / .25) | fixed }}</div>
        <div>{{ aShr | fixed }}</div>
      </div>
      <div>
        <div>{{ dPct | fixed }}% </div>
        <div>{{ (dPct / .25) | fixed }}</div>
        <div>{{ dShr | fixed }}</div>
      </div>
      <div>
        <div>{{ sPct | fixed }}% </div>
        <div>{{ (sPct / .25) | fixed }}</div>
        <div>?</div>
      </div>
      <div>
        <div>{{ rPct | fixed }}% </div>
        <div>{{ (rPct / .25) | fixed }}</div>
        <div>{{ rShr | fixed }}</div>
      </div>
    </div>
    <div class="#">
      Total: &nbsp; {{ adsrTotal | fixed }}
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
      aPct(){ return this.getPctent(this.attack, this.aMin, this.aMax) },
      dPct(){ return this.getPctent(this.decay, this.dMin, this.dMax) },
      sPct(){ return this.getPctent(this.sustain, this.sMin, this.sMax) },
      rPct(){ return this.getPctent(this.release, this.rMin, this.rMax) },
      // Percent of each inputs range, and also the Shr of the total percent for the envelope graph
      // colt: x = ((this.aPct*100)/(this.aPct+this.dPct+this.rPct))*this.width
      // .toFixed(2) ???
      aShr(){ return (((this.aPct*100) / (this.aPct+this.dPct+this.rPct)) * (this.width / 4)) },
      dShr(){ return (((this.dPct*100) / (this.dPct+this.aPct+this.rPct)) * (this.width / 4)) },
      sShr(){ },
      rShr(){ return (((this.rPct*100) / (this.rPct+this.dPct+this.aPct)) * (this.width / 4)) },
      adsrTotal(){ return (this.num(this.aShr) + this.num(this.dShr) + this.num(this.rShr)) }
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
      num (val) {
        return Number(val)
      },
      getPctent(val, min, max) {
        return Number(((val - min) * 100 ) / (max - min))
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
    },
    filters: {
      fixed (val) {
        return Number(val).toFixed(1)
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
