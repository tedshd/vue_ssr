<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import metaTag from '@/lib/meta'
import Host from '@/lib/host'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  computed: {
    // display the item from store state.
    meta () {
      // console.log('route item id:', this.$route.params.id)
      // console.log('meta::', this.$store.state.metaData[this.$route.name])

      const meta = this.$store.state.metaData[this.$route.name]
      console.log(Host(this) + this.$route.fullPath)
      metaTag(this, {
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
          },
          {
            itemprop: 'image',
            property: 'og:image',
            content: 'https://ssl.feebee.com.tw/og_fb_banner.jpg'
          },
          {
            property: 'og:image:width',
            content: '600'
          },
          {
            property: 'og:image:height',
            content: '314'
          }
        ],
        link: [{
          rel: 'asstes',
          href: 'https://assets-cdn.github.com/'
        }]
      })
      // if (this.$ssrContext) {
      //   this.$ssrContext.title = meta.title
      // }

      return meta
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
    if (!this.meta) {
      this.getMeta()
    }
    // console.log('||||||', this.$store.state.metaData[this.$route.name])
    // this.metaData = this.$store.state.metaData[this.$route.name]
  },

  methods: {
    getMeta () {
      // console.log('route:', this.$route)
      // return the Promise from the action
      return this.$store.dispatch('getMeta', this.$route.name)
    }
  }
}
</script>
