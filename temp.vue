<cell type="group">
  <h4 v-if="l.title" class="cell__title">{{ l.title }}</h4>
  <cell cols="2">
    <ctrl-select v-if="l._oscillator.baseType" v-model="l._oscillator.baseType" :props="oscProps" type="pill" />
    <cell type="wip">Note Frq</cell>
  </cell>
  <cell cols="4">
    <ctrl-dial v-if="l.amplitude" v-model="l.amplitude.value" :props="lfoProps.amp" />
    <ctrl-dial v-if="l._oscillator.frequency" v-model="l._oscillator.frequency.value" :props="lfoProps.freq" />
    <ctrl-dial v-if="l._oscillator.detune" v-model="l._oscillator.detune.value" :props="oscDetuneProps" />
    <ctrl-dial v-model="l._oscillator.partialCount" :props="oscPartialProps" />
  </cell>
  <cell cols="3">
    <ctrl-select :props="cnxTargets" type="pill" />
    <ctrl-select :props="oscModProps" type="pill" />
    <ctrl-btn @click="" text="Connect" />
  </cell>
  <cell v-if="l.cnx.o">
    <span v-for="(o, i) in l.cnx.o">{{ o.title ? o.title : 'No Title' }}</span>
  </cell>
  <cell v-else>Not Connected</cell>
</cell>
<cell cols="3" >
  <ctrl-btn @click="l._oscillator.state === 'stopped' ? l._oscillator.start() : l._oscillator.stop() "
    :text="(l.state == 'started' ? 'Stop' : 'Start')"
    :type="(l.state == 'started' ? 'danger' : 'success')" />
  <ctrl-btn @click="log(l)" type="warning" text="Log" />
</cell>
