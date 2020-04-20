<template lang="html">
  <div v-if="props" class="select" :class="classMods">
    <div v-if="props.label" class="select__meta">
      <label class="select__label">{{ props.label }}</label>
    </div>
    <div class="select__main">
      <span class="select__icon"></span>
      <div class="select__inner">
        <select v-model="lVal" class="select__input">
          <option v-for="(o, i) in props.options" :value="o">{{ lNiceOpts ? lNiceOpts[i] : o | cap }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['value', 'props', 'type'],
    data () {
      return {
        lVal: this.value,
        lOpts: this.props.options,
        lNiceOpts: this.props.niceOptions
      }
    },
    computed: {
      classMods() {
        let types = [], mods = ''
        types = this.type ? this.type.split(',') : types.push(this.type)
        for(let i = 0; i < types.length; i++) {
          let t = types[i]
          mods += t ? ' select--'+t : ' '
        }
        return mods
      }

    },
    filters: {
      cap: function(s) {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }
    },
    watch: {
      lVal () {
        this.$emit('input', this.lVal)
      }
    }
  }
</script>

<style lang="sass">
  .select
    display: block
    &__meta
      font-size: 10px
      line-height: 1
      color: lighten(clr('indigo'), 45%)
      text-transform: uppercase
      margin-bottom: $blh/4
    &__main
      display: block
      position: relative
      // overflow: hidden
      &:hover
        .select__icon:after
          border-color: lighten(clr('mint'), 10%) transparent transparent transparent
    &__icon
      position: absolute
      z-index: 20
      top: 0
      left: 0
      width: 4px
      text-align: center
      height: 100%
      pointer-events: none
      &:after
        content: ''
        position: absolute
        display: inline-block
        top: 50%
        left: 1px
        width: 0
        height: 100%
        line-height: 100%
        border-style: solid
        margin-top: -2px
        border-width: 3px 3px 0 3px
        border-color: transparentize(#fff, 0.25) transparent transparent transparent
    &__input
      position: relative
      z-index: 10
      appearance: none
      -webkit-appearance: none
      display: block
      width: 100%
      font-size: 12px
      text-align: center
      line-height: $blh
      padding: 0 0 0 12px
      border: 0
      border-radius: 0
      color: transparentize(#fff, 0.25)
      background-color: transparent
      cursor: pointer
      &:focus
        outline: 0
      &:hover
        color: lighten(clr('mint'), 10%)
    // types
    &--minimal
      .select
        &__meta
          display: none
    &--well
      position: relative
      &:hover
        .select__meta
          opacity: 1
      .select
        &__meta
          @include trans(opacity)
          opacity: 0
          position: absolute
          top: -$blh/1.5
          height: auto
        &__main
          position: relative
          z-index: 0
          border-radius: $blh
          &:hover
            &:before
              opacity: 1
            &:after
              opacity: 0
          &:before,
          &:after
            @include trans(opacity)
            content: ''
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            border-radius: $blh
          &:before
            z-index: 10
            opacity: 0
            background: linear-gradient(to right, clr2('indigo', 0, 2.5%), clr2('indigo', 0, 7.5%))
            @include neuMorphOuter(clr2('indigo', 0.3, 25%), clr2('indigo', 0.45, -15%))
          &:after
            z-index: 20
            opacity: 1
            background-color: clr2('indigo', 0, 2.5%)
            @include neuMorphInner(clr2('indigo', 0.55, 25%), clr2('indigo', 0.35, -5%))
        &__inner
          position: relative
          z-index: 100
        &__input
          @include trans(transform)
          padding: $blh/8 $blh/2
        &__icon
          right: 0
          width: $blh/2
          left: auto
          z-index: 100
          // border-left: solid 1px darken(clr('indigo'), 10%)
          &:after
            left: auto
            right: $blh/1.5
            border-width: 4px 4px 0 4px
            transform: translate(50%, 0)
    // pill - neumorphic
    &--pill
      .select
        &__meta
          display: none
        &__main
          position: relative
          z-index: 0
          border-radius: $blh
          background: linear-gradient(to right, clr2('blue', 0, -15%), clr2('mint', 0, -15%))
          padding: 2px
          &:hover
            &:before
              opacity: 0
            &:after
              // opacity: 1
              // background-color: clr2('indigo', 0, 10%)
            .select__icon:after
              border-color: #fff transparent transparent transparent
          &:before,
          &:after
            @include trans(opacity)
            content: ''
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            border-radius: $blh
            pointer-events: none
          &:before
            opacity: 1
            z-index: -10
            @include neuMorphOuter(clr2('indigo', 0.15, 25%), clr2('indigo', 0.3, -15%))
          &:after
            opacity: 0
            z-index: 10
        &__inner
          position: relative
          z-index: 10
          border-radius: $blh
          background-color: clr2('indigo', 0, 5%)
          &:hover
            &:before
              opacity: 0
            &:after
              opacity: 1
          &:before,
          &:after
            @include trans(opacity)
            content: ''
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            border-radius: $blh
            pointer-events: none
          &:before
            opacity: 1
            z-index: 0
            background: linear-gradient(-45deg, clr2('indigo', 0, 17.5%), clr2('indigo', 0, 2.5%))
          &:after
            opacity: 0
            z-index: 20
            @include neuMorphInner(clr2('indigo', 0.25, 25%), clr2('indigo', 0.25, -5%))
        &__input
          // position: absolute
          @include trans(color)
          display: block
          right: auto
          width: 100%
          border-radius: $blh
          padding: 0 $blh/1.75
          background: transparent
          font-size: 12px
          line-height: $blh * 1.25
          text-shadow: 0 0 1px clr('indigo')
          &:hover
            color: #fff
        &__icon
          // display: none
          right: $blh * 0.2
          top: 50%
          left: auto
          transform: translate(0, -50%)
          width: $blh
          height: $blh
          border-radius: 100%
          &:after
            margin: 1px 0 0 0
            right: auto
            left: 50%
            top: 50%
            height: 0
            transform: translate(-50%, -50%)
            border-width: 5px 4px 0 4px
            border-color: #fff transparent transparent transparent
    &--alt
      .select
        &__main
          background: linear-gradient(to right, clr2('orange', 0, 5%), clr2('pink', 0, 5%))

</style>
