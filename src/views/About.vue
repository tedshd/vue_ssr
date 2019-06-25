<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{msg}}</h2>
    <p>{{meta}}</p>
  </div>
</template>
<script>
import titleMixin from '@/mixin/title-mixin'

export default {
  name: 'About',
  mixins: [titleMixin],
  title () {
    console.log('TITLE')
    return 'title About me'
  },
  data: () => {
    return {
      msg: 'HI'
    }
  },
  computed: {
    // display the item from store state.
    meta () {
      console.log('route item:', this.$route.params.id)
      return this.$store.state.metaData[this.$route.name]
    }
  },
  // Server-side only
  // This will be called by the server renderer automatically
  serverPrefetch () {
    console.log('serverPrefetch')
    // return the Promise from the action
    // so that the component waits before rendering
    return this.getMeta()
  },
  // Client-side only
  mounted () {
    console.log('mounted')
    // If we didn't already do it on the server
    // we fetch the item (will first show the loading text)
    if (!this.meta) {
      this.getMeta()
    }
  },

  methods: {
    getMeta () {
      console.log('route:', this.$route)
      // return the Promise from the action
      return this.$store.dispatch('getMeta', this.$route.name)
    }
  }
}

</script>
