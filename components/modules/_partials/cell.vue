<template lang="html">
  <div class="cell" :class="cellClass">
    <span v-if="this.title" class="cell__title">{{ title }}</span>
    <slot />
  </div>
</template>

<script>
  export default {
    props: ['cols', 'type', 'gap', 'title'],
    computed: {
      cellClass() {
        let c = this.cols || '1'
        let g = this.gap || 'md'
        let t = this.type || false
        let mods = 'cell--cols'+c
        mods += ' cell--gap-'+g
        mods += t ? ' cell--'+t : ' '
        return mods
      }
    }
  }
</script>

<style lang="sass">
  .cell
    color: #fff
    display: grid
    grid-template-columns: 1fr
    // cols
    @for $i from 1 through 8
      &--cols#{$i}
        grid-template-columns: repeat($i, 1fr)
      @if($i < 8)
        &--cols#{$i}-#{ 8 - $i }
          grid-template-columns: #{$i}fr #{ 8 - $i }fr
    // gap
    &--gap-na
      grid-gap: 0
    &--gap-xs
      grid-gap: $blh/4
    &--gap-sm
      grid-gap: $blh/2
    &--gap-md
      grid-gap: $blh/1.5
    &--gap-lg
      grid-gap: $blh
    // type
    &--test
      @include devBound()
      padding: $blh/2 0
      text-align: center
      font-style: italic
    &--group
      position: relative
      border: solid 2px transparentize(clr('mint'), 0.25)
      border-radius: 4px
      padding: $blh/2
      padding-top: $blh
      box-shadow: 0 0 6px darken(clr('indigo'), 10%)
    &__title
      position: absolute
      top: 0
      left: 0
      font-size: 10px
      line-height: $blh/1.5
      background-color: transparentize(clr('mint'), 0.25)
      border-radius: 0
      border-bottom-right-radius: 4px
      padding: 0 $blh/4
      text-transform: uppercase
      letter-spacing: 0.5px




</style>
