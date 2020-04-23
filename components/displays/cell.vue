<template lang="html">
  <div class="cell" :class="cellClass">
    <h4 v-if="title" class="cell__title#">{{ title }}</h4>
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
    &--group,
    &--group-success,
    &--group-warning,
    &--group-danger
      background-color: clr2('indigo', 0, 2.5%)
      position: relative
      z-index: 0
      border: solid 2px clr2('blue', 0.4)
      border-radius: 4px
      padding: $blh/2
      padding-top: $blh*1.25
      overflow: hidden
      @include neuMorphOuter(clr2('indigo', 0.35, 25%), clr2('indigo', 0.65, -15%))
    &--group-success
      border-color: clr2('mint', 0.4)
    &--group-warning
      border-color: clr2('orange', 0.4)
    &--group-danger
      border-color: clr2('pink', 0.4)
    &__title
      position: absolute
      z-index: 100
      top: 0
      left: 0
      font-size: 10px
      line-height: $blh/1.5
      text-shadow: 0 0 2px clr2('blue', 0, -50%)
      background-color: clr2('blue', 0.4)
      color: clr2('blue', 0, 40%)
      border-radius: 0
      border-bottom-right-radius: 4px
      padding: 0 $blh/2
      text-transform: uppercase
      letter-spacing: 0.5px
      margin: 0
      @include neuMorphOuter(clr2('indigo', 0.35, 25%), clr2('indigo', 0.65, -15%))
      .cell--group-success &
        background-color: clr2('mint', 0.25)
      .cell--group-warning &
        background-color: clr2('orange', 0.25)
      .cell--group-danger &
        background-color: clr2('pink', 0.25)
    &--parent
      // border: dotted 2px yellow
    &--item
      // border: dotted 2px clr2('blue')
    &--test
      border: dotted 1px yellow
      border-color: yellow
      color: clr2('mint', 0.35)
      padding: 0
      text-align: center
      font-style: italic
      &::after
        content: 'OLD STYLE'
        font-size: 10px
        line-height: 14px
        display: block
    &--wip
      @include transition(background-color, color)
      @include neuMorphInner(clr2('indigo', 0.5, 7.5%), clr2('indigo', 0.5, -7.5%))
      background-color: clr2('indigo', 0.75)
      position: relative
      z-index: 0
      border: dotted 2px clr2('blue', 0.75, 40%)
      color: clr2('blue', 0.5, 50%)
      padding: 0 $blh/8
      text-align: center
      font-style: italic
      border-radius: $blh
      font-size: 0.9em
      line-height: $blh * 1.25
      overflow: hidden
      &:hover
        cursor: pointer
        background-color: clr2('indigo', 0.25)
        color: clr2('blue', 0.25, 30%)

</style>
