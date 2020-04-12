<template lang="html">
  <div class="test">
      <h1>{{ testMsg }}</h1>
      <div class="#">
        Counter:
        <button @click="decrement"> - </button>
        <span>{{ num }}</span>
        <button @click="increment"> + </button>
      </div>
      <br>
      <ul>
        <li v-for="(i, index) in items" :key="index">
          <input type="text" @input="update(index, $event.target.value)" :value="i.val" />
          <span>{{ i.val }}</span>
          <button @click="remove(index)">x</button>
        </li>
      </ul>
      <div class="#">
        <input  v-model="newItemText" placeholder="Enter Title" />
        <button @click="add(newItemText)">Add New Item</button>
      </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        newItemText: ''
      }
    },
    computed: {
      num (){
        return this.$store.state.num
      },
      testMsg (){
        return this.$store.state.testMsg
      },
      items(){
        return this.$store.state.items
      }
    },
    methods: {
      increment: function(){
        this.$store.commit('increment')
      },
      decrement: function(){
        this.$store.commit('decrement')
      },
      update: function(index, value){
        this.$store.commit('update', {index, value})
      },
      add: function(value){
        if(value){
          this.$store.commit('add', {value})
          this.newItemText = ''
        } else {
          alert('Enter text!')
        }
      },
      remove: function(index){
        if(confirm('Sure you want to delete item?')){
          this.$store.commit('remove', {index})
        }
      }
    }
  }
</script>

<style lang="sass">
  .test
    border: solid 1px red
    padding: $blh/2
    margin-bottom: $blh/2
</style>
