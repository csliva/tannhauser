export const state = () => ({
  title: 'Tannhauser',
  piano: {
    active: true,
    display: true,
    freq: 440,
    trigA: false,
    trigR: false
  },
  modules: [],
  routes: []
})

export const mutations = {
  updateTitle (state, value) {
    state.title = value
  },
  setPiano (state, arg) {
    state.piano.active = arg
  },
  setDisplayPiano (state, arg) {
    state.piano.display = arg
  },
  triggerAttack (state, arg ){
    state.piano.trigA = arg
  },
  triggerRelease (state, arg ){
    state.piano.trigR = arg
  },
  setPianoFreq (state, arg) {
    state.piano.freq = arg
  },
  addModule (state, module) {
    state.modules.push(module)
  }
}
