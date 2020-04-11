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
  update (state, { item, text }) {
    item.val = text
  }
}
