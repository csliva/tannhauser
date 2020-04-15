export const state = () => ({
  title: 'Default Synth',
  piano: {
    active: true,
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
