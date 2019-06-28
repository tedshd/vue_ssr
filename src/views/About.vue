<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{msg}}</h2>
    <p :class="style.red">{{meta}}</p>
    <section :class="style.layout">
      <div class="common">{{meta.title}}</div>
    </section>
  </div>
</template>
<script>
import titleMixin from '@/mixin/title-mixin'
import metaTag from '@/lib/meta'
import Host from '@/lib/host'
import base from '@/style/_base.css'
import layout from '@/style/_layout.css'
import style from '@/style/about.css'

console.log(style)

export default {
  name: 'About',
  mixins: [titleMixin],
  // title () {
  //   console.log('TITLE')
  //   console.log('TITLE::', this.$store.state.metaData[this.$route.name])
  //   return 'MIXINtitle'
  // },
  // metaTag () {
  //   return {
  //     title: this.$store.state.metaData[this.$route.name],
  //     meta: [{
  //       name: 'keyWords',
  //       content: 'My Example App'
  //     }],
  //     link: [{
  //       rel: 'asstes',
  //       href: 'https://assets-cdn.github.com/'
  //     }]
  //   }
  // },
  data: () => {
    return {
      msg: 'MSG',
      title: 'this is title',
      style: Object.assign({}, base, style, layout)
    }
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
