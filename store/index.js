export const state = () => ({
  testMsg: 'Store Test Message',
  num: 0,
  items: [
    { val: 'One!' },
    { val: 'Two!' }
  ]
})

export const mutations = {
  increment (state) {
    state.num++
  },
  decrement (state) {
    state.num--
  },
  update (state, obj) {
    state.items[obj.index].val = obj.value
  },
  add (state, obj){
    state.items.push({val: obj.value})
  },
  remove (state, obj) {
    if(obj.index > -1){
      state.items.splice(obj.index, 1)
    }
  }
}
