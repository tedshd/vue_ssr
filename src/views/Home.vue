<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1 :class="style.error">{{home_msg}}</h1>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    {{init}}
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import metaTag from '@/lib/meta'
import Host from '@/lib/host'
import loading from '@/lib/loading'
import style from '@/style/home.css'

console.log(style)

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data: () => {
    return {
      home_msg: '!HOME!',
      style: Object.assign({}, style)
    }
  },
  computed: {
    // display the item from store state.
    init () {
      // console.log('route item id:', this.$route.params.id)
      // console.log('meta::', this.$store.state.metaData[this.$route.name])

      const meta = this.$store.state.metaData[this.$route.name]
      // console.log(Host(this) + this.$route.fullPath)
      // console.log(meta)
      if (meta) {
        this.initMeta(this, meta)
      }
      // if (this.$ssrContext) {
      //   this.$ssrContext.title = meta.title
      // }

      return ''
    }
  },
  // Server-side only
  // This will be called by the server renderer automatically
  serverPrefetch () {
    console.log('==serverPrefetch==')
    // console.log(this.$ssrContext)

    // this.$ssrContext.title = 'pre title'
    // return the Promise from the action
    // so that the component waits before rendering

    return this.getMeta()
  },
  // Client-side only
  mounted () {
    console.log('==mounted==')
    // If we didn't already do it on the server
    // we fetch the item (will first show the loading text)
    if (!this.init) {
      this.getMeta()
    }
    // console.log('||||||', this.$store.state.metaData[this.$route.name])
    // this.metaData = this.$store.state.metaData[this.$route.name]

    document.body.classList.add(style.home_bg)
    loading(false, style)
  },
  beforeCreate () {
  },
  updated () {

  },
  beforeDestroy () {
    document.body.classList.remove(style.home_bg)

    loading(true, style)
  },

  methods: {
    initMeta (_this, meta) {
      metaTag(_this, {
        title: meta.title,
        meta: [
          {
            itemprop: 'description',
            name: 'description',
            property: 'og:description',
            content: meta.description
          },
          {
            itemprop: 'url',
            property: 'og:url',
            content: Host(this) + this.$route.fullPath
          }
        ],
        link: [{
          rel: 'asstes',
          href: 'https://assets-cdn.github.com/'
        }]
      })
    },
    getMeta () {
      // console.log('route:', this.$route)
      // return the Promise from the action
      return this.$store.dispatch('getMeta', this.$route.name)
    }
  }
}
</script>
